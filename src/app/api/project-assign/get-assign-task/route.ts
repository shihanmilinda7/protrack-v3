import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let res: any = { message: "SUCCESS" };

  // const tmpPageNumber: any = searchParams.get("page-number");
  const projectid: any = searchParams.get("projectid");
  const staffid: any = searchParams.get("staffid");

  // const currentPage: any = parseInt(tmpPageNumber);

  // const postsPerPage = 10; // Number of posts per page
  // const offset = (currentPage - 1) * postsPerPage;

  try {
    await prisma.$transaction(async (tx) => {
      //1. check if any project assigns in projectassign table
      const totalAssignTask = await prisma.projecttasksassigns.findMany({
        where: {
          projectid: parseInt(projectid),
          // staffid: parseInt(staffid),
          staffid: 42,
        },
      });
      res = { message: "SUCCESS", totalAssignTask };

      return "";
    });
  } catch (error) {
    console.error("Error adding project assign", error);
    res = { message: "SUCCESS" };
  }

  return NextResponse.json(res);
}
