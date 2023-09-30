"use client";

import Modal from "react-modal";

import { useState } from "react";
import { TaskObjectTypes } from "./types";
import { inputFieldValidation } from "@/app/utils/utils";
import { Button } from "@nextui-org/react";
import { MdOutlineEditNote } from "react-icons/md";
import NextAutoFocusTextInputField from "../common-comp/nextui-input-fields/next-autofocus-text-input-fields";
import NextTextInputField from "../common-comp/nextui-input-fields/next-text-input-fields";
import NextDateInputField from "../common-comp/nextui-input-fields/next-date-input-fields";
import IconConfirmAlertbox from "../common-comp/icon-confirm-alertbox";

const NewProjectTask = ({
  arrayUpdateFuntion,
  selRowObject,
  index,
  buttonName,
  delButton,
}: {
  arrayUpdateFuntion: (
    taskObject?: TaskObjectTypes,
    index?: number,
    options?: { deleteTask?: boolean; deltaskid?: number }
  ) => void;
  selRowObject?: TaskObjectTypes;
  index?: number;
  buttonName: string;
  delButton?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [taskid, setTaskid] = useState(selRowObject?.taskid ?? "");
  const [taskname, setTaskname] = useState(selRowObject?.taskname ?? "");
  const [taskdescription, setTaskdescription] = useState(
    selRowObject?.taskdescription ?? ""
  );
  const [startdate, setStartdate] = useState(selRowObject?.startdate ?? "");
  const [enddate, setEnddate] = useState(selRowObject?.enddate ?? "");

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
  };

  const addnewOrupdate = () => {
    setIsOpen(false);
    const validation = inputFieldValidation({
      taskname,
      taskdescription,
      startdate,
      enddate,
    });
    if (validation == 0) {
      // setIsOpen(false);
      arrayUpdateFuntion(
        { taskname, taskdescription, startdate, enddate },
        index
      );
    }

    // setLabel("");
    // setType("")
  };

  const deleteAction = () => {
    setIsOpen(false);
    const deleteTask: boolean | undefined = true;
    if (!taskid) {
      // console.log("no task id");
      arrayUpdateFuntion({}, index, { deleteTask });
    } else {
      // console.log("taskid", taskid);
      const deltaskid: any = taskid;
      arrayUpdateFuntion({}, index, { deleteTask, deltaskid });
    }
  };

  return (
    <div>
      {buttonName == "Edit Task" ? (
        <Button
          isIconOnly
          color="warning"
          variant="faded"
          aria-label="Create Item"
          className="mr-2"
        >
          <MdOutlineEditNote
            onClick={() => setIsOpen(true)}
            className="inline-block h-6 w-6 text-indigo-700 hover:text-indigo-500 cursor-pointer"
          />
        </Button>
      ) : (
        <Button color="primary" onClick={() => setIsOpen(true)}>
          New task
        </Button>
      )}
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="pb-1">
          <h1 className="text-2xl text-blue-800">{buttonName}</h1>
        </div>
        <div className="flex items-center justify-center">
          <div className="mx-auto w-full min-w-[550px] p-6">
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full flex flex-col gap-3">
                <NextAutoFocusTextInputField
                  label="Task name"
                  value={taskname}
                  onChange={(e) => setTaskname(e.target.value)}
                />
                <NextTextInputField
                  label="Task Description"
                  value={taskdescription}
                  onChange={(e) => setTaskdescription(e.target.value)}
                />
                <NextDateInputField
                  label="Start Date"
                  value={startdate}
                  onChange={(e) => setStartdate(e.target.value)}
                />
                <NextDateInputField
                  label="End Date"
                  value={enddate}
                  onChange={(e) => setEnddate(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center justify-center mt-3">
              <div className="flex gap-2">
                <Button
                  color="danger"
                  variant="faded"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </Button>
                <Button color="primary" onClick={addnewOrupdate}>
                  Add to List
                </Button>
              </div>
              <div
                className={delButton ? "flex ml-auto" : "flex ml-auto hidden"}
              >
                <IconConfirmAlertbox
                  buttonName="Delete"
                  leftButtonAction={deleteAction}
                  description="Do you want to delete this record ?"
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default NewProjectTask;
