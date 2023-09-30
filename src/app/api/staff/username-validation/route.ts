import { StaffObj } from "@/app/components/staff/types";
import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  let res;
  const username: string = searchParams.get("username") ?? "";
  const staffid: string  = searchParams.get("staffid") ?? "";
//  console.log("searchParams.get",searchParams.get("staffid"),)
  let user;
// console.log("staffid",Boolean(staffid),staffid,username)
  // staffid ? console.log("true",staffid):console.log("false",staffid)
  if (staffid == "0" ) {
    console.log("call 1",)
    user = await prisma.users.findMany({
      where: {
        username,
      },
    });
  } else {
    console.log("call 2",)

    user = await prisma.users.findMany({
      where: {
        NOT: {
          staffid:parseInt(staffid),
        },
        username,
      },
    });
  }

  if (user.length > 0) {

    res = { message: "EXISTS" }
  } else {
    res = { message: "FAIL" }
  }
  return NextResponse.json(res)
}

export async function POST(request: Request) {
  const { staffname, contracttype, contactno, nic, password, username } = await request.json();
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("hashedPassword", hashedPassword,)
  let message: string = "SUCCESS"
  try {
    await prisma.$transaction(async (tx) => {
      // 1. addnew staff .
      const staff = await tx.staff.create({
        data: {
          staffname,
          contracttype,
          contactno,
          nic,
        },
      });

      // 2. Verify staff enterd
      if (!staff.staffid) {
        throw new Error(`Staff not enterd`)
      }

      const headerId: number = staff.staffid

      // 3. addnew user
      if (staff.staffid) {
        await tx.users.create({
          data: {
            staffid: headerId,
            username,
            password: hashedPassword
          },
        });
      }

      return ""
    })

  } catch (error) {
    console.error('Error adding new staff:', error);
    message = "FAIL"
  }
  return NextResponse.json(message)
}

