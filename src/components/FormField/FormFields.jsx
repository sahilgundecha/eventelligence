import React, { useContext, useEffect, useRef, useState } from 'react';
import Input from '../Input/Input';
import { ChevronDown, ChevronsDown, ChevronUp } from 'react-feather';
import { useForm } from 'react-hook-form';
import { FormContext } from '../../contexts/formContext';

const FormFields = ({ data, keyField }) => {
  const [toggle, setToggle] = useState(false);

  console.log({ keyField });

  const { setCurrentStepData, currentStepData } = useContext(FormContext);

  // useEffect(() => {
  //   if (data && Object.values(data)?.length) {
  //     for (const key in data) {
  //       setValue(`${keyField}.${data[key]}`, data[key]);
  //     }
  //   }
  // }, [data]);

  // useEffect(() => {
  //   const subscription = watch((value) => {
  //     setCurrentStepData((prev) =>
  //       JSON.stringify(prev) !== JSON.stringify(value) ? value : prev
  //     );

  //     console.log({ watchValue: value });
  //   });
  //   return () => subscription.unsubscribe();
  // }, [watch]);

  // useEffect(() => {
  //   if (currentStepData && Object.values(currentStepData)?.length) {
  //     for (const key in currentStepData) {
  //       setValue(key, currentStepData[key]);
  //     }
  //   }
  // }, [currentStepData]);

  return (
    <div
      className='container bg-[#FFFFFF] w-full rounded-lg p-3'
      style={{ boxShadow: ' 0px 0px 12px 0px #00000029' }}
    >
      <div className='form flex gap-3 flex-grow'>
        {/* <Input
          type='text'
          id='productName'
          name={`${keyField}.productName`}
          label={'Product Name'}
          error={errors?.[`${keyField}.productName`]?.message}
          register={register(`${keyField}.productName`, {
            validate: (value) => {
              return value ? false : 'Code is required';
            },
          })}
        />
        <Input
          type='text'
          id='productCode'
          name={`${keyField}.productCode`}
          label={'Product Code'}
          error={errors?.[`${keyField}.productCode`]?.message}
          register={register(`${keyField}.productCode`, {
            validate: (value) => {
              return value ? false : 'Code is required';
            },
          })}
        />
        <div className='end-date w-full'>
          <label className='block text-gray-700 font-bold mb-2 text-xs'>
            Start Date
            {<span className='text-red-500'>*</span>}
          </label>
          <input
            type='date'
            name={`${keyField}.startDate`}
            className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-[#FF5B2E] focus:border-[#FF5B2E]'
            {...register(`${keyField}.startDate`, {
              validate: (value) => {
                return value ? true : 'Start date is required';
              },
            })}
          />
          {
            <p className='text-red-500 text-xs absolute'>
              {errors?.[`${keyField}.startDate`]?.message}
            </p>
          }
        </div>

        <div className='end-date w-full'>
          <label className='block text-gray-700 font-bold mb-2 mx-2 text-xs'>
            End Date
            {<span className='text-red-500'>*</span>}
          </label>
          <input
            type='date'
            name={`${keyField}.endDate`}
            className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-[#FF5B2E] focus:border-[#FF5B2E]'
            {...register(`${keyField}.endDate`, {
              validate: (value) => {
                return value ? true : 'End date is required';
              },
            })}
          />
          {
            <p className='text-red-500 text-xs absolute'>
              {errors?.[`${keyField}.endDate`]?.message}
            </p>
          }
        </div> */}
      </div>
      <div className='line my-4 h-[0.5px] w-full bg-[#E9EBEF]'></div>
      {data?.price && (
        <div className='price'>
          <div
            className='price-div flex items-center gap-1 w-max my-2 cursor-pointer'
            onClick={() => setToggle((prev) => !prev)}
          >
            <p className='font-bold text-sm select-none'>Price</p>
            {!toggle ? (
              <ChevronDown strokeWidth={1} width={'20px'} />
            ) : (
              <ChevronUp strokeWidth={1} width={'20px'} />
            )}
          </div>
          {toggle && <div className='price-content'></div>}
        </div>
      )}
    </div>
  );
};

export default FormFields;
