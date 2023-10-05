import { toast } from "react-toastify";

export function inputFieldValidation(array) {
  // const array= { staffid, clientname, categoryid, location, visitcount }
  let emptyArray: string[] = [];

  for (const key in array) {
    if (!array[key]) {
      // console.log("array1[key]",Object.keys(array1),)
      emptyArray.push(key + " ");
    }
  }

  if (emptyArray.length > 0) {
    toast.info(`${emptyArray} can not be empty!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
  return emptyArray.length;
  // const array = [staffid, clientname, categoryid, location, visitcount]
  // let emptyArray = [];
  // for (let index = 0; index < array.length; index++) {
  //   const element = array[index];
  //   if (!element) {

  //     emptyArray.push(Object.keys(array1)[index])

  //   }
  // }
  // console.log("emptyArray", emptyArray,)
  // toast.info(`${emptyArray} can not be empty!`, {
  //   position: "top-right",
  //   autoClose: 1000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   progress: undefined,
  //   theme: "colored",
  // });

  // return emptyArray.length;
}
