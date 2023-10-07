// import { COUNTRIES } from "../lib/countries";
// import { SelectMenuOption } from "../lib/types";
import { AnimatePresence, motion } from "framer-motion";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { SelectMenuOption } from "./types";
import { COUNTRIES } from "./countries";
import { Input } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";

export interface ItemSelectorProps {
  id: string;
  open: boolean;
  disabled?: boolean;
  onToggle: () => void;
  onChange: (value: any) => void;
  selectedValue: any;
  selectArray: any[];
  value:any;
}

export default function ItemSelector({
  id,
  open,
  disabled = false,
  onToggle,
  onChange,
  selectedValue,
  selectArray,
  value,
}: ItemSelectorProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mutableRef = ref as MutableRefObject<HTMLDivElement | null>;

    const handleClickOutside = (event) => {
      if (
        mutableRef.current &&
        !mutableRef.current.contains(event.target) &&
        open
      ) {
        onToggle();
        setQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const [query, setQuery] = useState("");

  return (
    <div ref={ref}>
      <div className="mt-1 relative">
        <Input
          onClick={onToggle}
          size="sm"
          type="text"
          label=""
          placeholder="Enter your email"
          value={value}
        />

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-80 rounded-md text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              tabIndex={-1}
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-option-3"
            >
              <div className="sticky top-0 z-10 bg-white">
                <li className=" text-gray-900 cursor-default select-none relative py-2 px-3">
                  <Input
                    autoFocus
                    isClearable
                    startContent={
                      <FaSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    color="primary"
                    label=""
                    placeholder="Search..."
                    variant="flat"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onClear={() => setQuery("")}
                  />
                  {/* <input
                    type="search"
                    name="search"
                    autoComplete={"off"}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder={"Search a country"}
                    onChange={(e) => setQuery(e.target.value)}
                  /> */}
                </li>
                <hr />
              </div>

              <div
                className={
                  "max-h-64 scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-600 scrollbar-thumb-rounded scrollbar-thin overflow-y-scroll"
                }
              >
                {selectArray.filter((country) =>
                  country.title.toLowerCase().startsWith(query.toLowerCase())
                ).length === 0 ? (
                  <li className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9">
                    No item found
                  </li>
                ) : (
                  selectArray
                    .filter((country) =>
                      country.title
                        .toLowerCase()
                        .startsWith(query.toLowerCase())
                    )
                    .map((value, index) => {
                      return (
                        <li
                          key={`${id}-${index}`}
                          className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 flex items-center hover:bg-gray-50 transition"
                          id="listbox-option-0"
                          role="option"
                          onClick={() => {
                            onChange(value.value);
                            setQuery("");
                            onToggle();
                          }}
                        >
                          <span className="font-normal truncate">
                            {value.title}
                          </span>
                          {value.value === selectedValue?.value ? (
                            <span className="text-blue-600 absolute inset-y-0 right-0 flex items-center pr-8">
                              <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          ) : null}
                        </li>
                      );
                    })
                )}
              </div>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
