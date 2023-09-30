import { Input } from "@nextui-org/react";
import React from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const NextPasswordInputField = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <Input
      label={label}
      variant="flat"
      endContent={
        <button
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <AiFillEyeInvisible className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <AiFillEye className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
      value={value}
      onChange={onChange}
    />
  );
};

export default NextPasswordInputField;
{/* <Input
  type="text"
  variant="flat"
  label={label}
  size="sm"
  value={value}
  onChange={onChange}
/>; */}
