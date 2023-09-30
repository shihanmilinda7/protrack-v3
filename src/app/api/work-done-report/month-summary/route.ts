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
  console.log("staffid", staffid, startdate, enddate);
  // const postsPerPage = 10; // Number of posts per page
  // const offset = (currentPage - 1) * postsPerPage;

  // const totalStaffCount = await prisma.staff.count();

  // const staff = await prisma.staff.findMany({
  //   skip: offset,
  //   take: postsPerPage,
  // });

  // SELECT t.*,p.projectname,sum(td.time) as totaltime FROM timealloc as t left
  // join projects as p on t.projectid = p.projectid
  // join timeallocdetails as td on t.timeallocid = td.timeallocid
  // WHERE t.date >= '2023-08-01' AND t.date <= '2023-08-31' AND t.staffid=42 group by t.date ORDER BY t.date asc

  // const rawQuery = Prisma.sql`SELECT t.*,p.projectname FROM timealloc as t left join projects as p on t.projectid = p.projectid WHERE t.date >= ${startdate} AND t.date <= ${enddate} AND t.staffid=${staffid} ORDER BY t.date asc`;

  const rawQuery = Prisma.sql`SELECT t.*,p.projectname,sum(td.time) as totaltime FROM timealloc as t left 
  join projects as p on t.projectid = p.projectid 
  join timeallocdetails as td on t.timeallocid = td.timeallocid 
  WHERE t.date >= ${startdate} AND t.date <= ${enddate} AND t.staffid=${parseInt(
    staffid
  )} group by t.date ORDER BY t.date asc`;
  const tmpTimeAllocSummary: any[] = await prisma.$queryRaw(rawQuery);

  if (tmpTimeAllocSummary) {
    let timeAllocSummary;

    if (tmpTimeAllocSummary.length > 0) {
      timeAllocSummary = tmpTimeAllocSummary.map((obj: any) => {
        return {
          ...obj,
          totaltime: obj.totaltime.toString(),
        };
      });
//       const resultRows: any = await prisma.$queryRaw`
//   WITH Result AS (
//     SELECT 
//       t.date,
//       SUM(td.time) AS totaltime
//     FROM 
//       timealloc AS t
//     LEFT JOIN 
//       projects AS p ON t.projectid = p.projectid
//     JOIN 
//       timeallocdetails AS td ON t.timeallocid = td.timeallocid
//     WHERE 
//       t.date >= ${startdate} AND t.date <= ${enddate} AND t.staffid = ${parseInt(
//         staffid
//       )}
//     GROUP BY 
//       t.date
//     ORDER BY 
//       t.date ASC
//   )
//   SELECT 
//     COUNT(*) OVER () AS row_count 
//     FROM Result;
// `;

      // const rowCount = resultRows.length; // This will give you the count of rows in the result set

      res = { message: "SUCCESS", timeAllocSummary, };
    } else {
      timeAllocSummary = tmpTimeAllocSummary;
      res = { message: "SUCCESS", timeAllocSummary };
    }
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
