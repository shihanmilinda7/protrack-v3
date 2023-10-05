import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let res: any = { message: "SUCCESS" };

  // const tmpPageNumber: any = searchParams.get("page-number");
  const projectid: any = searchParams.get("projectid");
  const staffid: any = searchParams.get("staffid");

  // const currentPage: any = parseInt(tmpPageNumber);

  // const postsPerPage = 10; // Number of posts per page
  // const offset = (currentPage - 1) * postsPerPage;

  try {
    await prisma.$transaction(async (tx) => {
      //1. check if any project assigns in projectassign table
      const totalAssignTask = await prisma.projecttasksassigns.findMany({
        where: {
          projectid: parseInt(projectid),
          staffid: parseInt(staffid),
          // staffid: 42,
        },
      });
      res = { message: "SUCCESS", totalAssignTask };

      return "";
    });
  } catch (error) {
    console.error("Error adding project assign", error);
    res = { message: "SUCCESS" };
  }

  return NextResponse.json(res);
}

export async function POST(request: Request) {
  const { staffid, projectid, curPrjTaskRowOj } = await request.json();
  let message: string = "SUCCESS";

  // console.log("taskRows", curPrjTaskRowOj, staffid, projectid);
  try {
    await prisma.$transaction(async (tx) => {
      // 1. addnew projectassign .

      const projectassignCount = await tx.projectassigns.findMany({
        where: {
          staffid,
          projectid,
        },
      });
      if (projectassignCount.length == 0) {
        const projectassign = await tx.projectassigns.create({
          data: {
            staffid,
            projectid,
          },
        });
      }

      // 1. addnew projecttasksassigns .
      for (let i = 0; i < curPrjTaskRowOj.length; i++) {
        const element = curPrjTaskRowOj[i];
        // console.log("element.projecttaskassignid",element.projecttaskassignid,element.selected)
        if (element.projecttaskassignid == 0 && element.selected) {
          const projecttasksassign = await tx.projecttasksassigns.create({
            data: {
              staffid,
              projectid,
              taskid: element.taskid,
            },
          });
        } else if (element.projecttaskassignid != 0 && !element.selected) {
          await tx.projecttasksassigns.delete({
            where: {
              projecttaskassignid: element.projecttaskassignid,
            },
          });
        }
      }

      const isAnySelected: any = curPrjTaskRowOj.find(
        (t: any) => t.selected === true
      );
      if (!isAnySelected) {
        // console.log(projectassignCount[0]);
        await tx.projectassigns.delete({
          where: {
            projectassignid: projectassignCount[0].projectassignid,
          },
        });
      }
      // // 2. Verify staff enterd
      // if (!staff.staffid) {
      //   throw new Error(`Staff not enterd`);
      // }

      // const headerId: number = staff.staffid;

      return "";
    });
  } catch (error) {
    console.error("Error adding new assign", error);
    message = "FAIL";
  }
  return NextResponse.json(message);
}
