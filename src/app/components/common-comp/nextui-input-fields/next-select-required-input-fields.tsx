import { Select, SelectItem } from "@nextui-org/react";
import React from "react";

const NextSelectRequiredInputField = ({
  label,
  value,
  onChange,
  optionValues,
}: {
  label: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  optionValues: any[];
}) => {
  return (
    <Select
      isRequired
      label={label}
      size="sm"
      selectedKeys={value}
      onChange={onChange}
    >
      {optionValues.map((c) => (
        <SelectItem key={c.value} value={c.value}>
          {c.name}
        </SelectItem>
      ))}
    </Select>
  );
};

export default NextSelectRequiredInputField;
