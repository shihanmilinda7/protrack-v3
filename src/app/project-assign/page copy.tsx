// "use client";

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

// export default function ProjectAssign() {
//   //get pathname
//   let pathname: string = "";

//   try {
//     pathname = window.location.href;
//     // console.log("pathname1", window.location.href);
//   } catch (error) {}

//   if (pathname) {
//     const r: number = pathname.indexOf("/", 9);
//     if (r !== -1) {
//       pathname = pathname.substring(0, r);
//     }
//     // console.log("pathname", pathname);
//   }

//   const router = useRouter();
//   // const { data: session, status } = useSession();

//   // if (status === 'loading') {
//   //   return <div><Spinner /></div>;
//   // }

//   // if (!session) {
//   //   router.push('/'); // Redirect to login page if not authenticated
//   //   return null;
//   // }

//   const [staffRowObjects, setStaffRowObjects] = useState<any[]>([]);
//   const [staffid, setStaffid] = useState<any>();
//   const [staffname, setStaffname] = useState("Select from below...");
//   const [staffTablePage, setStaffTablePage] = useState(1);
//   const [totalStaffCount, setTotalStaffCount] = useState(1);

//   const nextStaffTabel = () => {
//     if (Math.ceil(totalStaffCount / 10) > staffTablePage) {
//       setStaffTablePage((prv: number) => prv + 1);
//     }
//   };

//   const prvStaffTabel = () => {
//     if (staffTablePage > 1) {
//       setStaffTablePage((prv: number) => prv - 1);
//     }
//   };

//   const staffTableClickEvent = (staffid: number, staffname: string) => {
//     setStaffid(staffid);
//     setStaffname(staffname);
//   };

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
//   const [taskTablePage, setTaskTablePage] = useState(1);
//   const [totalTaskCount, setTotalTaskCount] = useState(1);

//   const nextTaskTabel = () => {
//     if (Math.ceil(totalTaskCount / 10) > taskTablePage) {
//       setProjectTablePage((prv: number) => prv + 1);
//     }
//   };

//   const prvTaskTabel = () => {
//     if (taskTablePage > 1) {
//       setTaskTablePage((prv: number) => prv - 1);
//     }
//   };

//   const getTasks = async (projectId?: number) => {
//     // declare the data fetching function
//     const fetchData = async () => {
//       const reponse = await fetch(
//         pathname +
//           "/api/project/get-task-as-project-pagination?page-number=" +
//           taskTablePage +
//           "&projectid=" +
//           projectId
//       );
//       const res = await reponse.json();
//       setTaskRowObjects(res.projecttasks);
//       setTotalTaskCount(res.totalProjectTaskCount);
//     };
//     // call the function
//     fetchData().catch(console.error);
//   };

//   // const getTasks = async (projectId?: number, staffid?: number) => {
//   //   // declare the data fetching function
//   //   const fetchData = async () => {
//   //     const reponse = await fetch(
//   //       pathname +
//   //         "/api/project/get-task-as-project-pagination?page-number=" +
//   //         taskTablePage +
//   //         "&projectid=" +
//   //         projectId +
//   //         "&staffid=" +
//   //         staffid
//   //     );
//   //     const res = await reponse.json();
//   //     setTaskRowObjects(res.projecttasks);
//   //     setTotalTaskCount(res.totalProjectTaskCount);
//   //   };
//   //   // call the function
//   //   fetchData().catch(console.error);
//   // };

//   const projectTableClickEvent = async (
//     projectid: number,
//     projectname: string
//   ) => {
//     console.log("projectid", projectid);
//     setProjectid(projectid);
//     setProjectname(projectname);
//     await getTasks(projectid);
//   };

//   //for staff table pagination update
//   useEffect(() => {
//     // declare the data fetching function
//     const fetchData = async () => {
//       const reponse = await fetch(
//         pathname + "/api/staff/get-staff?page-number=" + staffTablePage
//       );
//       const res = await reponse.json();
//       setStaffRowObjects(res.staff);
//       setTotalStaffCount(res.totalStaffCount);
//     };
//     // call the function
//     fetchData().catch(console.error);
//   }, [staffTablePage]);

//   //for project table pagination update
//   useEffect(() => {
//     // declare the data fetching function
//     const fetchData = async () => {
//       const reponse = await fetch(
//         pathname + "/api/project?page-number=" + projectTablePage
//       );
//       const res = await reponse.json();
//       console.log("res", res);
//       setProjectRowObjects(res.project);
//       setTotalProjectCount(res.totalProjectCount);
//     };
//     // call the function
//     fetchData().catch(console.error);
//   }, [projectTablePage]);

//   //for task table pagination update                                                 TO DOOOOOOOOO
//   // useEffect(() => {}, [taskTablePage]);

//   //for task table
//   // useEffect(() => {
//   //   getTasks();
//   // }, [projectid, staffid, taskTablePage]);

//   const saveEvent = () => {
//     console.log("staffid", staffid);
//     console.log("projectid", projectid);
//     console.log("taskRowObjects", taskRowObjects);
//     const tmpTaskRowObj = taskRowObjects.map((obj) => {
//       if (obj.hasOwnProperty("selected")) {
//       }
//     });
//   };
//   return (
//     // <WithRole roles={['admin']}>
//     <div>
//       <Navbar />
//       <div className="flex items-center justify-center p-4">
//         <h1 className="text-2xl   uppercase text-blue-600 mr-auto">
//           Project assign
//         </h1>
//         <button
//           onClick={saveEvent}
//           className="flex justify-center bg-gradient-to-r from-blue-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-blue-600 text-gray-100 p-2  rounded-lg tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
//         >
//           Save
//         </button>
//       </div>
//       <div className="flex">
//         <div className="w-1/3 pl-4">
//           <h1 className="text-2xl   text-blue-400 mr-auto">
//             Staff name : {staffname}
//           </h1>
//           <div>
//             {staffRowObjects && (
//               <PrjAssignStaffTable
//                 staffTableClickEvent={staffTableClickEvent}
//                 staffRowObjects={staffRowObjects}
//                 tablePagination={staffTablePage}
//               />
//             )}
//             <Pagination
//               tablePagination={staffTablePage}
//               totalProjectCount={totalStaffCount}
//               prvTabel={prvStaffTabel}
//               nextTabel={nextStaffTabel}
//             />
//           </div>
//         </div>
//         <div className="w-1/3 pl-4">
//           <h1 className="text-2xl   text-blue-400 mr-auto">
//             Project name - {projectname}
//           </h1>
//           <div>
//             {staffRowObjects && (
//               <PrjAssignProjectTable
//                 projectTableClickEvent={projectTableClickEvent}
//                 projectRowObjects={projectRowObjects}
//                 tablePagination={projectTablePage}
//                 staffid={staffid}
//               />
//             )}
//             <Pagination
//               tablePagination={projectTablePage}
//               totalProjectCount={totalProjectCount}
//               prvTabel={prvProjectTabel}
//               nextTabel={nextProjectTabel}
//             />
//           </div>
//         </div>
//         <div className="w-1/3 pl-4">
//           <h1 className="text-2xl   text-blue-400 mr-auto">Task list</h1>
//           <div>
//             {taskRowObjects && (
//               <PrjAssignTaskTable
//                 taskRowObjectsIn={taskRowObjects}
//                 tablePagination={taskTablePage}
//                 setTaskRowObjects={setTaskRowObjects}
//               />
//             )}
//             <Pagination
//               tablePagination={taskTablePage}
//               totalProjectCount={totalTaskCount}
//               prvTabel={prvTaskTabel}
//               nextTabel={nextTaskTabel}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//     // </WithRole>
//   );
// }
