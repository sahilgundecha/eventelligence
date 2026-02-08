import React, { useContext, useEffect, useState } from "react";
import FormContainer from "../../../components/FormContainer/FormContainer";
import { FormContext } from "../../../contexts/formContext.js";
import FormFields from "../../../components/FormField/FormFields";
import {
  ActionButtonNext,
  ActionButtonPrev,
} from "../../../components/ActionButton/ActionButton";
import FeesFormFields from "../../../components/FormField/FeesFormFields";
import { useFormContext, useFieldArray } from "react-hook-form";
import AddNew from "../../../components/AddNew/AddNew";

const EventRegistrationFees = ({ steps }) => {
  const { currentEvent, currentStep, moveToNextStep } = useContext(FormContext);
  const formMethods = useFormContext();
  const { control, handleSubmit } = formMethods;

  // Initialize fees by type from currentEvent
  const [feesInitialized, setFeesInitialized] = useState(false);

  const {
    fields: registrationFees,
    append: appendRegistrationFee,
    remove: removeRegistrationFee,
  } = useFieldArray({
    control,
    name: "fees.registration",
  });

  const {
    fields: cancellationFees,
    append: appendCancellationFee,
    remove: removeCancellationFee,
  } = useFieldArray({
    control,
    name: "fees.cancellation",
  });

  const {
    fields: sponsorshipFees,
    append: appendSponsorshipFee,
    remove: removeSponsorshipFee,
  } = useFieldArray({
    control,
    name: "fees.sponsorship",
  });

  const {
    fields: transferFees,
    append: appendTransferFee,
    remove: removeTransferFee,
  } = useFieldArray({
    control,
    name: "fees.transfer",
  });

  const {
    fields: substitutionFees,
    append: appendSubstitutionFee,
    remove: removeSubstitutionFee,
  } = useFieldArray({
    control,
    name: "fees.substitution",
  });

  // Fee type configuration
  const feeTypes = {
    registration: {
      title: "Event Registration Fees",
      fields: registrationFees,
      append: appendRegistrationFee,
      remove: removeRegistrationFee,
    },
    cancellation: {
      title: "Event Cancellation Fees",
      fields: cancellationFees,
      append: appendCancellationFee,
      remove: removeCancellationFee,
    },
    sponsorship: {
      title: "Event Sponsorship Fees",
      fields: sponsorshipFees,
      append: appendSponsorshipFee,
      remove: removeSponsorshipFee,
    },
    transfer: {
      title: "Event Transfer Fees",
      fields: transferFees,
      append: appendTransferFee,
      remove: removeTransferFee,
    },
    substitution: {
      title: "Event Substitution Fees",
      fields: substitutionFees,
      append: appendSubstitutionFee,
      remove: removeSubstitutionFee,
    },
  };

  useEffect(() => {
    if (currentEvent?.fees && !feesInitialized) {
      // Initialize fees by type
      Object.entries(currentEvent.fees).forEach(([feeType, feesList]) => {
        if (Array.isArray(feesList) && feesList.length > 0) {
          feesList.forEach((fee) => {
            feeTypes[feeType]?.append(fee);
          });
        }
      });
      setFeesInitialized(true);
    }
  }, [currentEvent?.fees, feesInitialized]);

  const handleFormSubmit = (data) => {
    console.log("Fees data submitted:", data.fees);
    moveToNextStep();
  };

  const renderFeeSection = (feeType, config) => {
    const { fields, append, remove, title } = config;

    return (
      <div key={feeType} className="mb-8">
        <FormContainer title={title}>
          {fields && fields.length > 0 ? (
            fields.map((field, index) => (
              <div key={field.id} className="mb-4">
                <FeesFormFields
                  data={field}
                  fieldIndex={index}
                  feeType={feeType}
                  onRemove={() => remove(index)}
                />
              </div>
            ))
          ) : (
            <div className="container bg-[#FFFFFF] w-full rounded-lg p-3 mb-3 text-center text-gray-500">
              No fees added yet. Click "Add New" to add a fee.
            </div>
          )}

          <AddNew
            label="Add New Fee"
            onClick={() =>
              append({
                productName: "",
                productCode: "",
                startDate: "",
                endDate: "",
                amount: "",
                description: "",
              })
            }
          />
        </FormContainer>
      </div>
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {Object.entries(feeTypes).map(([feeType, config]) =>
          renderFeeSection(feeType, config),
        )}

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

export default EventRegistrationFees;
