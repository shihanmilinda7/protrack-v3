"use client";

import { useSession } from "next-auth/react";
import NewProjectTask from "./project-task-addnew";
import { TaskObjectTypes } from "./types";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";

export const ProjectTaskTable = ({
  taskRowObjects,
  arrayUpdateFuntion,
}: {
  taskRowObjects: TaskObjectTypes[];
  arrayUpdateFuntion: (
    taskObject?: TaskObjectTypes,
    index?: number,
    options?: { deleteTask?: boolean; deltaskid?: number }
  ) => void;
}) => {
  const { data: session, status } = useSession();
  const userRole = session?.user?.role;

  const tableHeads = [
    "#",
    "Task Name",
    "Task Description",
    "Start Date",
    "End Date",
    "Assigned members",
    " ",
  ];
  return (
    <div className="md:px-2 py-2 sm:w-5/5 w-full">
      <div className="shadow rounded border-b border-gray-200 w-full">
        <Table isStriped aria-label="Example static collection table">
          <TableHeader>
            {tableHeads.map((head) => (
              <TableColumn key={head}>{head}</TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {taskRowObjects?.map((tableRow: any, index: number) =>
              tableRow.hasOwnProperty("rowStatus") || tableRow.show == false ? null : (
                <TableRow key={tableRow.taskid} className="">
                  <TableCell className="w-10">{index + 1}</TableCell>
                  <TableCell className="w-40">
                    {tableRow.taskid ? (
                      tableRow.taskname
                    ) : (
                      <span className="inline-block mr-1 last:mr-0 py-1 px-2 rounded-full bg-red-200 text-xs font-semibold text-red-600">
                        {tableRow.taskname}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="w-60">
                    {tableRow.taskdescription}
                  </TableCell>
                  <TableCell className="w-40">{tableRow.startdate}</TableCell>
                  <TableCell className="w-40">{tableRow.enddate}</TableCell>
                  <TableCell className="w-60">
                    <Tooltip
                      color={`${
                        tableRow.assignmembers?.length == "0"
                          ? "danger"
                          : "success"
                      }`}
                      content={`${
                        tableRow.assignmembers
                          ? tableRow.assignmembers.length
                          : "0"
                      } members assigned`}
                    >
                      <span
                        className={`inline-block mr-2 last:mr-0 py-1 px-2 rounded-full ${
                          tableRow.assignmembers?.length == "0"
                            ? "bg-red-500"
                            : "bg-green-500"
                        } text-xs font-semibold text-white`}
                      >
                        {tableRow.assignmembers
                          ? tableRow.assignmembers.length
                          : "0"}
                      </span>
                    </Tooltip>
                    <span>
                      {tableRow.assignmembers
                        ? tableRow.assignmembers
                            .map((m) => m.staffname)
                            .join(", ")
                        : ""}
                    </span>
                  </TableCell>
                  <TableCell className="w-10">
                    <div
                      className={
                        userRole == "User"
                          ? "hidden"
                          : "text-left  px-4 cursor-pointer hover:text-amber-900"
                      }
                    >
                      <NewProjectTask
                        arrayUpdateFuntion={arrayUpdateFuntion}
                        selRowObject={tableRow}
                        index={index}
                        buttonName="Edit Task"
                        delButton={true}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
