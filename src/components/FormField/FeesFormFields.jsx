import React, { useContext, useEffect, useRef, useState } from 'react';
import Input from '../Input/Input';
import { ChevronDown, ChevronsDown, ChevronUp } from 'react-feather';
import { FormContext } from '../../utils/formContext';
import { ReactHookForm } from '../../utils/ReactHookFormContext';
import Select from '../Select/Select';

const FeesFormFields = ({ data, keyField = '' }) => {
  const [toggle, setToggle] = useState(false);
  const [accountsToggle, setAccountsToggle] = useState(false);

  //   console.log({ registerInChild: register, formMethods });

  //   const values = getValues();
  //   console.log({ keyField, values });

  const { setCurrentStepData, currentStepData, accounts } =
    useContext(FormContext);

  const { formMethods } = useContext(ReactHookForm);

  const { setValue, getValues, errors, register, watch } = formMethods;

  useEffect(() => {
    if (data && Object.values(data)?.length) {
      for (const key in data) {
        const val = data[key];

        console.log({
          key,
          dataKey: val,
          val: typeof val,
          key: `${keyField}#${key}`,
        });
        setValue(`${keyField}#${key}`, val);
      }
    }
  }, [data]);

  useEffect(() => {
    const subscription = watch((value) => {
      // setCurrentStepData((prev) =>
      //   JSON.stringify(prev) !== JSON.stringify(value) ? value : prev
      // );

      console.log({ watchValue: value });
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  //   useEffect(() => {
  //     if (currentStepData && Object.values(currentStepData)?.length) {
  //       for (const key in currentStepData) {
  //         setValue(key, currentStepData[key]);
  //       }
  //     }
  //   }, [currentStepData]);

  return (
    <div
      className='container bg-[#FFFFFF] w-full rounded-lg p-3 mb-3'
      style={{ boxShadow: ' 0px 0px 12px 0px #00000029' }}
    >
      <div className='form flex gap-3 flex-grow'>
        <Input
          type='text'
          id='productName'
          name={`${keyField}#productName`}
          label={'Product Name'}
          error={errors?.[`${keyField}#productName`]?.message}
          register={register(`${keyField}#productName`, {
            validate: (value) => {
              return value ? true : 'Product Name is required';
            },
          })}
        />
        <Input
          type='text'
          id='productCode'
          name={`${keyField}#productCode`}
          label={'Product Code'}
          error={errors?.[`${keyField}#productCode`]?.message}
          register={register(`${keyField}#productCode`, {
            validate: (value) => {
              return value ? true : 'Code is required';
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
            name={`${keyField}#startDate`}
            className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-[#FF5B2E] focus:border-[#FF5B2E]'
            {...register(`${keyField}#startDate`, {
              validate: (value) => {
                return value ? true : 'Start date is required';
              },
            })}
          />
          {
            <p className='text-red-500 text-xs absolute'>
              {errors?.[`${keyField}#startDate`]?.message}
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
            name={`${keyField}#endDate`}
            className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-[#FF5B2E] focus:border-[#FF5B2E]'
            {...register(`${keyField}#endDate`, {
              validate: (value) => {
                return value ? true : 'End date is required';
              },
            })}
          />
          {
            <p className='text-red-500 text-xs absolute'>
              {errors?.[`${keyField}#endDate`]?.message}
            </p>
          }
        </div>
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
          {toggle && (
            <div className='price-content'>
              <div className='border rounded-md p-2'>
                <div className='text flex justify-between gap-3'>
                  <Input
                    type='text'
                    id={`${keyField}#priceName`}
                    name={`${keyField}#priceName`}
                    label={'Name'}
                    error={errors?.[`${keyField}#priceName`]?.message}
                    register={register(keyField + '#' + 'priceName', {
                      validate: (value) => {
                        return value ? true : 'Price Name is required';
                      },
                    })}
                  />
                  <Input
                    type='text'
                    id={`${keyField}#priceCode`}
                    name={`${keyField}#priceCode`}
                    label={'Code'}
                    error={errors?.[`${keyField}#priceCode`]?.message}
                    register={register(`${keyField}#priceCode`, {
                      validate: (value) => {
                        return value ? true : 'Code is required';
                      },
                    })}
                  />
                </div>
                <div className='flex justify-between gap-3'>
                  <Input
                    type='text'
                    id='price'
                    name={`${keyField}#price`}
                    label={'Price'}
                    error={errors?.[`${keyField}#price`]?.message}
                    register={register(`${keyField}#price`, {
                      validate: (value) => {
                        return value ? true : 'Price is required';
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
                      name={`${keyField}#priceStartdate`}
                      className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-[#FF5B2E] focus:border-[#FF5B2E]'
                      {...register(`${keyField}#priceStartdate`, {
                        validate: (value) => {
                          return value ? true : 'Start date is required';
                        },
                      })}
                    />
                    {
                      <p className='text-red-500 text-xs absolute'>
                        {errors?.[`${keyField}#priceStartdate`]?.message}
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
                      name={`${keyField}#priceEndDate`}
                      className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-[#FF5B2E] focus:border-[#FF5B2E]'
                      {...register(`${keyField}#priceEndDate`, {
                        validate: (value) => {
                          return value ? true : 'End date is required';
                        },
                      })}
                    />
                    {
                      <p className='text-red-500 text-xs absolute'>
                        {errors?.[`${keyField}#priceEndDate`]?.message}
                      </p>
                    }
                  </div>
                </div>
                <div className='accounts'>
                  <div
                    className='price-div flex items-center gap-1 w-max my-2 cursor-pointer'
                    onClick={() => setAccountsToggle((prev) => !prev)}
                  >
                    <p className='font-bold text-sm select-none'>Accounts</p>
                    {!accountsToggle ? (
                      <ChevronDown strokeWidth={1} width={'20px'} />
                    ) : (
                      <ChevronUp strokeWidth={1} width={'20px'} />
                    )}
                  </div>

                  {accountsToggle && (
                    <div className='accounts-contents'>
                      {/* <select
                      id='selectedEvent'
                      name='selectedEvent'
                      //   value={currentEvent?.eventId}
                      //   onChange={handleEventChange}
                      className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-[#201502] focus:border-[#201502]'
                    >
                     {events?.map((event) => (
                        <option value={event?.eventId}>
                          {event.eventName}
                        </option>
                      ))} 
                    </select> */}
                      <div className='flex justify-between gap-3 mb-2'>
                        <Select
                          id='selectedEvent'
                          name='selectedEvent'
                          data={accounts.accountsReceivable?.map((account) => ({
                            id: account?.accountCode,
                            name: account?.accountName,
                          }))}
                          label={'A/R account'}
                        />
                        <Select
                          id='selectedEvent'
                          name='selectedEvent'
                          data={accounts.returns?.map((account) => ({
                            id: account?.accountCode,
                            name: account?.accountName,
                          }))}
                          label={'Return account'}
                        />
                      </div>
                      <div className='flex justify-between gap-3 mb-2'>
                        <Select
                          id='selectedEvent'
                          name='selectedEvent'
                          data={accounts.accountsReceivable?.map((account) => ({
                            id: account?.accountCode,
                            name: account?.accountName,
                          }))}
                          label={'A/R account'}
                        />
                        <Select
                          id='selectedEvent'
                          name='selectedEvent'
                          data={accounts.returns?.map((account) => ({
                            id: account?.accountCode,
                            name: account?.accountName,
                          }))}
                          label={'Return account'}
                        />
                      </div>
                      <div className='flex justify-between gap-3 mb-2 items-end'>
                        <Select
                          id='selectedEvent'
                          name='selectedEvent'
                          data={accounts.accountsReceivable?.map((account) => ({
                            id: account?.accountCode,
                            name: account?.accountName,
                          }))}
                          label={'A/R account'}
                        />
                        <div className='w-full'>
                          <label className='w-max flex items-center px-3 py-2 rounded-md cursor-pointer'>
                            <input
                              type='checkbox'
                              defaultChecked
                              // disabled={fees?.length == 0}
                              className='myClass custom-checkbox rounded-md mr-1 accent-[#FF5B2E] w-5 h-5'
                            />
                            <span className='text-[#201502] text-sm font-bold mr-2'>
                              Deferred?
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FeesFormFields;
