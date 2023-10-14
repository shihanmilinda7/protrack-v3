"use client";

import Modal from "react-modal";

import { useEffect, useState } from "react";
import { Button, Tooltip } from "@nextui-org/react";
import { Pagination } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { PrjAssignStaffTable } from "../project-assign/staff-table";
import { toast } from "react-toastify";
import { MdOutlineEditNote } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { PrjAssignTaskTable } from "../project-assign/task-table";
import { useDispatch } from "react-redux";
import {
  setCurPrjTaskRowOj,
  setProjectAssignSaved,
} from "@/store/projectAssignSaveSlice";

const ProjectAssignScreen = ({
  projectid,
  projectname,
  projectTasks,
  updateMainScreen,
}: {
  projectid: any;
  projectname: any;
  projectTasks: any[];
  updateMainScreen: () => void;
}) => {
  let pathname: string = "";
  const dispatch = useDispatch();

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

  const save = useSelector((state: any) => state.saveReducer.saveState);
  const rSearchStaffName = useSelector(
    (state: any) => state.searchReducer.staffname
  );
  const rSearchDesignation = useSelector(
    (state: any) => state.searchReducer.designation
  );
  const curPrjTaskRowOj = useSelector(
    (state: any) => state.projectAssignSaveReducer.curPrjTaskRowOj
  );

  const [isOpen, setIsOpen] = useState(false);
  const [staffRowObjects, setStaffRowObjects] = useState<any[]>([]);
  const [staffPageCount, setStaffPageCount] = useState(1);
  const [currentStaffPage, setCurrentStaffPage] = useState(1);
  const [staffid, setStaffid] = useState<any>();
  const [staffname, setStaffname] = useState("Select from below...");
  const [saveAssign, setSaveAssign] = useState(false);

  // const [taskRowObjects, setTaskRowObjects] = useState<any[]>([]);

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: 50,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
    // content: {
    //   top: "50%",
    //   left: "50%",
    //   right: "auto",
    //   bottom: "auto",
    //   marginRight: "-50%",
    //   transform: "translate(-50%, -50%)",
    // },
  };
  const toggleAssignSave = () => {
    setSaveAssign((prv: boolean) => !prv);
  };

  const staffTableClickEvent = (staffid: number, staffname: string) => {
    setStaffid(staffid);
    setStaffname(staffname);
  };

  const fetchStaffData = async (tmpCurrentStaffPage: any) => {
    const reponse = await fetch(
      pathname +
        "/api/staff/get-staff?page-number=" +
        tmpCurrentStaffPage +
        "&search-staff-name=" +
        (rSearchStaffName ? rSearchStaffName : "-1") +
        "&search-designation=" +
        (rSearchDesignation ? rSearchDesignation : "-1") +
        "&projectid=" +
        projectid
    );
    const res = await reponse.json();
    setStaffRowObjects(res.staff);
    const tmpCount = Math.ceil(res.totalStaffCount / 10);
    setStaffPageCount(tmpCount);
  };

  const fetchAssignTasks = async (projectId?: number, staffid?: number) => {
    const reponse = await fetch(
      pathname +
        "/api/project-assign?projectid=" +
        projectId +
        "&staffid=" +
        staffid
    );
    const res = await reponse.json();

    return res.totalAssignTask;
  };

  const createTaskRowObj = async (assignTasks: any, projectTasks: any) => {
    const tmpAssignTask = await assignTasks;
    const tmpProjectTask = projectTasks;
    console.log("await projectTasks", tmpAssignTask);
    if (tmpAssignTask.length > 0) {
      console.log("call 1");

      // console.log("assignTasks", assignTasks);
      const tmpRowObjs = tmpProjectTask.map((pt: any) => {
        const findAssignTask: any = tmpAssignTask.find(
          (t: any) => t.taskid === pt.taskid
        );
        return {
          taskid: pt.taskid,
          taskname: pt.taskname,
          projecttaskassignid: findAssignTask
            ? findAssignTask.projecttaskassignid
            : 0,
          selected: findAssignTask ? true : false,
        };
      });
      // setTaskRowObjects(tmpRowObjs);
      dispatch(setCurPrjTaskRowOj(tmpRowObjs));

      // setInitialTaskRowObjects([...tmpRowObjs]);
      console.log("tmpRowObjs", tmpRowObjs);
    } else {
      console.log("call 2");
      const tmpPrjObj = tmpProjectTask.map((obj: any) => {
        return {
          ...obj,
          projecttaskassignid: 0,
          // console.log("obj",obj,)
          selected: false,
        };
      });
      dispatch(setCurPrjTaskRowOj(tmpPrjObj));

      console.log("tmpPrjObj", tmpPrjObj);
      // setTaskRowObjects(tmpPrjObj);
      // setInitialTaskRowObjects([...tmpPrjObj]);
    }
  };

  useEffect(() => {
    fetchStaffData(currentStaffPage).catch(console.error);
  }, [currentStaffPage, saveAssign]);

  useEffect(() => {
    fetchStaffData(1).catch(console.error);
  }, [rSearchStaffName, rSearchDesignation, saveAssign]);

  useEffect(() => {
    if (projectid && staffid) {
      if (!save) {
        toast.error("Please Save changes2!", {
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
        const assignTasks: any = fetchAssignTasks(projectid, staffid);
        // const projectTasks = getProjectTasks(projectid);
        createTaskRowObj(assignTasks, projectTasks);
      }
    }
  }, [staffid, saveAssign]);

  const saveEvent = async () => {
    try {
      const response = await fetch(pathname + "/api/project-assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          staffid,
          projectid,
          curPrjTaskRowOj,
        }),
      });
      const jsonResponse = await response.json();
      if (jsonResponse == "SUCCESS") {
        toast.success("Successfully assigned!", {
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
      toggleAssignSave();
      updateMainScreen();
      dispatch(setProjectAssignSaved());
    } catch (error) {
      toast.error(`${error}`, {
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
  };

  return (
    <div>
      <Button color="warning" onClick={() => setIsOpen(true)}>
        Add member
      </Button>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        shouldCloseOnOverlayClick={false}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="pb-1 w-full flex items-center justify-between">
          <span className="text-2xl font-semibold leading-none text-gray-900 select-none pt-2 mr-auto">
            <span className="text-indigo-600">
              Staff assign for {projectname}
            </span>
          </span>
          <AiOutlineCloseCircle
            onClick={() => setIsOpen(false)}
            className="h-6 w-6 text-indigo-700 hover:text-indigo-500 cursor-pointer flex justify-end"
          />
        </div>
        <div className="flex items-center justify-center">
          <div className="mx-auto min-w-[1400px] p-6 flex">
            <div className="py-2 sm:w-2/3 w-full">
              <span className="text-xl leading-none text-gray-900 select-none pt-2 mr-auto">
                Name:
                <span className="italic text-base text-black-600">
                  {staffname}
                </span>
              </span>
              <div className="max-h-[450px] overflow-y-auto">
                {staffRowObjects && (
                  <PrjAssignStaffTable
                    staffTableClickEvent={staffTableClickEvent}
                    staffRowObjects={staffRowObjects}
                    tablePagination={currentStaffPage}
                  />
                )}
              </div>
              <div className="md:px-2 mt-3 flex item-center justify-center">
                <Pagination
                  isCompact
                  showControls
                  total={staffPageCount}
                  page={currentStaffPage}
                  onChange={setCurrentStaffPage}
                />
              </div>
            </div>
            <div className="py-2 sm:w-1/3 w-full">
              <span className="text-xl leading-none text-gray-900 select-none pt-2 mr-auto">
                Task list
                <span className="italic text-base text-black-600"></span>
              </span>
              <div className="max-h-[450px] overflow-y-auto">
                <PrjAssignTaskTable />
              </div>
            </div>
          </div>
        </div>
        <div className="fixed bottom-4 right-5">
          <Tooltip content="Save">
            <Button color="primary" onClick={saveEvent}>
              Save
            </Button>
          </Tooltip>
        </div>
      </Modal>
    </div>
  );
};
export default ProjectAssignScreen;
