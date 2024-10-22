import React, { useContext } from 'react';
import {
  ActionButtonNext,
  ActionButtonPrev,
} from '../../../components/ActionButton/ActionButton';
import { FormContext } from '../../../utils/formContext';
import { useNavigate } from 'react-router-dom';

const ConfirmCopySettings = ({ steps }) => {
  const navigate = useNavigate();
  const { currentEvent, currentStep, moveToNextStep } = useContext(FormContext);

  return (
    <div>
      <h3>Confirm Page settings</h3>
      <div className='flex justify-end gap-4 mt-6 mb-2'>
        <ActionButtonPrev
          classNames={`${
            currentStep - 1 === 0
              ? 'border border-gray-300 text-gray-500 cursor-not-allowed'
              : 'border border-[#201502] text-[#201502] hover:bg-[#201502] hover:text-white transition duration-200'
          } px-4 py-2`}
        />
        <ActionButtonNext
          label='Confirm Event Copy'
          OnClick={() => navigate('/success')}
          classNames={`${'bg-[#201502] text-white hover:bg-gray-700 transition duration-200'}`}
        />
      </div>
    </div>
  );
};

export default ConfirmCopySettings;
