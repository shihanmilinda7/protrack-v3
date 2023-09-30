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
import Link from "next/link";
import { ProjectTable } from "../components/project/project-table";
import { ProjectObjectTypes } from "../components/project/types";
import { Pagination } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

export default function Project() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const userRole = session?.user?.role;
  const staffid = session?.user.staffid;
  //define state variables
  // const [reloadTable, setReloadTable] = useState(false);
  const [projectRowObjects, setProjectRowObjects] = useState<
    ProjectObjectTypes[]
  >([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalProjectCount, setTotalProjectCount] = useState(1);

  //re render page
  // const toggleReloadTable = () => {
  //   setReloadTable((prv: boolean) => !prv)
  // }

  const getAllProjectDetails = async () => {
    // declare the data fetching function
    const fetchData = async () => {
      const reponse = await fetch(
        "api/project?page-number=" + currentPage + "&search-project-name=-1"
      );
      const res = await reponse.json();
      console.log(res);
      setProjectRowObjects(res.project);
      const tmpCount = Math.ceil(res.totalProjectCount / 10);
      setTotalProjectCount(tmpCount);
    };

    // call the function
    fetchData().catch(console.error);
  };

  const getAssignedProjectDetails = async () => {
    const fetchData = async () => {
      const reponse = await fetch(
        "api/time-allocation/get-assign-projects?page-number=1&staffid=" +
          staffid +
          "&columns=all"
      );
      const res = await reponse.json();
      setProjectRowObjects(res.project);
      setTotalProjectCount(res.totalProjectCount);
    };
    // call the function
    if (staffid) {
      fetchData().catch(console.error);
    }
  };
  useEffect(() => {
    if (userRole != "User") {
      getAllProjectDetails();
    } else {
      getAssignedProjectDetails();
    }
  }, [currentPage]);

  const createNewPrj = async () => {
    router.push("project/new-project");
  };

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
    <WithRole roles={["Admin", "Manager", "User"]}>
      <div>
        <Navbar />
        <div className="flex items-center justify-center p-4">
          <span className="text-3xl font-semibold leading-none text-gray-900 select-none pt-2 mr-auto">
            <span className="text-indigo-600">Project</span>
          </span>

          {userRole == "User" ? null : (
            <Button color="primary" onClick={createNewPrj}>
              Create New
            </Button>
          )}
        </div>
        <div>
          {projectRowObjects && (
            <ProjectTable projectRowObjects={projectRowObjects} />
          )}
        </div>
        <div className="md:px-2 mt-3 flex item-center justify-center">
          <Pagination
            isCompact
            showControls
            total={totalProjectCount}
            page={currentPage}
            onChange={setCurrentPage}
          />
        </div>
      </div>
    </WithRole>
  );
}
