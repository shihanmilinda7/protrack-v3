import { StaffObj } from "@/app/components/staff/types";
import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let res;

  const projectid: string = searchParams.get("projectid") ?? "";
  const project = await prisma.projects.findMany({
    where: {
      projectid: parseInt(projectid),
    },
  });
  // console.log("projectid", project);

  if (project.length > 0) {
    const projectTasks = await prisma.projecttasks.findMany({
      where: {
        projectid: parseInt(projectid),
      },
    });
    if (projectTasks.length > 0) {
      for (let index = 0; index < projectTasks.length; index++) {
        const element = projectTasks[index];
        const rawQuery = Prisma.sql`select s.staffname from projecttasksassigns as pta join staff as s on pta.staffid = s.staffid where pta.taskid = ${element.taskid}`;
        const assignMembers: any = await prisma.$queryRaw(rawQuery);
        element["assignmembers"] = assignMembers;
      }
      // console.log(projectTasks);
      res = { message: "SUCCESS", project, projectTasks };
    } else {
      res = { message: "FAIL" };
    }
  } else {
    res = { message: "FAIL" };
  }
  return NextResponse.json(res);
}

export async function POST(request: Request) {
  const {
    projectname,
    projectdescription,
    startdate,
    enddate,
    projectstatus,
    taskRowObjects,
  } = await request.json();
  let message: string = "SUCCESS";
  console.log(
    "sss",
    projectname,
    projectdescription,
    startdate,
    enddate,
    projectstatus,
    taskRowObjects
  );
  try {
    await prisma.$transaction(async (tx) => {
      // 1. addnew project .
      const project = await tx.projects.create({
        data: {
          projectname,
          projectdescription,
          startdate,
          enddate,
          projectstatus,
        },
      });

      // 2. Verify staff enterd
      if (!project.projectid) {
        throw new Error(`Project not enterd`);
      }

      const headerId: number = project.projectid;

      // 3. addnew tasks
      for (let i = 0; i < taskRowObjects.length; i++) {
        const element = taskRowObjects[i];
        await tx.projecttasks.create({
          data: {
            projectid: headerId,
            taskname: element.taskname,
            taskdescription: element.taskdescription,
            startdate: element.startdate,
            enddate: element.startdate,
          },
        });
      }

      return "";
    });
  } catch (error) {
    console.error("Error adding new project", error);
    message = "FAIL";
  }
  return NextResponse.json(message);
}

export async function PUT(request: Request) {
  const {
    projectid,
    projectname,
    projectdescription,
    startdate,
    enddate,
    projectstatus,
    taskRowObjects,
  } = await request.json();
  let message: string = "SUCCESS";
  console.log("projectname", projectname);
  try {
    await prisma.$transaction(async (tx) => {
      // 1. update project.
      const updateProject = await tx.projects.updateMany({
        where: { projectid },
        data: {
          projectname,
          projectdescription,
          startdate,
          enddate,
          projectstatus,
        },
      });

      // 2. update tasks details.
      for (let i = 0; i < taskRowObjects.length; i++) {
        const element = taskRowObjects[i];
        if (element.rowStatus != "deleted") {
          if (element.taskid) {
            const tmpTaskId = element.taskid;
            await tx.projecttasks.updateMany({
              where: { taskid: tmpTaskId },
              data: {
                taskname: element.taskname,
                taskdescription: element.taskdescription,
                startdate: element.startdate,
                enddate: element.startdate,
              },
            });
          } else {
            await tx.projecttasks.create({
              data: {
                projectid: projectid,
                taskname: element.taskname,
                taskdescription: element.taskdescription,
                startdate: element.startdate,
                enddate: element.startdate,
              },
            });
          }
        } else {
          await tx.projecttasks.delete({
            where: {
              taskid: element.taskid,
            },
          });
        }
      }

      return "";
    });
  } catch (error) {
    console.error("Error updating project tasks", error);
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
