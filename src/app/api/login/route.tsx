import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { username, password } = await request.json();

    console.log("username",username,)
    //  const staff = await prisma.users.create({
    //     data :{
    //         staffid: 1,
    //         username: 'admin',
    //         password: 'admin',
    //       }
    // });



    let res;
    // const users = await prisma.users.findMany({
    //     where: {
    //         username: {
    //             contains: username,
    //             // contains: "admin@sds.com", 
    //         },
    //         password: {
    //             contains: password,
    //             // contains: "admin", 
    //         },
    //     },
    // });
    // if (users.length > 0) {
    //     res = { message: "SUCCESS", data :users }
    // } else {
    //     res = { message: "FAIL" }
    // }
    return NextResponse.json(res)
}
