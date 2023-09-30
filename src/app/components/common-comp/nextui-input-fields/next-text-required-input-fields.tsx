import { Input } from "@nextui-org/react";
import React from "react";

const NextTextRequiredInputField = ({
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
      isRequired
      type="text"
      variant="flat"
      label={label}
      size="sm"
      placeholder="Type here..." 
      value={value}
      onChange={onChange}
    />
  );
};

export default NextTextRequiredInputField;
