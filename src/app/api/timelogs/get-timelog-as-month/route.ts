import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let res;

  const tmpDate: any = searchParams.get("date");
  const tmpStaffid: any = searchParams.get("staffid");

  try {
    await prisma.$transaction(async (tx) => {
      const timelogData = await tx.timelogs.findMany({
        where: {
          staffid: parseInt(tmpStaffid),
          date: {
            startsWith: tmpDate,
          },
        },
      });

      for (let index = 0; index < timelogData.length; index++) {
        let element: any = timelogData[index];
        const rawQuery = Prisma.sql`SELECT sum(td.time) as totaltime FROM timelogsdetails as td  where td.timelogid = ${element.timelogid}`;
        const detailData: any = await prisma.$queryRaw(rawQuery);
        element["totalHours"] = detailData[0].totaltime.toString();
      }
      // console.log("timelogData", timelogData);
      // console.log("timelogData",timelogData,)
      res = { message: "SUCCESS", timelogData };

      // if (headerData.length > 0) {
      //   const dataSource = await tx.calanderdatasourcedata.findMany({
      //     where: {
      //       calanderid: headerData[0].calanderid.toString(),
      //       uniqueKey: {
      //         startsWith: tmpMonth,
      //       },
      //     },
      //   });
      //   res = { message: "SUCCESS", headerData, dataSource };
      // } else {
      //   res = { message: "SUCCESS", headerData: [], dataSource: [] };
      // }
      return "";
    });
  } catch (error) {
    console.error("Error getting timelog data source:", error);
    res = { message: "FAIL" };
  }

  return NextResponse.json(res);
}
