// "use client";

// import React, { useEffect, useState } from "react";
// import Modal from "react-modal";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
// import { inputFieldValidation } from "@/app/utils/utils";
// import { Button } from "@nextui-org/react";
// import NextAutoFocusTextInputField from "../common-comp/nextui-input-fields/next-autofocus-text-input-fields";
// import NextTextInputField from "../common-comp/nextui-input-fields/next-text-input-fields";
// import NextSelectInputField from "../common-comp/nextui-input-fields/next-select-input-fields";
// import { handleSelectChangeEvent } from "../utils";
// import { MdOutlineEditNote } from "react-icons/md";
// import IconConfirmAlertbox from "../common-comp/icon-confirm-alertbox";
// import CountrySelector from "../country-selector/selector";
// import { COUNTRIES } from "../country-selector/countries";

// const TimelogModal = ({
//   isOpenPopup,
//   closePopup,
//   selectedDate,
// }: {
//   isOpenPopup: any;
//   closePopup: () => void;
//   selectedDate: any;
// }) => {
//   const router = useRouter();

//   const [isOpen, setIsOpen] = useState(false);

//   const customStyles = {
//     overlay: {
//       zIndex: 50,
//       backgroundColor: "rgba(0, 0, 0, 0.6)",
//     },
//     content: {
//       top: "50%",
//       left: "50%",
//       right: "auto",
//       bottom: "auto",
//       marginRight: "-50%",
//       transform: "translate(-50%, -50%)",
//       padding: "10px",
//     },
//   };

//   useEffect(() => {
//     setIsOpen(isOpenPopup);
//   }, [isOpenPopup]);

//   return (
//     <div>
//       <Modal
//         isOpen={isOpen}
//         onRequestClose={() => setIsOpen(false)}
//         shouldCloseOnOverlayClick={false}
//         style={customStyles}
//         ariaHideApp={false}
//       >
//         <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
//           <div className="font-medium self-center text-xl sm:text-xl text-gray-800 mr-auto">
//             Time log for {selectedDate}
//           </div>
//           <div className="mt-5">
//             <div className="flex flex-col mb-6">
//               <div className="relative">
//                 <div>
//                   {/* <NextAutoFocusTextInputField
//                     label="Note"
//                     value={note}
//                     onChange={(e) => setNote(e.target.value)}
//                   /> */}
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
//                 <Button color="primary">Save</Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };
// export default TimelogModal;
