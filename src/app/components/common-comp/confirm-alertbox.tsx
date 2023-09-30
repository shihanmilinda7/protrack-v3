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

const ConfirmAlertbox = ({
  buttonName,
  leftButtonAction,
  description,
}: Props) => {
  const [showAlert, setShowAlert] = useState(false);

  const handleCancel = async () => {
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
    <Button color="danger" onClick={handleCancel}>
      {buttonName}
    </Button>
  );
};
export default ConfirmAlertbox;
