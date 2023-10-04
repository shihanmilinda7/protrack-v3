import { Listbox, ListboxItem } from "@nextui-org/react";
import React from "react";
import { ListboxWrapper } from "./ListboxWrapper";

const NextListView = ({
  value,
  onChange,
  listArray,
}: {
  value: any;
  onChange: (e: any) => void;
  listArray?: any[];
}) => {
  return (
    <Listbox
      aria-label="Single selection example"
      variant="flat"
      disallowEmptySelection
      selectionMode="single"
      selectedKeys={value}
      onSelectionChange={onChange}
    >
      {listArray?.map((y) => (
        <ListboxItem key={y.value} value={y.value}>
          {y.name}
        </ListboxItem>
      ))}
    </Listbox>
  );
};

export default NextListView;
