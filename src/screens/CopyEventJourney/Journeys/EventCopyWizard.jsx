import React, { useContext, useEffect, useState } from 'react';
import ExpandableCheckboxGroup from '../../../components/ExpandableCheckboxGroup/ExpandableCheckboxGroup';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { FormContext } from '../../../utils/formContext';
import Input from '../../../components/Input/Input';
import { useForm } from 'react-hook-form';
import {
  ActionButtonNext,
  ActionButtonPrev,
} from '../../../components/ActionButton/ActionButton';

const EventCopyWizard = ({ steps = [], title = '' }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const {
    events,
    currentEvent,
    setCurrentEvent,
    formData,
    currentStep,
    currentStepData,
    setCurrentStepData,
    setFormData,
    moveToNextStep,
  } = useContext(FormContext);

  const {
    eventName,
    eventId,
    eventCode,
    startDate,
    endDate,
    sessions = [],
    tracks = [],
    fees = [],
  } = currentEvent || {};

  const handleEventChange = (e) => {
    const newSelectedEvent = events?.find(
      (event) => event.eventId === e.target.value
    );
    setCurrentEvent(newSelectedEvent);
  };

  useEffect(() => {
    const currntstep = `step${currentStep}`;
    console.log(formData[currntstep]);
    const currentData = formData?.[currntstep];

    if (currentData && Object.values(currentData)?.length) {
      setCurrentStepData(currentData);
    }
  }, []);

  useEffect(() => {
    if (currentEvent && Object.values(currentEvent)?.length) {
      for (const key in currentEvent) {
        setValue(key, currentEvent[key]); // Set the current field value if it exists
      }
    }
  }, [currentEvent]);

  useEffect(() => {
    if (currentStepData && Object.values(currentStepData)?.length) {
      for (const key in currentStepData) {
        setValue(key, currentStepData[key]);
      }
    }
  }, [currentStepData]);

  useEffect(() => {
    const subscription = watch((value) => {
      setCurrentStepData((prev) =>
        JSON.stringify(prev) !== JSON.stringify(value) ? value : prev
      );
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleFormSubmit = (data) => {
    console.log('before');

    moveToNextStep();
    console.log('agfter');
  };

  return (
    <div className='mx-auto px-1 flex flex-col justify-between h-full'>
      <form className='p-2 bg-white rounded-lg'>
        <div className='heading-wrapper'>
          {title && (
            <h1 className='text-lg font-semibold text mb-4'>{title}</h1>
          )}
        </div>
        <div className='flex justify-between items-start gap-3'>
          <div className='mb-4 w-full'>
            <label
              htmlFor='selectedEvent'
              className='block text-gray-700 font-bold mb-2 text-sm'
            >
              Select Event to Copy
              {<span className='text-red-500'>*</span>}
            </label>
            <select
              id='selectedEvent'
              name='selectedEvent'
              value={currentEvent?.eventId}
              onChange={handleEventChange}
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-[#FF5B2E] focus:border-[#FF5B2E]'
            >
              {events?.map((event) => (
                <option value={event?.eventId}>{event.eventName}</option>
              ))}
            </select>
          </div>
          <div className='mb-4 w-full'>
            <Input
              id='eventName'
              name='eventName'
              label={'New Event Name:'}
              error={errors.eventName?.message}
              register={register('eventName', {
                required: 'Event Name is required',
              })}
            />
          </div>
        </div>
        <div className='flex justify-between items-baseline gap-3'>
          <div className='w-full'>
            <Input
              type='text'
              id='eventCode'
              name='eventCode'
              label={'New Event Code:'}
              error={errors.eventCode?.message}
              register={register('eventCode', {
                validate: (value) => {
                  return value ? true : 'Event Code is required';
                },
              })}
            />
          </div>

          <div className='mb-4 date-picker flex items-center gap-3 w-full'>
            <div className='start-date w-full'>
              <label className='block text-gray-700 font-bold mb-2 text-sm'>
                Start Date:
              </label>
              <input
                defaultChecked
                type='date'
                name='startDate'
                // value={startDate}
                // onChange={(e) => setStartDate(e.target.value)}
                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-[#FF5B2E] focus:border-[#FF5B2E]'
                {...register('startDate', {
                  validate: (value) => {
                    return value ? true : 'Start date is required';
                  },
                })}
              />
              {
                <p className='text-red-500 text-xs absolute'>
                  {errors.startDate?.message}
                </p>
              }
            </div>
            <div className='end-date w-full'>
              <label className='block text-gray-700 font-bold mb-1 mx-2 text-sm'>
                End Date:
              </label>
              <input
                type='date'
                name='endDate'
                // onChange={(e) => setEndDate(e.target.value)}
                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-[#FF5B2E] focus:border-[#FF5B2E]'
                {...register('endDate', {
                  validate: (value) => {
                    return value ? true : 'End date is required';
                  },
                })}
              />
              {
                <p className='text-red-500 text-xs absolute'>
                  {errors.endDate?.message}
                </p>
              }
            </div>
          </div>
        </div>
        {/* <div className='mb-4 w-full'>
          <ExpandableCheckboxGroup label='Copy Tracks' />
        </div> */}

        <div className='mb-4'>
          <label className='w-max flex items-center bg-gray-100 px-3 py-2 rounded-md mr-2 cursor-pointer'>
            <input
              defaultChecked
              disabled={tracks?.length == 0}
              type='checkbox'
              className='myClass custom-checkbox w-4 h-4 rounded mr-2 accent-[#FF5B2E]'
            />
            <span className='text-[#201502] text-sm font-bold mr-2'>
              Copy Tracks
            </span>

            <span className='bg-[#FF5B2E] text-white rounded-full text-sm px-2'>
              {tracks?.length}
            </span>
          </label>
        </div>
        <div className='mb-4'>
          <label className='w-max flex items-center bg-gray-100 px-3 py-2 rounded-md mr-2 cursor-pointer'>
            <input
              disabled={sessions?.length == 0}
              defaultChecked
              type='checkbox'
              className='myClass custom-checkbox w-4 h-4 rounded mr-2 accent-[#FF5B2E]'
            />
            <span className='text-[#201502] text-sm font-bold mr-2'>
              Copy Sessions
            </span>

            <span className='bg-[#FF5B2E] text-white rounded-full text-sm px-2'>
              {sessions?.length}
            </span>
          </label>
        </div>

        <div className='mb-4'>
          <label className='w-max flex items-center bg-gray-100 px-3 py-2 rounded-md mr-2 cursor-pointer'>
            <input
              type='checkbox'
              defaultChecked
              disabled={fees?.length == 0}
              className='myClass custom-checkbox w-4 h-4 rounded mr-2 accent-[#FF5B2E]'
            />
            <span className='text-[#201502] text-sm font-bold mr-2'>
              Copy Fees
            </span>
            <span className='bg-[#FF5B2E] text-white rounded-full text-sm px-2'>
              {fees?.length}
            </span>
          </label>
        </div>

        <div className='mb-4 w-max'>
          <label className='block text-gray-700 font-bold mb-2'>
            Copy Faculty:
          </label>

          <div className='rounded-md flex h-max'>
            <label className='h-max bg-gray-100 w-max flex items-center px-3 py-2 rounded-md mr-2 cursor-pointer'>
              <input
                type='checkbox'
                defaultChecked
                className='myClass custom-checkbox w-4 h-4 rounded mr-2 accent-[#FF5B2E]'
              />
              <span className='text-[#201502] text-sm font-bold mr-2'>
                Speaker
              </span>
              <span className='bg-[#FF5B2E] text-white rounded-full text-sm px-2 '></span>
            </label>
            <label className='h-max bg-gray-100 w-max flex items-center px-3 py-2 rounded-md mr-2 cursor-pointer'>
              <input
                defaultChecked
                type='checkbox'
                className='myClass custom-checkbox w-4 h-4 rounded mr-2 accent-[#FF5B2E]'
              />
              <span className='text-[#201502] text-sm font-bold mr-2'>
                Staff
              </span>
            </label>
            <label className='h-max bg-gray-100 w-max flex items-center px-3 py-2 rounded-md mr-2 cursor-pointer'>
              <input
                defaultChecked
                type='checkbox'
                className='myClass custom-checkbox w-4 h-4 rounded mr-2 accent-[#FF5B2E]'
              />
              <span className='text-[#201502] text-sm font-bold mr-2'>
                Volunteer
              </span>
            </label>
            {/* <ExpandableCheckboxGroup label='Teacher' /> */}

            <label className='h-max bg-gray-100 w-max flex items-center px-3 py-2 rounded-md mr-2 cursor-pointer'>
              <input
                defaultChecked
                type='checkbox'
                className='myClass custom-checkbox w-4 h-4 rounded mr-2 accent-[#FF5B2E]'
              />
              <span className='text-[#201502] text-sm font-bold mr-2'>
                Teacher
              </span>
            </label>
          </div>
        </div>

        <div className='mb-4'>
          <label className='w-max flex items-center bg-gray-100 px-3 py-2 rounded-md mr-2 cursor-pointer'>
            <input
              defaultChecked
              type='checkbox'
              className='myClass custom-checkbox w-4 h-4 rounded mr-2 accent-[#FF5B2E]'
            />
            <span className='text-[#201502] text-sm font-bold'>
              Copy Location
            </span>
          </label>
        </div>
        <div className='mb-4'>
          <label className='w-max flex items-center bg-gray-100 px-3 py-2 rounded-md mr-2 cursor-pointer'>
            <input
              defaultChecked
              type='checkbox'
              className='myClass custom-checkbox w-4 h-4 rounded mr-2 accent-[#FF5B2E]'
            />
            <span className='text-[#201502] text-sm font-bold'>
              Copy Keywords
            </span>
          </label>
        </div>

        <div className='mb-4'>
          <label className='w-max flex items-center bg-gray-100 px-3 py-2 rounded-md mr-2 cursor-pointer'>
            <input
              defaultChecked
              type='checkbox'
              className='myClass custom-checkbox w-4 h-4 rounded mr-2 accent-[#FF5B2E]'
            />
            <span className='text-[#201502] text-sm font-bold'>
              Copy Abstract
            </span>
          </label>
        </div>

        <div className='mb-4 w-max'>
          <label className='block text-gray-700 font-bold mb-2'>
            Copy Custom:
          </label>
          <div className='rounded-md flex'>
            <label className='bg-gray-100 w-max flex items-center px-3 py-2 rounded-md mr-2 cursor-pointer'>
              <input
                defaultChecked
                type='checkbox'
                className='myClass custom-checkbox w-4 h-4 rounded mr-2 accent-[#FF5B2E]'
              />
              <span className='text-[#201502] text-sm font-bold mr-2'>
                Event
              </span>
              {/* <span className='bg-[#FF5B2E] text-white rounded-full text-sm px-2 '>
                {23}
              </span> */}
            </label>
            <label className='bg-gray-100 w-max flex items-center px-3 py-2 rounded-md mr-2 cursor-pointer'>
              <input
                defaultChecked
                type='checkbox'
                className='myClass custom-checkbox w-4 h-4 rounded mr-2 accent-[#FF5B2E]'
              />
              <span className='text-[#201502] text-sm font-bold mr-2'>
                Sessions (will be applied to all selected sessions)
              </span>
            </label>
          </div>
        </div>
      </form>
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
            currentStep === steps.length
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-[#201502] text-white hover:bg-gray-700 transition duration-200'
          }`}
        />
      </div>
    </div>
  );
};

export default EventCopyWizard;
