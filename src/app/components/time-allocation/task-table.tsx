"use client";

import { Suspense, useEffect, useState } from "react";
import { PrjAssignTaskTimeAllocTableRow } from "./task-table-row";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setDate } from "@/store/timeAllocDateSlice";
import ConfirmAlertbox from "../common-comp/confirm-alertbox";
import { useRouter } from "next/navigation";
import {
  setTimeAllocationSaved,
  setTimeAllocationUnsaved,
} from "@/store/timeAllocationSaveSlice";
import NextDateInputField from "../common-comp/nextui-input-fields/next-date-input-fields";
import NextAreaTextInputField from "../common-comp/nextui-input-fields/next-textarea-input-fields";
import { Button } from "@nextui-org/react";

export const PrjAssignTaskTimeAllocTable = ({
  taskHeaderObject,
  staffid,
  projectid,
  taskRowObjectsIn,
  tablePagination,
  toggleSaveFlag,
}: {
  taskHeaderObject: any;
  staffid: number;
  projectid: number;
  taskRowObjectsIn: any[];
  tablePagination: number;
  toggleSaveFlag: () => void;
}) => {
  let pathname: string = "";
  const router = useRouter();

  try {
    pathname = window.location.href;
  } catch (error) {}

  if (pathname) {
    const r: number = pathname.indexOf("/", 9);
    if (r !== -1) {
      pathname = pathname.substring(0, r);
    }
  }

  const tableHeads = [
    "#",
    "Task name",
    "Start",
    "End",
    "Time (Hours)",
    "Remark",
  ];

  let tmpRemark = "";
  let timeAllocHeaderId: any;
  if (taskHeaderObject) {
    tmpRemark = taskHeaderObject[0].remark;
    timeAllocHeaderId = taskHeaderObject[0].timeallocid;
  }
  console.log("tmpRemark", tmpRemark);
  const [taskRows, setTaskRows] = useState(taskRowObjectsIn);
  const [saveBtnActive, setSaveBtnActive] = useState(false);
  const [date, setDate1] = useState(new Date().toJSON().slice(0, 10));
  const [remark, setRemark] = useState(tmpRemark);
  const [onactive, setOnactive] = useState(true);

  // console.log("taskHeaderObject", taskHeaderObject);
  //redux
  const timeAllocationSave = useSelector(
    (state: any) => state.timeAllocationSaveReducer.timeAllocationSaveState
  );
  const reduxDate = useSelector(
    (state: any) => state.timeAllocDateReducer.date
  );

  // const reduxDate = useSelector(
  //   (state: any) => state.timeAllocDateReducer.date
  // );

  const dispatch = useDispatch();

  useEffect(() => {
    const q = [...taskRowObjectsIn];
    setTaskRows(q);
    console.log("q", q);
    setRemark(tmpRemark ?? "");
  }, [taskRowObjectsIn]);

  useEffect(() => {
    if (!onactive) {
      console.log("not active");
      toggleSaveFlag();
    } else {
      toggleSaveFlag();
    }
  }, [onactive]);

  useEffect(() => {
    setDate1(reduxDate);
  }, [reduxDate]);

  const updateTableRows = (newVal: any) => {
    const updatedArray = taskRows.map((r) =>
      r.taskid === newVal.taskid ? newVal : r
    );
    setTaskRows(updatedArray);
    setSaveBtnActive(true);
  };

  const addnew = async () => {
    try {
      const response = await fetch(pathname + "/api/time-allocation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          staffid,
          projectid,
          remark,
          date,
          taskRows,
        }),
      });
      const jsonResponse = await response.json();
      if (jsonResponse == "SUCCESS") {
        toast.success("Saved Successfully!", {
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
      dispatch(setTimeAllocationSaved());
      toggleSaveFlag();
      setSaveBtnActive(false);
    } catch (error) {
      toast.error(`${error}`, {
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

  const update = async () => {
    try {
      const response = await fetch(pathname + "/api/time-allocation", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          timeAllocHeaderId,
          remark,
          taskRows,
        }),
      });
      const jsonResponse = await response.json();
      if (jsonResponse == "SUCCESS") {
        toast.success("Updated Successfully!", {
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
      dispatch(setTimeAllocationSaved());
      toggleSaveFlag();
      setSaveBtnActive(false);
    } catch (error) {
      toast.error(`${error}`, {
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

  const saveEvent = async () => {
    // dispatch(setTimeAllocationSaved());
    if (timeAllocHeaderId) {
      await update();
    } else {
      await addnew();
    }
  };

  const dateInputEvent = (dateValue: string) => {
    if (timeAllocationSave) {
      setDate1(dateValue);
      dispatch(setDate(dateValue));
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

  const remarkInputEvent = (remarkValue: string) => {
    setRemark(remarkValue);
    setSaveBtnActive(true);
    dispatch(setTimeAllocationUnsaved());
  };

  const cancelEvent = () => {
    dispatch(setTimeAllocationSaved());
    setSaveBtnActive(false);
  };
  return (
    <div className="md:px-2 w-full">
      <div className={saveBtnActive ? "flex pb-3" : "invisible"}>
        <div className="ml-auto">
          <Button color="success" onClick={saveEvent}>
            Save
          </Button>
        </div>
        <div className="ml-3">
          <ConfirmAlertbox
            buttonName="Cancel"
            leftButtonAction={cancelEvent}
            description="Do you want cancel ?"
          />
        </div>
      </div>

      <div className="pb-4 flex w-full ">
        <div className="mr-4">
          <NextDateInputField
            label="Date"
            value={date}
            onChange={(e) => dateInputEvent(e.target.value)}
          />
          {/* <label
            htmlFor="date"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Date
          </label>
          <div className="mt-2 w-full">
            <input
              id="date"
              name="date"
              type="date"
              autoComplete="{autocomplete}"
              className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              value={date}
              onChange={(e) => dateInputEvent(e.target.value)}
            />
          </div> */}
          <div className="flex flex-row"></div>
        </div>
        <div className="ml-4 w-full">
          <NextAreaTextInputField
            label="Remark"
            value={remark}
            onChange={(e) => remarkInputEvent(e.target.value)}
          />
          {/* <label
            htmlFor="remark"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Remark
          </label>
          <div className="mt-2 w-full">
            <textarea
              id="remark"
              name="remark"
              rows={2}
              value={remark}
              onChange={(e) => remarkInputEvent(e.target.value)}
              className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
          </div> */}
        </div>
      </div>
      <div className="pt-4 pb-2">
        <span className="text-xl font-semibold leading-none text-gray-900 select-none pt-2 mr-auto">
          <span className="text-indigo-600">Task list</span>
        </span>
      </div>
      <div className="shadow rounded border-b border-gray-200 w-full">
        <table className="min-w-full bg-white">
          <thead className="border-b-2 text-black border-blue-400">
            <tr>
              {tableHeads.map((head) => (
                <th
                  key={head}
                  className="text-left py-5 px-4 text-sm font-bold"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {taskRows.map((tableRow: any, index: number) => (
              <PrjAssignTaskTimeAllocTableRow
                key={tableRow.taskid}
                index={index}
                tableRowIn={tableRow}
                tablePagination={tablePagination}
                updateTableRows={updateTableRows}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
