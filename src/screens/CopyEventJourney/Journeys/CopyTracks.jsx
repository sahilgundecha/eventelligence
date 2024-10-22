import React, { useContext } from 'react';
import FormContainer from '../../../components/FormContainer/FormContainer';
import {
  ActionButtonNext,
  ActionButtonPrev,
} from '../../../components/ActionButton/ActionButton';
import { FormContext } from '../../../utils/formContext';
import AddNew from '../../../components/AddNew/AddNew';

const CopyTracks = ({ steps }) => {
  const { currentEvent, currentStep, moveToNextStep } = useContext(FormContext);

  return (
    <div className=''>
      <FormContainer title={'Event Tracks'}>
        <div
          className='container bg-[#FFFFFF] w-full rounded-lg p-3 mb-3'
          style={{ boxShadow: ' 0px 0px 12px 0px #00000029' }}
        >
          <h2>Currently No Tracks</h2>
        </div>
        <AddNew />
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

export default CopyTracks;
