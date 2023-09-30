"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const WorkDoneMonthSummaryTable = ({
  rowObjectIn,
  tablePagination,
}: {
  rowObjectIn: any[];
  tablePagination?: number;
}) => {
  const tableHeads = ["Date", "Total /Hours per day"];

  const totalHours = rowObjectIn.reduce(
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
        {/* <h1 className="text-xl text-blue-400 overflow-hidden ml-auto mr-16">
          Avarage Days - {totalHours / 8} /Days
        </h1> */}
        <span className="text-base font-semibold leading-none text-gray-900 select-none pt-2 ml-auto mr-16 mb-1  overflow-hidden">
          <span className="text-indigo-600">
            Total Hours - {totalHours} /Hours
          </span>
        </span>
        {/* <h1 className="text-xl text-blue-400 overflow-hidden">
          Total Hours - {totalHours} /Hours
        </h1> */}
      </div>
      <div className="shadow rounded border-b border-gray-200 w-full">
        <table className="min-w-full bg-white">
          <thead className="border-b-2 text-black border-blue-400">
            <tr>
              <th key="#" className="text-left py-5 px-4 text-sm font-bold">
                #
              </th>
              {tableHeads.map((head) => (
                <th
                  key={head}
                  className="text-center py-5 px-4 text-sm font-bold"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {rowObjectIn.map((tableRow: any, index: number) => (
              <tr
                className="bg-blue-gray-50/5 cursor-pointer transition ease-in hover:bg-gray-300"
                key={tableRow.timeallocid}
              >
                <td className="text-left py-3 w-2/10 px-4 font-bold">
                  {index + 1}
                </td>
                <td className="text-center py-3 w-2/5 px-4">{tableRow.date}</td>
                <td className="text-center py-3 w-2/5 px-4">
                  {tableRow.totaltime}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
