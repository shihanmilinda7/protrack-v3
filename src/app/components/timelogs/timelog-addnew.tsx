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
import { ClassNames, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import styles from "./DatePickerStyles.module.css";
import { setDate } from "@/store/timeAllocDateSlice";
import { ListboxWrapper } from "../common-comp/nextui-input-fields/ListboxWrapper";
import { TimelogTaskTable } from "./timelog-task-table";
import NextRadioGroup from "../common-comp/nextui-input-fields/next-radio-group";
import NextAreaTextInputField from "../common-comp/nextui-input-fields/next-textarea-input-fields";

const TimelogAddNew = ({
  isOpenPopup,
  closePopup,
  selectedDate,
  timelogEventsIn,
  toggleSaveFlagIn,
}: {
  isOpenPopup: any;
  closePopup: () => void;
  selectedDate?: any;
  timelogEventsIn: any[];
  toggleSaveFlagIn: () => void;
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
  const [events, setEvents] = useState(null);

  const [assignProjects, setAssignProjects] = useState<any[]>([]);

  const [workingType, setWorkingType] = useState("Working");
  const [remark, setRemark] = useState("");
  const [timelogid, setTimelogid] = useState("");
  const [timelogDetails, setTimelogDetails] = useState<any[]>([]);

  const [saveFlag, setSaveFlag] = useState(false);

  const toggleSaveFlag = () => {
    toggleSaveFlagIn();
    setSaveFlag((prv: boolean) => !prv);
  };
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

  const dateTypes = [
    { name: "Working", value: "Working" },
    { name: "Flex time off", value: "Flex time off" },
    { name: "Leave", value: "Leave" },
    // { name: "Holiday", value: "Holiday" },
  ];

  useEffect(() => {
    setIsOpen(isOpenPopup);
  }, [isOpenPopup]);

  useEffect(() => {
    const modifiedEvents = timelogEventsIn?.map((y) => new Date(y.start));
    setEvents(modifiedEvents);
  }, [timelogEventsIn]);

  useEffect(() => {
    setPickedDate(new Date(date));
  }, [date]);

  useEffect(() => {
    fetchTimelogDetails();
  }, [date, saveFlag]);

  useEffect(() => {
    fetchAssignProjects();
  }, [staffid]);

  const dateInputEvent = (dateValue) => {
    // console.log("dateValue", dateValue);
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

  const fetchTimelogDetails = async () => {
    const fetchData = async () => {
      const reponse = await fetch(
        pathname +
          "/api/timelogs/get-timelog-details?staffid=" +
          staffid +
          "&sel-date=" +
          date
      );
      const res = await reponse.json();
      setWorkingType(res.timelogHeaderData[0]?.workingType ?? "Working");
      setRemark(res.timelogHeaderData[0]?.remark ?? "");
      setTimelogid(res.timelogHeaderData[0]?.timelogid ?? "");
      setTimelogDetails(res.timelogDetailData ? res.timelogDetailData : []);
      console.log("res.timelogDetailData", res.timelogDetailData);
    };
    // call the function
    if (staffid) {
      fetchData().catch(console.error);
    }
  };

  const classNames: ClassNames = {
    ...styles,
    head: "custom-head",
  };
  // function generateModifiersClassNames(customColors) {
  //   const modifiersClassNames = {};
  //   for (const dateString in customColors) {
  //     const dateObject = new Date(dateString);
  //     modifiersClassNames[dateObject.toISOString()] = customColors[dateString];
  //   }
  //   return modifiersClassNames;
  // }

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
                <div>
                  <style>{`.custom-head { color: blue }`}</style>
                  <DayPicker
                    mode="single"
                    required
                    classNames={classNames}
                    selected={pickedDate}
                    onSelect={dateInputEvent}
                    modifiersClassNames={{
                      selected: styles["my-selected"], // Apply the custom class name for selected days
                      today: styles["my-today"], // Apply the custom class name for today's date
                      day: styles["my-day"], // Apply the custom class name for all days
                      booked: styles.complteddates,
                      // ...modifiers,
                    }}
                    // modifiers={{ booked: events }}
                    // modifiers={modifiers}
                    modifiers={{ booked: events }}
                    styles={{
                      caption: { color: "blue" },
                      day: {
                        border: "1px solid #ccc", // Add a 1px solid gray border to all dates
                        borderRadius: "0", // Make the dates square by setting borderRadius to 0
                      },
                    }}
                    month={pickedDate} // Set the default month
                    disableNavigation
                  />
                </div>
                <div className="mb-3 ml-3">
                  <NextRadioGroup
                    label="Select working type"
                    value={workingType}
                    onChange={setWorkingType}
                    radioArray={dateTypes}
                  />
                </div>
                <div className="mb-3 ml-3 mr-3">
                  <NextAreaTextInputField
                    label="Note"
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="w-full  mt-3">
              <TimelogTaskTable
                timelogDetailsIn={timelogDetails}
                assignProjects={assignProjects}
                headerData={{ timelogid, staffid, date, remark, workingType }}
                toggleSaveFlag={toggleSaveFlag}
              />
              {/* <TimelogTaskTable
                assignProjects={assignProjects}
                staffid={staffid}
                dateIn={date}
                remark={note}
                workingType={workingType}
              /> */}
            </div>
          </div>
        </div>
        {/* <div className="fixed bottom-4 right-5">
          <Tooltip content="Cancel">
            <Button color="danger" onClick={closePopup}>
              Cancel
            </Button>
          </Tooltip>
          <Tooltip content="Save">
            <Button color="primary" className="ml-2">
              Save
            </Button>
          </Tooltip>
        </div> */}
      </Modal>
    </div>
  );
};
export default TimelogAddNew;
