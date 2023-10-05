// "use client";

// import React, { useEffect, useState } from "react";
// import Navbar from "../components/navbar/navbar";
// import StaffAddNew from "../components/staff/addnew";
// import { StaffTable } from "../components/staff/table";
// import { StaffObj } from "../components/staff/types";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { WithRole } from "../components/common-comp/withRole";
// import Spinner from "../dashboard/loading";
// import {
//   Button,
//   Input,
//   Listbox,
//   ListboxItem,
//   Pagination,
// } from "@nextui-org/react";
// import { SetupCalendar } from "../components/calendar/calendar";
// import NextListView from "../components/common-comp/nextui-input-fields/next-listview";
// import { MdNewLabel, MdOutlineDownloadDone } from "react-icons/md";
// import { ListboxWrapper } from "../components/common-comp/nextui-input-fields/ListboxWrapper";
// import NextNumberInputField from "../components/common-comp/nextui-input-fields/next-number-input-fields";
// import { toast } from "react-toastify";

// export default function Calendar() {
//   const router = useRouter();
//   const { data: session, status } = useSession();
//   const currentYear = new Date().getFullYear();
//   const currentCountry = "Sri Lanka";

//   let pathname: string = "";

//   try {
//     pathname = window.location.href;
//   } catch (error) {}

//   if (pathname) {
//     const r: number = pathname.indexOf("/", 9);
//     if (r !== -1) {
//       pathname = pathname.substring(0, r);
//     }
//   }

//   const [yearList, setYearList] = useState([]);
//   const [countryList, setCountryList] = useState([]);

//   const [newYear, setNewYear] = useState("");
//   const [newCountry, setNewCountry] = useState("");

//   const [selectedYearKey, setSelectedYearKey] = useState(
//     new Set([currentYear.toString()])
//   );

//   const [selectedCountryKey, setSelectedCountryKey] = useState(
//     new Set(["Sri Lanka"])
//   );

//   const selectedYearValue = React.useMemo(
//     () => Array.from(selectedYearKey).join(", "),
//     [selectedYearKey]
//   );

//   const selectedCountryValue = React.useMemo(
//     () => Array.from(selectedCountryKey).join(", "),
//     [selectedCountryKey]
//   );

//   const [transformedYear, setTransformedYear] = useState(false);
//   const [transformedCountry, setTransformedCountry] = useState(false);

//   const yearHandleButtonClick = () => {
//     setTransformedYear(!transformedYear);
//   };

//   const countryHandleButtonClick = () => {
//     setTransformedCountry(!transformedCountry);
//   };

//   const fetchYearData = async () => {
//     const fetchData = async () => {
//       const reponse = await fetch(pathname + "/api/setup-calendar/get-years");
//       const res = await reponse.json();
//       //set year list
//       const modifiedYearData = res.years.map((y) => ({
//         name: y.year,
//         value: y.year,
//       }));
//       const existsYear = modifiedYearData.find(
//         (item) => item.name == currentYear
//       );
//       if (!existsYear) {
//         modifiedYearData.unshift({ name: currentYear, value: currentYear });
//       }
//       setYearList(modifiedYearData);

//       //set country list
//       const modifiedCountryData = res.countries.map((y) => ({
//         name: y.country,
//         value: y.country,
//       }));
//       const existsCounrty = modifiedCountryData.find(
//         (item) => item.name == currentCountry
//       );
//       console.log("res.countries", modifiedCountryData, res.countries);

//       if (!existsCounrty) {
//         modifiedCountryData.unshift({
//           name: currentCountry,
//           value: currentCountry,
//         });
//       }
//       setCountryList(modifiedCountryData);
//     };
//     // call the function
//     fetchData().catch(console.error);
//   };

//   useEffect(() => {
//     fetchYearData();
//   }, []);

//   const addnewYear = () => {
//     if (newYear.length == 4) {
//       const tmpYearList = [...yearList];
//       const exists = tmpYearList.find((item) => item.name == newYear);

//       if (!exists) {
//         tmpYearList.unshift({ name: newYear, value: newYear });
//       }
//       setYearList(tmpYearList);
//       setSelectedYearKey(new Set([newYear.toString()]));
//       yearHandleButtonClick();
//     } else {
//       toast.info(`Year sholud be 4 numbers but got ${newYear.length}`, {
//         position: "top-right",
//         autoClose: 1000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//       });
//     }
//   };

//   if (status === "loading") {
//     return (
//       <div>
//         <Spinner />
//       </div>
//     );
//   }

//   if (!session) {
//     router.push("/"); // Redirect to login page if not authenticated
//     return null;
//   }

//   return (
//     <WithRole roles={["Admin", "Manager"]}>
//       <div>
//         <Navbar />
//         <div className="flex items-center justify-center p-4 flex-col">
//           {/* sel year - {selectedYearValue} {JSON.stringify(countryList)} */}
//           <div className="flex">
//             <div className="flex flex-col gap-2">
//               <ListboxWrapper>
//                 <span className="text-base font-semibold leading-none text-gray-900 select-none pt-2 mr-auto pl-2">
//                   <span className="text-indigo-600">Year list</span>
//                 </span>
//                 <NextListView
//                   value={selectedYearKey}
//                   onChange={setSelectedYearKey}
//                   listArray={yearList}
//                 />
//                 <Button
//                   color="primary"
//                   variant="bordered"
//                   startContent={<MdNewLabel className="h-6 w-6" />}
//                   onClick={yearHandleButtonClick}
//                 >
//                   Add new
//                 </Button>
//                 <div
//                   className={`${
//                     transformedYear
//                       ? "transform transition-transform ease-out duration-300 flex gap-2 flex-col"
//                       : "hidden"
//                   }`}
//                 >
//                   <Input
//                     type="number"
//                     label=""
//                     placeholder={currentYear.toString()}
//                     labelPlacement="outside"
//                     className="pt-2"
//                     onChange={(e) => setNewYear(e.target.value)}
//                     value={newYear}
//                   />
//                   <Button color="primary" onClick={addnewYear}>
//                     Save
//                   </Button>
//                 </div>
//               </ListboxWrapper>
//               <ListboxWrapper>
//                 <span className="text-base font-semibold leading-none text-gray-900 select-none pt-2 mr-auto pl-2">
//                   <span className="text-indigo-600">Country list</span>
//                 </span>
//                 <NextListView
//                   value={selectedCountryKey}
//                   onChange={setSelectedCountryKey}
//                   listArray={countryList}
//                 />
//                 <Button
//                   color="primary"
//                   variant="bordered"
//                   startContent={<MdNewLabel className="h-6 w-6" />}
//                   onClick={countryHandleButtonClick}
//                 >
//                   Add new
//                 </Button>
//                 <div
//                   className={`${
//                     transformedCountry
//                       ? "transform transition-transform ease-out duration-300 flex gap-2 flex-col"
//                       : "hidden"
//                   }`}
//                 >
//                   <Input
//                     type="number"
//                     label=""
//                     placeholder={currentYear.toString()}
//                     labelPlacement="outside"
//                     className="pt-2"
//                     onChange={(e) => setNewYear(e.target.value)}
//                     value={newYear}
//                   />
//                   <Button color="primary" onClick={addnewYear}>
//                     Save
//                   </Button>
//                 </div>
//               </ListboxWrapper>
//               {/* <Listbox
//                 items={years}
//                 aria-label="Dynamic Actions"
//                 onAction={(key) => alert(key)}
//               >
//                 {years.map((year) => (
//                   <ListboxItem key={year} value={year}>
//                     {year}
//                   </ListboxItem>
//                 ))}
//               </Listbox> */}
//             </div>
//             <div className="">
//               <SetupCalendar
//                 year={selectedYearValue}
//                 country={selectedCountryValue}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </WithRole>
//   );
// }
