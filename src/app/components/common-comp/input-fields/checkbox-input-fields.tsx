import React from "react";

type OnChangeFunctionType = (e: React.ChangeEvent<HTMLInputElement>) => void;
type InputFieldParams = {
  label: string;
  id: string;
  name: string;
  autoComplete: string;
  value: boolean;
  onChange: OnChangeFunctionType;
  placeholder: string;
};

const CheckBoxInputField = (inputFieldParams: InputFieldParams) => {
  return (
    <div className="flex items-center">
      <div className="flex items-center justify-center">

      <label
        htmlFor={inputFieldParams.name}
        className="text-xl font-medium text-[#07074D] mr-3  whitespace-nowrap"
      >
        {inputFieldParams.value ? "On Active" : "On Leave"}
      </label>
      </div>
      <div className="flex items-center justify-center">
        <input
          type="checkbox"
          name={inputFieldParams.name}
          id={inputFieldParams.id}
          placeholder={inputFieldParams.placeholder}
          autoComplete={inputFieldParams.autoComplete}
          checked={inputFieldParams.value}
          onChange={inputFieldParams.onChange}
          className={`appearance-none w-9 focus:outline-none h-5 rounded-full before:inline-block before:rounded-full before:h-4 before:w-4 checked:before:translate-x-full shadow-inner transition-all duration-300 before:ml-0.5 ${
            inputFieldParams.value
              ? 'bg-green-300 checked:bg-green-300 before:bg-green-500'
              : 'bg-red-300 checked:bg-red-300  before:bg-red-500'
          }`}
        />
      </div>
    </div>
  );
};

export default CheckBoxInputField;
