"use client";

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { inputFieldValidation } from "@/app/utils/utils";
import { Button, Pagination } from "@nextui-org/react";
import NextAutoFocusTextInputField from "../common-comp/nextui-input-fields/next-autofocus-text-input-fields";
import NextTextInputField from "../common-comp/nextui-input-fields/next-text-input-fields";
import NextSelectInputField from "../common-comp/nextui-input-fields/next-select-input-fields";
import { handleSelectChangeEvent } from "../utils";
import { MdOutlineEditNote } from "react-icons/md";
import IconConfirmAlertbox from "../common-comp/icon-confirm-alertbox";
import CountrySelector from "../country-selector/selector";
import { COUNTRIES } from "../country-selector/countries";
import { PrjAssignProjectTable } from "../project-assign/project-table";
import { PrjAssignTaskTimeAllocTable } from "../time-allocation/task-table";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setStaffId } from "@/store/userDetailSlice";
import { AiOutlineCloseCircle } from "react-icons/ai";

const TimelogModal = ({
  isOpenPopup,
  closePopup,
  selectedDate,
}: {
  isOpenPopup: any;
  closePopup: () => void;
  selectedDate: any;
}) => {
  const router = useRouter();

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

  // const [staffid, setStaffid] = useState<any>(tmpUser?.staffid);
  dispatch(setStaffId(tmpUser?.staffid));
  const staffid = useSelector((state: any) => state.userDetailReducer.staffid);
  console.log("staffid-redux", staffid);
  const [projectRowObjects, setProjectRowObjects] = useState<any[]>([]);
  const [projectid, setProjectid] = useState<any>();
  const [projectname, setProjectname] = useState("Select from below...");
  const [currentProjectPage, setCurrentProjectPage] = useState(1);
  const [projectPageCount, setProjectPageCount] = useState(1);

  const [taskRowObjects, setTaskRowObjects] = useState<any[]>([]);
  const [taskHeaderObject, setTaskHeaderObject] = useState<any>();
  const [taskTablePage, setTaskTablePage] = useState(1);
  const [totalTaskCount, setTotalTaskCount] = useState(1);

  const [saveFlag, setSaveFlag] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  const toggleSaveFlag = () => {
    setSaveFlag((prv: boolean) => !prv);
  };

  useEffect(() => {
    setIsOpen(isOpenPopup);
  }, [isOpenPopup]);

  useEffect(() => {
    if (projectid && staffid) {
      createTaskRowObject(projectid);
    }
  }, [saveFlag, date, staffid]);

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const reponse = await fetch(
        pathname +
          "/api/time-allocation/get-assign-projects?page-number=" +
          currentProjectPage +
          "&staffid=" +
          staffid
      );
      const res = await reponse.json();
      setProjectRowObjects(res.project);
      const tmpCount = Math.ceil(res.totalAssignProjectCount / 10);
      setProjectPageCount(tmpCount);
    };
    // call the function
    if (staffid) {
      fetchData().catch(console.error);
    }
  }, [currentProjectPage, staffid]);

  const getAssignTasks = async (projectid?: number, staffid?: number) => {
    const reponse = await fetch(
      pathname +
        "/api/time-allocation/get-assign-tasks?page-number=" +
        currentProjectPage +
        "&staffid=" +
        staffid +
        "&projectid=" +
        projectid
    );
    const res = await reponse.json();
    setTotalTaskCount(res.totalAssignProjectTasksCount);
    return res.projectTasks;
  };

  const getTimeAllocData = async (projectid?: number, staffid?: number) => {
    console.log("projectID", projectid);
    console.log("staffid", staffid);
    const reponse = await fetch(
      pathname +
        "/api/time-allocation?page-number=" +
        taskTablePage +
        "&staffid=" +
        staffid +
        "&projectid=" +
        projectid +
        "&sel-date=" +
        date
    );
    const res = await reponse.json();
    console.log("res", res);
    const headerData = res.timeAllocHeaderData;
    const detailData = res.timeAllocDetailData;
    return { headerData, detailData };
  };

  const createTaskRowObject = async (projectid: number) => {
    const { headerData, detailData } = await getTimeAllocData(
      projectid,
      staffid
    );
    if (headerData.length == 0) {
      const assignTasks = await getAssignTasks(projectid, staffid);

      setTaskHeaderObject("");
      const tmpAssignTasks = assignTasks.map((obj: any) => {
        return {
          ...obj,
          time: 0,
          remark: "",
        };
      });
      setTaskRowObjects(tmpAssignTasks);
    } else {
      setTaskHeaderObject(headerData);
      setTaskRowObjects(detailData);
    }
  };

  const projectTableClickEvent = async (
    projectid: number,
    projectname: string
  ) => {
    setProjectid(projectid);
    setProjectname(projectname);
    await createTaskRowObject(projectid);
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        // shouldCloseOnOverlayClick={false}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="flex flex-col bg-white shadow-md px-4 sm:px-4 md:px-4 lg:px-4 rounded-md w-full max-w-md min-w-[1400px] min-h-[95vh] max-h-[95vh] overflow-y-auto">
          <div className="flex items-center justify-center">
            <span className="text-2xl font-semibold leading-none text-gray-900 select-none pt-2 mr-auto">
              <span className="text-indigo-600">
                Time log for {date}
              </span>
            </span>
            <AiOutlineCloseCircle
              onClick={closePopup}
              className="h-6 w-6 text-indigo-700 hover:text-indigo-500 cursor-pointer flex justify-end"
            />
          </div>
          <div className="flex">
            <div className="flex flex-col w-1/3">
              <div className="flex flex-row"></div>
              <span className="text-xl leading-none text-gray-900 select-none pt-2 mr-auto pl-4">
                Project name:
                <span className="italic text-base text-black-600">
                  {projectname}
                </span>
              </span>
              <div className="pl-3">
                {projectRowObjects && (
                  <PrjAssignProjectTable
                    projectTableClickEvent={projectTableClickEvent}
                    projectRowObjects={projectRowObjects}
                    tablePagination={currentProjectPage}
                    staffid={staffid}
                    search={false}
                  />
                )}
                <div className="md:px-2 mt-3 flex item-center justify-center">
                  <Pagination
                    isCompact
                    showControls
                    total={projectPageCount}
                    page={currentProjectPage}
                    onChange={setCurrentProjectPage}
                  />
                </div>
              </div>
            </div>
            <div className="p-4 w-2/3">
              {taskRowObjects && (
                <PrjAssignTaskTimeAllocTable
                  taskHeaderObject={taskHeaderObject}
                  staffid={staffid}
                  projectid={projectid}
                  taskRowObjectsIn={taskRowObjects}
                  tablePagination={taskTablePage}
                  toggleSaveFlag={toggleSaveFlag}
                />
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default TimelogModal;
