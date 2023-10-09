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
  const tmpCountry: any = searchParams.get("country");

  try {
    await prisma.$transaction(async (tx) => {
      const headerData = await tx.calanderheaderdata.findMany({
        where: {
          year: tmpYear,
          country: tmpCountry,
        },
      });

      if (headerData.length > 0) {
        const dataSource = await tx.calanderdatasourcedata.findMany({
          where: {
            calanderid: headerData[0].calanderid.toString(),
          },
        });
        res = { message: "SUCCESS", headerData, dataSource };
      } else {
        res = { message: "SUCCESS", headerData: [], dataSource: [] };
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
  const { calanderid, dataSource, year, country } = await request.json();
  let res;
  // console.log(
  //   "calanderid, dataSource, year, country",
  //   calanderid,
  //   dataSource,
  //   year,
  //   country
  // );
  try {
    await prisma.$transaction(async (tx) => {
      const dataExists = await tx.calanderheaderdata.findFirst({
        where: {
          year: year,
          country: country,
        },
      });

      if (dataExists) {
        await tx.calanderdatasourcedata.deleteMany({
          where: { calanderid: calanderid.toString() },
        });

        for (let i = 0; i < dataSource.length; i++) {
          const element = dataSource[i];
          await tx.calanderdatasourcedata.create({
            data: {
              calanderid: calanderid.toString(),
              name: element.name,
              location: element.location,
              startDate: element.startDate,
              endDate: element.endDate,
              color: element.color,
              uniqueKey: element.uniqueKey,
              dateType: element.dateType,
            },
          });
        }
      } else {
        const response = await tx.calanderheaderdata.create({
          data: {
            year: year.toString(),
            country: country,
          },
        });
        if (!response.calanderid) {
          throw new Error(`Calander enterd`);
        }

        const headerId: any = response.calanderid;
        if (headerId) {
          for (let i = 0; i < dataSource.length; i++) {
            const element = dataSource[i];
            await tx.calanderdatasourcedata.create({
              data: {
                calanderid: headerId.toString(),
                name: element.name,
                location: element.location,
                startDate: element.startDate,
                endDate: element.endDate,
                color: element.color,
                uniqueKey: element.uniqueKey,
              },
            });
          }
        }
      }

      // const users = await tx.calanderdatasource.createMany({
      //   data: dataSource,
      // });

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
