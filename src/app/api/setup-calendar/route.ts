import { StaffObj } from "@/app/components/staff/types";
import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let res;

  const tmpYear: any = searchParams.get("year");

  try {
    await prisma.$transaction(async (tx) => {
      const dataSource = await tx.calanderdatasource.findMany({
        where: {
          year: tmpYear,
        },
      });
      if (dataSource.length > 0) {
        res = { message: "SUCCESS", dataSource };
      } else {
        res = { message: "SUCCESS", dataSource: [] };
      }
      return "";
    });
  } catch (error) {
    console.error("Error getting calander data source:", error);
    res = { message: "FAIL" };
  }

  return NextResponse.json(res);
}

export async function POST(request: Request) {
  const { dataSource, year } = await request.json();
  let res;
  try {
    await prisma.$transaction(async (tx) => {
      const dataExists = await tx.calanderdatasource.findFirst({
        where: {
          year: year,
        },
      });

      if (dataExists) {
        await tx.calanderdatasource.deleteMany({
          where: { year },
        });
      }
      // const users = await tx.calanderdatasource.createMany({
      //   data: dataSource,
      // });

      for (let i = 0; i < dataSource.length; i++) {
        const element = dataSource[i];
        await tx.calanderdatasource.create({
          data: {
            name: element.name,
            location: element.location,
            startDate: element.startDate,
            endDate: element.endDate,
            color: element.color,
            uniqueKey: element.uniqueKey,
            year: year.toString(),
          },
        });
      }

      res = { message: "SUCCESS" };
      return "";
    });
  } catch (error) {
    console.error("Error adding new calander:", error);
    res = { message: "FAIL" };
  }
  return NextResponse.json(res);
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
        },
      });

      // 2. update user
      const updateUser = await tx.users.updateMany({
        where: { userid },
        data: {
          username,
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
