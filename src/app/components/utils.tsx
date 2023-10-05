import { Button } from "@nextui-org/react";
import { toast } from "react-toastify";

export const handleSelectChangeEvent = (
  e: any,
  onChange: any,
  selectedValue: any
) => {
  // console.log("selectedValue.values().next().value",selectedValue.values().next().value,)
  if (e.target.value === "") {
    onChange(new Set([]));
  } else {
    onChange(new Set([e.target.value]));
  }
};

export const deletePo = async (pathname: any, purchaseorderid: any) => {
  const response = await fetch(pathname + "/api/purchaseorder", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ purchaseorderid }),
  });

  const res = await response.json();
  if (res == "SUCCESS") {
    toast.success("Purchase order deleted successfully!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    window.location.href = "/home/purchaseorder";
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
};

export const handleDelete = async (pathname: any, purchaseorderid: any) => {
  // Display a toast notification with a confirmation message.
  toast.warning("Are you sure you want to delete this Po?", {
    position: toast.POSITION.TOP_CENTER,
    autoClose: false, // This ensures the notification doesn't auto-close
    closeOnClick: false, // This prevents the notification from closing when clicked
    closeButton: (
      <div>
        <Button
          color="default"
          onClick={() => deletePo(pathname, purchaseorderid)}
          className="mb-1"
        >
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

// const confirmDelete = async (purchaseorderid: any) => {
//   await deletePo(pathname, purchaseorderid);
//   toast.dismiss();
//   // router.push("/home/products");
// };
