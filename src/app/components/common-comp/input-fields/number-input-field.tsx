import React from "react";


type OnChangeFunctionType = (e:React.ChangeEvent<HTMLInputElement>) => void;
type InputFieldParams = {
    label: string;
    id: string;
    name:string;
    autoComplete: string;
    value:string;
    onChange: OnChangeFunctionType;
    placeholder: string;
  }
  
  const IntegerInputField = (inputFieldParams: InputFieldParams) => {

  return (
    <div className="mb-5">
    <label
      htmlFor={inputFieldParams.name}
      className="mb-3 block text-base font-medium text-[#07074D]"
    >
      {inputFieldParams.label}
    </label>
    <input
      type="number"
      name={inputFieldParams.name}
      id={inputFieldParams.id}
      placeholder={inputFieldParams.placeholder}
      autoComplete={inputFieldParams.autoComplete}
      value={inputFieldParams.value}
      onChange={inputFieldParams.onChange}
      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
    />
  </div>
  );
};

export default IntegerInputField;
