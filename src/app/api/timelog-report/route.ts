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
        const rawQuery = Prisma.sql`SELECT p.projectname,pt.taskname,td.* FROM timelogsdetails as td left join projects as p on td.projectid = p.projectid left join projecttasks as pt on td.taskid = pt.taskid where td.timelogid = ${element.timelogid}`;
        const detailData: any = await tx.$queryRaw(rawQuery);
        element["taskdetails"] = detailData;
        // console.log("timelogData", detailData);
        const rawQuery1 = Prisma.sql`SELECT sum(td.time) as totaltime FROM timelogsdetails as td  where td.timelogid = ${element.timelogid}`;
        const detailData1: any = await tx.$queryRaw(rawQuery1);
        element["totalHours"] = detailData1[0]?.totaltime?.toString() ?? "0";

      }
      // console.log("timelogData", timelogData);
      res = { message: "SUCCESS", timelogData };
      return "";
    });
  } catch (error) {
    console.error("Error getting timelog data source:", error);
    res = { message: "FAIL" };
  }

  return NextResponse.json(res);
}
