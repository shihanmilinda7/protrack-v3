// "use client";

// import { setSearchProjectName } from "@/store/searchSlice";
// import { usePathname } from "next/navigation";
// import { Suspense, useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";

// export const PrjAssignProjectTable = ({
//   projectTableClickEvent,
//   projectRowObjects,
//   tablePagination,
//   staffid,
//   search,
// }: {
//   projectTableClickEvent: (projectid: number, projectname: string) => void;
//   projectRowObjects: any[];
//   tablePagination: number;
//   staffid?: number;
//   search?: boolean;
// }) => {
//   const tableHeads = ["#", "Project name"];
//   const [selRow, setSetRow] = useState<any>();
//   const [searchProjectname, setSearchProjectname] = useState("");

//   const dispatch = useDispatch();
//   const currentRoute = usePathname();

//   console.log("currentRoute", currentRoute);
//   //redux state for project assign
//   const projectAssignSave = useSelector(
//     (state: any) => state.projectAssignSaveReducer.projectAssignSaveState
//   );

//   //redux state for time allocation
//   const timeAllocationSave = useSelector(
//     (state: any) => state.timeAllocationSaveReducer.timeAllocationSaveState
//   );

//   const searchProjectName = (nameValue: any) => {
//     setSearchProjectname(nameValue);
//     dispatch(setSearchProjectName(nameValue));
//   };

//   const selectRow = (
//     e: React.MouseEvent<HTMLTableRowElement>,
//     projectid: number,
//     projectname: string
//   ) => {
//     if (staffid) {
//       if (projectAssignSave) {
//         setSetRow(projectid);
//         projectTableClickEvent(projectid, projectname);
//       } else {
//         toast.error("Please Save changes!", {
//           position: "top-right",
//           autoClose: 1000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "colored",
//         });
//       }
//     } else {
//       toast.info("No staff selected!", {
//         position: "top-right",
//         autoClose: 1000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//       });
//     }
//   };

//   useEffect(() => {}, [selRow]);

//   return (
//     <div className="md:px-2 py-2 w-full">
//       <div className="shadow rounded border-b border-gray-200 w-full">
//         <table className="min-w-full bg-white">
//           <thead className="border-b-2 text-black border-blue-400">
//             <tr>
//               {tableHeads.map((head) => (
//                 <th
//                   key={head}
//                   className="text-left py-5 px-4 text-sm font-bold"
//                 >
//                   {head}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="text-gray-700">
//             {search ? (
//               <tr className="even:bg-blue-gray-50/50">
//                 <td className="text-left py-2 px-4">$</td>
//                 <td className="text-left py-2 px-4 font-bold">
//                   <input
//                     type="text"
//                     name="searchProjectname"
//                     id="searchProjectname"
//                     placeholder="Name"
//                     autoComplete=""
//                     value={searchProjectname}
//                     onChange={(e) => searchProjectName(e.target.value)}
//                     className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
//                   />
//                 </td>
//               </tr>
//             ) : null}
//             {projectRowObjects.map((tableRow: any, index: number) => (
//               <tr
//                 onClick={(e) =>
//                   selectRow(e, tableRow.projectid, tableRow.projectname)
//                 }
//                 className={
//                   tableRow.projectid != selRow
//                     ? "bg-blue-gray-50/5 cursor-pointer transition ease-in hover:bg-gray-300"
//                     : "bg-blue-400  cursor-pointer transition ease-in duration-500"
//                 }
//                 key={tableRow.projectid}
//               >
//                 <td className="text-left py-3 px-4 font-bold">
//                   {(tablePagination - 1) * 10 + (index + 1)}
//                 </td>
//                 <td className="text-left py-3 px-4">{tableRow.projectname}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };
