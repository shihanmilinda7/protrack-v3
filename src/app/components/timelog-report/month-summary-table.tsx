"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const TimelogSummaryTable = ({
  rowObjectIn,
  tablePagination,
}: {
  rowObjectIn?: any[];
  tablePagination?: number;
}) => {
  const [dateRows, setDateRows] = useState([]);

  useEffect(() => {
    const q = [...rowObjectIn];
    // const modifiedArray = timelogDetailsIn?.map((element) => ({
    //   ...element, // Copy the existing properties
    //   rowstatus: "u", // Add the new property
    // }));
    setDateRows(q);
  }, [rowObjectIn]);

  const totalHours = rowObjectIn?.reduce(
    (total, obj) => total + parseInt(obj.totaltime),
    0
  );
  return (
    <div className="md:px-2 py-2 w-full">
      <div className="flex">
        <span className="text-base font-semibold leading-none text-gray-900 select-none pt-2 ml-auto mr-16 mb-1  overflow-hidden">
          <span className="text-indigo-600">
            Avarage Days - {totalHours / 8} /Days
          </span>
        </span>
        <span className="text-base font-semibold leading-none text-gray-900 select-none pt-2 ml-auto mr-16 mb-1  overflow-hidden">
          <span className="text-indigo-600">
            Total Hours - {totalHours} /Hours
          </span>
        </span>
      </div>
      <div className="shadow rounded border-b border-gray-200 w-full">
        <Table aria-label="Example static collection table">
          <TableHeader>
            {/* <TableColumn className="w-10">#</TableColumn> */}
            <TableColumn className="w-20 border border-blue-500">
              Date
            </TableColumn>
            <TableColumn className="w-20 border border-blue-500">
              Day
            </TableColumn>
            <TableColumn className="w-40 border border-blue-500">
              Status
            </TableColumn>
            <TableColumn className="w-40 border border-blue-500">
              Total hours
            </TableColumn>
            <TableColumn className="w-40 border border-blue-500">
              Worked hours
            </TableColumn>
            <TableColumn className="w-40 border border-blue-500">
              Project
            </TableColumn>
            <TableColumn className="w-40 border border-blue-500">
              Task
            </TableColumn>
            <TableColumn className="w-80 border border-blue-500">
              Activity notes
            </TableColumn>
          </TableHeader>
          <TableBody>
            {dateRows?.map((tableRow: any, index: number) => (
              <TableRow key={tableRow.dayDate} className="">
                {/* <TableCell>{index + 1}</TableCell> */}
                <TableCell className="border border-blue-500">
                  {tableRow.dayDate}
                </TableCell>
                <TableCell className="uppercase border border-blue-500">
                  {tableRow.dayName}
                </TableCell>
                <TableCell className="border border-blue-500">
                  {tableRow.status}
                </TableCell>
                <TableCell className="border border-blue-500 font-semibold bg-gray-300">
                  {tableRow.totaltime}
                </TableCell>
                <TableCell className="border border-blue-500 px-0 p-0 m-0">
                  <div className="flex flex-col">
                    {tableRow.taskdetails &&
                      tableRow.taskdetails?.map((td) => (
                        <ul className="py-1 px-3" key={td.timelogdetailid}>
                          <li>{td.time ? td.time : "0"}</li>
                        </ul>
                      ))}
                  </div>
                </TableCell>
                <TableCell className="border border-blue-500 px-0 p-0 m-0">
                  <div className="flex flex-col">
                    {tableRow.taskdetails &&
                      tableRow.taskdetails?.map((td) => (
                        <ul className="py-1 px-3" key={td.timelogdetailid}>
                          <li>{td.projectname ? td.projectname : "-"}</li>
                        </ul>
                      ))}
                  </div>
                </TableCell>
                <TableCell className="border border-blue-500 px-0 p-0 m-0">
                  {tableRow.taskdetails &&
                    tableRow.taskdetails?.map((td) => (
                      <ul className="py-1 px-3" key={td.timelogdetailid}>
                        <li>{td.taskname ? td.taskname : "-"}</li>
                      </ul>
                    ))}
                </TableCell>
                <TableCell className="border border-blue-500">
                  {tableRow.taskdetails &&
                    tableRow.taskdetails?.map((td) => (
                      <ul className="py-1 px-3" key={td.timelogdetailid}>
                        <li>{td.remark ? td.remark : "-"}</li>
                      </ul>
                    ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
