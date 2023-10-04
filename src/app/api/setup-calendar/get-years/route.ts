import { StaffObj } from "@/app/components/staff/types";
import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let res;

  try {
    await prisma.$transaction(async (tx) => {
      const years = await tx.calanderheaderdata.findMany({
        distinct: ["year"],
        select: {
          year: true,
        },
        orderBy: {
          year: "asc", // 'asc' for ascending, 'desc' for descending
        },
      });

      const countries = await tx.calanderheaderdata.findMany({
        distinct: ["country"],
        select: {
          country: true,
        },
        orderBy: {
          country: "asc", // 'asc' for ascending, 'desc' for descending
        },
      });
      if (years.length > 0) {
        res = { message: "SUCCESS", years, countries };
      } else {
        res = { message: "SUCCESS", years: [], countries: [] };
      }
      return "";
    });
  } catch (error) {
    console.error("Error getting calander data source:", error);
    res = { message: "FAIL" };
  }

  return NextResponse.json(res);
}
