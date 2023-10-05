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

export default function Timelog() {
  const router = useRouter();
  const dispatch = useDispatch();
  const calendarRef = useRef(null);
  const { data: session, status } = useSession();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const timeAllocationSave = useSelector(
    (state: any) => state.timeAllocationSaveReducer.timeAllocationSaveState
  );

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    if (!timeAllocationSave) {
      toast.error("Please Save changes!", {
        position: "top-right",
        autoClose: 3000,
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

  const events = [
    {
      title: "Total hours - 8",
      extendedProps: {
        description: "This is the description for Event 2.",
      },
      start: "2023-10-05",
      backgroundColor: "red", // Set a background color
      borderColor: "darkblue", // Set a border color
    },
    {
      title: "Total hours - 8",
      extendedProps: {
        description: "This is the description for Event 2.",
      },
      start: "2023-10-10",
      backgroundColor: "red", // Set a background color
      borderColor: "darkblue", // Set a border color
    },
    {
      title: "Project 01 task 01 - 02",
      extendedProps: {
        description: "This is the description for Event 2.",
      },
      start: "2023-10-10",
      backgroundColor: "blue", // Set a background color
      borderColor: "darkblue", // Set a border color
    },
    {
      title: "Project 02 task 01 - 02",
      start: "2023-10-10",
      extendedProps: {
        description: "This is the description for Event 2.",
      },
      backgroundColor: "blue", // Set a background color
      borderColor: "darkblue", // Set a border color
    },
    {
      title: "Event 2",
      start: "2023-10-15",
      extendedProps: {
        description: "This is the description for Event 2.",
      },
      backgroundColor: "green",
      borderColor: "darkgreen",
    },
  ];

  const dateClick = (e) => {
    console.log("e", e.dateStr);
    openPopup();
    setSelectedDate(e.dateStr);
    dispatch(setDate(e.dateStr));
  };

  const renderEventContent = (eventInfo) => {
    // console.log("eventInfo", eventInfo);
    const title = eventInfo.event.title;
    const description = eventInfo.event.extendedProps.description || ""; // Get the description from extendedProps (or an empty string if not provided)

    return {
      // html: `<div class="event-icon">⭐</div><div class="event-title">${eventInfo.event.title}</div>`,
      html: `<div class="event-title">${title}</div>
      <div class="event-description">${description}</div>`,
    };
  };

  const eventMouseEnter = (info) => {
    toast.info(`${info.event.title}`, {
      position: "top-left",
      // position: toast.POSITION.TOP_CENTER,
      autoClose: false, // This ensures the notification doesn't auto-close
      closeOnClick: false, // This prevents the notification from closing when clicked
      theme: "colored",
    });
  };

  const eventMouseLeave = (eventInfo) => {
    toast.dismiss();
  };

  const customEventOrder = (eventA, eventB) => {
    return eventA;
  };
  ////////////////////////////////

  // document
  //   .getElementById("my-next-button")
  //   .addEventListener("click", function () {
  //     const calendarApi = calendarRef.current.getApi();
  //     calendarApi.next();
  //     const initialYear = calendarApi.view.currentStart.getFullYear();
  //     setCurrentYear(initialYear);
  //   });

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
            <span className="text-indigo-600">Time log {currentYear}</span>
          </span>
        </div>
        <div className="pl-4 pr-4">
          <TimelogModal
            isOpenPopup={isOpen}
            closePopup={closePopup}
            selectedDate={selectedDate}
          />
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            dateClick={(e) => dateClick(e)}
            eventContent={renderEventContent}
            editable={true}
            eventMouseEnter={eventMouseEnter}
            eventMouseLeave={eventMouseLeave}
            eventOrder={customEventOrder}
            headerToolbar={{
              start: "dayGridMonth,timeGridWeek,timeGridDay", // will normally be on the left. if RTL, will be on the right
              center: "title",
              end: "today prev,next", // will normally be on the right. if RTL, will be on the left
            }}
            height={"90vh"}
          />
        </div>
      </div>
    </WithRole>
  );
}
