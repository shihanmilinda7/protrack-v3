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

  const currentPage: any = parseInt(tmpPageNumber);

  const postsPerPage = 10; // Number of posts per page
  const offset = (currentPage - 1) * postsPerPage;

  const totalAssignProjectTasksCount = await prisma.projecttasksassigns.count({
    where: {
      staffid: parseInt(staffid),
      projectid: parseInt(projectid),
      // staffid: 42,
    },
  });

  const rawQuery = Prisma.sql`select pta.*, pt.taskname,pt.startdate,pt.enddate from projecttasksassigns as pta join projecttasks as pt on pta.taskid = pt.taskid where pta.staffid=${staffid} and pta.projectid=${projectid}`;
  const projectTasks: any = await prisma.$queryRaw(rawQuery);

  // const project = await prisma.projectassigns.findMany({
  //   skip: offset,
  //   take: postsPerPage,
  //   where: {
  //     staffid: parseInt(staffid),
  //     // staffid: 42,
  //   },
  // });

  if (projectTasks.length > 0) {
    res = { message: "SUCCESS", projectTasks, totalAssignProjectTasksCount };
  } else {
    res = { message: "FAIL" };
  }
  return NextResponse.json(res);
}
