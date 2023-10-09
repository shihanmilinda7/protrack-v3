import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let res;

  const tmpYear: any = searchParams.get("year");
  const tmpMonth: any = searchParams.get("month");
  const tmpCountry: any = searchParams.get("country");

  try {
    await prisma.$transaction(async (tx) => {
      const headerData = await tx.calanderheaderdata.findMany({
        where: {
          year: tmpYear,
          country: tmpCountry,
        },
      });

      if (headerData.length > 0) {
        const dataSource = await tx.calanderdatasourcedata.findMany({
          where: {
            calanderid: headerData[0].calanderid.toString(),
            uniqueKey: {
              startsWith: tmpMonth,
            },
          },
        });
        res = { message: "SUCCESS", headerData, dataSource };
      } else {
        res = { message: "SUCCESS", headerData: [], dataSource: [] };
      }
      return "";
    });
  } catch (error) {
    console.error("Error getting calander data source:", error);
    res = { message: "FAIL" };
  }

  return NextResponse.json(res);
}
