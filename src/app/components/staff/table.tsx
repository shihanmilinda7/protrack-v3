"use client";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import IconConfirmAlertbox from "../common-comp/icon-confirm-alertbox";
import StaffAddNew from "./addnew";
import { StaffObj } from "./types";
import { RiDeleteBin6Fill } from "react-icons/ri";

export const StaffTable = ({
  staffRowData,
  setReloadTable,
}: {
  staffRowData: StaffObj[];
  setReloadTable: () => void;
}) => {
  // const [reloadTable, setReloadTable] = useState(false);

  const tableHeads = [
    "#",
    "Name",
    "Username",
    "Contract Type",
    "Role",
    "Contact No",
    "Designation",
    "NIC",
    "",
  ];

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
            {staffRowData?.map((tableRow: any, index: number) => (
              <TableRow key={tableRow.staffid} className="">
                <TableCell>{index + 1}</TableCell>
                <TableCell className="w-40 text-ellipsis overflow-hidden">{tableRow.staffname}</TableCell>
                <TableCell>{tableRow.username}</TableCell>
                <TableCell>{tableRow.contracttype}</TableCell>
                <TableCell>{tableRow.role}</TableCell>
                <TableCell>{tableRow.contactno}</TableCell>
                <TableCell>{tableRow.designation}</TableCell>
                <TableCell>{tableRow.nic}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <StaffAddNew
                      setReloadTable={setReloadTable}
                      buttonName="Edit | Delete"
                      selRowData={tableRow}
                      delButton={true}
                    />
                    {/* <Button
                      isIconOnly
                      color="warning"
                      variant="faded"
                      aria-label="Create Item"
                    >
                      <RiDeleteBin5Line
                        onClick={() => handleDelete(tableRow.supplierid)}
                        className="inline-block h-6 w-6 text-red-700 hover:text-red-500 cursor-pointer"
                      />
                    </Button> */}
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
