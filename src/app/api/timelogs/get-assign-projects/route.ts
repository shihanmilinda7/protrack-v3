import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let res;

  const staffid: any = searchParams.get("staffid");

  let project: any;

  const rawQuery = Prisma.sql`select pa.projectid,p.projectname from projectassigns as pa join projects as p on pa.projectid = p.projectid where staffid = ${staffid}`;
  project = await prisma.$queryRaw(rawQuery);

  if (project.length > 0) {
    res = { message: "SUCCESS", project };
  } else {
    res = { message: "FAIL" };
  }
  return NextResponse.json(res);
}
