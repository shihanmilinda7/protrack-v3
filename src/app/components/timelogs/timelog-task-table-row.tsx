"use client";

import React, { useEffect, useState } from "react";
import Select from "react-select";
import NextSelectInputField from "../common-comp/nextui-input-fields/next-select-input-fields";
import { handleSelectChangeEvent } from "../utils";
import { Button, Input } from "@nextui-org/react";
import NextTextInputField from "../common-comp/nextui-input-fields/next-text-input-fields";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { toast } from "react-toastify";

export const TimelogTaskTableRow = ({
  index,
  assignProjects,
  staffid,
  timelogRowIn,
  updateTableRows,
  onAddRow,
  onRemoveRow,
  timelogRowsIn,
}: {
  index: any;
  assignProjects: any[];
  staffid: any;
  timelogRowIn: any;
  updateTableRows: (taskRow: any) => void;
  onAddRow: (taskRow: any) => void;
  onRemoveRow: (taskRow: any, index: any) => void;
  timelogRowsIn: any[];
}) => {
  let pathname: string = "";

  try {
    pathname = window.location.href;
  } catch (error) {}

  if (pathname) {
    const r: number = pathname.indexOf("/", 9);
    if (r !== -1) {
      pathname = pathname.substring(0, r);
    }
  }

  const [tableRow, setTableRow] = useState(timelogRowIn);
  const [tableRows, setTableRows] = useState(timelogRowsIn);
  const [assignTasks, setAssignTasks] = useState([]);


  useEffect(() => {
    const q = { ...timelogRowIn };
    setTableRow(q);

    if (q.projectid) {
      getAssignTasks(q.projectid, staffid);
    }
  }, [timelogRowIn]);

  useEffect(() => {
    const q = [...timelogRowsIn];
    setTableRows(q);
  }, [timelogRowsIn]);

  const projectSelectEvent = (e) => {
    updateData({
      ...tableRow,
      projectid: e.target.value,
      taskid: "",
    });
    if (e.target.value) {
      getAssignTasks(e.target.value, staffid);
    }
  };

  const taskSelectEvent = (e) => {
    // console.log("timelogRowsIn",timelogRowsIn,)
    const result = tableRows.find(
      (t) =>
        t.taskid === e.target.value || t.taskid === parseInt(e.target.value)
    );
    if (!result) {
      updateData({
        ...tableRow,
        taskid: e.target.value,
      });
    } else {
      toast.error("Task already selected!", {
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

  const getAssignTasks = async (projectid?: number, staffid?: number) => {
    const reponse = await fetch(
      pathname +
        "/api/timelogs/get-assign-tasks?page-number=1&staffid=" +
        staffid +
        "&projectid=" +
        projectid
    );
    const res = await reponse.json();
    const modifiedAssignTasksData = res.projectTasks.map((p) => ({
      value: p.taskid,
      name: p.taskname,
    }));
    setAssignTasks(modifiedAssignTasksData);
  };

  const handleFocus = (event) => {
    event.target.select();
  };

  const updateData = (newObject: any) => {
    // console.log("newObject", newObject);
    setTableRow(newObject);
    updateTableRows(newObject);
  };

  return (
    <tr className={`even:bg-blue-gray-50/50`}>
      <td className="text-left py-1 px-4 font-bold w-5">
        <Button
          isIconOnly
          color="warning"
          variant="light"
          aria-label="Create Item"
        >
          <AiFillPlusCircle
            onClick={() => onAddRow(tableRow)}
            className="inline-block h-6 w-6 text-indigo-700 hover:text-indigo-500 cursor-pointer"
          />
        </Button>
      </td>
      <td className="text-left py-1 px-4 font-bold w-5">{index + 1}</td>
      <td className={`text-left py-1 px-4 w-40`}>
        <NextSelectInputField
          label=""
          value={
            tableRow.projectid
              ? new Set([tableRow.projectid.toString()])
              : new Set([])
          }
          onChange={(e) => projectSelectEvent(e)}
          optionValues={assignProjects}
        />
      </td>
      <td className="text-left py-1 px-4 w-40">
        <NextSelectInputField
          label=""
          value={
            tableRow.taskid
              ? new Set([tableRow.taskid.toString()])
              : new Set([])
          }
          onChange={(e) => taskSelectEvent(e)}
          optionValues={assignTasks}
        />
      </td>
      <td className="text-left py-1 px-4 w-40">
        <div className="flex flex-row ">
          <Input
            type="number"
            variant="flat"
            label=""
            size="lg"
            placeholder="Type here..."
            value={tableRow.time}
            onChange={(e) => updateData({ ...tableRow, time: e.target.value })}
            onFocus={handleFocus}
          />
          {/* <input
            id="time"
            name="time"
            type="number"
            autoComplete=""
            className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            value={tableRow.time}
            onChange={(e) => updateData({ ...tableRow, time: e.target.value })}
            onFocus={handleFocus}
          /> */}
        </div>
      </td>
      <td className="text-left py-1 px-4 w-60">
        <div className="flex flex-row">
          <Input
            type="text"
            variant="flat"
            label=""
            size="lg"
            placeholder="Write here..."
            value={tableRow.remark}
            onChange={(e) =>
              updateData({ ...tableRow, remark: e.target.value })
            }
          />
          {/* <input
            id="remark"
            name="remark"
            type="text"
            autoComplete=""
            placeholder="Write here ... "
            className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          /> */}
        </div>
      </td>
      <td className="text-center py-1 px-4">
        <Button
          isIconOnly
          color="warning"
          variant="light"
          aria-label="Create Item"
        >
          <AiFillMinusCircle
            onClick={() => onRemoveRow(tableRow, index)}
            className="inline-block h-6 w-6 text-red-700 hover:text-red-500 cursor-pointer"
          />
        </Button>
      </td>
    </tr>
  );
};
