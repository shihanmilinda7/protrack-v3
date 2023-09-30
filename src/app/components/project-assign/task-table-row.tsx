"use client";

import { setProjectAssignUnsaved } from "@/store/projectAssignSaveSlice";
// import { setsaved, setunsaved } from "@/store/saveSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const PrjAssignTaskTableRow = ({
  index,
  tableRowIn,
  updateTableRows,
}: {
  index: number;
  tableRowIn: any;
  updateTableRows: (taskRow: any) => void;
}) => {
  const [tableRow, setTableRow] = useState(tableRowIn);
  const dispatch = useDispatch();

  useEffect(() => {
    const q = { ...tableRowIn };
    setTableRow(q);
  }, [tableRowIn]);

  const updateData = (newObject: any) => {
    setTableRow(newObject);
    updateTableRows(newObject);
    dispatch(setProjectAssignUnsaved());
  };

  return (
    <tr className="even:bg-blue-gray-50/50">
      <td className="text-left py-3 px-4 font-bold">{index + 1}</td>
      <td className="text-left py-3 px-4">{tableRow.taskname}</td>
      <td className="text-left py-3 px-4">
        <div className="flex flex-row">
          <input
            type="checkbox"
            id="cb1"
            value="cb1"
            checked={tableRow.selected}
            onChange={(e) =>
              updateData({ ...tableRow, selected: e.target.checked })
            }
            className="form-checkbox h-5 w-5 text-orange-600"
          />
        </div>
      </td>
    </tr>
  );
};
// "appearance-none w-9 focus:outline-none h-5 rounded-full before:inline-block before:rounded-full before:h-4 before:w-4 checked:before:translate-x-full shadow-inner transition-all duration-300 before:ml-0.5 bg-gray-300 checked:bg-blue-300 before:bg-blue-500"
