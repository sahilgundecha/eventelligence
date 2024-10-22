import React, { useContext } from 'react';
import FormContainer from '../../../components/FormContainer/FormContainer';
import { FormContext } from '../../../utils/formContext';
import FormFields from '../../../components/FormField/FormFields';
import SessionsFormFields from '../../../components/FormField/SessionsFormFields';
import { ActionButtonNext, ActionButtonPrev } from '../../../components/ActionButton/ActionButton';
const CopySessions = ({ steps = [] }) => {
  const { currentEvent, currentStep, moveToNextStep } = useContext(FormContext);

  const { sessions = [] } = currentEvent;

  return (
    <div>
      <FormContainer title={'Copy Event Sessions'}>
        {sessions?.map((session, ind) => (
          <SessionsFormFields session={session} keyField={`sessions${ind}`} />
        ))}
      </FormContainer>

      <div className='flex justify-end gap-4 mt-6 mb-2'>
        <ActionButtonPrev
          classNames={`${
            currentStep - 1 === 0
              ? 'border border-gray-300 text-gray-500 cursor-not-allowed'
              : 'border border-[#201502] text-[#201502] hover:bg-[#201502] hover:text-white transition duration-200'
          } px-4 py-2`}
        />
        <ActionButtonNext
          OnClick={moveToNextStep}
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

export default CopySessions;
