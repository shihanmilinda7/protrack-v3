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
  const projectid: any = searchParams.get("projectid");
  const currentPage: any = parseInt(tmpPageNumber);

  const postsPerPage = 10; // Number of posts per page
  const offset = (currentPage - 1) * postsPerPage;

  const totalProjectTaskCount = await prisma.projecttasks.count({
    where: { projectid:parseInt(projectid) },
  });

  const projecttasks = await prisma.projecttasks.findMany({
    skip: offset,
    take: postsPerPage,
    where: { projectid:parseInt(projectid) },
  });

  if (projecttasks.length > 0) {
    res = { message: "SUCCESS", projecttasks, totalProjectTaskCount };
  } else {
    res = { message: "FAIL" };
  }
  return NextResponse.json(res);
}
