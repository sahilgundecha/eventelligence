import React from "react";
import { useFormContext } from "react-hook-form";
import Input from "../Input/Input.jsx";
import { Trash2 } from "react-feather";

const TrackFormFields = ({ fieldIndex, onRemove }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldBaseName = `tracks.${fieldIndex}`;

  return (
    <div
      className="container bg-[#FFFFFF] w-full rounded-lg p-3 mb-3 relative flex items-center gap-4"
      style={{ boxShadow: "0px 0px 12px 0px #00000029" }}
    >
      {/* Delete Button */}
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition-colors"
        title="Delete this track"
      >
        <Trash2 width={18} height={18} />
      </button>

      <div className="flex-1 flex gap-3">
        <Input
          type="text"
          id={`${fieldBaseName}.trackName`}
          name={`${fieldBaseName}.trackName`}
          label={"Track Name"}
          error={errors?.tracks?.[fieldIndex]?.trackName?.message}
          register={register(`${fieldBaseName}.trackName`, {
            required: "Track Name is required",
          })}
        />
        <Input
          type="text"
          id={`${fieldBaseName}.trackCode`}
          name={`${fieldBaseName}.trackCode`}
          label={"Track Code"}
          error={errors?.tracks?.[fieldIndex]?.trackCode?.message}
          register={register(`${fieldBaseName}.trackCode`, {
            required: "Track Code is required",
          })}
        />
        <div className="w-full">
          <label className="block text-gray-700 font-bold mb-2 text-xs">
            Color
          </label>
          <input
            type="color"
            {...register(`${fieldBaseName}.color`)}
            className="w-full h-10 rounded-lg cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default TrackFormFields;
