"use client";

import { useEffect, useState } from "react";
import { PrjAssignTaskTableRow } from "./task-table-row";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import ConfirmAlertbox from "../common-comp/confirm-alertbox";
import {
  setCurPrjTaskRowOj,
  setProjectAssignSaved,
} from "@/store/projectAssignSaveSlice";

export const PrjAssignTaskTable = () => {
  const dispatch = useDispatch();
  let pathname: string = "";

  try {
    pathname = window.location.href;
    // console.log("pathname1", window.location.href);
  } catch (error) {}

  if (pathname) {
    const r: number = pathname.indexOf("/", 9);
    if (r !== -1) {
      pathname = pathname.substring(0, r);
    }
    // console.log("pathname", pathname);
  }

  const curPrjTaskRowOj = useSelector(
    (state: any) => state.projectAssignSaveReducer.curPrjTaskRowOj
  );

  const tableHeads = ["#", "Task name", "Select"];
  const [taskRows, setTaskRows] = useState([]);

  //redux
  // const updateData = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   newTaskObject: any[]
  // ) => {
  //   setTaskRowObjects(newTaskObject);
  // };

  useEffect(() => {
    const q = [...curPrjTaskRowOj];
    setTaskRows(q);
  }, [curPrjTaskRowOj]);

  const updateTableRows = (newVal: any) => {
    const updatedArray = taskRows.map((r) =>
      r.taskid === newVal.taskid ? newVal : r
    );
    setTaskRows(updatedArray);
    dispatch(setCurPrjTaskRowOj(updatedArray));

    // setTaskRowObjects(updatedArray);
  };

  // const cancelEvent = () => {
  //   dispatch(setProjectAssignSaved());
  //   toggleSaveFlag();
  //   setSaveBtnActive(false);
  // };

  // const saveEvent = async () => {
  //   try {
  //     const response = await fetch(pathname + "/api/project-assign", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         staffid,
  //         projectid,
  //         taskRows,
  //       }),
  //     });
  //     const jsonResponse = await response.json();
  //     if (jsonResponse == "SUCCESS") {
  //       toast.success("Project created successfully!", {
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
  //     dispatch(setProjectAssignSaved());
  //     toggleSaveFlag();
  //     setSaveBtnActive(false);
  //   } catch (error) {
  //     toast.error(`${error}`, {
  //       position: "top-right",
  //       autoClose: 1000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "colored",
  //     });
  //   }
  // };
  return (
    <div className="md:px-2 py-1 w-full">
      {/* <div className="flex mb-2">
        <div className={saveBtnActive ? "ml-auto" : "hidden"}>
          <ConfirmAlertbox
            buttonName="Cancel"
            leftButtonAction={cancelEvent}
            description="Do you want cancel ?"
          />
        </div>
        <button
          onClick={saveEvent}
          className={
            saveBtnActive ? saveBtnStyle + " ml-3" : saveBtnStyle + " invisible"
          }
        >
          Save
        </button>
      </div> */}

      <div className="shadow rounded border-b border-gray-200 w-full">
        <table className="min-w-full bg-white">
          <thead className="border-b-2 text-black border-blue-400">
            <tr>
              {tableHeads.map((head) => (
                <th
                  key={head}
                  className="text-left py-5 px-2 text-sm font-bold"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {taskRows.map((tableRow: any, index: number) =>
              tableRow.taskid ? (
                <PrjAssignTaskTableRow
                  key={tableRow.taskid}
                  index={index}
                  tableRowIn={tableRow}
                  updateTableRows={updateTableRows}
                />
              ) : null
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
