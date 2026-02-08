import React, { useContext, useEffect, useState } from "react";
import FormContainer from "../../../components/FormContainer/FormContainer";
import { FormContext } from "../../../contexts/formContext.js";
import FormFields from "../../../components/FormField/FormFields";
import SessionsFormFields from "../../../components/FormField/SessionsFormFields";
import {
  ActionButtonNext,
  ActionButtonPrev,
} from "../../../components/ActionButton/ActionButton";
import { useFormContext, useFieldArray } from "react-hook-form";
import AddNew from "../../../components/AddNew/AddNew";

const CopySessions = ({ steps = [] }) => {
  const { currentEvent, currentStep, moveToNextStep } = useContext(FormContext);
  const formMethods = useFormContext();
  const { control, handleSubmit } = formMethods;

  const [sessionsInitialized, setSessionsInitialized] = useState(false);
  const {
    fields: sessionFields,
    append: appendSession,
    remove: removeSession,
  } = useFieldArray({
    control,
    name: "sessions",
  });

  useEffect(() => {
    if (
      currentEvent?.sessions &&
      currentEvent.sessions.length > 0 &&
      !sessionsInitialized
    ) {
      // Clear existing and populate from currentEvent
      currentEvent.sessions.forEach((session) => {
        appendSession(session);
      });
      setSessionsInitialized(true);
    }
  }, [currentEvent?.sessions, sessionsInitialized, appendSession]);

  const handleFormSubmit = (data) => {
    console.log("Sessions data submitted:", data.sessions);
    moveToNextStep();
  };

  const handleDeleteSession = (index) => {
    console.log("Deleting session at index:", index);
    console.log("Current sessions before delete:", sessionFields);
    removeSession(index);
    console.log("Session deleted, remaining sessions:", sessionFields);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <FormContainer title={"Copy Event Sessions"}>
          {sessionFields.length > 0 ? (
            sessionFields.map((field, index) => (
              <SessionsFormFields
                key={field.id}
                session={field}
                fieldIndex={index}
                onRemove={() => handleDeleteSession(index)}
              />
            ))
          ) : (
            <div className="container bg-[#FFFFFF] w-full rounded-lg p-3 mb-3 text-center text-gray-500">
              No sessions added yet. Click "Add New" to add a session.
            </div>
          )}

          <AddNew
            label="Add New Session"
            onClick={() =>
              appendSession({
                sessionTitle: "",
                sessionCode: "",
                startDate: "",
                endDate: "",
                startTime: "",
                endTime: "",
                locations: [],
                courses: [],
                faculty: {
                  speakers: [],
                  staff: [],
                  volunteers: [],
                },
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

export default CopySessions;
