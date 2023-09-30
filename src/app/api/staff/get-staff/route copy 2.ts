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
  const searchStaffName: any = searchParams.get("search-staff-name");
  const currentPage: any = parseInt(tmpPageNumber);

  const postsPerPage = 10; // Number of posts per page
  const offset = (currentPage - 1) * postsPerPage;

  let totalStaffCount;
  let staff: any;
  if (searchStaffName) {
    console.log("searchStaffName",searchStaffName,)
    totalStaffCount = await prisma.staff.count({
      where: {
        staffname: {
          contains: searchStaffName,
        },
      },
    });

    staff = await prisma.staff.findMany({
      where: {
        staffname: {
          contains: "",
        },
      },
      skip: offset,
      take: postsPerPage,
    });
  } else {
    totalStaffCount = await prisma.staff.count();

    staff = await prisma.staff.findMany({
      skip: offset,
      take: postsPerPage,
    });
  }

  if (staff.length > 0) {
    res = { message: "SUCCESS", staff, totalStaffCount };
  } else {
    res = { message: "FAIL" };
  }
  return NextResponse.json(res);
}
