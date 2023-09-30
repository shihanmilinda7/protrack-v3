import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let res;

  // const tmpPageNumber: any = searchParams.get("page-number");
  const staffid: any = searchParams.get("staffid");
  const startdate: any = searchParams.get("startdate");
  const enddate: any = searchParams.get("enddate");
  // const currentPage: any = parseInt(tmpPageNumber);

  // const postsPerPage = 10; // Number of posts per page
  // const offset = (currentPage - 1) * postsPerPage;

  // const totalStaffCount = await prisma.staff.count();

  // const staff = await prisma.staff.findMany({
  //   skip: offset,
  //   take: postsPerPage,
  // });
  const rawQuery = Prisma.sql`SELECT t.*,p.projectname FROM timealloc as t left join projects as p on t.projectid = p.projectid WHERE t.date >= ${startdate} AND t.date <= ${enddate} AND t.staffid=${staffid} ORDER BY t.date asc`;
  const timeAllocHeaderData: any[] = await prisma.$queryRaw(rawQuery);

  if (timeAllocHeaderData.length > 0) {
    res = { message: "SUCCESS", timeAllocHeaderData };
  } else {
    res = { message: "FAIL" };
  }
  return NextResponse.json(res);
}

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   let res;

//   const tmpPageNumber: any = searchParams.get("page-number");
//   const currentPage: any = parseInt(tmpPageNumber);

//   const postsPerPage = 10; // Number of posts per page
//   const offset = (currentPage - 1) * postsPerPage;

//   const totalStaffCount = await prisma.staff.count();

//   const staff = await prisma.staff.findMany({
//     skip: offset,
//     take: postsPerPage,
//   });

//   if (staff.length > 0) {
//     res = { message: "SUCCESS", staff, totalStaffCount };
//   } else {
//     res = { message: "FAIL" };
//   }
//   return NextResponse.json(res);
// }
