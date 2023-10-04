"use client";

import Modal from "react-modal";

import React, { useState } from "react";
import { TaskObjectTypes } from "./types";
import { inputFieldValidation } from "@/app/utils/utils";
import {
  Accordion,
  AccordionItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import { MdOutlineEditNote } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
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
    taskObject?: any,
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

  const itemClasses = {
    base: "py-0 w-full",
    title: "font-normal text-medium",
    trigger:
      "py-0 data-[hover=true]:bg-gray-200 rounded-lg h-14 flex items-center",
    indicator: "text-medium",
    content: "text-small px-2",
  };

  const addnewOrupdate = () => {
    const validation = inputFieldValidation({
      taskname,
      taskdescription,
      startdate,
      enddate,
    });
    if (validation == 0) {
      setIsOpen(false);
      // setIsOpen(false);
      arrayUpdateFuntion(
        { taskname, taskdescription, startdate, enddate, show: true },
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

  const [selectedKeys, setSelectedKeys] = useState<any>([]);
  const columns = [
    {
      key: "name",
      label: "NAME",
    },
  ];
  const rows = [
    {
      key: "1",
      name: "Tony Reichert",
      role: "CEO",
      status: "Active",
    },
    {
      key: "2",
      name: "Zoey Lang",
      role: "Technical Lead",
      status: "Paused",
    },
    {
      key: "3",
      name: "Jane Fisher",
      role: "Senior Developer",
      status: "Active",
    },
    {
      key: "4",
      name: "William Howard",
      role: "Community Manager",
      status: "Vacation",
    },
  ];
  // const selectedValue = React.useMemo(
  //   () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
  //   [selectedKeys]
  // );
  const selectedValue = React.useMemo(() => {}, [selectedKeys]);
  // const selectedValue = React.useMemo(() => {
  //   const selectedNamesAndRoles = rows
  //     .filter((row) => selectedKeys.includes(row.key))
  //     .map((row) => `${row.name} - ${row.role}`)
  //     .join(", ");

  //   return selectedNamesAndRoles;
  // }, [selectedKeys, rows]);
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
            <div className="flex flex-wrap">
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
            <h1>{JSON.stringify(selectedValue)}</h1>
            {/* <div className="max-w-[550px]">
              <Accordion
                showDivider={false}
                className="flex flex-col gap-1 w-full mt-3"
                variant="shadow"
                itemClasses={itemClasses}
              >
                <AccordionItem
                  aria-label="Add members"
                  startContent={<HiUserGroup className="text-primary" />}
                  subtitle={
                    <p className="flex">
                      <p className="text-primary">Assign members for task</p>
                    </p>
                  }
                  title="Add members"
                >
                  <div className="max-h-[200px] overflow-y-auto">
                    <Table
                      aria-label="Controlled table example with dynamic content"
                      selectionMode="multiple"
                      selectedKeys={selectedKeys}
                      onSelectionChange={setSelectedKeys}
                    >
                      <TableHeader columns={columns}>
                        {(column) => (
                          <TableColumn key={column.key}>
                            {column.label}
                          </TableColumn>
                        )}
                      </TableHeader>

                      <TableBody items={rows}>
                        {(item) => (
                          <TableRow key={item.key}>
                            {(columnKey) => (
                              <TableCell>
                                {getKeyValue(item, columnKey)}
                              </TableCell>
                            )}
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </AccordionItem>
              </Accordion>
            </div> */}
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
