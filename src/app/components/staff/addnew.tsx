"use client";

import React, { useState } from "react";
import Modal from "react-modal";
import { StaffObj } from "./types";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { inputFieldValidation } from "@/app/utils/utils";
import { Button } from "@nextui-org/react";
import NextAutoFocusTextInputField from "../common-comp/nextui-input-fields/next-autofocus-text-input-fields";
import NextTextInputField from "../common-comp/nextui-input-fields/next-text-input-fields";
import NextSelectInputField from "../common-comp/nextui-input-fields/next-select-input-fields";
import { handleSelectChangeEvent } from "../utils";
import { MdOutlineEditNote } from "react-icons/md";
import IconConfirmAlertbox from "../common-comp/icon-confirm-alertbox";
import CountrySelector from "../country-selector/selector";
import { COUNTRIES } from "../country-selector/countries";
import { SelectMenuOption } from "../country-selector/types";

type ParamTypes = {
  buttonName: string;
  selRowData?: StaffObj;
  delButton?: boolean;
  setReloadTable?: () => void;
  showAddnewAlert?: () => void;
};

const StaffAddNew = (params: ParamTypes) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [staffid, setStaffid] = useState(params.selRowData?.staffid ?? "");
  const [staffname, setStaffname] = useState(
    params.selRowData?.staffname ?? ""
  );
  const [username, setUsername] = useState(params.selRowData?.username ?? "");
  const [contracttype, setContracttype] = useState(
    params.selRowData?.contracttype
      ? new Set([params.selRowData?.contracttype.toString()])
      : new Set([])
  );
  const [contactno, setContactno] = useState(
    params.selRowData?.contactno ?? ""
  );
  const [designation, setDesignation] = useState(
    params.selRowData?.designation
      ? new Set([params.selRowData?.designation.toString()])
      : new Set([])
  );
  const [nic, setNic] = useState(params.selRowData?.nic ?? "");
  const [password, setPassword] = useState(params.selRowData?.password ?? "");
  const [role, setRole] = useState(
    params.selRowData?.role
      ? new Set([params.selRowData?.role.toString()])
      : new Set([])
  );
  const [confirmpassword, setConfirmpassword] = useState(
    params.selRowData?.password ?? ""
  );
  const [userid, setUserid] = useState(params.selRowData?.userid ?? "");

  const [showDelButton, setShowDelButton] = useState(params.delButton);

  const [successfulToast, setSuccessfulToast] = useState(false);
  const closeButtonAction = () => {
    setSuccessfulToast(false);
  };

  const [isCountryListOpen, setIsCountryListOpen] = useState(false);
  const [country, setCountry] = useState<any["value"]>(
    params.selRowData?.country ?? "LK"
  );

  const customStyles = {
    overlay: {
      zIndex: 50,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "10px",
    },
  };

  const roleOptionValues = [
    { value: "Admin", name: "Admin" },
    { value: "Manager", name: "Manager" },
    { value: "User", name: "User" },
  ];

  const contractTypeOptionValues = [
    { value: "Training", name: "Training" },
    { value: "Probation", name: "Probation" },
    { value: "Permanent", name: "Permanent" },
    { value: "Contract", name: "Contract" },
    { value: "Assigment", name: "Assigment" },
    { value: "Casual", name: "Casual" },
  ];

  const designationOptionValues = [
    { value: "Software Engineer", name: "Software Engineer" },
    { value: "Front-End Developer", name: "Front-End Developer" },
    { value: "Back-End Developer", name: "Back-End Developer" },
    { value: "Full-Stack Developer", name: "Full-Stack Developer" },
    { value: "Software Architect", name: "Software Architect" },
    { value: "Lead Developer", name: "Lead Developer" },
    { value: "DevOps Engineer", name: "DevOps Engineer" },
    {
      value: "Quality Assurance (QA) Engineer",
      name: "Quality Assurance (QA) Engineer",
    },
    { value: "Product Manager", name: "Product Manager" },
    { value: "UI/UX Designer", name: "UI/UX Designer" },
    { value: "Data Engineer", name: "Data Engineer" },
    { value: "Security Engineer ", name: "Security Engineer " },
  ];

  const submitButtonHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (staffid) {
      update();
    } else {
      addnew();
    }
  };

  const usernameValidation = async (
    username: string,
    staffid?: number | string
  ) => {
    console.log("staffid", staffid);
    // staffid
    const reponse = await fetch(
      "api/staff/username-validation?username=" +
        username +
        "&staffid=" +
        staffid
    );
    const res = await reponse.json();
    return res.message;
  };

  //add new staff action
  const addnew = async () => {
    const Contracttype = contracttype.values().next().value;
    const Role = role.values().next().value;
    const Designation = designation.values().next().value;
    const validation = inputFieldValidation({
      staffname,
      Contracttype,
      contactno,
      nic,
      password,
      username,
      Role,
      Designation,
      country,
    });
    try {
      //check input field empty or not
      if (validation == 0) {
        //password validation
        if (password != confirmpassword) {
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
          //username validation
          const tmpUsernameValidation = await usernameValidation(username, 0);
          if (tmpUsernameValidation != "FAIL") {
            toast.info("Username already exists!", {
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
            //api call
            const responseNewStaff = await fetch("api/staff", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                staffname,
                contracttype: contracttype.values().next().value,
                contactno,
                nic,
                password,
                username,
                role: role.values().next().value,
                designation: designation.values().next().value,
                country,
              }),
            });
            const res = await responseNewStaff.json();

            if (res == "SUCCESS") {
              setIsOpen(false);
              if (params.setReloadTable) {
                params.setReloadTable();
              }
              toast.success("Staff created successfully!", {
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
  //update staff action
  const update = async () => {
    const Contracttype = contracttype.values().next().value;
    const Role = role.values().next().value;
    const Designation = designation.values().next().value;
    const validation = inputFieldValidation({
      staffname,
      Contracttype,
      contactno,
      nic,
      password,
      username,
      Role,
      Designation,
      country,
    });

    try {
      //check input field empty or not
      if (validation == 0) {
        //password validation
        if (password != confirmpassword) {
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
          //username validation
          const tmpUsernameValidation = await usernameValidation(
            username,
            staffid
          );
          if (tmpUsernameValidation != "FAIL") {
            toast.info("Username already exists!", {
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
            //api call
            const responseUpdateStaff = await fetch("api/staff", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userid,
                staffid,
                staffname,
                contracttype: contracttype.values().next().value,
                contactno,
                nic,
                password,
                username,
                role: role.values().next().value,
                designation: designation.values().next().value,
                country,
              }),
            });
            const res = await responseUpdateStaff.json();

            if (res == "SUCCESS") {
              setIsOpen(false);
              if (params.setReloadTable) {
                params.setReloadTable();
              }
              toast.success("Staff created successfully!", {
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

  const deleteAction = async () => {
    if (staffid) {
      const responseDelStaff = await fetch("api/staff", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ staffid, userid }),
      });

      const res = await responseDelStaff.json();
      if (res == "SUCCESS") {
        setIsOpen(false);
        if (params.setReloadTable) {
          params.setReloadTable();
        }
        toast.success("Staff deleted successfully!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Error!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      // window.location.href = "/staff"
      if (params.setReloadTable) {
        params.setReloadTable();
      }
      router.push("/staff");
    }
  };

  return (
    <div>
      {params.buttonName == "Edit | Delete" ? (
        <Button
          isIconOnly
          color="warning"
          variant="faded"
          aria-label="Create Item"
          className="mr-2"
        >
          <MdOutlineEditNote
            onClick={() => setIsOpen(true)}
            className="inline-block h-6 w-6 text-indigo-700 hover:text-indigo-500 cursor-pointer"
          />
        </Button>
      ) : (
        <Button color="primary" onClick={() => setIsOpen(true)}>
          Create New
        </Button>
        // <button
        //   onClick={() => setIsOpen(true)}
        //   className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
        // >
        //   Create New - F2
        // </button>
      )}
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="pl-12">
          <h1 className="text-2xl text-blue-800">
            {!staffid ? "Create new" : "Edit"}
          </h1>
        </div>
        <div className="flex items-center justify-center p-12">
          <div className="mx-auto w-full max-w-[550px] flex gap-2 flex-col">
            <div className="-mx-3 flex flex-wrap sm:flex-nowrap gap-2">
              <div className="w-full sm:w-1/2">
                <NextAutoFocusTextInputField
                  label="Name"
                  value={staffname}
                  onChange={(e) => setStaffname(e.target.value)}
                />
              </div>
              <div className="w-full sm:w-1/2">
                <NextSelectInputField
                  label="Contract Type"
                  value={contracttype}
                  onChange={(e) =>
                    handleSelectChangeEvent(e, setContracttype, contracttype)
                  }
                  optionValues={contractTypeOptionValues}
                />

                {/* <TextInputField
                  label="Contract Type"
                  id="contracttype"
                  name="contracttype"
                  autoComplete=""
                  placeholder="Contract Type"
                  value={contracttype}
                  onChange={(e) => setContracttype(e.target.value)}
                /> */}
              </div>
            </div>
            <div className="-mx-3 flex flex-wrap sm:flex-nowrap gap-2">
              <div className="w-full sm:w-1/2">
                <NextTextInputField
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="w-full sm:w-1/2">
                <NextSelectInputField
                  label="Role"
                  value={role}
                  onChange={(e) => handleSelectChangeEvent(e, setRole, role)}
                  optionValues={roleOptionValues}
                />
              </div>
            </div>
            <div className="-mx-3 flex flex-wrap ">
              <div className="w-full">
                <NextSelectInputField
                  label="Designation"
                  value={designation}
                  onChange={(e) =>
                    handleSelectChangeEvent(e, setDesignation, designation)
                  }
                  optionValues={designationOptionValues}
                />

                {/* <TextInputField
                  label="Designation"
                  id="designation"
                  name="designation"
                  autoComplete=""
                  placeholder="Designation"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                /> */}
              </div>
            </div>

            <div className="-mx-3 flex flex-wrap sm:flex-nowrap gap-2">
              <div className="w-full sm:w-1/2">
                <NextTextInputField
                  label="Contact No"
                  value={contactno}
                  onChange={(e) => setContactno(e.target.value)}
                />
              </div>
              <div className="w-full sm:w-1/2">
                <NextTextInputField
                  label="NIC"
                  value={nic}
                  onChange={(e) => setNic(e.target.value)}
                />
              </div>
            </div>
            <div className="-mx-3 flex flex-wrap ">
              <div className="w-full">
                <CountrySelector
                  id={"country-selector"}
                  open={isCountryListOpen}
                  onToggle={() => setIsCountryListOpen(!isCountryListOpen)}
                  onChange={setCountry}
                  selectedValue={COUNTRIES.find(
                    (option) => option.value === country
                  )}
                />
              </div>
            </div>
            <div className="-mx-3 flex flex-wrap sm:flex-nowrap gap-2">
              <div className="w-full sm:w-1/2">
                <NextTextInputField
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="w-full sm:w-1/2">
                <NextTextInputField
                  label="Confirm password"
                  value={confirmpassword}
                  onChange={(e) => setConfirmpassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="">
                <Button
                  color="danger"
                  variant="faded"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </Button>
              </div>
              <div>
                <Button color="primary" onClick={submitButtonHandler}>
                  Save
                </Button>
              </div>
              <div
                className={
                  showDelButton ? "flex ml-auto" : "flex ml-auto hidden"
                }
              >
                <IconConfirmAlertbox
                  buttonName="Delete"
                  leftButtonAction={deleteAction}
                  description="Do you want to delete this record ?"
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default StaffAddNew;
