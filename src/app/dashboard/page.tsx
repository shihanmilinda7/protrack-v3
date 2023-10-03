"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import { useGlobalContext } from "../globalContext/store";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Spinner from "./loading";
import Link from "next/link";
import Calendar from 'react-calendar';

type TaskDashBoardObj = {
  taskid?: number;
  location?: string;
  clientname?: string;
  categoryid?: number;
  categoryname?: string;
};

export default function Dashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const tmpUser = session?.user;
  const userRole = session?.user?.role;
  //   const [taskData, setTaskData] = useState<TaskDashBoardObj[]>([]);
  //   const [staffid, setStaffid] = useState(tmpUser?.staffid);

  const [staffid, setStaffid] = useState<any>(tmpUser?.staffid);
  const [staffCount, setStaffCount] = useState("");
  const [projectCount, setProjectCount] = useState("");
  const [projectObject, setProjectbject] = useState<any[]>([]);

  const getStaffDetails = async () => {
    const fetchData = async () => {
      const response = await fetch("api/dashboard/get-staff-details");
      const res = await response.json();
      setStaffCount(res.totalStaffCount);
    };
    // call the function
    fetchData().catch(console.error);
  };

  const getProjectDetails = async () => {
    const fetchData = async () => {
      const response = await fetch("api/dashboard/get-project-details");
      const res = await response.json();
      setProjectCount(res.totalProjectCount);
    };
    // call the function
    fetchData().catch(console.error);
  };

  const getAssignedProjectDetails = async () => {
    const fetchData = async () => {
      const reponse = await fetch(
        "api/time-allocation/get-assign-projects?page-number=1&staffid=" +
          staffid
      );
      const res = await reponse.json();
      setProjectbject(res.project);
      //   setTotalProjectCount(res.totalAssignProjectCount);
    };
    // call the function
    if (staffid) {
      fetchData().catch(console.error);
    }
  };
  useEffect(() => {
    getStaffDetails();
    getProjectDetails();
    getAssignedProjectDetails();
  }, [staffid]);
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
    <div className="bg-slate-200">
      <Navbar />
      {/* <h1 className="text-2xl m-4 text-blue-800 font-semibold">Insights at a Glance: Your Project Dashboard</h1> */}
      <h1 className="text-2xl m-4 text-blue-800 font-semibold">
        Elevate productivity today.
      </h1>

      <div className="flex flex-wrap pt-4 z-48">
        {/* <div className="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5 mb-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-3 xl:mb-0 shadow-lg">
            <div className="flex-auto p-4">
              <div className="flex flex-wrap">
                <div className="relative w-full pr-4 max-w-full flex-grow flex-1 flex-col">
                  <h4 className="text-blue-900 text-2xl mb-4">
                    Staff Details
                  </h4>
                </div>
                <div className="relative w-auto pl-4 flex-initial">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-green-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <div
          className={
            userRole == "Admin" || userRole == "Manager"
              ? "mt-4 w-full lg:w-6/12 xl:w-6/12 px-5 mb-4 max-h-48 overflow-auto z-0"
              : "hidden"
          }
        >
          <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-3 xl:mb-0 shadow-lg">
            <div className="flex-auto p-4">
              <div className="flex flex-wrap">
                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                  <h4 className="font-semibold text-blue-900 text-lg text-blueGray-700">
                    Staff Details
                  </h4>
                  <h4 className="font-semibold text-blue-700 text-base text-blueGray-700">
                    Staff Count - {staffCount}
                  </h4>
                </div>
                <div className="relative w-auto pl-4 flex-initial">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-green-500">
                    <i className="fas fa-chart-bar"></i>
                  </div>
                </div>
              </div>
              <p className="text-sm text-blueGray-400 mt-4"></p>
              <Link
                href="/staff"
                className="ml-auto flex justify-center w-1/4 bg-gradient-to-r from-blue-500 to-blue-600 hover:bg-gradient-to-l hover:from-blue-500 hover:to-blue-600 text-gray-100 p-2  rounded-lg tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
              >
                View
              </Link>
            </div>
          </div>
        </div>

        <div
          className={
            userRole == "Admin" || userRole == "Manager"
              ? "mt-4 w-full lg:w-6/12 xl:w-6/12 px-5 mb-4 max-h-48 overflow-auto  z-48"
              : "hidden"
          }
        >
          <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-3 xl:mb-0 shadow-lg ">
            <div className="flex-auto p-4">
              <div className="flex flex-wrap">
                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                  <h4 className="font-semibold text-blue-900 text-lg text-blueGray-700">
                    Project Details
                  </h4>
                  <h4 className="font-semibold text-blue-700 text-base text-blueGray-700">
                    Project Count - {projectCount}
                  </h4>
                </div>
                <div className="relative w-auto pl-4 flex-initial">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-red-500">
                    <i className="fas fa-chart-bar"></i>
                  </div>
                </div>
              </div>
              <p className="text-sm text-blueGray-400 mt-4"></p>
              <Link
                href="/project"
                className="ml-auto flex justify-center w-1/4 bg-gradient-to-r from-blue-500 to-blue-600 hover:bg-gradient-to-l hover:from-blue-500 hover:to-blue-600 text-gray-100 p-2  rounded-lg tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
              >
                View
              </Link>
            </div>
          </div>
        </div>

        <div
          className={
            userRole == "User" || userRole == "Manager"
              ? "mt-4 w-full lg:w-6/12 xl:w-6/12 px-5 mb-4 max-h-48 overflow-auto  z-48"
              : "hidden"
          }
        >
          <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-3 xl:mb-0 shadow-lg">
            <div className="flex-auto p-4">
              <div className="flex flex-wrap">
                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                  <h4 className="font-semibold text-blue-900 text-lg text-blueGray-700">
                    Project Details
                  </h4>
                  <div className="flex flex-col">
                    {projectObject?.map((p, index) => (
                      <div
                        key={p.projectid}
                        className="cursor-pointer border-blue-700 mt-1"
                      >
                        {/* <h5 className="font-semibold text-base text-blueGray-700">
                          {index + 1}. {p.projectname}
                        </h5> */}
                        <Link
                          href={"/project/new-project?projectid=" + p.projectid}
                          className="font-semibold text-base text-blueGray-700  hover:font-bold"
                        >
                          {index + 1}. {p.projectname}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative w-auto pl-4 flex-initial">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-pink-500">
                    <i className="fas fa-chart-bar"></i>
                  </div>
                </div>
              </div>
              <p className="text-sm text-blueGray-400 mt-4"></p>
              <Link
                href="/time-allocation"
                className="ml-auto flex justify-center w-1/4 bg-gradient-to-r from-blue-500 to-blue-600 hover:bg-gradient-to-l hover:from-blue-500 hover:to-blue-600 text-gray-100 p-2  rounded-lg tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
              >
                View
              </Link>
            </div>
          </div>
        </div>
        {/* <Calendar /> */}
        {/* <div className="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5">
          <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
            <div className="flex-auto p-4">
              <div className="flex flex-wrap">
                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                  <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                    Main Title
                  </h5>
                  <span className="font-semibold text-xl text-blueGray-700">
                    Sub Title
                  </span>
                </div>
                <div className="relative w-auto pl-4 flex-initial">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-lightBlue-500">
                    <i className="fas fa-users"></i>
                  </div>
                </div>
              </div>
              <p className="text-sm text-blueGray-400 mt-4">
                <span className="text-red-500 mr-2">
                  <i className="fas fa-arrow-down"></i> More...{" "}
                </span>
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
