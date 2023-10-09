import { StaffObj } from "@/app/components/staff/types";
import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let res;

  const tmpPageNumber: any = searchParams.get("page-number");
  const staffid: any = searchParams.get("staffid");
  const projectid: any = searchParams.get("projectid");
  const date: any = searchParams.get("sel-date");
  const currentPage: any = parseInt(tmpPageNumber);

  const postsPerPage = 10; // Number of posts per page
  const offset = (currentPage - 1) * postsPerPage;
  try {
    await prisma.$transaction(async (tx) => {
      const timeAllocHeaderData = await tx.timealloc.findMany({
        where: {
          staffid: parseInt(staffid),
          projectid: parseInt(projectid),
          date,
        },
      });

      if (timeAllocHeaderData.length > 0) {
        const headerId = timeAllocHeaderData[0].timeallocid;
        // console.log("headerId",timeAllocHeaderData.timeallocid,)
        const rawQuery = Prisma.sql`select tad.*, pt.taskname,pt.startdate,pt.enddate from timeallocdetails as tad join projecttasks as pt on tad.taskid = pt.taskid where tad.timeallocid=${headerId}`;
        const timeAllocDetailData: any = await prisma.$queryRaw(rawQuery);
        
        // const timeAllocDetailData = await tx.timeallocdetails.findMany({
        //   where: {
        //     timeallocid: headerId,
        //   },
        // });
        res = { message: "SUCCESS", timeAllocHeaderData, timeAllocDetailData };
      } else {
        res = { message: "SUCCESS" };
      }
    });
  } catch (error) {
    console.error("Error updating staff:", error);
    res = { message: "FAIL" };
  }

  return NextResponse.json(res);
}

export async function POST(request: Request) {
  const { timelogid, staffid, date, remark, workingType, timelogRows } =
    await request.json();
  let res;
  let headerId = timelogid;
  try {
    await prisma.$transaction(async (tx) => {
      if (timelogid) {
        await tx.timelogs.updateMany({
          where: { timelogid: timelogid },
          data: {
            remark,
            workingType,
          },
        });
      } else {
        const timelogHeader = await tx.timelogs.create({
          data: {
            staffid,
            date,
            remark,
            workingType,
          },
        });
        if (!timelogHeader.timelogid) {
          throw new Error(`Timelog not enterd`);
        }
        headerId = timelogHeader.timelogid;
      }

      for (let i = 0; i < timelogRows.length; i++) {
        const element = timelogRows[i];
        if (element.rowstatus == "u") {
          await tx.timelogsdetails.updateMany({
            where: {
              timelogdetailid: parseInt(element.timelogdetailid),
            },
            data: {
              rowindex: i + 1,
              projectid: parseInt(element.projectid),
              taskid: parseInt(element.taskid),
              time: parseInt(element.time),
              remark: element.remark,
            },
          });
        } else if (element.rowstatus == "a") {
          await tx.timelogsdetails.create({
            data: {
              timelogid: parseInt(headerId),
              rowindex: i + 1,
              projectid: parseInt(element.projectid),
              taskid: parseInt(element.taskid),
              time: parseInt(element.time),
              remark: element.remark,
            },
          });
        } else if (element.rowstatus == "d") {
          await tx.timelogsdetails.delete({
            where: {
              timelogdetailid: parseInt(element.timelogdetailid),
            },
          });
        }
      }
      res = { message: "SUCCESS" };
      return "";
    });
  } catch (error) {
    console.error("Error adding timelog", error);
    res = { message: "FAIL" };
  }
  return NextResponse.json(res);
}

export async function PUT(request: Request) {
  const { timeAllocHeaderId, remark, taskRows } = await request.json();
  let message: string = "SUCCESS";
  try {
    await prisma.$transaction(async (tx) => {
      const updateTimeAllocHeader = await tx.timealloc.updateMany({
        where: { timeallocid: timeAllocHeaderId },
        data: {
          remark,
        },
      });

      for (let i = 0; i < taskRows.length; i++) {
        const element = taskRows[i];

        await tx.timeallocdetails.updateMany({
          where: { timeallocdetailid: element.timeallocdetailid },
          data: {
            time: parseInt(element.time) ?? 0,
            remark: element.remark,
          },
        });
      }

      return "";
    });
  } catch (error) {
    console.error("Error adding workdone", error);
    message = "FAIL";
  }
  return NextResponse.json(message);
}
