// "use client"

// import React, { useEffect, useState } from "react";
// import Navbar from "../components/navbar/navbar";
// import { useGlobalContext } from "../globalContext/store";
// import { useRouter } from "next/navigation";
// import { signOut, useSession } from "next-auth/react";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]/route";
// import Spinner from "./loading";

// type TaskDashBoardObj = {
//     taskid?: number;
//     location?: string;
//     clientname?: string;
//     categoryid?: number;
//     categoryname?: string;
// }

// export default function Dashboard() {
//     const router = useRouter();
//     const { data: session, status } = useSession();

//     if (status === 'loading') {
//         return <div><Spinner/></div>;
//     }

//     if (!session) {
//         router.push('/'); // Redirect to login page if not authenticated
//         return null;
//     }
//     const tmpUser = session?.user;

//     const { userId, setUserId, data, setData } = useGlobalContext();
//     const [taskData, setTaskData] = useState<TaskDashBoardObj[]>([]);
//     const [staffid, setStaffid] = useState(tmpUser?.staffid)

//     useEffect(() => {
//         // declare the data fetching function
//         const fetchData = async () => {
//             const columns = JSON.stringify({ staffid: true })
//             const task_details = await fetch(
//                 "api/task/get_task_as_staffid?staffid=" + staffid + "&status=Not%20Completed",
//             );
//             const res = await task_details.json();
//             setTaskData(res.tasks);
//         };

//         // call the function
//         fetchData().catch(console.error);
//     }, []);

//     const taskClickEvent = (task: TaskDashBoardObj) => {
//         router.push("/task/task-submit?taskid=" + task.taskid + "&clientname=" + task.clientname + "&location=" + task.location + "&categoryid=" + task.categoryid + "&categoryname=" + task.categoryname)
//     }

//     return (
//         <div>
//             <Navbar />
//             {/* <h1 className="text-2xl m-4 text-blue-800 font-semibold">Insights at a Glance: Your Project Dashboard</h1> */}
//             <h1 className="text-2xl m-4 text-blue-800 font-semibold">Elevate productivity today.</h1>

//             <div className="flex flex-wrap pt-4">
//                 <div className="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5 mb-4">
//                     <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-3 xl:mb-0 shadow-lg">
//                         <div className="flex-auto p-4">
//                             <div className="flex flex-wrap">
//                                 <div className="relative w-full pr-4 max-w-full flex-grow flex-1 flex-col">
//                                     <h4 className="text-blue-900 uppercase text-2xl mb-4">Assigned Tasks</h4>
//                                     <div className="flex flex-col">
//                                         {taskData?.map((task, index) => (
//                                             <div key={task.taskid} className=" border-b-2 cursor-pointer border-blue-700" onClick={() => taskClickEvent(task)}>
//                                                 <h5 className="font-semibold text-xl text-blueGray-700">{task["clientname"]}</h5>
//                                                 <h5 className="font-semibold text-sm text-blueGray-700">{task["location"]}</h5>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                                 <div className="relative w-auto pl-4 flex-initial">
//                                     <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-green-500">
//                                         <i className="fas fa-chart-bar">{JSON.stringify(taskData?.length)}</i>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5 mb-4">
//                     <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-3 xl:mb-0 shadow-lg">
//                         <div className="flex-auto p-4">
//                             <div className="flex flex-wrap">
//                                 <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
//                                     <span className="font-semibold text-xl text-blueGray-700">Main Title</span>
//                                     <h5 className="text-blueGray-400 uppercase font-bold text-xs">Sub Title</h5>
//                                 </div>
//                                 <div className="relative w-auto pl-4 flex-initial">
//                                     <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-red-500">
//                                         <i className="fas fa-chart-bar"></i>
//                                     </div>
//                                 </div>
//                             </div>
//                             <p className="text-sm text-blueGray-400 mt-4">
//                                 <span className="text-emerald-500 mr-2"><i className="fas fa-arrow-up"></i> More... </span>
//                                 <span className="whitespace-nowrap"> Any.. </span></p>
//                         </div>
//                     </div>
//                 </div>

//                 <div className=" mt-4 w-full lg:w-6/12 xl:w-3/12 px-5">
//                     <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-4 xl:mb-0 shadow-lg">
//                         <div className="flex-auto p-4">
//                             <div className="flex flex-wrap">
//                                 <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
//                                     <h5 className="text-blueGray-400 uppercase font-bold text-xs">Main Title</h5>
//                                     <span className="font-semibold text-xl text-blueGray-700">Sub Title</span>
//                                 </div>
//                                 <div className="relative w-auto pl-4 flex-initial">
//                                     <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-pink-500">
//                                         <i className="fas fa-chart-pie"></i>
//                                     </div>
//                                 </div>
//                             </div>
//                             <p className="text-sm text-blueGray-400 mt-4">
//                                 <span className="text-red-500 mr-2"><i className="fas fa-arrow-down"></i> More... </span>
//                                 <span className="whitespace-nowrap">  Any.. </span></p>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5">
//                     <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
//                         <div className="flex-auto p-4">
//                             <div className="flex flex-wrap">
//                                 <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
//                                     <h5 className="text-blueGray-400 uppercase font-bold text-xs">Main Title</h5>
//                                     <span className="font-semibold text-xl text-blueGray-700">Sub Title</span>
//                                 </div>
//                                 <div className="relative w-auto pl-4 flex-initial">
//                                     <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-lightBlue-500">
//                                         <i className="fas fa-users"></i>
//                                     </div>
//                                 </div>
//                             </div>
//                             <p className="text-sm text-blueGray-400 mt-4">
//                                 <span className="text-red-500 mr-2"><i className="fas fa-arrow-down"></i> More... </span>
//                                 <span className="whitespace-nowrap"> Any... </span></p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
