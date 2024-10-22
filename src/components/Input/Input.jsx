import React from 'react';

const Input = (props) => {
  const {
    type = 'text',
    id,
    name = '',
    value,
    placeholder,
    onChange,
    error,
    required = false,
    className = '',
    label,
    labelClasses = '',
    inputClasses = '',
    register,
    registerOptions,
    ...rest
  } = props;

  return (
    <div className='input-wrapper relative mb-2 w-full'>
      <label
        htmlFor={id}
        className={'block text-gray-700 font-bold mb-2 text-xs' + labelClasses}
      >
        {label}
        {required && <span className='text-red-500'>*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        // onChange={(e) => onChange(e)}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-lg ${
          error
            ? 'border-red-500 focus:outline-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:outline-[#201502] focus:ring-[#201502]'
        } ${className} ${inputClasses}`}
        required={required}
        {...register}
        // {...register('name')}
        // {...rest}
      />
      {<p className='text-red-500 text-xs absolute'>{error && error}</p>}
    </div>
  );
};

export default React.forwardRef(Input);
