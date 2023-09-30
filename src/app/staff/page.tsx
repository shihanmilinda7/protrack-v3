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

// import Pagination from "../components/common-comp/pagination";

export default function Staff() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [staffRowData, setStaffRowData] = useState<any[]>([]);
  const [reloadTable, setReloadTable] = useState(false);

  const [totalStaffCount, setTotalStaffCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleReloadTable = () => {
    setReloadTable((prv: boolean) => !prv);
  };

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const columns = JSON.stringify({ staffid: true });
      const staff_details = await fetch("api/staff?page-number=" + currentPage);
      const res = await staff_details.json();
      setStaffRowData(res.staff);
      const tmpCount = Math.ceil(res.staffCount / 10);
      setTotalStaffCount(tmpCount);
      console.log("res", res);
    };

    // call the function
    fetchData().catch(console.error);
  }, [reloadTable, currentPage]);
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
        <div className="flex items-center justify-center p-4">
          <span className="text-2xl font-semibold leading-none text-gray-900 select-none pt-2 mr-auto">
            <span className="text-indigo-600">Staff</span>
          </span>
          <StaffAddNew
            buttonName="Add New"
            setReloadTable={toggleReloadTable}
          />
        </div>
        <div>
          {staffRowData && (
            <StaffTable
              staffRowData={staffRowData}
              setReloadTable={toggleReloadTable}
            />
          )}
        </div>
        <div className="md:px-2 mt-3 flex item-center justify-center">
          <Pagination
            isCompact
            showControls
            total={totalStaffCount}
            page={currentPage}
            onChange={setCurrentPage}
          />
        </div>
        {/* <Pagination
          tablePagination={tablePagination}
          totalProjectCount={totalStaffCount}
          prvTabel={prvTabel}
          nextTabel={nextTabel}
        /> */}
      </div>
    </WithRole>
  );
}
