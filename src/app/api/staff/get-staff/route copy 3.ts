// import { StaffObj } from "@/app/components/staff/types";
// import { prisma } from "@/db";
// import { Prisma } from "@prisma/client";
// import { DefaultArgs } from "@prisma/client/runtime/library";
// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   let res;

//   const tmpPageNumber: any = searchParams.get("page-number");
//   const tmpSearchStaffName: any = searchParams.get("search-staff-name");
//   const tmpSearchDesignation: any = searchParams.get("search-designation");
//   const projectid: any = searchParams.get("projectid");
//   const currentPage: any = parseInt(tmpPageNumber);

//   const postsPerPage = 10; // Number of posts per page
//   const offset = (currentPage - 1) * postsPerPage;

//   let totalStaffCount: any;
//   let staff: any;
//   let searchStaffName: any;
//   let searchDesignation: any;

//   // console.log("tmpSearchStaffName", searchParams);
//   // console.log("tmpSearchDesignation", tmpSearchDesignation);

//   // console.log("tmpPageNumber", tmpPageNumber);
//   try {
//     if (tmpSearchStaffName == "-1") {
//       searchStaffName = "";
//     } else {
//       searchStaffName = tmpSearchStaffName;
//     }

//     if (tmpSearchDesignation == "-1") {
//       searchDesignation = "";
//     } else {
//       searchDesignation = tmpSearchDesignation;
//     }
//     // console.log("searchStaffName",searchStaffName,)
//     await prisma.$transaction(async (tx) => {
//       totalStaffCount = await tx.staff.count({
//         where: {
//           staffname: {
//             contains: searchStaffName,
//           },
//           designation: {
//             contains: searchDesignation,
//           },
//         },
//       });

//       staff = await tx.staff.findMany({
//         where: {
//           staffname: {
//             contains: searchStaffName,
//           },
//           designation: {
//             contains: searchDesignation,
//           },
//         },
//         skip: offset,
//         take: postsPerPage,
//       });

//       // console.log(staff);
//       if (staff.length > 0) {
//         for (let index = 0; index < staff.length; index++) {
//           const element = staff[index];
//           const rawQuery = Prisma.sql`select pt.taskname from projecttasksassigns as pta join projecttasks as pt on pta.taskid = pt.taskid where pta.projectid = ${projectid} and pta.staffid = ${element.staffid}`;
//           const projectTasks: any = await tx.$queryRaw(rawQuery);
//           element["assigntasks"] = projectTasks;
//         }
//         // console.log(staff);
//         res = { message: "SUCCESS", staff, totalStaffCount };
//       } else {
//         res = { message: "FAIL", staff: [], totalStaffCount: 1 };
//       }
//       return "";
//     });
//   } catch (error) {
//     console.log("error", error);
//     res = { message: "FAIL" };
//   }

//   // if (searchStaffName) {
//   //   console.log("searchStaffName", searchStaffName);
//   //   totalStaffCount = await prisma.staff.count({
//   //     where: {
//   //       staffname: {
//   //         contains: searchStaffName,
//   //       },
//   //     },
//   //   });

//   //   staff = await prisma.staff.findMany({
//   //     where: {
//   //       staffname: {
//   //         contains: "",
//   //       },
//   //     },
//   //     skip: offset,
//   //     take: postsPerPage,
//   //   });
//   // } else {
//   //   totalStaffCount = await prisma.staff.count();

//   //   staff = await prisma.staff.findMany({
//   //     skip: offset,
//   //     take: postsPerPage,
//   //   });
//   // }

//   // if (staff.length > 0) {
//   //   res = { message: "SUCCESS", staff, totalStaffCount };
//   // } else {
//   //   res = { message: "FAIL" };
//   // }
//   return NextResponse.json(res);
// }
