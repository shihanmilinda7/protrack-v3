"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import StaffAddNew from "../components/staff/addnew";
import { StaffTable } from "../components/staff/table";
import { StaffObj } from "../components/staff/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { WithRole } from "../components/common-comp/withRole";
import Spinner from "../dashboard/loading";
import { Pagination } from "@nextui-org/react";
import { SetupCalendar } from "../components/calendar/calendar";

// import Pagination from "../components/common-comp/pagination";

export default function Calendar() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // const [staffRowData, setStaffRowData] = useState<any[]>([]);

  if (status === "loading") {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (!session) {
    router.push("/"); // Redirect to login page if not authenticated
    return null;
  }
  return (
    <WithRole roles={["Admin", "Manager"]}>
      <div>
        <Navbar />
        <div className="flex items-center justify-center p-4 flex-col">
          {/* <span className="text-2xl font-semibold leading-none text-gray-900 select-none pt-2 mr-auto pl-3">
            <span className="text-indigo-600">Calendar</span>
          </span> */}
          <div className="">
            <SetupCalendar />
          </div>
          <div className="flex gap-2">
            <div className="flex gap-2 justify-center items-center">
              <div className="bg-[#ffff00] h-4 w-4"></div>
              <span className="">Public Holiday</span>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <div className="bg-[#ffc100] h-4 w-4"></div>
              <span className="">Anniversary</span>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <div className="bg-[#a2ff00] h-4 w-4"></div>
              <span className="">Special Occasion</span>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <div className="bg-[#0092ff] h-4 w-4"></div>
              <span className="">Seasonal</span>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <div className="bg-[#5aff54] h-4 w-4"></div>
              <span className="">Quarterly</span>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <div className="bg-[#007aff] h-4 w-4"></div>
              <span className="">Month-End</span>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <div className="bg-[#00ffbc] h-4 w-4"></div>
              <span className="">Year-End/Year's Eve</span>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <div className="bg-[#ff7300] h-4 w-4"></div>
              <span className="">Historical</span>
            </div>
          </div>
        </div>
      </div>
    </WithRole>
  );
}
