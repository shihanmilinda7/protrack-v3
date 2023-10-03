import { Input, Radio, RadioGroup } from "@nextui-org/react";
import React from "react";

const NextRadioGroup = ({
  label,
  value,
  onChange,
  radioArray,
}: {
  label: string;
  value: any;
  onChange: (e: any) => void;
  radioArray?: any[];
}) => {
  return (
    <RadioGroup label={label} value={value} onValueChange={onChange}>
      {radioArray?.map((r) => (
        <Radio key = {r.value} value={r.value}>{r.name}</Radio>
      ))}
      {/* <Radio value="buenos-aires">Buenos Aires</Radio>
      <Radio value="sydney">Sydney</Radio>
      <Radio value="san-francisco">San Francisco</Radio>
      <Radio value="london">London</Radio>
      <Radio value="tokyo">Tokyo</Radio> */}
    </RadioGroup>
  );
};

export default NextRadioGroup;
