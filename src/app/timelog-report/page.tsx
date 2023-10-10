"use client";
import { Provider } from "react-redux";
import ConfirmAlertbox from "@/app/components/common-comp/confirm-alertbox";
import DateInputField from "@/app/components/common-comp/input-fields/date-input-fields";
import SelectBoxInputField from "@/app/components/common-comp/input-fields/select-input-field";
import TextInputField from "@/app/components/common-comp/input-fields/text-input-fields";
// import Pagination from "@/app/components/common-comp/pagination";
import { WithRole } from "@/app/components/common-comp/withRole";
import Navbar from "@/app/components/navbar/navbar";
import NewProjectTask from "@/app/components/project/project-task-addnew";
import { ProjectTaskTable } from "@/app/components/project/project-task-table";
import { TaskObjectTypes } from "@/app/components/project/types";
import Spinner from "@/app/dashboard/loading";
import { inputFieldValidation } from "@/app/utils/utils";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PrjAssignStaffTable } from "../components/project-assign/staff-table";
import { PrjAssignProjectTable } from "../components/project-assign/project-table";
import { PrjAssignTaskTable } from "../components/project-assign/task-table";
import store from "@/store/store";
import { useSelector, useDispatch } from "react-redux";
import YearMonthSelector from "../components/common-comp/year-month-picker";
import { setsaved } from "@/store/saveSlice";
import { WorkDoneMonthSummaryTable } from "../components/work-done-report/month-summary-table";
import { setSearchDesignation, setSearchStaffName } from "@/store/searchSlice";
import { Input, Pagination } from "@nextui-org/react";
import NextListView from "../components/common-comp/nextui-input-fields/next-listview";
import { FaSearch } from "react-icons/fa";
import { ListboxWrapper } from "../components/common-comp/nextui-input-fields/ListboxWrapper";
import { TimelogSummaryTable } from "../components/timelog-report/month-summary-table";

export default function TimelogReport() {
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

  const router = useRouter();
  const { data: session, status } = useSession();

  //redux
  const year = useSelector((state: any) => state.yearMonthPickerReducer.year);
  const month = useSelector((state: any) => state.yearMonthPickerReducer.month);
  const dispatch = useDispatch();

  const [staffList, setStaffList] = useState<any[]>([]);
  const [dateObjects, setDateObjects] = useState([]);
  const [modifiedDateObjects, setModifiedDateObjects] = useState([]);
  // const [staffid, setStaffid] = useState<any>();
  const [staffname, setStaffname] = useState("Select from below...");
  const [currentStaffPage, setCurrentStaffPage] = useState(1);
  const [staffPageCount, setStaffPageCount] = useState(1);

  const [searchStaffName, setSearchStaffName] = useState("");
  const [searchDesignation, setSearchDesignation] = useState("");
  const [selectedStaffKey, setSelectedStaffKey] = useState(new Set([]));

  const staffid = React.useMemo(
    () => Array.from(selectedStaffKey).join(", "),
    [selectedStaffKey]
  );

  useEffect(() => {
    const matchingStaff = staffList.find((s) => s.value == staffid);
    // console.log("matchingStaff",matchingStaff,)
    if (matchingStaff) {
      setStaffname(matchingStaff.name);
    }
  }, [selectedStaffKey]);

  useEffect(() => {
    fetchStaffdata(currentStaffPage);
  }, [currentStaffPage]);

  useEffect(() => {
    fetchStaffdata(1);
  }, [searchStaffName, searchDesignation]);

  useEffect(() => {
    if (staffid) {
      getMonthDates();
    }
  }, [year, month, staffid]);

  useEffect(() => {
    fetchTimelogEvents();
  }, [dateObjects]);

  const fetchStaffdata = async (pageNumber) => {
    const fetchData = async () => {
      const reponse = await fetch(
        pathname +
          "/api/staff/get-staff?page-number=" +
          pageNumber +
          "&search-staff-name=" +
          (searchStaffName ? searchStaffName : "-1") +
          "&search-designation=" +
          (searchDesignation ? searchDesignation : "-1")
      );
      const res = await reponse.json();

      const modifiedStaffData = res.staff?.map((s) => ({
        // name: s.staffname + " - " + s.designation + "",
        name: `${s.staffname} / ${s.designation} (${s.contracttype})`,
        value: s.staffid,
      }));
      setStaffList(modifiedStaffData);
      const tmpCount = Math.ceil(res.totalStaffCount / 10);
      setStaffPageCount(tmpCount);
    };
    // call the function
    if (searchStaffName != null && searchDesignation != null) {
      fetchData().catch(console.error);
    }
  };

  const getMonthDates = () => {
    const tmpMonth = month - 1;
    const startDate = new Date(year, tmpMonth, 1); // First day of the current month
    const endDate = new Date(year, tmpMonth + 1, 0); // Last day of the current month

    const allDateObjects = [];

    for (
      let date = startDate;
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
      const dayDate = date.getDate().toString().padStart(2, "0");

      allDateObjects.push({ dayName, dayDate });
    }

    setDateObjects(allDateObjects);
  };

  const fetchTimelogEvents = async () => {
    const fetchData = async () => {
      const reponse = await fetch(
        pathname +
          "/api/timelog-report?date=" +
          `${year}-${month.toString().padStart(2, "0")}` +
          "&staffid=" +
          staffid
      );
      const res = await reponse.json();
      // console.log("res", res);
      let modifiedData: any[] = [];
      for (let i = 0; i < dateObjects.length; i++) {
        const element = dateObjects[i];

        const result = res.timelogData.filter(
          (dateString) => dateString.date.slice(-2) == element.dayDate
        );
        // console.log("result",result[0]?.workingType,)
        const tmlStatus =
          result.lenght > 0 || result ? result[0]?.workingType : "-";
        const tmlObj = {
          ...element,
          status: tmlStatus,
          totaltime: result[0]?.totalHours ?? "0",
          taskdetails: result[0]?.taskdetails,
        };
        // console.log("tmlObj", modifiedData);
        modifiedData.push(tmlObj);
      }

      setModifiedDateObjects(modifiedData);
    };
    // call the function
    if (year && month && staffid) {
      fetchData().catch(console.error);
    }
  };
  // for staff table pagination update
  //for staff table pagination update search
  // useEffect(() => {
  //   const tmpStaffName = rSearchStaffName ?? "-1";
  //   const tmpDesignation = rSearchDesignation ?? "-1";
  //   const fetchData = async () => {
  //     const reponse = await fetch(
  //       pathname +
  //         "/api/staff/get-staff?page-number=1&search-staff-name=" +
  //         (rSearchStaffName ? rSearchStaffName : "-1") +
  //         "&search-designation=" +
  //         (rSearchDesignation ? rSearchDesignation : "-1")
  //     );
  //     const res = await reponse.json();
  //     setStaffRowObjects(res.staff);
  //     const tmpCount = Math.ceil(res.totalStaffCount / 10);
  //     setStaffPageCount(tmpCount);
  //     // call the function
  //   };
  //   if (rSearchStaffName != null && rSearchDesignation != null) {
  //     fetchData().catch(console.error);
  //   }
  // }, [rSearchStaffName, rSearchDesignation]);
  //for task table pagination update                                                 TO DOOOOOOOOO
  // useEffect(() => {
  //   if (staffid) {
  //     // console.log("timeAllocSummaryTablePage",timeAllocSummaryTablePage,)
  //     const startdate: any = year + "-0" + month + "-01";
  //     const enddate: any = year + "-0" + month + "-31";
  //     getMonthSummary(staffid, startdate, enddate);
  //   }
  // }, [year, month]);

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
        <div className="flex items-center justify-center p-1 pl-4">
          <div className=" mr-auto">
            <span className="text-2xl font-semibold leading-none text-gray-900 select-none mr-auto">
              <span className="text-indigo-600">
                Monthly achievements summary
              </span>
            </span>
          </div>
          <div className="mr-4 mt-1">
            <YearMonthSelector />
          </div>
        </div>

        <div className="flex">
          <div className="w-1/4 pl-4">
            <div className="flex overflow-hidden">
              <span className="text-xl font-semibold leading-none text-indigo-700 select-none pt-2 mr-auto">
                Name :
                <span className="text-indigo-600 italic text-base">
                  {staffname}
                </span>
              </span>
            </div>
            <div>
              <ListboxWrapper>
                <div className="flex gap-2">
                  <Input
                    isClearable
                    startContent={
                      <FaSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0 h-4 w-4" />
                    }
                    color="primary"
                    label="Search by name"
                    placeholder="Type to search..."
                    variant="flat"
                    value={searchStaffName}
                    onChange={(e) => setSearchStaffName(e.target.value)}
                    onClear={() => setSearchStaffName("")}
                  />
                  <Input
                    isClearable
                    startContent={
                      <FaSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0 h-4 w-4" />
                    }
                    color="primary"
                    label="Search by desigantion"
                    placeholder="Type to search..."
                    variant="flat"
                    value={searchDesignation}
                    onChange={(e) => setSearchDesignation(e.target.value)}
                    onClear={() => setSearchDesignation("")}
                  />
                </div>
                <NextListView
                  value={selectedStaffKey}
                  onChange={setSelectedStaffKey}
                  listArray={staffList}
                />
              </ListboxWrapper>
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
          </div>
          <div className="ml-2 w-3/4 pl-1 mr-3">
            <div className="flex overflow-hidden">
              <span className="text-xl font-semibold leading-none text-gray-900 select-none pt-2 mr-auto">
                <span className="text-indigo-600">Monthly summary</span>
              </span>
            </div>
            <div className="h-7">
              <div className="max-h-[80vh] overflow-y-auto">
                <TimelogSummaryTable rowObjectIn={modifiedDateObjects} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </WithRole>
  );
}

{
  /* </Provider> </WithRole>*/
}
