"use client";

import { setSearchDesignation, setSearchStaffName } from "@/store/searchSlice";
import { useEffect, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const PrjAssignStaffTable = ({
  staffTableClickEvent,
  staffRowObjects,
  tablePagination,
}: {
  staffTableClickEvent: (staffid: number, staffname: string) => void;
  staffRowObjects: any[];
  tablePagination: number;
}) => {
  const tableHeads = ["#", "Staff name", "Designation", ""];
  const [selRow, setSetRow] = useState<any>();
  const [searchStaffname1, setSearchStaffname1] = useState("");
  const [searchDesignation1, setSearchDesignation1] = useState("");

  // const rSearchStaffName = useSelector((state: any) => state.saveReducer.staffname);
  // const rSearchDesignation = useSelector((state: any) => state.saveReducer.designation);

  //redux state for project assign
  const projectAssignSave = useSelector(
    (state: any) => state.projectAssignSaveReducer.projectAssignSaveState
  );

  const dispatch = useDispatch();

  const searchStaffNameEvent = (nameValue: any) => {
    setSearchStaffname1(nameValue);
    dispatch(setSearchStaffName(nameValue));
  };

  const searchDesignationEvent = (designationValue: any) => {
    setSearchDesignation1(designationValue);
    dispatch(setSearchDesignation(designationValue));
  };

  const selectRow = (
    e: React.MouseEvent<HTMLTableRowElement>,
    staffid: number,
    staffname: string
  ) => {
    if (projectAssignSave) {
      setSetRow(staffid);
      staffTableClickEvent(staffid, staffname);
    } else {
      toast.error("Please Save changes!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  useEffect(() => {}, [selRow]);

  return (
    <div className="md:px-2 py-1 w-full">
      <div className="shadow rounded border-b border-gray-200 w-full">
        {/* {JSON.stringify(staffRowObjects)} */}
        <table className="min-w-full bg-white">
          <thead className="border-b-2 text-black border-blue-400">
            <tr>
              <th className="w-10 text-left py-5 px-1 text-sm font-bold">#</th>
              <th className="w-40 text-left py-5 px-1 text-sm font-bold">
                Staff name
              </th>
              <th className="w-40 text-left py-5 px-1 text-sm font-bold">
                Designation
              </th>
              <th className="w-60 text-left py-5 px-1 text-sm font-bold">
                Assign tasks
              </th>
              <th className="w-60 text-left py-5 px-1 text-sm font-bold">
                Assign projects
              </th>

              {/* {tableHeads.map((head) => (
                <th
                  key={head}
                  className="text-left py-5 px-2 text-sm font-bold"
                >
                  {head}
                </th>
              ))} */}
            </tr>
          </thead>
          <tbody className="text-gray-700">
            <tr className="even:bg-blue-gray-50/50">
              <td className="text-left py-2 px-2">
                <BiSearchAlt2 className="inline-block h-6 w-6 text-indigo-700 hover:text-indigo-500 cursor-pointer" />
              </td>
              <td className="text-left py-2 px-2 font-bold">
                <input
                  type="text"
                  name="searchStaffname"
                  id="searchStaffname"
                  placeholder="Name"
                  autoComplete=""
                  value={searchStaffname1}
                  onChange={(e) => searchStaffNameEvent(e.target.value)}
                  className="w-40 rounded-md border border-[#e0e0e0] bg-white py-3 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </td>
              <td className="text-left py-2 px-2 font-bold">
                <input
                  type="text"
                  name="searchDesignation"
                  id="searchDesignation"
                  placeholder="Designation"
                  autoComplete=""
                  value={searchDesignation1}
                  onChange={(e) => searchDesignationEvent(e.target.value)}
                  className="w-40 rounded-md border border-[#e0e0e0] bg-white py-3 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </td>
            </tr>

            {staffRowObjects.map((tableRow: any, index: number) => (
              <tr
                onClick={(e) =>
                  selectRow(e, tableRow.staffid, tableRow.staffname)
                }
                className={
                  tableRow.staffid != selRow
                    ? "bg-blue-gray-50/5 cursor-pointer transition ease-in hover:bg-gray-300"
                    : "bg-blue-400 cursor-pointer transition ease-in duration-500"
                }
                key={tableRow.staffid}
              >
                <td className="text-left py-3 px-2 font-bold">
                  {(tablePagination - 1) * 10 + (index + 1)}
                </td>
                <td className="text-left py-3 px-2">{tableRow.staffname}</td>
                <td className="text-left py-3 px-2">
                  {tableRow.designation ? tableRow.designation : "No Data"}
                </td>
                <td className="text-left py-3 px-2">
                  <span className="inline-block mr-2 last:mr-0 py-1 px-2 rounded-full bg-green-500 text-xs font-semibold text-white">
                    {tableRow.assigntasks.length}
                  </span>
                  <span>
                    {tableRow.assigntasks
                      ? tableRow.assigntasks
                          .map((task) => task.taskname)
                          .join(", ")
                      : "No Data"}
                  </span>
                </td>
                <td className="text-left py-3 px-2">
                  <span className="inline-block mr-2 last:mr-0 py-1 px-2 rounded-full bg-blue-500 text-xs font-semibold text-white">
                    {tableRow.assignprojects.length}
                  </span>
                  <span>
                    {tableRow.assignprojects
                      ? tableRow.assignprojects
                          .map((task) => task.projectname)
                          .join(", ")
                      : "No Data"}
                  </span>
                </td>

                {/* <td className="text-left py-3 px-2 cursor-pointer hover:text-amber-900 hover: ">
                  <button
                    onClick={(e) =>
                      selectRow(e, index, tableRow.staffid, tableRow.staffname)
                    }
                    className="flex justify-center bg-gradient-to-r from-blue-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-blue-600 text-gray-100 p-2  rounded-lg tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                  >
                    Select
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
