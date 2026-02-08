import React, { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { FormContext } from "../../../contexts/formContext.js";
import {
  ActionButtonNext,
  ActionButtonPrev,
} from "../../../components/ActionButton/ActionButton";
import Input from "../../../components/Input/Input";

const EditEventDetails = ({ steps = [] }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { currentStep, setCurrentStep } = useContext(FormContext);

  const handleNext = () => {
    if (currentStep) {
      setCurrentStep({ index: currentStep.index + 1 });
    }
  };

  const handlePrev = () => {
    if (currentStep && currentStep.index > 1) {
      setCurrentStep({ index: currentStep.index - 1 });
    }
  };

  return (
    <div className="space-y-6">
      {/* Event Name */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          Event Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register("eventName", {
            required: "Event name is required",
          })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B2E]"
          placeholder="Enter event name"
        />
        {errors.eventName && (
          <p className="text-red-500 text-xs mt-1">
            {errors.eventName.message}
          </p>
        )}
      </div>

      {/* Event Code */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          Event Code <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register("eventCode", {
            required: "Event code is required",
          })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B2E]"
          placeholder="Enter event code"
        />
        {errors.eventCode && (
          <p className="text-red-500 text-xs mt-1">
            {errors.eventCode.message}
          </p>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          Category
        </label>
        <input
          type="text"
          {...register("category")}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B2E]"
          placeholder="Enter category"
        />
      </div>

      {/* Dates Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Start Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            {...register("startDate", {
              required: "Start date is required",
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B2E]"
          />
          {errors.startDate && (
            <p className="text-red-500 text-xs mt-1">
              {errors.startDate.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Start Time <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            {...register("startTime", {
              required: "Start time is required",
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B2E]"
          />
          {errors.startTime && (
            <p className="text-red-500 text-xs mt-1">
              {errors.startTime.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            End Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            {...register("endDate", {
              required: "End date is required",
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B2E]"
          />
          {errors.endDate && (
            <p className="text-red-500 text-xs mt-1">
              {errors.endDate.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            End Time <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            {...register("endTime", {
              required: "End time is required",
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B2E]"
          />
          {errors.endTime && (
            <p className="text-red-500 text-xs mt-1">
              {errors.endTime.message}
            </p>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 pt-6">
        <ActionButtonNext
          label="Next"
          OnClick={handleNext}
          classNames="flex-1 bg-[#201502] text-white hover:bg-gray-700 transition duration-200 px-4 py-2 rounded-md"
        />
      </div>
    </div>
  );
};

export default EditEventDetails;
