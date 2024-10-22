import React from 'react';

const CheckField = ({ label = '' }) => {
  return (
    <div className=''>
      <label className='w-max flex items-center rounded-md cursor-pointer'>
        <input
          defaultChecked
          //   disabled={tracks?.length == 0}
          type='checkbox'
          className='myClass custom-checkbox rounded mr-2 accent-[#FF5B2E] w-5 h-6'
        />
        {label ? (
          <span className='text-[#201502] text-sm font-bold mr-2'>{label}</span>
        ) : null}

        {/* <span className='bg-[#FF5B2E] text-white rounded-full text-sm px-2'>
          {tracks?.length}
        </span> */}
      </label>
    </div>
  );
};

export default CheckField;
