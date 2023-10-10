// "use client";
// import { Provider } from "react-redux";
// import ConfirmAlertbox from "@/app/components/common-comp/confirm-alertbox";
// import DateInputField from "@/app/components/common-comp/input-fields/date-input-fields";
// import SelectBoxInputField from "@/app/components/common-comp/input-fields/select-input-field";
// import TextInputField from "@/app/components/common-comp/input-fields/text-input-fields";
// // import Pagination from "@/app/components/common-comp/pagination";
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
// import YearMonthSelector from "../components/common-comp/year-month-picker";
// import { setsaved } from "@/store/saveSlice";
// import { WorkDoneMonthSummaryTable } from "../components/work-done-report/month-summary-table";
// import { setSearchDesignation, setSearchStaffName } from "@/store/searchSlice";
// import { Pagination } from "@nextui-org/react";

// export default function WorkDoneReport() {
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

//   //redux
//   const year = useSelector((state: any) => state.yearMonthPickerReducer.year);
//   const month = useSelector((state: any) => state.yearMonthPickerReducer.month);
//   const dispatch = useDispatch();

//   const [staffRowObjects, setStaffRowObjects] = useState<any[]>([]);
//   const [staffid, setStaffid] = useState<any>();
//   const [staffname, setStaffname] = useState("Select from below...");
//   const [currentStaffPage, setCurrentStaffPage] = useState(1);
//   const [staffPageCount, setStaffPageCount] = useState(1);

//   const rSearchStaffName = useSelector(
//     (state: any) => state.searchReducer.staffname
//   );
//   const rSearchDesignation = useSelector(
//     (state: any) => state.searchReducer.designation
//   );
//   const [timeAllocSummaryObject, setTimeAllocSummaryObject] = useState<any[]>(
//     []
//   );

//   const staffTableClickEvent = async (staffid: number, staffname: string) => {
//     dispatch(setsaved());
//     setStaffid(staffid);
//     setStaffname(staffname);
//     const startdate: any = year + "-0" + month + "-01";
//     const enddate: any = year + "-0" + month + "-31";
//     await getMonthSummary(staffid, startdate, enddate);
//   };

//   const getMonthSummary = async (
//     staffid?: number,
//     startdate?: string,
//     enddate?: string
//   ) => {
//     const reponse = await fetch(
//       pathname +
//         "/api/work-done-report/month-summary?staffid=" +
//         staffid +
//         "&startdate=" +
//         startdate +
//         "&enddate=" +
//         enddate
//     );
//     const res = await reponse.json();
//     setTimeAllocSummaryObject(res.timeAllocSummary);
//     return res.timeAllocSummary;
//   };

//   //for staff table pagination update
//   useEffect(() => {
//     console.log("tmpSearchStaffName", rSearchStaffName);
//     console.log("tmpSearchDesignation", rSearchDesignation);
//     const tmpStaffName = rSearchStaffName ?? "-1";
//     const tmpDesignation = rSearchDesignation ?? "-1";
//     // declare the data fetching function
//     const fetchData = async () => {
//       const reponse = await fetch(
//         pathname +
//           "/api/staff/get-staff?page-number=" +
//           currentStaffPage +
//           "&search-staff-name=" +
//           (rSearchStaffName ? rSearchStaffName : "-1") +
//           "&search-designation=" +
//           (rSearchDesignation ? rSearchDesignation : "-1")
//       );
//       const res = await reponse.json();
//       setStaffRowObjects(res.staff);
//       const tmpCount = Math.ceil(res.totalStaffCount / 10);
//       setStaffPageCount(tmpCount);
//     };
//     // call the function
//     if (rSearchStaffName != null && rSearchDesignation != null) {
//       fetchData().catch(console.error);
//     }
//   }, [currentStaffPage]);
//   //for staff table pagination update search
//   useEffect(() => {
//     const tmpStaffName = rSearchStaffName ?? "-1";
//     const tmpDesignation = rSearchDesignation ?? "-1";
//     const fetchData = async () => {
//       const reponse = await fetch(
//         pathname +
//           "/api/staff/get-staff?page-number=1&search-staff-name=" +
//           (rSearchStaffName ? rSearchStaffName : "-1") +
//           "&search-designation=" +
//           (rSearchDesignation ? rSearchDesignation : "-1")
//       );
//       const res = await reponse.json();
//       setStaffRowObjects(res.staff);
//       const tmpCount = Math.ceil(res.totalStaffCount / 10);
//       setStaffPageCount(tmpCount);
//       // call the function
//     };
//     if (rSearchStaffName != null && rSearchDesignation != null) {
//       fetchData().catch(console.error);
//     }
//   }, [rSearchStaffName, rSearchDesignation]);
//   //for task table pagination update                                                 TO DOOOOOOOOO
//   useEffect(() => {
//     if (staffid) {
//       // console.log("timeAllocSummaryTablePage",timeAllocSummaryTablePage,)
//       const startdate: any = year + "-0" + month + "-01";
//       const enddate: any = year + "-0" + month + "-31";
//       getMonthSummary(staffid, startdate, enddate);
//     }
//   }, [year, month]);
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
//     <WithRole roles={["Admin", "Manager"]}>
//       <div>
//         <Navbar />
//         <div className="flex items-center justify-center p-4">
//           <div className=" mr-auto">
//             <span className="text-2xl font-semibold leading-none text-gray-900 select-none pt-2 mr-auto">
//               <span className="text-indigo-600">
//                 Monthly achievements summary
//               </span>
//             </span>
//           </div>
//           <div className="mr-4">
//             <YearMonthSelector />
//           </div>
//         </div>

//         <div className="flex">
//           <div className="w-1/3 pl-4">
//             <div className="flex overflow-hidden">
//               <span className="text-xl leading-none text-gray-900 select-none pt-2 mr-auto">
//                 Name:
//                 <span className="italic text-base text-black-600">
//                   {staffname}
//                 </span>
//               </span>
//             </div>
//             <div>
//               {staffRowObjects && (
//                 <PrjAssignStaffTable
//                   staffTableClickEvent={staffTableClickEvent}
//                   staffRowObjects={staffRowObjects}
//                   tablePagination={currentStaffPage}
//                 />
//               )}
//               <div className="md:px-2 mt-3 flex item-center justify-center">
//                 <Pagination
//                   isCompact
//                   showControls
//                   total={staffPageCount}
//                   page={currentStaffPage}
//                   onChange={setCurrentStaffPage}
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="ml-4 w-2/3 pl-4">
//             <div className="flex overflow-hidden">
//               <span className="text-xl font-semibold leading-none text-gray-900 select-none pt-2 mr-auto">
//                 <span className="text-indigo-600">Monthly summary</span>
//               </span>
//               {/* <h1 className="text-2xl text-blue-400 mr-auto overflow-hidden">
//                 Month Summary
//               </h1> */}
//             </div>
//             <div className="h-7">
//               {timeAllocSummaryObject && (
//                 <WorkDoneMonthSummaryTable
//                   rowObjectIn={timeAllocSummaryObject}
//                   // tablePagination={timeAllocSummaryTablePage}
//                 />
//               )}
//               {/* <Pagination
//               tablePagination={timeAllocSummaryTablePage}
//               totalProjectCount={totalTimeAllocSummaryCount}
//               prvTabel={prvTimeAllocSummaryTabel}
//               nextTabel={nextTimeAllocSummaryTabel}
//             /> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </WithRole>
//   );
// }

// {
//   /* </Provider> </WithRole>*/
// }
