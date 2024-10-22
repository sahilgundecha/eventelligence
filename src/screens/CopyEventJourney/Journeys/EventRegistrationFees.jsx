import React, { useContext, useEffect, useState } from 'react';
import FormContainer from '../../../components/FormContainer/FormContainer';
import { FormContext } from '../../../utils/formContext';
import FormFields from '../../../components/FormField/FormFields';
import {
  ActionButtonNext,
  ActionButtonPrev,
} from '../../../components/ActionButton/ActionButton';
import FeesFormFields from '../../../components/FormField/FeesFormFields';
import { ReactHookForm } from '../../../utils/ReactHookFormContext';
import AddNew from '../../../components/AddNew/AddNew';

const EventRegistrationFees = ({ steps }) => {
  const { currentEvent, currentStep, moveToNextStep } = useContext(FormContext);
  const { formMethods } = useContext(ReactHookForm);
  const [emptyFeeLabels, setEmptyFeeLabels] = useState([]);

  const { handleSubmit, watch } = formMethods;

  useEffect(() => {
    const subscription = watch((value) => {
      //   setCurrentStepData((prev) =>
      //     JSON.stringify(prev) !== JSON.stringify(value) ? value : prev
      //   );

      console.log({ watchValue: value });
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleFormSubmit = (data) => {
    // setFormData((prev) => {
    //   return { ...prev, step2: data };
    // });
    // setCurrentStepData({});

    console.log({ datainSubnit: data });

    console.log('before');

    moveToNextStep();
    console.log('agfter');
  };

  const feeTitles = {
    registration: 'Event Registration Fees',
    cancellation: 'Event Cancellation Fees',
    sponsorship: 'Event Sponsorship Fees',
    transfer: 'Event Transfer Fees',
    substitution: 'Event Substitution Fees',
  };

  const { fees = [] } = currentEvent;

  console.log({ fees });

  const data = fees?.map((fee) =>
    Object.entries(fee)?.map(([label, value]) => ({ label, data: value }))
  );

  const feesData = data[0];

  useEffect(() => {
    // Clear state when feesData changes
    setEmptyFeeLabels([]);

    // Store labels with empty fee.data
    feesData?.forEach((fee) => {
      if (!fee?.data?.length) {
        setEmptyFeeLabels((prev) => [...prev, fee?.label]);
      }
    });
  }, []);

  return (
    <div>
      {feesData &&
        feesData.map((fee) => {
          // Only render FormContainer if fee.data has items
          if (fee?.data?.length) {
            return (
              <div className='mb-6'>
                <FormContainer title={feeTitles[fee?.label]} key={fee?.label}>
                  {fee?.data?.map((singleFee, index) => (
                    <FeesFormFields
                      data={singleFee}
                      keyField={`${fee?.label}${index}`}
                      // formMethods={formMethods}
                    />
                  ))}
                  <AddNew />
                </FormContainer>
              </div>
            );
          }
          // Otherwise, do not render and store in state
          return null;
        })}
      {emptyFeeLabels?.map((label) => (
        <div className='mb-6'>
          <FormContainer title={feeTitles[label]} />
          <AddNew />
        </div>
      ))}

      {/* this is button for next and prev */}

      <div className='flex justify-end gap-4 mt-6 mb-2'>
        <ActionButtonPrev
          classNames={`${
            currentStep - 1 === 0
              ? 'border border-gray-300 text-gray-500 cursor-not-allowed'
              : 'border border-[#201502] text-[#201502] hover:bg-[#201502] hover:text-white transition duration-200'
          } px-4 py-2`}
        />
        <ActionButtonNext
          OnClick={handleSubmit(handleFormSubmit)}
          classNames={`${
            currentStep?.index === steps.length
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-[#201502] text-white hover:bg-gray-700 transition duration-200'
          }`}
        />
      </div>
    </div>
  );
};

export default EventRegistrationFees;
