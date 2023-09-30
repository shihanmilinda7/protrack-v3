// "use client";
// import { Provider } from "react-redux";
// import ConfirmAlertbox from "@/app/components/common-comp/confirm-alertbox";
// import DateInputField from "@/app/components/common-comp/input-fields/date-input-fields";
// import SelectBoxInputField from "@/app/components/common-comp/input-fields/select-input-field";
// import TextInputField from "@/app/components/common-comp/input-fields/text-input-fields";
// import { WithRole } from "@/app/components/common-comp/withRole";
// import Navbar from "@/app/components/navbar/navbar";
// import NewProjectTask from "@/app/components/project/project-task-addnew";
// import { ProjectTaskTable } from "@/app/components/project/project-task-table";
// import { TaskObjectTypes } from "@/app/components/project/types";
// import Spinner from "@/app/dashboard/loading";
// import { inputFieldValidation } from "@/app/utils/utils";
// import { useSession } from "next-auth/react";
// import { useRouter, useSearchParams } from "next/navigation";
// import React, { Suspense, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { PrjAssignStaffTable } from "../components/project-assign/staff-table";
// import { PrjAssignProjectTable } from "../components/project-assign/project-table";
// import { PrjAssignTaskTable } from "../components/project-assign/task-table";
// import store from "@/store/store";
// import { useSelector, useDispatch } from "react-redux";
// import { PrjAssignTaskTimeAllocTable } from "../components/time-allocation/task-table";
// import { setDate } from "@/store/timeAllocDateSlice";
// import CheckBoxInputField from "../components/common-comp/input-fields/checkbox-input-fields";
// import { setStaffId } from "@/store/userDetailSlice";
// import { Pagination } from "@nextui-org/react";

// export default function TimeAllocation() {
//   //get pathname
//   let pathname: string = "";

//   try {
//     pathname = window.location.href;
//   } catch (error) {}

//   if (pathname) {
//     const r: number = pathname.indexOf("/", 9);
//     if (r !== -1) {
//       pathname = pathname.substring(0, r);
//     }
//   }

//   const router = useRouter();
//   const dispatch = useDispatch();

//   const { data: session, status } = useSession();
//   const tmpUser = session?.user;
//   //redux
//   const date = useSelector((state: any) => state.timeAllocDateReducer.date);

//   // const [staffid, setStaffid] = useState<any>(tmpUser?.staffid);
//   dispatch(setStaffId(tmpUser?.staffid));
//   const staffid = useSelector((state: any) => state.userDetailReducer.staffid);
//   // console.log("staffid-redux", tmpUser?.staffid);
//   const [projectRowObjects, setProjectRowObjects] = useState<any[]>([]);
//   const [projectid, setProjectid] = useState<any>();
//   const [projectname, setProjectname] = useState("Select from below...");
//   const [currentProjectPage, setCurrentProjectPage] = useState(1);
//   const [projectPageCount, setProjectPageCount] = useState(1);

//   const [taskRowObjects, setTaskRowObjects] = useState<any[]>([]);
//   const [taskHeaderObject, setTaskHeaderObject] = useState<any>();

//   const [saveFlag, setSaveFlag] = useState(false);
//   // const [onactive, setOnactive] = useState(false);

//   const toggleSaveFlag = () => {
//     setSaveFlag((prv: boolean) => !prv);
//   };

//   const getAssignTasks = async (projectid?: number, staffid?: number) => {
//     const reponse = await fetch(
//       pathname +
//         "/api/time-allocation/get-assign-tasks?page-number=1&staffid=" +
//         staffid +
//         "&projectid=" +
//         projectid
//     );
//     const res = await reponse.json();
//     return res.projectTasks;
//   };

//   const getTimeAllocData = async (projectid?: number, staffid?: number) => {
//     const reponse = await fetch(
//       pathname +
//         "/api/time-allocation?page-number=1&staffid=" +
//         staffid +
//         "&projectid=" +
//         projectid +
//         "&sel-date=" +
//         date
//     );
//     const res = await reponse.json();
//     console.log("res", res);
//     const headerData = res.timeAllocHeaderData;
//     const detailData = res.timeAllocDetailData;
//     return { headerData, detailData };
//   };

//   const createTaskRowObject = async (projectid: number) => {
//     const { headerData, detailData } = await getTimeAllocData(
//       projectid,
//       staffid
//     );
//     if (headerData.length == 0) {
//       const assignTasks = await getAssignTasks(projectid, staffid);

//       setTaskHeaderObject("");
//       const tmpAssignTasks = assignTasks.map((obj: any) => {
//         return {
//           ...obj,
//           time: 0,
//           remark: "",
//         };
//       });
//       setTaskRowObjects(tmpAssignTasks);
//     } else {
//       setTaskHeaderObject(headerData);
//       setTaskRowObjects(detailData);
//     }
//   };

//   const projectTableClickEvent = async (
//     projectid: number,
//     projectname: string
//   ) => {
//     setProjectid(projectid);
//     setProjectname(projectname);
//     await createTaskRowObject(projectid);
//   };

//   //for project table pagination update
//   useEffect(() => {
//     // console.log("date",date,)
//     if (projectid && staffid) {
//       // console.log("projectid", projectid);
//       createTaskRowObject(projectid);
//     }
//   }, [saveFlag, date, staffid]);

//   //for update time allocation data after save
//   useEffect(() => {
//     // declare the data fetching function
//     const fetchData = async () => {
//       const reponse = await fetch(
//         pathname +
//           "/api/time-allocation/get-assign-projects?page-number=" +
//           projectTablePage +
//           "&staffid=" +
//           staffid
//       );
//       const res = await reponse.json();
//       // console.log("res", res);
//       setProjectRowObjects(res.project);
//       setTotalProjectCount(res.totalAssignProjectCount);
//     };
//     // call the function
//     if (staffid) {
//       fetchData().catch(console.error);
//     }
//   }, [projectTablePage, staffid]);

//   if (status === "loading") {
//     return (
//       <div>
//         <Spinner />
//       </div>
//     );
//   }

//   if (!session) {
//     router.push("/"); // Redirect to login page if not authenticated
//     return null;
//   }
//   return (
//     <div>
//       <Navbar />
//       <div className="flex">
//         <div className="flex flex-col w-1/3">
//           <div className="flex items-center justify-center p-4">
//             <span className="text-2xl font-semibold leading-none text-gray-900 select-none pt-2 mr-auto">
//               <span className="text-indigo-600">Daily achievements</span>
//             </span>
//           </div>
//           <div className="flex flex-row"></div>
//           <span className="text-xl leading-none text-gray-900 select-none pt-2 mr-auto pl-4">
//             Project name:
//             <span className="italic text-base text-black-600">
//               {projectname}
//             </span>
//           </span>
//           <div>
//             {projectRowObjects && (
//               <PrjAssignProjectTable
//                 projectTableClickEvent={projectTableClickEvent}
//                 projectRowObjects={projectRowObjects}
//                 tablePagination={projectTablePage}
//                 staffid={staffid}
//               />
//             )}
//             <div className="md:px-2 mt-3 flex item-center justify-center">
//               <Pagination
//                 isCompact
//                 showControls
//                 total={projectPageCount}
//                 page={currentProjectPage}
//                 onChange={setCurrentProjectPage}
//               />
//             </div>
//           </div>
//         </div>
//         <div className="p-4 w-2/3">
//           {taskRowObjects && (
//             <PrjAssignTaskTimeAllocTable
//               taskHeaderObject={taskHeaderObject}
//               staffid={staffid}
//               projectid={projectid}
//               taskRowObjectsIn={taskRowObjects}
//               tablePagination={taskTablePage}
//               toggleSaveFlag={toggleSaveFlag}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
