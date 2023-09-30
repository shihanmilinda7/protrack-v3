"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setMonth, setYear } from "@/store/year-month-pickerSlice";

const YearMonthSelector = () => {
  const year = useSelector((state: any) => state.yearMonthPickerReducer.year);
  const month = useSelector((state: any) => state.yearMonthPickerReducer.month);
  const dispatch = useDispatch();

  const [selectedYear, setSelectedYear] = useState(year);
  const [selectedMonth, setSelectedMonth] = useState(month);
  //   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  //   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(parseInt(event.target.value));
    dispatch(setYear(event.target.value));
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(parseInt(event.target.value));
    dispatch(setMonth(event.target.value));
  };
  const currentYear = new Date().getFullYear();
  // const years = Array.from({ length: 10 }, (_, i) => selectedYear);
  const years = Array.from({ length: 10 }, (_, index) => currentYear - index);

  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  return (
    <div className="">
      <span className="text-base font-semibold leading-none text-gray-900 select-none pt-2 mr-auto">
        <span className="text-indigo-600">Select Year and Month</span>
      </span>
      {/* <h2 className="text-xl text-blue-600">Select Year and Month</h2> */}
      <div className="flex">
        <select
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          value={selectedYear}
          onChange={handleYearChange}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
      </div>

      {/* <p>
        You selected:{" "}
        {months.find((month) => month.value === selectedMonth)?.label}{" "}
        {selectedYear}
      </p> */}
    </div>
  );
};

export default YearMonthSelector;
