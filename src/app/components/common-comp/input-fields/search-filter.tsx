import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchFilter = ({
  value,
  onChange,
}: {
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex flex-col mb-1 w-full">
      <label
        htmlFor="search"
        className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
      >
        Search
      </label>
      <div className="relative">
        <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
          <FaSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        </div>
        <input
          id="search"
          type="text"
          name="search"
          className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
          placeholder="Type to search..."
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default SearchFilter;
