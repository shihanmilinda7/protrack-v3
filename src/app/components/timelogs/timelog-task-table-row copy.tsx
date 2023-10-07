// "use client";

// import React, { useEffect, useState } from "react";
// import DatalistInput from "react-datalist-input";
// import "react-datalist-input/dist/styles.css";
// import ItemSelector from "../item-selector/selector";

// export const TimelogTaskTableRow = ({
//   index,
//   assignProjects,
//   staffid,
//   timelogRowsIn,
//   updateTableRows,
// }: {
//   index: any;
//   assignProjects: any[];
//   staffid: any;
//   timelogRowsIn: any;
//   updateTableRows: (taskRow: any) => void;
// }) => {
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

//   const [selProject, setSelProject] = useState("");
//   const [selTask, setSelTask] = useState("");

//   const [tableRow, setTableRow] = useState(timelogRowsIn);

//   const [assignTasks, setAssignTasks] = useState([]);

//   useEffect(() => {
//     // console.log("timelogRowsIn", timelogRowsIn);
//     const q = { ...timelogRowsIn };
//     setTableRow(q);
//   }, [timelogRowsIn]);

//   const projectSelectEvent = (selectValue) => {
//     setSelProject(selectValue.value);
//     updateData({
//       ...tableRow,
//       projectid: selectValue.id,
//       projectname: selectValue.value,
//     });
//     getAssignTasks(selectValue.id, staffid);
//   };

//   const taskSelectEvent = (selectValue) => {
//     // console.log("selectValue",selectValue,)
//     setSelTask(selectValue.value);
//     updateData({
//       ...tableRow,
//       taskid: selectValue.id,
//       taskname: selectValue.value,
//     });

//     // setCurrentProject(selectValue.id);
//     // await getAssignTasks(selectValue.id, staffid);
//   };

//   const getAssignTasks = async (projectid?: number, staffid?: number) => {
//     const reponse = await fetch(
//       pathname +
//         "/api/timelogs/get-assign-tasks?page-number=1&staffid=" +
//         staffid +
//         "&projectid=" +
//         projectid
//     );
//     const res = await reponse.json();
//     const modifiedAssignTasksData = res.projectTasks.map((p) => ({
//       id: p.taskid,
//       value: p.taskname,
//     }));
//     setAssignTasks(modifiedAssignTasksData);
//   };

//   const handleFocus = (event) => {
//     event.target.select();
//   };

//   const updateData = (newObject: any) => {
//     // console.log("ssskskskksksks", newObject);
//     setTableRow(newObject);
//     updateTableRows(newObject);
//     // dispatch(setTimeAllocationUnsaved());
//     // console.log("save",save,)
//   };

//   return (
//     <tr className="even:bg-blue-gray-50/50">
//       <td className="text-left py-3 px-4 font-bold w-10">{index + 1}</td>
//       <td className={`text-left py-3 px-4 w-20`}>
//         {/* sel value - {JSON.stringify(tableRow)} */}
//         <DatalistInput
//           placeholder="Select project"
//           label={selProject}
//           onSelect={(item) => projectSelectEvent(item)}
//           // onSelect={(item) => console.log(item.value)}
//           showLabel={false}
//           items={assignProjects}
//           value={tableRow.projectname}
//         />
//       </td>
//       <td className="text-left py-3 px-4 w-20">
//         <DatalistInput
//           placeholder="Select task"
//           label={selTask}
//           onSelect={(item) => taskSelectEvent(item)}
//           // onSelect={(item) => console.log(item.value)}
//           showLabel={false}
//           items={assignTasks}
//           value={tableRow.taskname}
//         />
//       </td>
//       <td className="text-left py-3 px-4 w-20">
//         <div className="flex flex-row ">
//           <input
//             id="time"
//             name="time"
//             type="number"
//             autoComplete=""
//             className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
//             value={tableRow.time}
//             onChange={(e) => updateData({ ...tableRow, time: e.target.value })}
//             onFocus={handleFocus}
//           />
//         </div>
//       </td>
//       <td className="text-left py-3 px-4 w-40">
//         <div className="flex flex-row">
//           <input
//             id="remark"
//             name="remark"
//             type="text"
//             autoComplete=""
//             placeholder="Write here ... "
//             className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
//             value={tableRow.remark}
//             onChange={(e) =>
//               updateData({ ...tableRow, remark: e.target.value })
//             }
//           />
//         </div>
//       </td>
//       {/* <td className="text-left w-1/6 py-3 px-4">{tableRow.startdate}</td>
//       <td className="text-left w-1/6 py-3 px-4">{tableRow.enddate}</td>
//       <td className="text-left py-3 px-4">
//         <div className="flex flex-row ">
//           <input
//             id="time"
//             name="time"
//             type="number"
//             autoComplete=""
//             className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
//             value={tableRow.time}
//             onChange={(e) => updateData({ ...tableRow, time: e.target.value })}
//             onFocus={handleFocus}
//           />
//         </div>
//       </td> */}
//       {/* <td className="text-left w-2/6 py-3 px-4">
//         <div className="flex flex-row">
//           <input
//             id="remark"
//             name="remark"
//             type="text"
//             autoComplete=""
//             className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
//             value={tableRow.remark}
//             onChange={(e) =>
//               updateData({ ...tableRow, remark: e.target.value })
//             }
//           />
//         </div>
//       </td> */}
//     </tr>
//   );
// };
