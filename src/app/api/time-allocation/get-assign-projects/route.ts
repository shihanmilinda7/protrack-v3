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
  const columns: any = searchParams.get("columns");
  const searchProjectName: any = searchParams.get("search-project-name");

  const currentPage: any = parseInt(tmpPageNumber);

  const postsPerPage = 10; // Number of posts per page
  const offset = (currentPage - 1) * postsPerPage;

  const totalAssignProjectCount = await prisma.projectassigns.count({
    where: {
      staffid: parseInt(staffid),
      // staffid: 42,
    },
  });

  let project: any;

  if (columns == "all") {
    const rawQuery = Prisma.sql`select p.* from projectassigns as pa join projects as p on pa.projectid = p.projectid where staffid = ${staffid}`;
    project = await prisma.$queryRaw(rawQuery);
  } else {
    const rawQuery = Prisma.sql`select pa.projectid,p.projectname from projectassigns as pa join projects as p on pa.projectid = p.projectid where staffid = ${staffid} limit ${postsPerPage} offset ${offset}`;
    project = await prisma.$queryRaw(rawQuery);
  }

  // const project = await prisma.projectassigns.findMany({
  //   skip: offset,
  //   take: postsPerPage,
  //   where: {
  //     staffid: parseInt(staffid),
  //     // staffid: 42,
  //   },
  // });

  if (project.length > 0) {
    res = { message: "SUCCESS", project, totalAssignProjectCount };
  } else {
    res = { message: "FAIL" };
  }
  return NextResponse.json(res);
}
