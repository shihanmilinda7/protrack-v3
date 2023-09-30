// "use client";

// import { setTimeAllocationUnsaved } from "@/store/timeAllocationSaveSlice";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";

// export const PrjAssignTaskTimeAllocTableRow = ({
//   key,
//   index,
//   tableRowIn,
//   tablePagination,
//   updateTableRows,
// }: {
//   key: number;
//   index: number;
//   tableRowIn: any;
//   tablePagination: number;
//   updateTableRows: (taskRow: any) => void;
// }) => {
//   const [tableRow, setTableRow] = useState(tableRowIn);
//   const dispatch = useDispatch();
//   // console.log("save",save,)

//   useEffect(() => {
//     const q = { ...tableRowIn };
//     setTableRow(q);
//   }, [tableRowIn]);

//   const updateData = (newObject: any) => {
//     setTableRow(newObject);
//     updateTableRows(newObject);
//     dispatch(setTimeAllocationUnsaved());
//     // console.log("save",save,)
//   };

//   return (
//     <tr className="even:bg-blue-gray-50/50">
//       <td className="text-left py-3 px-4 font-bold">
//         {(tablePagination - 1) * 10 + (index + 1)}
//       </td>
//       <td className="text-left w-1/6 py-3 px-4">{tableRow.taskname}</td>
//       <td className="text-left w-1/6 py-3 px-4">{tableRow.startdate}</td>
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
//           />
//         </div>
//       </td>
//       <td className="text-left w-2/6 py-3 px-4">
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
//       </td>
//     </tr>
//   );
// };
