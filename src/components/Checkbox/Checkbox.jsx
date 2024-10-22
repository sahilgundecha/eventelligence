import React from 'react';

const Checkbox = ({
  className,
  name,
  error,
  register,
  defaltChecked = false,
  ...rest
}) => {
  return (
    <>
      <input
        type='date'
        name={name}
        className={
          'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-[#FF5B2E] focus:border-[#FF5B2E]' +
          className
        }
        {...register('endDate', {
          validate: (value) => {
            return value ? false : 'Code is required';
          },
        })}
        defaultChecked={defaltChecked}
        {...rest}
      />
      {<p className='text-red-500 text-xs absolute'>{error}</p>}
    </>
  );
};

export default Checkbox;
