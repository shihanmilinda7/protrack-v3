import { StaffObj } from "@/app/components/staff/types";
import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";
import bcrypt, { compare } from "bcryptjs";

export async function PUT(request: Request) {
  const { userId, oldpassword, newpassword } = await request.json();

  let res;
  try {
    await prisma.$transaction(async (tx) => {
      const user = await tx.users.findMany({
        where: {
          userid: userId,
        },
      });
      const passwordsMatch = await compare(oldpassword, user[0].password);
      // console.log("passwordsMatch", passwordsMatch);

      if (passwordsMatch) {
        const hashedPassword = await bcrypt.hash(newpassword, 10);
        const updateUser = await tx.users.updateMany({
          where: { userid: userId },
          data: {
            password: hashedPassword,
          },
        });
        res = { message: "SUCCESS" };
      } else {
        res = { message: "INCORRECT_OLD" };
      }
      // // 1. update staff .
      // const updateStaff = await tx.staff.updateMany({
      //   where: { staffid },
      //   data: {
      //     staffname,
      //     contracttype,
      //     contactno,
      //     nic,
      //     designation,
      //   },
      // });

      // // 2. update user
      // const updateUser = await tx.users.updateMany({
      //   where: { userid },
      //   data: {
      //     username,
      //     // password: hashedPassword,
      //     role,
      //   },
      // });

      return "";
    });
  } catch (error) {
    console.error("Error updating staff:", error);
    res = { message: "FAIL" };
  }
  return NextResponse.json(res);
}
