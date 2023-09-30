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
  const tmpSearchProjectName: any = searchParams.get("search-project-name");
  const currentPage: any = parseInt(tmpPageNumber);

  const postsPerPage = 10; // Number of posts per page
  const offset = (currentPage - 1) * postsPerPage;
  let totalProjectCount: any;
  let project: any;

  let searchProjectName: any;
  if (tmpSearchProjectName == "-1") {
    searchProjectName = "";
  } else {
    searchProjectName = tmpSearchProjectName;
  }
  try {
    await prisma.$transaction(async (tx) => {
      totalProjectCount = await tx.projects.count({
        where: {
          projectname: {
            contains: searchProjectName,
          },
        },
      });
  
      project = await tx.projects.findMany({
        where: {
          projectname: {
            contains: searchProjectName,
          },
        },
        skip: offset,
        take: postsPerPage,
      });
      if (project.length > 0) {
        res = { message: "SUCCESS", project, totalProjectCount };
      } else {
        res = { message: "FAIL", staff: [], totalStaffCount: 1 };
      }
      return "";
    });
  } catch (error) {
    console.log("error", error);
    res = { message: "FAIL" };
  }

  // if (searchProjectName != "-1") {
  //   totalProjectCount = await prisma.projects.count({
  //     where: {
  //       projectname: {
  //         contains: searchProjectName,
  //       },
  //     },
  //   });

  //   project = await prisma.projects.findMany({
  //     where: {
  //       projectname: {
  //         contains: searchProjectName,
  //       },
  //     },
  //     skip: offset,
  //     take: postsPerPage,
  //   });
  // } else {
  //   totalProjectCount = await prisma.projects.count();

  //   project = await prisma.projects.findMany({
  //     skip: offset,
  //     take: postsPerPage,
  //   });
  // }

  // if (project.length > 0) {
  //   res = { message: "SUCCESS", project, totalProjectCount };
  // } else {
  //   res = { message: "FAIL", project: [], totalProjectCount: 1 };
  // }
  return NextResponse.json(res);
}
