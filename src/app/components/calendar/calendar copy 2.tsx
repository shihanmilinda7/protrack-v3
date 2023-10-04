// "use client";

// import React, { useEffect, useState } from "react";
// import Calendar from "rc-year-calendar";
// import NewCalendarEvent from "./new-event";

// export const SetupCalendar = () => {
//   const currentYear = new Date().getFullYear();

//   const [isOpen, setIsOpen] = useState(false);
//   const [dateChange, setDateChange] = useState(false);

//   const [dataSource, setDataSource] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [selDataSource, setSelDataSource] = useState("");

//   const openPopup = () => {
//     setIsOpen(true);
//   };

//   const closePopup = () => {
//     setIsOpen(false);
//   };

//   const dayClickEvent = (dateString) => {
//     setDateChange((prv: boolean) => !prv);
//     setSelectedDate(dateString.date.toLocaleDateString());
//     openPopup();
//   };

//   const updatDataSource = (newDataSource: any, id?: any) => {
//     const tmpDataSource = [...dataSource];

//     if (id || id == 0) {
//       const indexFound = tmpDataSource.findIndex((d) => d.id === id);
//       if (indexFound !== -1) {
//         tmpDataSource[indexFound].name = newDataSource.name;
//         tmpDataSource[indexFound].color = newDataSource.color;
//         setDataSource(tmpDataSource);
//       }
//     } else {
//       tmpDataSource.push(newDataSource);
//       setDataSource(tmpDataSource);
//     }
//   };

//   useEffect(() => {
//     //todo......
//     if (selectedDate) {
//       const dateFound = dataSource.find((d) => d.uniqueKey == selectedDate);
//       if (dateFound) {
//         setSelDataSource(dateFound);
//       }
//     }
//   }, [dateChange]);

//   return (
//     <div className="">
//       <NewCalendarEvent
//         isOpenPopup={isOpen}
//         closePopup={closePopup}
//         selectedDate={selectedDate}
//         updatDataSource={updatDataSource}
//         nextid={dataSource.length}
//         selDataSource={selDataSource}
//         dateChange={dateChange}
//       />
//       <span className="text-2xl font-semibold leading-none text-gray-900 select-none pt-2 mr-auto pl-3">
//         <span className="text-indigo-600">Calendar - {currentYear}</span>
//       </span>
//       <div className="">
//         <Calendar
//           style="background"
//           dataSource={dataSource}
//           onDayClick={(e) => dayClickEvent(e)}
//           displayHeader={false}
//         />
//       </div>
//       {JSON.stringify(dataSource)}
//     </div>
//   );
// };
// // if (isOpenPopup) {
// //   const tmpDate = new Date(selectedDate);
// //   console.log("tmpDate.toISOString()", tmpDate.toISOString());
// //   // const dateFound = dataSource.find(d => d.startDate == )
// // }
// // test();
