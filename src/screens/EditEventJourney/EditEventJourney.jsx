/**
 * EditEventJourney - Event Edit Wizard
 * Similar to CopyEventJourney but updates existing event instead of creating new
 */
import React, { useContext, useMemo, useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Stepper from "../../components/Stepper/Stepper";
import { X } from "react-feather";
import EditEventDetails from "./Journeys/EditEventDetails";
import EventRegistrationFees from "../CopyEventJourney/Journeys/EventRegistrationFees";
import CopySessions from "../CopyEventJourney/Journeys/CopySessions";
import ConfirmEditSettings from "../CopyEventJourney/Journeys/ConfirmEditSettings";
import { useNavigate } from "react-router-dom";
import { FormContext } from "../../contexts/formContext.js";

const EditEventJourney = () => {
  const { currentStep, setCurrentStep, currentEvent } = useContext(FormContext);
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(currentStep?.index || 1);

  const formMethods = useForm({
    mode: "onBlur",
    defaultValues: {
      eventName: "",
      eventCode: "",
      category: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      fees: {
        registration: [],
        cancellation: [],
        sponsorship: [],
        transfer: [],
        substitution: [],
      },
      sessions: [],
    },
  });

  // Initialize form with current event data
  useEffect(() => {
    if (currentEvent && currentEvent.eventId) {
      const feeData = currentEvent.fees || {
        registration: [],
        cancellation: [],
        sponsorship: [],
        transfer: [],
        substitution: [],
      };
      formMethods.reset({
        eventName: currentEvent.eventName || "",
        eventCode: currentEvent.eventCode || "",
        category: currentEvent.category || "",
        startDate: currentEvent.startDate || "",
        startTime: currentEvent.startTime || "",
        endDate: currentEvent.endDate || "",
        endTime: currentEvent.endTime || "",
        fees: feeData,
        sessions: currentEvent.sessions || [],
      });
    }
  }, [currentEvent, formMethods]);

  const steps = [
    { label: "Event Details", index: 1 },
    { label: "Fees", index: 2 },
    { label: "Sessions", index: 3 },
    { label: "Confirm", index: 4 },
  ];

  const components = [
    { Component: EditEventDetails, title: "Event Details" },
    {
      Component: EventRegistrationFees,
      title: "Registration Fees",
    },
    { Component: CopySessions, title: "Sessions" },
    { Component: ConfirmEditSettings, title: "Confirm Changes" },
  ];

  const { Component = () => null, title = "" } = useMemo(() => {
    const component = components[stepIndex - 1];
    return component || {};
  }, [stepIndex]);

  const handleNext = () => {
    if (stepIndex < 4) {
      setStepIndex(stepIndex + 1);
      setCurrentStep({ index: stepIndex + 1 });
    }
  };

  const handlePrev = () => {
    if (stepIndex > 1) {
      setStepIndex(stepIndex - 1);
      setCurrentStep({ index: stepIndex - 1 });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Event</h1>
            <p className="text-gray-600 mt-1">
              {currentEvent?.eventName || "Update event details"}
            </p>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 hover:bg-gray-200 rounded-lg transition"
            title="Close"
          >
            <X width={24} className="text-gray-600" />
          </button>
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <Stepper steps={steps} currentStep={stepIndex} />
        </div>

        {/* Form Content */}
        <FormProvider {...formMethods}>
          <form className="space-y-6">
            {/* Step Title */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#201502]">{title}</h2>
              <p className="text-gray-600 mt-1">Step {stepIndex} of 4</p>
            </div>

            {/* Dynamic Component */}
            <Component steps={steps} />
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default EditEventJourney;
