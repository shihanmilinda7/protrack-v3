"use client";

import Link from "next/link";
import NewProjectTask from "./project-task-addnew";
import { ProjectObjectTypes, TaskObjectTypes } from "./types";
import { AiFillEdit } from "react-icons/ai";
import { FcViewDetails } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { MdOutlineEditNote } from "react-icons/md";

export const ProjectTable = ({
  projectRowObjects,
}: {
  projectRowObjects: ProjectObjectTypes[];
}) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const userRole = session?.user?.role;

  const tableHeads = [
    "#",
    "Name",
    "Description",
    "Start Date",
    "End Date",
    "Status",
    " ",
  ];

  const iconCallBack = (projectid: any) => {
    router.push("/project/new-project?projectid=" + projectid);
  };
  return (
    <div className="md:px-2 py-2 sm:w-5/5 w-full">
      <div className="shadow rounded border-b border-gray-200 w-full">
        <Table isStriped aria-label="Example static collection table">
          <TableHeader>
            {tableHeads.map((head) => (
              <TableColumn key={head}>{head}</TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {projectRowObjects?.map((tableRow: any, index: number) => (
              <TableRow key={tableRow.projectid} className="">
                <TableCell>{index + 1}</TableCell>
                <TableCell>{tableRow.projectname}</TableCell>
                <TableCell>{tableRow.projectdescription}</TableCell>
                <TableCell>{tableRow.startdate}</TableCell>
                <TableCell>{tableRow.enddate}</TableCell>
                <TableCell>{tableRow.projectstatus}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {userRole == "User" ? (
                      <Button
                        isIconOnly
                        color="warning"
                        variant="faded"
                        aria-label="Create Item"
                        className="mr-2"
                      >
                        <MdOutlineEditNote
                          onClick={() => iconCallBack(tableRow.projectid)}
                          className="inline-block h-6 w-6 text-indigo-700 hover:text-indigo-500 cursor-pointer"
                        />
                      </Button>
                    ) : (
                      <Tooltip content={`Edit ${tableRow.projectname}`}>
                        <Button
                          isIconOnly
                          color="warning"
                          variant="faded"
                          aria-label="Create Item"
                          className="mr-2"
                        >
                          <MdOutlineEditNote
                            onClick={() => iconCallBack(tableRow.projectid)}
                            className="inline-block h-6 w-6 text-indigo-700 hover:text-indigo-500 cursor-pointer"
                          />
                        </Button>
                      </Tooltip>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
