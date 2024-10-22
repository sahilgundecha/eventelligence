import React from "react";

const Checkbox = ({
  id,
  name = "name",
  error = null,
  register = () => null,
  disabled = false,
  label = "",
  defaultChecked = false,
  fillColor = "",
  width = "",
  height = "",
  labelClasses = "",
  inputClasses = "",
  ...rest
}) => {
  return (
    <div>
      <label className="flex items-center rounded-md cursor-pointer">
        <input
          defaultChecked={defaultChecked}
          disabled={disabled}
          style={{
            ...(width && { width }),
            ...(height && { height }),
          }}
          type="checkbox"
          className={`custom-checkbox rounded mr-2 accent-[${
            fillColor ? fillColor : "#FF5B2E"
          }] w-5 h-6 ${inputClasses}`}
          {...rest}
        />
        {label ? (
          <span
            className={`text-[#201502] text-sm font-bold mr-2 ${labelClasses}`}
          >
            {label}
          </span>
        ) : null}
      </label>
    </div>
  );
};

export default Checkbox;
