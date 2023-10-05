// "use client";
// import { Provider } from "react-redux";
// import ConfirmAlertbox from "@/app/components/common-comp/confirm-alertbox";
// import DateInputField from "@/app/components/common-comp/input-fields/date-input-fields";
// import SelectBoxInputField from "@/app/components/common-comp/input-fields/select-input-field";
// import TextInputField from "@/app/components/common-comp/input-fields/text-input-fields";
// import Pagination from "@/app/components/common-comp/pagination";
// import { WithRole } from "@/app/components/common-comp/withRole";
// import Navbar from "@/app/components/navbar/navbar";
// import NewProjectTask from "@/app/components/project/project-task-addnew";
// import { ProjectTaskTable } from "@/app/components/project/project-task-table";
// import { TaskObjectTypes } from "@/app/components/project/types";
// import Spinner from "@/app/dashboard/loading";
// import { inputFieldValidation } from "@/app/utils/utils";
// import { useSession } from "next-auth/react";
// import { useRouter, useSearchParams } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { PrjAssignStaffTable } from "../components/project-assign/staff-table";
// import { PrjAssignProjectTable } from "../components/project-assign/project-table";
// import { PrjAssignTaskTable } from "../components/project-assign/task-table";
// import store from "@/store/store";
// import { useSelector, useDispatch } from "react-redux";
// import { PrjAssignTaskTimeAllocTable } from "../components/time-allocation/task-table";
// import { setDate } from "@/store/timeAllocDateSlice";
// import CheckBoxInputField from "../components/common-comp/input-fields/checkbox-input-fields";

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
//   const { data: session, status } = useSession();

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
//   const tmpUser = session?.user;

//   //redux
//   const date = useSelector((state: any) => state.timeAllocDateReducer.date);

//   const dispatch = useDispatch();

//   const [staffid, setStaffid] = useState<any>(tmpUser?.staffid);

//   const [projectRowObjects, setProjectRowObjects] = useState<any[]>([]);
//   const [projectid, setProjectid] = useState<any>();
//   const [projectname, setProjectname] = useState("Select from below...");
//   const [projectTablePage, setProjectTablePage] = useState(1);
//   const [totalProjectCount, setTotalProjectCount] = useState(1);

//   const nextProjectTabel = () => {
//     if (Math.ceil(totalProjectCount / 10) > projectTablePage) {
//       setProjectTablePage((prv: number) => prv + 1);
//     }
//   };

//   const prvProjectTabel = () => {
//     if (projectTablePage > 1) {
//       setProjectTablePage((prv: number) => prv - 1);
//     }
//   };

//   const [taskRowObjects, setTaskRowObjects] = useState<any[]>([]);
//   const [taskHeaderObject, setTaskHeaderObject] = useState<any>();
//   const [taskTablePage, setTaskTablePage] = useState(1);
//   const [totalTaskCount, setTotalTaskCount] = useState(1);

//   const [saveFlag, setSaveFlag] = useState(false);
//   // const [onactive, setOnactive] = useState(false);

//   const toggleSaveFlag = () => {
//     setSaveFlag((prv: boolean) => !prv);
//   };

//   const nextTaskTabel = () => {
//     if (Math.ceil(totalTaskCount / 10) > taskTablePage) {
//       setTaskTablePage((prv: number) => prv + 1);
//     }
//   };

//   const prvTaskTabel = () => {
//     if (taskTablePage > 1) {
//       setTaskTablePage((prv: number) => prv - 1);
//     }
//   };

//   const getAssignTasks = async (projectid?: number, staffid?: number) => {
//     const reponse = await fetch(
//       pathname +
//         "/api/time-allocation/get-assign-tasks?page-number=" +
//         projectTablePage +
//         "&staffid=" +
//         staffid +
//         "&projectid=" +
//         projectid
//     );
//     const res = await reponse.json();
//     setTotalTaskCount(res.totalAssignProjectTasksCount);
//     return res.projectTasks;
//   };

//   const getTimeAllocData = async (projectid?: number, staffid?: number) => {
//     console.log("projectID", projectid);
//     console.log("staffid", staffid);
//     const reponse = await fetch(
//       pathname +
//         "/api/time-allocation?page-number=" +
//         taskTablePage +
//         "&staffid=" +
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
//     // const { headerData, detailData } = await getTimeAllocData(
//     //   projectid,
//     //   staffid
//     // );
//     // if (headerData.length == 0) {
//     //   const assignTasks = await getAssignTasks(projectid, staffid);

//     //   setTaskHeaderObject("");
//     //   setTaskRowObjects(assignTasks);
//     // } else {
//     //   setTaskHeaderObject(headerData);
//     //   setTaskRowObjects(detailData);
//     // }
//   };

//   //for project table pagination update
//   useEffect(() => {
//     // console.log("date",date,)
//     if (projectid) {
//       // console.log("projectid", projectid);
//       createTaskRowObject(projectid);
//     }
//   }, [saveFlag, date]);

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
//     fetchData().catch(console.error);
//   }, [projectTablePage]);

//   //for task table pagination update                                                 TO DOOOOOOOOO
//   // useEffect(() => {
//   //   if (projectid) {
//   //     if (!save) {
//   //       toast.error("Please Save changes!", {
//   //         position: "top-right",
//   //         autoClose: 1000,
//   //         hideProgressBar: false,
//   //         closeOnClick: true,
//   //         pauseOnHover: true,
//   //         draggable: true,
//   //         progress: undefined,
//   //         theme: "colored",
//   //       });
//   //     } else {
//   //       const assignTasks: any = getAssignTasks(projectid, staffid);
//   //       const projectTasks = getProjectTasks(projectid);
//   //       createTaskRowObj(assignTasks, projectTasks);
//   //     }
//   //   }
//   // }, [taskTablePage, staffid, saveFlag]);

//   return (
//     // <WithRole roles={['admin']}>
//     <div>
//       <Navbar />

//       <div className="flex">
//         <div className="flex flex-col w-1/3">
//           <div className="flex items-center justify-center p-4">
//             <h1 className="text-2xl text-blue-600 mr-auto">
//               Daily Achievements
//             </h1>
//           </div>
//           <div className="flex flex-row">
//             {/* <div className="w-full px-3 sm:w-1/5">
//               <CheckBoxInputField
//                 label="Leave"
//                 id="projectdescription"
//                 name="projectdescription"
//                 autoComplete=""
//                 placeholder=""
//                 value={onactive}
//                 onChange={(e) => setOnactive(e.target.checked)}
//               />
//             </div> */}
//           </div>
//           {/* <div className={`p-4 ${onactive ? "" : "pointer-events-none"}`}> */}
//             <h1 className="text-2xl text-blue-400 mr-auto">
//               Project name - {projectname}
//             </h1>
//             <div>
//               {projectRowObjects && (
//                 <PrjAssignProjectTable
//                   projectTableClickEvent={projectTableClickEvent}
//                   projectRowObjects={projectRowObjects}
//                   tablePagination={projectTablePage}
//                   staffid={staffid}
//                   search = {false}
//                 />
//               )}
//               <Pagination
//                 tablePagination={projectTablePage}
//                 totalProjectCount={totalProjectCount}
//                 prvTabel={prvProjectTabel}
//                 nextTabel={nextProjectTabel}
//               />
//             </div>
//           {/* </div> */}
//         </div>
//         {/* <div
//           className={`p-4 flex flex-col w-2/3 ${
//             onactive ? "" : "pointer-events-none"
//           }`}
//         > */}
//           {/* <div className="flex flex-col w-2/3"> */}
//           <div className="p-4">
//             {taskRowObjects && (
//               <PrjAssignTaskTimeAllocTable
//                 taskHeaderObject={taskHeaderObject}
//                 staffid={staffid}
//                 projectid={projectid}
//                 taskRowObjectsIn={taskRowObjects}
//                 tablePagination={taskTablePage}
//                 toggleSaveFlag={toggleSaveFlag}
//               />
//             )}
//             {/* <Pagination
//               tablePagination={taskTablePage}
//               totalProjectCount={totalTaskCount}
//               prvTabel={prvTaskTabel}
//               nextTabel={nextTaskTabel}
//             /> */}
//           </div>
//         {/* </div> */}
//       </div>
//     </div>
//   );
// }

// {
//   /* </Provider> </WithRole>*/
// }
