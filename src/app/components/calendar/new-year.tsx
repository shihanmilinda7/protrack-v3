// "use client";

// import Modal from "react-modal";

// import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";
// import { Button, Radio, RadioGroup } from "@nextui-org/react";
// import { AiFillPlusCircle, AiFillSave } from "react-icons/ai";
// import { GiCancel } from "react-icons/gi";
// import { inputFieldValidation } from "@/app/utils/utils";
// import { MdOutlineEditNote } from "react-icons/md";
// import { RiDeleteBin5Line } from "react-icons/ri";

// import { useDispatch } from "react-redux";
// import NextAutoFocusTextInputField from "../common-comp/nextui-input-fields/next-autofocus-text-input-fields";
// import NextRadioGroup from "../common-comp/nextui-input-fields/next-radio-group";

// const AddNewYear = ({
//   isOpenPopup,
//   closePopup,
//   selectedDate,
//   updatDataSource,
//   nextid,
//   selDataSource,
//   dateChange,
// }: {
//   isOpenPopup: any;
//   closePopup: () => void;
//   selectedDate: any;
//   updatDataSource: (newSource: any, deleteItem?: any) => void;
//   nextid: any;
//   selDataSource: any;
//   dateChange: any;
// }) => {
//   const router = useRouter();
//   const dispatch = useDispatch();

//   //get pathname
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
//   const [isOpen, setIsOpen] = useState(false);

//   const { data: session, status } = useSession();

//   const [datasourceid, setDatasourceid] = useState("");
//   const [note, setNote] = useState("");
//   const [colourCode, setColourCode] = useState("");

//   const customStyles = {
//     overlay: {
//       backgroundColor: "rgba(0, 0, 0, 0.6)",
//       zIndex: 50,
//     },
//     content: {
//       top: "50%",
//       left: "50%",
//       right: "auto",
//       bottom: "auto",
//       marginRight: "-50%",
//       transform: "translate(-50%, -50%)",
//       background: "transparent",
//     },
//   };

//   const dateTypes = [
//     { name: "Public Holiday", value: "#ffff00" },
//     { name: "Anniversary", value: "#ffc100" },
//     { name: "Special Occasion Date", value: "#a2ff00" },
//     { name: "Seasonal Date", value: "#0092ff" },
//     { name: "Quarterly Date", value: "#5aff54" },
//     { name: "Month-End Date", value: "#007aff" },
//     { name: "Year-End/New Year's Eve", value: "#00ffbc" },
//     { name: "Historical Date", value: "#ff7300" },
//   ];
//   useEffect(() => {
//     setIsOpen(isOpenPopup);
//   }, [isOpenPopup, dateChange]);

//   useEffect(() => {
//     setNote(selDataSource ? selDataSource.name : "");
//     setColourCode(selDataSource ? selDataSource.color : "");
//   }, [selDataSource, dateChange]);

//   // const submitButtonHandler = async (
//   //   e: React.MouseEvent<HTMLButtonElement>
//   // ) => {
//   //   e.preventDefault();
//   //   if (selDataSource) {
//   //     // update();
//   //   } else {
//   //     addnew();
//   //   }
//   // };

//   const addnew = () => {
//     const sample = {
//       id: nextid,
//       name: note,
//       location: "San Francisco, CA",
//       startDate: new Date(selectedDate),
//       endDate: new Date(selectedDate),
//       color: colourCode,
//       uniqueKey: selectedDate,
//     };
//     updatDataSource(sample);
//     closePopup();
//   };

//   // const update = () => {
//   //   const sample = {
//   //     id: selDataSource.id,
//   //     name: note,
//   //     location: "San Francisco, CA",
//   //     startDate: new Date(selectedDate),
//   //     endDate: new Date(selectedDate),
//   //     color: colourCode,
//   //     uniqueKey: selectedDate,
//   //   };
//   //   // console.log("selDataSource.id", selDataSource.id);
//   //   updatDataSource(sample, selDataSource.id);
//   //   closePopup();
//   // };

//   const deleteDatasource = () => {
//     updatDataSource({}, selectedDate);
//     closePopup();
//   };
//   return (
//     <div className="px-2">
//       {/* <button
//         onClick={() => setIsOpen(true)}
//         className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
//       >
//         Create New - F2
//       </button> */}
//       <Modal
//         isOpen={isOpen}
//         onRequestClose={() => setIsOpen(false)}
//         shouldCloseOnOverlayClick={false}
//         style={customStyles}
//         ariaHideApp={false}
//       >
//         <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
//           <div className="font-medium self-center text-xl sm:text-xl text-gray-800 mr-auto">
//             {/* {JSON.stringify(dataSource)} */}
//             {selectedDate}
//           </div>
//           <div className="mt-5">
//             <div className="flex flex-col mb-6">
//               <div className="relative">
//                 <div>
//                   <NextAutoFocusTextInputField
//                     label="Note"
//                     value={note}
//                     onChange={(e) => setNote(e.target.value)}
//                   />
//                 </div>
//                 <div className="flex flex-col gap-3 mt-3">
//                   <NextRadioGroup
//                     label="Select date type"
//                     value={colourCode}
//                     onChange={setColourCode}
//                     radioArray={dateTypes}
//                   />
//                   {/* <RadioGroup
//                     label="Select date type"
//                     value={datetype}
//                     onValueChange={setDatetype}
//                   >
//                     <Radio value="buenos-aires">Buenos Aires</Radio>
//                     <Radio value="sydney">Sydney</Radio>
//                     <Radio value="san-francisco">San Francisco</Radio>
//                     <Radio value="london">London</Radio>
//                     <Radio value="tokyo">Tokyo</Radio>
//                   </RadioGroup> */}
//                   {/* <p className="text-default-500 text-small">
//                     Selected: {datetype}
//                   </p> */}
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-center justify-center gap-3">
//               <div className="">
//                 <Button color="danger" variant="faded" onClick={closePopup}>
//                   Close
//                 </Button>
//               </div>
//               <div>
//                 <Button color="primary" onClick={addnew}>
//                   Save
//                 </Button>
//               </div>
//               <div className={selDataSource ? "" : "hidden"}>
//                 <Button
//                   isIconOnly
//                   color="warning"
//                   variant="faded"
//                   aria-label="Create Item"
//                 >
//                   <RiDeleteBin5Line
//                     onClick={deleteDatasource}
//                     className="inline-block h-6 w-6 text-red-700 hover:text-red-500 cursor-pointer"
//                   />
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };
// export default NewCalendarEvent;
