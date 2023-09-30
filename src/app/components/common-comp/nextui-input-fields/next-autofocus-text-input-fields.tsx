import { Input } from "@nextui-org/react";
import React from "react";

const NextAutoFocusTextInputField = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <Input
      autoFocus
      type="text"
      variant="faded"
      label={label}
      placeholder="Type here..." 
      size="sm"
      value={value}
      onChange={onChange}
    />
  );
};

export default NextAutoFocusTextInputField;
