import React, { useContext } from 'react';
import { Check } from 'react-feather';
import { FormContext } from '../../utils/formContext';

const Stepper = ({ steps, currentStep: activeStep }) => {
  const { setCurrentStep } = useContext(FormContext);
  return (
    <div className='mx-auto py-3'>
      <div className='flex items-center justify-between'>
        {steps.map((step) => (
          <React.Fragment>
            <div
              key={step?.index}
              onClick={() => {
                console.log(step.index, activeStep.index);
                if (step?.index <= activeStep?.index) {
                  setCurrentStep(step);
                  localStorage.setItem('currentStep', JSON.stringify(step)); // Update the current step
                }
              }}
              className={`w-max flex items-center justify-between px-3 py-2 relative gap-2 rounded-full border ${
                step?.index <= activeStep?.index
                  ? 'cursor-pointer'
                  : 'cursor-not-allowed'
              } ${
                step?.index == activeStep?.index
                  ? 'bg-[#FF5B2E] text-white'
                  : step?.index < activeStep?.index
                  ? 'bg-[#201502] text-white'
                  : 'bg-[#E9EBEF] text-black'
              }`}
            >
              <div className='text-sm font-bold'>
                {step?.index < activeStep?.index ? (
                  <span className='bg-[white] rounded-full'>
                    <Check width={'14px'} height={'auto'} strokeWidth={3} />
                  </span>
                ) : (
                  <span className='bg-[white] rounded-full text-sm px-2 text-[#201502]'>
                    {step?.index}
                  </span>
                )}
              </div>
              <div className={`text-sm font-bold whitespace-nowrap`}>
                {step.label}
              </div>
            </div>
            {step?.index < steps?.length && (
              <div className='sep w-full h-[1px] bg-[#E9EBEF] mx-3'></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
