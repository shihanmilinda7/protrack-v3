"use client";

import React, { useEffect, useState } from "react";
import Calendar from "rc-year-calendar";
import NewCalendarEvent from "./new-event";
import { Button } from "@nextui-org/react";
import { filterDataSource, modifiedDataForSave } from "./utils";
import { toast } from "react-toastify";

export const SetupCalendar = ({
  year,
  country,
}: {
  year: any;
  country: any;
}) => {
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

  // const currentYear = new Date().getFullYear();

  const [isOpen, setIsOpen] = useState(false);
  const [dateChange, setDateChange] = useState(false);

  const [dataSource, setDataSource] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selDataSource, setSelDataSource] = useState("");
  const [saveUpdate, setSaveUpdate] = useState(false);
  const [calanderid, setCalanderid] = useState("");

  const toggleSave = () => {
    setSaveUpdate((prv: boolean) => !prv);
  };

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const dayClickEvent = (dateString) => {
    setDateChange((prv: boolean) => !prv);
    setSelectedDate(dateString.date.toLocaleDateString());
    openPopup();
  };

  const updatDataSource = (newDataSource: any, deleteItem?: any) => {
    const tmpDataSource = [...dataSource];
    if (deleteItem) {
      for (let i = 0; i < tmpDataSource.length; i++) {
        if (tmpDataSource[i].uniqueKey === deleteItem) {
          tmpDataSource.splice(i, 1); // Remove the element at index i
          break; // Exit the loop after removal to avoid unexpected behavior
        }
      }
      setDataSource(tmpDataSource);
    } else {
      tmpDataSource.push(newDataSource);
      setDataSource(tmpDataSource);
    }
  };

  useEffect(() => {
    fetchYearData();
  }, [year, country, saveUpdate]);

  useEffect(() => {
    if (selectedDate) {
      const dateFound = dataSource.find((d) => d.uniqueKey == selectedDate);
      if (dateFound) {
        setSelDataSource(dateFound);
      } else {
        setSelDataSource("");
      }
    }
  }, [dateChange]);

  const submitButtonHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    // if (selDataSource) {
    //   update();
    // } else {
    addnew();
    // }
  };

  const addnew = async () => {
    const saveDataSource = filterDataSource(dataSource);
    // const saveDataSource = modifiedDataForSave(tmpDataSource, year);
    try {
      const response = await fetch(pathname + "/api/setup-calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dataSource: saveDataSource,
          year,
          calanderid,
          country,
        }),
      });
      const res = await response.json();
      if (res.message == "SUCCESS") {
        toast.success("Calendar updated successfully!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        toggleSave();
      }
    } catch (error) {
      toast.error("Error!", {
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
    // console.log("saveDataSource", saveDataSource);
  };

  const fetchYearData = async () => {
    const fetchData = async () => {
      const reponse = await fetch(
        pathname + "/api/setup-calendar?year=" + year + "&country=" + country
      );
      const res = await reponse.json();
      // console.log("res", res);
      const modifiedData = res.dataSource.map((item, index) => ({
        id: index,
        name: item.name,
        location: item.location,
        startDate: new Date(item.startDate),
        endDate: new Date(item.endDate),
        color: item.color,
        uniqueKey: item.uniqueKey,
        dateType: item.dateType,
      }));
      setDataSource(modifiedData);
      setCalanderid(res.headerData[0]?.calanderid);
    };
    // call the function
    if (year) {
      fetchData().catch(console.error);
    }
  };
  return (
    <div className="">
      <NewCalendarEvent
        isOpenPopup={isOpen}
        closePopup={closePopup}
        selectedDate={selectedDate}
        updatDataSource={updatDataSource}
        nextid={dataSource.length}
        selDataSource={selDataSource}
        dateChange={dateChange}
      />
      <span className="text-2xl font-semibold leading-none text-gray-900 select-none pt-2 mr-auto pl-3">
        <span className="text-indigo-600">
          Calendar - {year} ({country})
        </span>
      </span>
      <div className="">
        <Calendar
          style="background"
          dataSource={dataSource}
          onDayClick={(e) => dayClickEvent(e)}
          displayHeader={false}
          year={year}
        />
      </div>
      <div className="flex gap-2 mt-6  justify-center items-center">
        <div className="bg-[#ffff00] w-[150px] text-center p-2">
          <div className="text-14">Public Holiday</div>
          <div className=""></div>
        </div>
        <div className="p-2 bg-[#ffc100] w-[150px] text-center">
          <div className="text-14">Anniversary</div>
          <div className=""></div>
        </div>
        <div className="p-2 bg-[#a2ff00] w-[150px] text-center">
          <div className="text-14">Special Occasion</div>
          <div className=""></div>
        </div>
        <div className="p-2 bg-[#0092ff] w-[150px] text-center">
          <div className="text-14">Seasonal</div>
          <div className=""></div>
        </div>
        <div className="p-2 bg-[#5aff54] w-[150px] text-center">
          <div className="text-14">Quarterly</div>
          <div className=""></div>
        </div>
        <div className="p-2 bg-[#007aff] w-[150px] text-center">
          <div className="text-14">Month-End</div>
          <div className=""></div>
        </div>
        <div className="p-2 bg-[#00ffbc] w-[150px] text-center">
          <div className="text-14">Year-End/Year's Eve</div>
          <div className=""></div>
        </div>
        <div className="p-2 bg-[#ff7300] w-[150px] text-center">
          <div className="text-14">Historical</div>
          <div className=""></div>
        </div>
        {/* <div className="flex gap-2 justify-center items-center">
          <div className="bg-[#ffff00] h-4 w-4"></div>
          <span className="">Public Holiday</span>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <div className="bg-[#ffc100] h-4 w-4"></div>
          <span className="">Anniversary</span>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <div className="bg-[#a2ff00] h-4 w-4"></div>
          <span className="">Special Occasion</span>
        </div> */}
        {/* <div className="flex gap-2 justify-center items-center">
          <div className="bg-[#0092ff] h-4 w-4"></div>
          <span className="">Seasonal</span>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <div className="bg-[#5aff54] h-4 w-4"></div>
          <span className="">Quarterly</span>
        </div> */}
        {/* <div className="flex gap-2 justify-center items-center">
          <div className="bg-[#007aff] h-4 w-4"></div>
          <span className="">Month-End</span>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <div className="bg-[#00ffbc] h-4 w-4"></div>
          <span className="">Year-End/Year's Eve</span>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <div className="bg-[#ff7300] h-4 w-4"></div>
          <span className="">Historical</span>
        </div> */}
      </div>
      <div className="flex justify-end mr-8 mt-3">
        <Button color="primary" onClick={submitButtonHandler}>
          Save
        </Button>
      </div>
      {/* {JSON.stringify(dataSource)} */}
    </div>
  );
};
// if (isOpenPopup) {
//   const tmpDate = new Date(selectedDate);
//   console.log("tmpDate.toISOString()", tmpDate.toISOString());
//   // const dateFound = dataSource.find(d => d.startDate == )
// }
// test();
