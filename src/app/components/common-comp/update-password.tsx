"use client";

import Modal from "react-modal";

import { useState } from "react";
import TextInputField from "./input-fields/text-input-fields";
import DateInputField from "./input-fields/date-input-fields";
import ConfirmAlertbox from "./confirm-alertbox";
import { inputFieldValidation } from "@/app/utils/utils";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const UpdatePassword = () => {
  //get pathname
  let pathname: string = "";

  try {
    pathname = window.location.href;
    // console.log("pathname1", window.location.href);
  } catch (error) {}

  if (pathname) {
    const r: number = pathname.indexOf("/", 9);
    if (r !== -1) {
      pathname = pathname.substring(0, r);
    }
    // console.log("pathname", pathname);
  }

  const [isOpen, setIsOpen] = useState(false);

  const { data: session, status } = useSession();
  const userId = session?.user?.userid;

  const [oldpassword, setOldpassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [confirmnewpassword, setConfirmnewpassword] = useState("");

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: 50,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const updateNewPassword = async () => {
    const validation = inputFieldValidation({
      oldpassword,
      newpassword,
      confirmnewpassword,
    });
    try {
      if (validation == 0) {
        if (newpassword != confirmnewpassword) {
          toast.info("Password does not match!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          const response = await fetch(
            pathname + "/api/staff/update-password",
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userId,
                oldpassword,
                newpassword,
              }),
            }
          );
          const jsonResponse = await response.json();
          if (jsonResponse.message == "INCORRECT_OLD") {
            toast.info("Incorrect Old Password!", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          } else if (jsonResponse.message == "SUCCESS") {
            toast.success("Password updated successfully!", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            setIsOpen(false);
            setOldpassword("");
            setNewpassword("");
            setConfirmnewpassword("");
          }
        }
      }
    } catch (error) {
      toast.error("Error!", {
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
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        // className="hover:font-bold py-2 px-4 block whitespace-no-wrap bg-white text-xs p-4 border border-gray-100 shadow-md absolute right-0"
      >
        Setting
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="pl-8 pb-1">
          <h1 className="text-xl text-blue-800">Setting</h1>
        </div>
        <div className="flex items-center justify-center pl-12 pr-12">
          <div className="mx-auto w-full max-w-[550px]">
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3">
                <TextInputField
                  label="Old Password"
                  id="oldpassword"
                  name="oldpassword"
                  autoComplete=""
                  placeholder="Old Password"
                  value={oldpassword}
                  onChange={(e) => setOldpassword(e.target.value)}
                />
                <TextInputField
                  label="New Password"
                  id="newpassword"
                  name="newpassword"
                  autoComplete=""
                  placeholder="Task Description"
                  value={newpassword}
                  onChange={(e) => setNewpassword(e.target.value)}
                />
                <TextInputField
                  label="Confirm New Password"
                  id="confirmnewpassword"
                  name="confirmnewpassword"
                  autoComplete=""
                  placeholder="Confirm New Password"
                  value={confirmnewpassword}
                  onChange={(e) => setConfirmnewpassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="mr-3">
                <button
                  onClick={updateNewPassword}
                  className="rounded-lg bg-gradient-to-r from-green-500 to-green-600  hover:bg-gradient-to-l hover:from-green-500 hover:to-green-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
                >
                  Update
                </button>
              </div>
              <div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg bg-gradient-to-r from-amber-500 to-amber-600  hover:bg-gradient-to-l hover:from-amber-500 hover:to-amber-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default UpdatePassword;
