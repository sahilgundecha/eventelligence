/**
 * CopyJourney - Event Copy Wizard
 * Optimized version with proper React Hook Form and data fetching
 */
import React, { useContext, useMemo, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm, FormProvider } from "react-hook-form";
import Stepper from "../../components/Stepper/Stepper";
import { X } from "react-feather";
import EventCopyWizard from "./Journeys/EventCopyWizard";
import EventRegistrationFees from "./Journeys/EventRegistrationFees";
import CopySessions from "./Journeys/CopySessions";
import ConfirmCopySettings from "./Journeys/ConfirmCopySettings";
import { useNavigate } from "react-router-dom";
import { FormContext } from "../../contexts/formContext.js";
import API_ENDPOINTS from "../../constants/api.js";

const CopyJourney = () => {
  const { currentStep, currentEvent } = useContext(FormContext);
  const navigate = useNavigate();
  const formMethods = useForm({
    mode: "onBlur",
    defaultValues: {
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

  // Fetch all events for the dropdown
  const { data: events = [], isLoading: eventsLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await fetch(API_ENDPOINTS.EVENTS);
      if (!response.ok) throw new Error("Failed to fetch events");
      return response.json();
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
        ...currentEvent,
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
    { Component: EventCopyWizard, title: "Event Info" },
    {
      Component: EventRegistrationFees,
      title: "Registration Fees",
    },
    { Component: CopySessions, title: "Copy Sessions" },
    { Component: ConfirmCopySettings, title: "Conform Copied Data" },
  ];

  const { Component = () => null, title = "" } = useMemo(() => {
    const index = (currentStep?.index ?? 1) - 1;
    return components[index] || {};
  }, [currentStep]);

  if (eventsLoading) {
    return (
      <div className="w-4/5 mx-auto py-8">
        <p className="text-center text-gray-600">Loading events...</p>
      </div>
    );
  }

  return (
    <FormProvider {...formMethods}>
      <div className="w-4/5 flex flex-col justify-between h-full mx-auto">
        <div>
          <div className="header-wrapper flex justify-between items-center my-4">
            <div className="flex-1">
              <h1 className="text-xl font-semibold text mb-1">
                Event Copy Wizard
              </h1>
            </div>
            <div className="close-btn box-content">
              <button
                className="outline outline-2 outline-[#201502] text-base font-medium text-[#201502] px-2 py-1 rounded-md flex items-center gap-1 hover:outline-[#FF5B2E] hover:text-[#FF5B2E]"
                onClick={() => {
                  const userConfirmed = window.confirm(
                    "Are you sure cancel copy event?",
                  );
                  if (userConfirmed) {
                    navigate("/dashboard");
                  }
                }}
              >
                <X width={"18px"} />
                Cancel
              </button>
            </div>
          </div>
          <div className="line my-4 h-[0.5px] w-full bg-[#E9EBEF]"></div>

          <Stepper steps={steps} currentStep={currentStep} />
          <div className="line my-4 h-[0.5px] w-full bg-[#E9EBEF]"></div>
        </div>

        <div className="flex-1 myclass">
          <Component events={events} steps={steps} title={title} />
        </div>
      </div>
    </FormProvider>
  );
};

export default CopyJourney;
