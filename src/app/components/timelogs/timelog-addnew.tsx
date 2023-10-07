"use client";

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Button, Pagination, Tooltip } from "@nextui-org/react";
import { PrjAssignProjectTable } from "../project-assign/project-table";
import { PrjAssignTaskTimeAllocTable } from "../time-allocation/task-table";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setStaffId } from "@/store/userDetailSlice";
import { AiOutlineCloseCircle } from "react-icons/ai";
import moment from "moment";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import styles from "./DatePickerStyles.module.css";
import { setDate } from "@/store/timeAllocDateSlice";
import { ListboxWrapper } from "../common-comp/nextui-input-fields/ListboxWrapper";
import { TimelogTaskTable } from "./timelog-task-table";

const TimelogAddNew = ({
  isOpenPopup,
  closePopup,
  selectedDate,
}: {
  isOpenPopup: any;
  closePopup: () => void;
  selectedDate: any;
}) => {
  //get pathname
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

  const { data: session, status } = useSession();
  const tmpUser = session?.user;

  //redux
  const date = useSelector((state: any) => state.timeAllocDateReducer.date);
  const dispatch = useDispatch();
  dispatch(setStaffId(tmpUser?.staffid));
  const staffid = useSelector((state: any) => state.userDetailReducer.staffid);
  const [isOpen, setIsOpen] = useState(false);
  const [pickedDate, setPickedDate] = useState<Date>();
  const compltedDates = [new Date("2023-10-10"), new Date("2023-10-15")]; // Replace with your actual booked dates

  const [assignProjects, setAssignProjects] = useState<any[]>([]);

  const customStyles = {
    overlay: {
      zIndex: 50,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "10px",
    },
  };

  useEffect(() => {
    setIsOpen(isOpenPopup);
  }, [isOpenPopup]);

  useEffect(() => {
    setPickedDate(new Date(date));
  }, [date]);

  useEffect(() => {
    fetchAssignProjects();
  }, [staffid]);

  const dateInputEvent = (dateValue) => {
    console.log("dateValue", dateValue);
    setPickedDate(dateValue);
    if (dateValue) {
      const date = new Date(dateValue);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      dispatch(setDate(formattedDate));
    }
  };

  const fetchAssignProjects = async () => {
    const fetchData = async () => {
      const reponse = await fetch(
        pathname + "/api/timelogs/get-assign-projects?staffid=" + staffid
      );
      const res = await reponse.json();
      const modifiedProjectData = res.project.map((p) => ({
        value: p.projectid,
        name: p.projectname,
      }));
      setAssignProjects(modifiedProjectData);
    };
    // call the function
    if (staffid) {
      fetchData().catch(console.error);
    }
  };
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="flex flex-col bg-white shadow-md px-4 sm:px-4 md:px-4 lg:px-4 rounded-md w-full max-w-md min-w-[1400px] min-h-[95vh] max-h-[95vh] overflow-y-auto">
          <div className="flex items-center justify-center">
            <span className="text-2xl font-semibold leading-none text-gray-900 select-none pt-2 mr-auto">
              <span className="text-indigo-600">Time log for {date}</span>
            </span>
            <AiOutlineCloseCircle
              onClick={closePopup}
              className="h-6 w-6 text-indigo-700 hover:text-indigo-500 cursor-pointer flex justify-end"
            />
          </div>
          <div className="flex">
            <div className="flex flex-col w-fit">
              <div className="border-small px-1 rounded-small border-blue-600 w-fit mt-3">
                <DayPicker
                  mode="single"
                  required
                  selected={pickedDate}
                  onSelect={dateInputEvent}
                  modifiersClassNames={{
                    selected: styles["my-selected"], // Apply the custom class name for selected days
                    today: styles["my-today"], // Apply the custom class name for today's date
                    day: styles["my-day"], // Apply the custom class name for all days
                    booked: styles.complteddates,
                  }}
                  modifiers={{ booked: compltedDates }}
                />
              </div>
            </div>
            <div className="w-full  mt-3">
              <TimelogTaskTable
                assignProjects={assignProjects}
                staffid={staffid}
              />
            </div>
          </div>
        </div>
        <div className="fixed bottom-4 right-5">
          <Tooltip content="Save">
            <Button color="danger" onClick={closePopup}>
              Cancel
            </Button>
          </Tooltip>
          <Tooltip content="Save">
            <Button color="primary" className="ml-2">
              Save
            </Button>
          </Tooltip>
        </div>
      </Modal>
    </div>
  );
};
export default TimelogAddNew;
