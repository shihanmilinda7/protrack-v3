// "use client";

// import React, { useEffect, useState } from "react";
// import Calendar from "rc-year-calendar";
// import NewCalendarEvent from "./new-event";

// export const SetupCalendar = () => {
//   const currentYear = new Date().getFullYear();

//   const [dataSource, setDataSource] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [dateChange, setDateChange] = useState(false);
  
//   const [id, setId] = useState("");

//   const dayClickEvent = (dateString) =>{

//   }

//   const closePopup = () => {
//     setIsOpen(false);
//   };

//   const test = () => {
//     console.log("dataSource", dataSource);
//   };

//   const openPopup = (dateString) => {
//     setIsOpen(true);
//     setSelectedDate(dateString.date.toLocaleDateString());
//   };

//   const updatDataSource = (newDataSource: any) => {
//     const tmpDataSource = [...dataSource];
//     tmpDataSource.push(newDataSource);
//     setDataSource(tmpDataSource);
//     // console.log("dataSource", tmpDataSource);
//   };

//   useEffect(() => {
//     test();
//   }, [selectedDate]);

//   return (
//     <div className="">
//       <NewCalendarEvent
//         isOpenPopup={isOpen}
//         closePopup={closePopup}
//         selectedDate={selectedDate}
//         updatDataSource={updatDataSource}
//         nextid={dataSource.length}
//         selDataSource={dataSource}
//       />
//       <span className="text-2xl font-semibold leading-none text-gray-900 select-none pt-2 mr-auto pl-3">
//         <span className="text-indigo-600">Calendar - {currentYear}</span>
//       </span>
//       <div className="">
//         <Calendar
//           style="background"
//           dataSource={dataSource}
//           onDayClick={(e) => openPopup(e)}
//           displayHeader={false}
//         />
//       </div>
//       {/* {JSON.stringify(dataSource)} */}
//     </div>
//   );
// };
