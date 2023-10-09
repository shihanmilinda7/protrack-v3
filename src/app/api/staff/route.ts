import { StaffObj } from "@/app/components/staff/types";
import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let res;
  // const selectedCol = searchParams.get('page');
  // console.log("searchParams", searchParams)
  const selectedColumns: string = searchParams.get("columns") ?? "";
  const tmpPageNumber: any = searchParams.get("page-number");
  const currentPage: any = parseInt(tmpPageNumber);
  const postsPerPage = 10; // Number of posts per page
  const offset = (currentPage - 1) * postsPerPage;

  let selectedColumnsObj: Prisma.staffSelect<DefaultArgs> | null = null;
  if (selectedColumns) {
    console.log("selectedColumnsObj", selectedColumnsObj);
    selectedColumnsObj = JSON.parse(selectedColumns);
  }
  console.log("selectedColumnsObj11", selectedColumns);

  try {
    await prisma.$transaction(async (tx) => {
      const rawQuery = Prisma.sql`SELECT s.*,u.userid,u.username,u.password,u.role FROM staff AS s JOIN users AS u ON s.staffid = u.staffid limit ${postsPerPage} offset ${offset}`;
      const staff: StaffObj[] = await tx.$queryRaw(rawQuery);

      // const staff = await prisma.staff.findMany({
      //     select: selectedColumnsObj,
      // });
      const staffCount = await tx.users.count();

      if (staff.length > 0) {
        res = { message: "SUCCESS", staff, staffCount };
      } else {
        res = { message: "FAIL" };
      }
      return "";
    });
  } catch (error) {
    console.error("Error adding new staff:", error);
    res = { message: "FAIL" };
  }

  return NextResponse.json(res);
}

export async function POST(request: Request) {
  const {
    staffname,
    contracttype,
    contactno,
    nic,
    password,
    username,
    role,
    designation,
    country,
  } = await request.json();
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("hashedPassword", hashedPassword);
  let message: string = "SUCCESS";
  console.log("designation", designation);
  try {
    await prisma.$transaction(async (tx) => {
      // 1. addnew staff .
      const staff = await tx.staff.create({
        data: {
          staffname,
          contracttype,
          contactno,
          nic,
          designation,
          country,
        },
      });

      // 2. Verify staff enterd
      if (!staff.staffid) {
        throw new Error(`Staff not enterd`);
      }

      const headerId: number = staff.staffid;

      // 3. addnew user
      if (staff.staffid) {
        await tx.users.create({
          data: {
            staffid: headerId,
            username,
            password: hashedPassword,
            role,
            country,
          },
        });
      }

      return "";
    });
  } catch (error) {
    console.error("Error adding new staff:", error);
    message = "FAIL";
  }
  return NextResponse.json(message);
}

export async function PUT(request: Request) {
  const {
    staffid,
    staffname,
    contracttype,
    contactno,
    nic,
    password,
    username,
    userid,
    role,
    designation,
    country,
  } = await request.json();
  const hashedPassword = await bcrypt.hash(password, 10);

  let message: string = "SUCCESS";
  try {
    await prisma.$transaction(async (tx) => {
      // 1. update staff .
      const updateStaff = await tx.staff.updateMany({
        where: { staffid },
        data: {
          staffname,
          contracttype,
          contactno,
          nic,
          designation,
          country,
        },
      });

      // 2. update user
      const updateUser = await tx.users.updateMany({
        where: { userid },
        data: {
          username,
          country,
          // password: hashedPassword,
          role,
        },
      });

      return "";
    });

    // const updateStaff = await tx.staff.updateMany({
    //     where: { staffid },
    //     data: {
    //         staffname,
    //         contracttype,
    //         contactno,
    //         nic,
    //     },
    // });
  } catch (error) {
    console.error("Error updating staff:", error);
    message = "FAIL";
  }
  return NextResponse.json(message);
}

export async function DELETE(request: Request) {
  const { staffid, userid } = await request.json();
  let message: string = "SUCCESS";

  try {
    await prisma.$transaction(async (tx) => {
      // 1. delete staff .
      await tx.staff.delete({
        where: {
          staffid: staffid,
        },
      });

      // 2. delete user
      await tx.users.delete({
        where: {
          userid,
        },
      });

      return "";
    });

    // await prisma.staff.delete({
    //     where: {
    //         staffid: staffid
    //     },
    // })
  } catch (error) {
    console.error("Error deleting staff:", error);
    message = "FAIL";
  }

  return NextResponse.json(message);
}
