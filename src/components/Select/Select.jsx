import React from 'react';

const Select = ({ label, data, id, name, register, required }) => {
  return (
    <div className='w-full'>
      <label
        htmlFor={id}
        className='block text-gray-700 font-bold mb-2 text-xs'
      >
        {label}
        {required && <span className='text-red-500'>*</span>}
      </label>
      <select
        id={id}
        name={name}
        className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-[#201502] focus:border-[#201502]'
        {...register}
      >
        {data?.map((item) => (
          <option value={item?.id} selected={id == 2}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
