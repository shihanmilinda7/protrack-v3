"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@nextui-org/react";
import { RiDeleteBin5Line } from "react-icons/ri";

type DelButton = (e: React.MouseEvent<HTMLButtonElement>) => void;
type Props = {
  buttonName: string;
  leftButtonAction: DelButton;
  description: string;
};

const IconConfirmAlertbox = ({
  buttonName,
  leftButtonAction,
  description,
}: Props) => {
  const [showAlert, setShowAlert] = useState(false);

  const handleDelete = async () => {
    // Display a toast notification with a confirmation message.
    toast.warning(`${description}`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: false, // This ensures the notification doesn't auto-close
      closeOnClick: false, // This prevents the notification from closing when clicked
      closeButton: (
        <div>
          <Button color="default" onClick={leftAction} className="mb-1">
            Yes
          </Button>
          <Button
            color="danger"
            onClick={() => {
              toast.dismiss();
            }}
          >
            No
          </Button>
        </div>
      ),
    });
  };
  const leftAction = (e: React.MouseEvent<HTMLButtonElement>) => {
    leftButtonAction(e);
    toast.dismiss();
  };
  return (
    <Button isIconOnly color="warning" variant="faded" aria-label="Create Item">
      <RiDeleteBin5Line
        onClick={handleDelete}
        className="inline-block h-6 w-6 text-red-700 hover:text-red-500 cursor-pointer"
      />
    </Button>
  );
};
export default IconConfirmAlertbox;
