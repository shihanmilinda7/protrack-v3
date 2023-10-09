import { StaffObj } from "@/app/components/staff/types";
import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let res;

  const staffid: any = searchParams.get("staffid");
  const date: any = searchParams.get("sel-date");

  try {
    await prisma.$transaction(async (tx) => {
      const timelogHeaderData = await tx.timelogs.findMany({
        where: {
          staffid: parseInt(staffid),
          date,
        },
      });

      if (timelogHeaderData.length > 0) {
        const headerId = timelogHeaderData[0].timelogid;
        const timelogDetailData = await tx.timelogsdetails.findMany({
          where: {
            timelogid: headerId,
          },
        });
        res = { message: "SUCCESS", timelogHeaderData, timelogDetailData };
      } else {
        res = { message: "SUCCESS", timelogHeaderData };
      }
    });
  } catch (error) {
    console.error("Error getting timelog:", error);
    res = { message: "FAIL" };
  }

  return NextResponse.json(res);
}
