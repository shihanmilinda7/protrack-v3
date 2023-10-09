// "use client";

// import { useEffect, useState } from "react";

// import { useRouter } from "next/navigation";

// import { Button, Tooltip } from "@nextui-org/react";
// import { TimelogTaskTableRow } from "./timelog-task-table-row";
// import { AiFillPlusCircle, AiOutlineUndo } from "react-icons/ai";

// export const TimelogTaskTable = ({
//   assignProjects,
//   staffid,
//   dateIn,
//   remark,
//   workingType,
// }: {
//   assignProjects: any[];
//   staffid: any;
//   dateIn?: any;
//   remark?: any;
//   workingType?: any;
// }) => {
//   let pathname: string = "";
//   const router = useRouter();

//   try {
//     pathname = window.location.href;
//   } catch (error) {}

//   if (pathname) {
//     const r: number = pathname.indexOf("/", 9);
//     if (r !== -1) {
//       pathname = pathname.substring(0, r);
//     }
//   }

//   const [timelogRows, setTimelogRows] = useState([]);
//   const [lastRemovedRow, setLastRemovedRow] = useState(null);

//   // useEffect(() => {
//   //   console.log("timelogRows", timelogRows);
//   // }, [timelogRows]);

//   const addRowFromHeader = () => {
//     const newRowId = Math.max(...timelogRows.map((row) => row.rowindex), 0) + 1;
//     const newEmptyRow = {
//       rowstatus: "a",
//       rowindex: newRowId,
//       projectid: "",
//       taskid: "",
//       time: 0,
//       remark: "",
//     };

//     // Update the table data state with the new empty row
//     setTimelogRows([...timelogRows, newEmptyRow]);
//   };

//   const addRow = (rowData: any) => {
//     const newRowId = Math.max(...timelogRows.map((row) => row.rowindex), 0) + 1;
//     const rowIndex = timelogRows.findIndex(
//       (row) => row.rowindex === rowData.rowindex
//     );

//     const newEmptyRow = {
//       rowstatus: "a",
//       rowindex: newRowId,
//       projectid: "",
//       taskid: "",
//       time: 0,
//       remark: "",
//     };
//     const updatedTableData = [...timelogRows];
//     updatedTableData.splice(rowIndex + 1, 0, newEmptyRow);
//     setTimelogRows(updatedTableData);
//   };

//   const removeRow = (rowData, rowIndex) => {
//     const updatedTableData = timelogRows.map((row, index) => {
//       if (index === rowIndex) {
//         if (row.purchaseorderdetailid) {
//           return { ...row, rowstatus: "d" };
//         } else {
//           return { ...row, rowstatus: "r" };
//         }
//       }
//       return row;
//     });

//     // Store the removed row and its original index
//     setLastRemovedRow({ rowData, rowIndex });

//     setTimelogRows(updatedTableData);
//   };

//   const undoRemove = () => {
//     if (!lastRemovedRow) return;

//     const updatedTableData = timelogRows.map((row, index) => {
//       if (index === lastRemovedRow.rowIndex) {
//         if (row.purchaseorderdetailid) {
//           return { ...row, rowstatus: "u" };
//         } else {
//           return { ...row, rowstatus: "a" };
//         }
//       }
//       return row;
//     });

//     setTimelogRows(updatedTableData);

//     // Clear the lastRemovedRow variable
//     setLastRemovedRow(null);
//   };

//   const updateTableRows = (newVal: any) => {
//     // console.log("newVal", newVal);
//     const updatedArray = timelogRows.map((r) =>
//       r.rowindex === newVal.rowindex ? newVal : r
//     );
//     setTimelogRows(updatedArray);
//   };

//   return (
//     <div className="md:px-2">
//       <div className="shadow rounded border-b border-gray-200 w-full">
//         {dateIn} - {remark} - {workingType} - TimelogRows{" "}
//         {JSON.stringify(timelogRows)}
//         <table className="min-w-full bg-white">
//           <thead className="border-b-2 text-black bg-slate-200 border-blue-600 border-lg">
//             <tr>
//               <th className="w-5 text-left py-5 px-4 text-sm font-bold">
//                 <Button
//                   isIconOnly
//                   color="warning"
//                   variant="light"
//                   aria-label="Create Item"
//                 >
//                   <AiFillPlusCircle
//                     onClick={addRowFromHeader}
//                     className="inline-block h-6 w-6 text-indigo-700 hover:text-indigo-500 cursor-pointer"
//                   />
//                 </Button>
//               </th>
//               <th className="w-10 text-left py-5 px-4 text-sm font-bold">#</th>
//               <th className="w-40 text-left py-5 px-4 text-sm font-bold">
//                 Project
//               </th>
//               <th className="w-40 text-left py-5 px-4 text-sm font-bold">
//                 Task
//               </th>
//               <th className="w-40 text-left py-5 px-4 text-sm font-bold">
//                 Time (Hours)
//               </th>
//               <th className="w-60 text-left py-5 px-4 text-sm font-bold">
//                 Notes
//               </th>
//               <th
//                 className={
//                   "text-center py-1 uppercase text-sm font-bold px-1/2"
//                 }
//               >
//                 <div
//                   className={`${
//                     lastRemovedRow ? "" : "pointer-events-none opacity-50"
//                   }`}
//                 >
//                   <Button
//                     isIconOnly
//                     color="warning"
//                     variant="light"
//                     aria-label="Create Item"
//                   >
//                     <AiOutlineUndo
//                       onClick={undoRemove}
//                       className="inline-block h-6 w-6 text-indigo-700 hover:text-indigo-500 cursor-pointer"
//                     />
//                   </Button>
//                 </div>
//               </th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-700">
//             {timelogRows?.length === 0 ? (
//               <tr>
//                 <td className="text-center py-1 px-4" colSpan={8}>
//                   No Data Found
//                 </td>
//               </tr>
//             ) : (
//               timelogRows.map((tableRow: any, index: number) =>
//                 tableRow?.rowstatus == "r" ||
//                 tableRow?.rowstatus == "d" ? null : (
//                   <TimelogTaskTableRow
//                     key={tableRow.rowindex}
//                     index={index}
//                     assignProjects={assignProjects}
//                     staffid={staffid}
//                     timelogRowsIn={tableRow}
//                     updateTableRows={updateTableRows}
//                     onAddRow={addRow}
//                     onRemoveRow={removeRow}
//                   />
//                 )
//               )
//             )}
//           </tbody>
//         </table>
//         <div className="fixed bottom-4 right-5">
//           {/* <Button color="danger">Cancel</Button> */}
//           <Button color="primary" className="ml-2">
//             Save
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };
