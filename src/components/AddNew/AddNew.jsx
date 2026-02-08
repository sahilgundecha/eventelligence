import React from "react";
import { Plus } from "react-feather";

const AddNew = ({ onClick, label = "Add New" }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full h-max rounded-md border border-dashed border-[#FF5B2E] p-2 flex items-center justify-center gap-1 text-[#FF5B2E] font-semibold text-sm hover:bg-[rgba(255,91,46,0.05)] transition-colors duration-300"
    >
      <Plus width={18} height={18} />
      {label}
    </button>
  );
};

export default AddNew;
