import React, { createContext, useEffect, useState } from 'react';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState(() => {
    const savedFormData = localStorage.getItem('formData');
    return savedFormData ? JSON.parse(savedFormData) : {};
  });

  const [currentStepData, setCurrentStepData] = useState(() => {
    const savedStepData = localStorage.getItem('currentStepData');
    return savedStepData ? JSON.parse(savedStepData) : {};
  });

  const [currentStep, setCurrentStep] = useState(() => {
    const storedStep = localStorage.getItem('currentStep');
    return storedStep ? JSON.parse(storedStep) : { index: 1 };
  });

  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('events');
    return savedEvents ? JSON.parse(savedEvents) : [];
  });
  const [accounts, setAccounts] = useState(() => {
    const savedAccounts = localStorage.getItem('accounts');
    return savedAccounts ? JSON.parse(savedAccounts) : [];
  });
  const [currentEvent, setCurrentEvent] = useState(() => {
    const savedCurrentEvent = localStorage.getItem('currentEvent');
    return savedCurrentEvent ? JSON.parse(savedCurrentEvent) : {};
  });

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData) ?? []);
  }, [formData]);

  useEffect(() => {
    localStorage.setItem(
      'currentStepData',
      JSON.stringify(currentStepData) ?? {}
    );
  }, [currentStepData]);

  useEffect(() => {
    localStorage.setItem('currentStep', JSON.stringify(currentStep));
  }, [currentStep, setCurrentStep]);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events) ?? []);
  }, [events]);

  useEffect(() => {
    localStorage.setItem('accounts', JSON.stringify(accounts) ?? []);
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem(
      'currentEvent',
      JSON.stringify(currentEvent) ?? { index: 1 }
    );
  }, [currentEvent, setCurrentEvent]);

  const moveToNextStep = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [`step${currentStep}`]: currentStepData,
    }));
    const nextStep = { index: currentStep.index + 1 };
    setCurrentStep(nextStep);
    localStorage.setItem('currentStep', JSON.stringify(nextStep));
    setCurrentStepData({});
  };

  const moveToPreviousStep = () => {
    if (currentStep.index > 1) {
      const prevStep = { index: currentStep.index - 1 };
      setCurrentStep(prevStep);
      localStorage.setItem('currentStep', JSON.stringify(prevStep)); // Update localStorage immediately
    }
  };
  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        currentStepData,
        setCurrentStepData,
        currentStep,
        setCurrentStep,
        moveToNextStep,
        moveToPreviousStep,
        events,
        setEvents,
        currentEvent,
        setCurrentEvent,
        accounts,
        setAccounts,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
