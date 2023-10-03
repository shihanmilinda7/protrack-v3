"use client";

import React, { useEffect, useState } from "react";
import Calendar from "rc-year-calendar";
import NewCalendarEvent from "./new-event";

export const SetupCalendar = () => {
  const currentYear = new Date().getFullYear();

  const [dataSource, setDataSource] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [id, setId] = useState("");

  const closePopup = () => {
    setIsOpen(false);
  };

  const test = () => {
    console.log("dataSource", dataSource);
  };

  const openPopup = (dateString) => {
    setIsOpen(true);
    setSelectedDate(dateString.date.toLocaleDateString());
    // test();
    // const tmpDate = new Date(dateString.date.toLocaleDateString());
    // const tmpDataSource = [...dataSource];

    // console.log("tmpDate.toISOString()", tmpDate.toISOString());
    // console.log("dataSource[0", await tmpDataSource);
    // const dateFound = dataSource.find(
    //   (d) => d.startDate == tmpDate.toISOString()
    // );
    // if (dateFound) {
    //   console.log("found");
    // } else {
    //   console.log("not found");
    // }

    // console.log("dateString", tmpDate.toISOString());
  };

  const updatDataSource = (newDataSource: any) => {
    const tmpDataSource = [...dataSource];
    tmpDataSource.push(newDataSource);
    setDataSource(tmpDataSource);
    // console.log("dataSource", tmpDataSource);
  };

  //   const calenderEvent = (dateString) => {
  //     setIsOpen(true);
  //     // console.log("dateString", dateString);
  //     // const min = 1;
  //     // const max = 9;
  //     // const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;

  //     // const sample = {
  //     //   id: dataSource.length,
  //     //   name: "Google I/O",
  //     //   location: "San Francisco, CA",
  //     //   startDate: new Date(dateString),
  //     //   endDate: new Date(dateString),
  //     // };
  //     // const tmpData = [...dataSource, sample];
  //     // setDataSource(tmpData);
  //   };
  useEffect(() => {
    test();
    // test();
  }, [selectedDate]);
  return (
    <div className="">
      <NewCalendarEvent
        isOpenPopup={isOpen}
        closePopup={closePopup}
        selectedDate={selectedDate}
        updatDataSource={updatDataSource}
        nextid={dataSource.length}
        dataSource={dataSource}
      />
      <span className="text-2xl font-semibold leading-none text-gray-900 select-none pt-2 mr-auto pl-3">
        <span className="text-indigo-600">Calendar - {currentYear}</span>
      </span>
      <div className="">
        <Calendar
          style="background"
          dataSource={dataSource}
          onDayClick={(e) => openPopup(e)}
          displayHeader={false}
        />
      </div>
      {/* {JSON.stringify(dataSource)} */}
    </div>
  );
};
