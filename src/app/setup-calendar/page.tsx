"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import StaffAddNew from "../components/staff/addnew";
import { StaffTable } from "../components/staff/table";
import { StaffObj } from "../components/staff/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { WithRole } from "../components/common-comp/withRole";
import Spinner from "../dashboard/loading";
import {
  Button,
  Input,
  Listbox,
  ListboxItem,
  Pagination,
} from "@nextui-org/react";
import { SetupCalendar } from "../components/calendar/calendar";
import NextListView from "../components/common-comp/nextui-input-fields/next-listview";
import { MdNewLabel, MdOutlineDownloadDone } from "react-icons/md";
import { ListboxWrapper } from "../components/common-comp/nextui-input-fields/ListboxWrapper";
import NextNumberInputField from "../components/common-comp/nextui-input-fields/next-number-input-fields";
import { toast } from "react-toastify";

export default function Calendar() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const currentYear = new Date().getFullYear();

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

  const [yearList, setYearList] = useState([]);
  const [newYear, setNewYear] = useState("");
  const [selectedKey, setSelectedKey] = useState(
    new Set([currentYear.toString()])
  );
  const selectedValue = React.useMemo(
    () => Array.from(selectedKey).join(", "),
    [selectedKey]
  );

  const [transformed, setTransformed] = useState(false);

  const handleButtonClick = () => {
    setTransformed(!transformed);
  };

  const fetchYearData = async () => {
    const fetchData = async () => {
      const reponse = await fetch(pathname + "/api/setup-calendar/get-years");
      const res = await reponse.json();
      const modifiedData = res.years.map((y) => ({
        name: y.year,
        value: y.year,
      }));

      const exists = modifiedData.find((item) => item.name == currentYear);

      if (!exists) {
        modifiedData.unshift({ name: currentYear, value: currentYear });
      }
      setYearList(modifiedData);
    };
    // call the function
    fetchData().catch(console.error);
  };

  useEffect(() => {
    fetchYearData();
  }, []);

  const addnewYear = () => {
    if (newYear.length == 4) {
      const tmpYearList = [...yearList];
      const exists = tmpYearList.find((item) => item.name == newYear);

      if (!exists) {
        tmpYearList.unshift({ name: newYear, value: newYear });
      }
      setYearList(tmpYearList);
      setSelectedKey(new Set([newYear.toString()]));
      handleButtonClick();
    } else {
      toast.info(`Year sholud be 4 numbers but got ${newYear.length}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
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
    <WithRole roles={["Admin", "Manager"]}>
      <div>
        <Navbar />
        <div className="flex items-center justify-center p-4 flex-col">
          {/* sel year - {selectedValue} {JSON.stringify(yearList)} */}
          <div className="flex">
            <div className="">
              <ListboxWrapper>
                <NextListView
                  value={selectedKey}
                  onChange={setSelectedKey}
                  listArray={yearList}
                />
                <Button
                  color="primary"
                  variant="bordered"
                  startContent={<MdNewLabel className="h-6 w-6" />}
                  onClick={handleButtonClick}
                >
                  Add new
                </Button>
                <div
                  className={`${
                    transformed
                      ? "transform transition-transform ease-out duration-300 flex gap-2 flex-col"
                      : "hidden"
                  }`}
                >
                  <Input
                    type="number"
                    label=""
                    placeholder={currentYear.toString()}
                    labelPlacement="outside"
                    className="pt-2"
                    onChange={(e) => setNewYear(e.target.value)}
                    value={newYear}
                  />
                  <Button color="primary" onClick={addnewYear}>
                    Save
                  </Button>
                </div>
              </ListboxWrapper>
              {/* <Listbox
                items={years}
                aria-label="Dynamic Actions"
                onAction={(key) => alert(key)}
              >
                {years.map((year) => (
                  <ListboxItem key={year} value={year}>
                    {year}
                  </ListboxItem>
                ))}
              </Listbox> */}
            </div>
            <div className="">
              <SetupCalendar year={selectedValue} />
            </div>
          </div>
        </div>
      </div>
    </WithRole>
  );
}
