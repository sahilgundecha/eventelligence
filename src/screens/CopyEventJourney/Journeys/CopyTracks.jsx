import React, { useContext, useEffect, useState } from "react";
import FormContainer from "../../../components/FormContainer/FormContainer";
import {
  ActionButtonNext,
  ActionButtonPrev,
} from "../../../components/ActionButton/ActionButton";
import { FormContext } from "../../../contexts/formContext.js";
import { useFormContext, useFieldArray } from "react-hook-form";
import AddNew from "../../../components/AddNew/AddNew";
import TrackFormFields from "../../../components/FormField/TrackFormFields.jsx";

const CopyTracks = ({ steps }) => {
  const { currentEvent, currentStep, moveToNextStep } = useContext(FormContext);
  const formMethods = useFormContext();
  const { control, handleSubmit } = formMethods;

  const [tracksInitialized, setTracksInitialized] = useState(false);
  const {
    fields: trackFields,
    append: appendTrack,
    remove: removeTrack,
  } = useFieldArray({
    control,
    name: "tracks",
  });

  useEffect(() => {
    if (
      currentEvent?.tracks &&
      currentEvent.tracks.length > 0 &&
      !tracksInitialized
    ) {
      // Clear existing and populate from currentEvent
      currentEvent.tracks.forEach((track) => {
        appendTrack(track);
      });
      setTracksInitialized(true);
    }
  }, [currentEvent?.tracks, tracksInitialized, appendTrack]);

  const handleFormSubmit = (data) => {
    console.log("Tracks data submitted:", data.tracks);
    moveToNextStep();
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <FormContainer title={"Event Tracks"}>
          {trackFields.length > 0 ? (
            trackFields.map((field, index) => (
              <TrackFormFields
                key={field.id}
                fieldIndex={index}
                onRemove={() => removeTrack(index)}
              />
            ))
          ) : (
            <div className="container bg-[#FFFFFF] w-full rounded-lg p-3 mb-3 text-center text-gray-500">
              <h2>No Tracks</h2>
              <p className="text-sm">
                Click "Add New Track" to add tracks to copy
              </p>
            </div>
          )}
          <AddNew
            label="Add New Track"
            onClick={() =>
              appendTrack({
                trackName: "",
                trackCode: "",
                color: "#FF5B2E",
              })
            }
          />
        </FormContainer>

        <div className="flex justify-end gap-4 mt-6 mb-2">
          <ActionButtonPrev
            classNames={`${
              currentStep - 1 === 0
                ? "border border-gray-300 text-gray-500 cursor-not-allowed"
                : "border border-[#201502] text-[#201502] hover:bg-[#201502] hover:text-white transition duration-200"
            } px-4 py-2`}
          />
          <ActionButtonNext
            OnClick={handleSubmit(handleFormSubmit)}
            classNames={`${
              currentStep?.index === steps.length
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#201502] text-white hover:bg-gray-700 transition duration-200"
            }`}
          />
        </div>
      </form>
    </div>
  );
};

export default CopyTracks;
