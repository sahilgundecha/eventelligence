import React, { useContext, useMemo, useState } from 'react';
import Stepper from '../../components/Stepper/Stepper';
import { X } from 'react-feather';
import EventCopyWizard from './Journeys/EventCopyWizard';
import EventRegistrationFees from './Journeys/EventRegistrationFees';
import CopySessions from './Journeys/CopySessions';
import CopyTracks from './Journeys/CopyTracks';
import ConfirmCopySettings from './Journeys/ConfirmCopySettings';
import { useNavigate } from 'react-router-dom';
import { FormContext } from '../../utils/formContext';

const CopyJourney = ({ events }) => {
  const { currentStep } = useContext(FormContext);
  const steps = [
    { label: 'Event Details', index: 1 },
    { label: 'Fees', index: 2 },
    { label: 'Sessions', index: 3 },
    { label: 'Tracks', index: 4 },
    { label: 'Confirm', index: 5 },
  ];

  const components = [
    { Component: EventCopyWizard, title: 'Event Info' },
    {
      Component: EventRegistrationFees,
      title: 'Registration Fees',
    },
    { Component: CopySessions, title: 'Copy Sessions' },
    { Component: CopyTracks, title: 'Copy Tracks' },
    { Component: ConfirmCopySettings, title: 'Conform Copied Data' },
  ];
  const navigate = useNavigate();

  const { Component = () => null, title = '' } = useMemo(() => {
    const index = (currentStep?.index ?? 1) - 1;
    return components[index] || {};
  }, [currentStep]);

  console.log({ Component, title });

  return (
    <div className='w-4/5 flex flex-col justify-between h-full mx-auto'>
      <div>
        <div className='header-wrapper flex justify-between items-center my-4'>
          <div className='flex-1'>
            <h1 className='text-xl font-semibold text mb-1'>
              Event Copy Wizard
            </h1>
            {/* <p className='text-gray-600 text-base font-normal'>{title}</p> */}
          </div>
          <div className='close-btn box-content'>
            <button
              className='outline outline-2 outline-[#201502] text-base font-medium text-[#201502] px-2 py-1 rounded-md flex items-center gap-1 hover:outline-[#FF5B2E] hover:text-[#FF5B2E]'
              onClick={() => {
                const userConfirmed = window.confirm(
                  'Are you sure cancel copy event?'
                );
                if (userConfirmed) {
                  navigate('/dashboard');
                }
              }}
            >
              <X width={'18px'} />
              Cancel
            </button>
          </div>
        </div>
        <div className='line my-4 h-[0.5px] w-full bg-[#E9EBEF]'></div>
        {/* <div className='w-full h-[1px] bg-[#E9EBEF] my-3'></div> */}

        <Stepper steps={steps} currentStep={currentStep} />
        {/* <div className='titl my-4'>{title}</div> */}
        <div className='line my-4 h-[0.5px] w-full bg-[#E9EBEF]'></div>
      </div>

      <div className='flex-1 myclass'>
        <Component events={events} steps={steps} title={title} />
      </div>
    </div>
  );
};

export default CopyJourney;
