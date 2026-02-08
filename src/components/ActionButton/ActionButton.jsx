import React, { useContext } from "react";
import { FormContext } from "../../contexts/formContext.js";

export const ActionButtonNext = ({
  OnClick,
  disabled,
  classNames,
  label = "Next",
}) => {
  const { currentStep } = useContext(FormContext);
  return (
    <button
      onClick={OnClick}
      disabled={disabled}
      className={`w-max py-2 px-4 rounded ${classNames}`}
    >
      {label}
    </button>
  );
};

export const ActionButtonPrev = ({
  OnClick,
  disabled,
  classNames,
  label = "Prev",
}) => {
  const { currentStep } = useContext(FormContext);
  return (
    <button
      onClick={OnClick}
      disabled={disabled}
      className={`w-max py-2 px-4 rounded ${classNames}`}
    >
      {label}
    </button>
  );
};
