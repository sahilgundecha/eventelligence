import React from 'react';
import { Plus } from 'react-feather';

const AddNew = () => {
  return (
    <div className='w-full h-max rounded-md border border-dashed border-[#FF5B2E] p-2 flex items-center justify-center gap-1 text-[#FF5B2E] font-semibold text-sm hover:bg-[rgba(255,91,46,0.05)] transition-colors duration-300 cursor-pointer'>
      <Plus />
      Add New
    </div>
  );
};

export default AddNew;
