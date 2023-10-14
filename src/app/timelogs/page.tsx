"use client";

import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/navbar/navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { WithRole } from "../components/common-comp/withRole";
import Spinner from "../dashboard/loading";
import FullCalendar from "@fullcalendar/react";
import { toast } from "react-toastify";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";
import TimelogModal from "../components/timelogs/edit-timelog";
import { useSelector } from "react-redux";
import { setDate } from "@/store/timeAllocDateSlice";
import { useDispatch } from "react-redux";
import TimelogAddNew from "../components/timelogs/timelog-addnew";
import { setStaffId } from "@/store/userDetailSlice";

export default function Timelog() {
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

  const router = useRouter();
  const dispatch = useDispatch();
  const calendarRef = useRef(null);
  const { data: session, status } = useSession();
  const tmpUser = session?.user;
  const tmpCountry = tmpUser?.country;
  dispatch(setStaffId(tmpUser?.staffid));
  const staffid = useSelector((state: any) => state.userDetailReducer.staffid);

  const country = tmpCountry ? tmpCountry : "LK"; //todo get it from session
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(
    (new Date().getMonth() + 1).toString().padStart(2, "0")
  );

  const [monthEvents, setMonthEvents] = useState([]);
  const [timelogEvents, setTimelogEvents] = useState([]);

  const timeAllocationSave = useSelector(
    (state: any) => state.timeAllocationSaveReducer.timeAllocationSaveState
  );

  const [saveFlag, setSaveFlag] = useState(false);

  const toggleSaveFlag = () => {
    setSaveFlag((prv: boolean) => !prv);
  };

  useEffect(() => {
    fetchMonthEvents();
  }, [currentYear, currentMonth]);

  useEffect(() => {
    fetchTimelogEvents();
  }, [currentYear, currentMonth, saveFlag]);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    if (!timeAllocationSave) {
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
    } else {
      setIsOpen(false);
    }
  };

  const dateClick = (e) => {
    openPopup();
    setSelectedDate(e.dateStr);
    dispatch(setDate(e.dateStr));
  };

  const eventClick = (e) => {
    const clickedEvent = e.event;
    const startDate = clickedEvent.start;
    const year = startDate.getFullYear();
    const month = (startDate.getMonth() + 1).toString().padStart(2, "0");
    const day = startDate.getDate().toString().padStart(2, "0");
    const formattedItemDate = `${year}-${month}-${day}`;
    openPopup();
    setSelectedDate(formattedItemDate);
    dispatch(setDate(formattedItemDate));
  };

  const renderEventContent = (eventInfo) => {
    const title = eventInfo.event.title;
    const description = eventInfo.event.extendedProps.description || ""; // Get the description from extendedProps (or an empty string if not provided)

    return {
      html: `<div class="event-content">
      <div class="event-title">${title}</div>
      <div class="event-description">${description}</div>
    </div>`,
    };
  };

  // const eventMouseEnter = (e) => {
  //   // toast.info(`${info.event.title}`, {
  //   //   position: toast.POSITION.BOTTOM_CENTER,
  //   //   autoClose: false, // This ensures the notification doesn't auto-close
  //   //   closeOnClick: false, // This prevents the notification from closing when clicked
  //   //   theme: "colored",
  //   // });
  // };

  // const eventMouseLeave = (eventInfo) => {
  //   toast.dismiss();
  // };

  const customEventOrder = (eventA, eventB) => {
    return eventA;
  };

  const handlePrevNextClick = (e) => {
    setCurrentYear(e.view.getCurrentData().viewTitle.split(" ")[1]);
    const displayedMonth = e.view.currentStart.getMonth() + 1; // Adding 1 because months are 0-based
    setCurrentMonth(displayedMonth);
    // console.log("Month navigation clicked. Displayed month:", displayedMonth);
  };

  const fetchMonthEvents = async () => {
    const fetchData = async () => {
      const reponse = await fetch(
        pathname +
          "/api/setup-calendar/get-datasource-as-month?year=" +
          currentYear +
          "&month=" +
          currentMonth +
          "&country=" +
          country
      );
      const res = await reponse.json();
      const modifiedData = res.dataSource.map((item, index) => {
        // Format the date from item.date
        const itemDate = new Date(item.startDate);
        const year = itemDate.getFullYear();
        const month = (itemDate.getMonth() + 1).toString().padStart(2, "0");
        const day = itemDate.getDate().toString().padStart(2, "0");
        const formattedItemDate = `${year}-${month}-${day}`;
        return {
          title: item.dateType,
          start: formattedItemDate, // Use the formatted date from item.date
          extendedProps: {
            description: item.name,
          },
          backgroundColor: item.color,
          borderColor: item.color,
        };
      });
      setMonthEvents(modifiedData);
    };
    // call the function
    if (currentYear && country) {
      fetchData().catch(console.error);
    }
  };

  const fetchTimelogEvents = async () => {
    console.log("staffid", staffid);
    const fetchData = async () => {
      const reponse = await fetch(
        pathname +
          "/api/timelogs/get-timelog-as-month?date=" +
          `${currentYear}-${currentMonth.toString().padStart(2, "0")}` +
          "&staffid=" +
          staffid
      );
      const res = await reponse.json();
      const modifiedData = res.timelogData?.map((item) => ({
        title: item.workingType,
        start: item.date, // Use the formatted date from item.date
        extendedProps: {
          description: "Total working hours - " + item.totalHours,
        },
        // backgroundColor: item.workingType == "Leave" ? "red" : "#637f99",
        backgroundColor:
          item.workingType == "Leave"
            ? "#f71631"
            : item.workingType === "Flex time off"
            ? "#e0b46c"
            : "#637f99",
        borderColor: "#637f99",
      }));

      setTimelogEvents(modifiedData);
    };
    // call the function
    if (currentYear && staffid) {
      fetchData().catch(console.error);
    }
  };

  if (status === "loading") {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (!session) {
    router.push("/"); // Redirect to login page if not authenticated
    return null;
  }
  return (
    <WithRole roles={["Admin", "Manager", "User"]}>
      <div>
        <Navbar />
        <div className="flex items-center justify-center p-4">
          <span className="text-2xl font-semibold leading-none text-gray-900 select-none pt-2 mr-auto">
            <span className="text-indigo-600">Time log</span>
          </span>
          <div className="p-2 bg-[#637f99] w-[150px] text-center">
            <div className="text-14">Working</div>
            <div className=""></div>
          </div>
          <div className="p-2 bg-[#e0b46c] w-[150px] text-center">
            <div className="text-14">Flex time of</div>
            <div className=""></div>
          </div>
          <div className="p-2 bg-[#f71631] w-[150px] text-center">
            <div className="text-14">Leave</div>
            <div className=""></div>
          </div>
          {/* <div className="event-content bg-[#637f99] w-[100px] text-center">
            <div className="event-title text-14">Working</div>
            <div className="event-description"></div>
          </div> */}
          {/* <div className="event-content bg-[#e0b46c] w-[100px] text-center">
            <div className="event-title text-14">Flex time off</div>
            <div className="event-description"></div>
          </div>
          <div className="event-content bg-[#f71631] w-[100px] text-center">
            <div className="event-title text-14">Leave</div>
            <div className="event-description"></div>
          </div> */}
        </div>
        <div className="pl-4 pr-4">
          <TimelogAddNew
            isOpenPopup={isOpen}
            closePopup={closePopup}
            // selectedDate={selectedDate}
            timelogEventsIn={timelogEvents}
            toggleSaveFlagIn={toggleSaveFlag}
          />
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={[...monthEvents, ...timelogEvents]}
            dateClick={(e) => dateClick(e)}
            eventClick={(e) => eventClick(e)}
            eventContent={renderEventContent}
            editable={true}
            // eventMouseEnter={eventMouseEnter}
            // eventMouseLeave={eventMouseLeave}
            eventOrder={customEventOrder}
            headerToolbar={{
              start: "dayGridMonth", // will normally be on the left. if RTL, will be on the right
              // start: "dayGridMonth,timeGridWeek,timeGridDay", // will normally be on the left. if RTL, will be on the right
              center: "title",
              end: "today prev,next", // will normally be on the right. if RTL, will be on the left
            }}
            height={"90vh"}
            datesSet={handlePrevNextClick}
          />
        </div>
      </div>
    </WithRole>
  );
}
