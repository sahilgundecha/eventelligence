import React, { useContext, useEffect, useState } from 'react';
import { FormContext } from '../../contexts/formContext';
import { ReactHookForm } from '../../contexts/ReactHookFormContext';
import Input from '../Input/Input';
import { ChevronDown, ChevronUp } from 'react-feather';
import Select from '../Select/Select';
import CheckField from '../CheckField/CheckField';
import AddNew from '../AddNew/AddNew';
import FormContainer from '../FormContainer/FormContainer';

const SessionsFormFields = ({ session: data, keyField = '' }) => {
  const [toggle, setToggle] = useState(false);
  const [priceToggle, setPriceToggle] = useState(false);

  const [courseToggle, setCourseToggle] = useState(false);
  const [locationToggle, setLocationToggle] = useState(false);
  const [facultyToggle, setFacultyToggle] = useState(false);
  const [accountsToggle, setAccountsToggle] = useState(false);

  const { setCurrentStepData, currentStepData, accounts } =
    useContext(FormContext);

  console.log({ session: data?.location });

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

  return (
    <div
      className='container bg-[#FFFFFF] w-full rounded-lg p-3 mb-3'
      style={{ boxShadow: ' 0px 0px 12px 0px #00000029' }}
    >
      <div className='form flex gap-3 items-center mb-2'>
        <Input
          type='text'
          id='sessionTitle'
          name={`${keyField}#sessionTitle`}
          label={'Session Title'}
          error={errors?.[`${keyField}#sessionTitle`]?.message}
          register={register(`${keyField}#sessionTitle`, {
            validate: (value) => {
              return value ? true : 'Title is required';
            },
          })}
        />
        <Input
          type='text'
          id='sessionCode'
          name={`${keyField}#sessionCode`}
          label={'Session Code'}
          error={errors?.[`${keyField}#sessionCode`]?.message}
          register={register(`${keyField}#sessionCode`, {
            validate: (value) => {
              return value ? true : 'Code is required';
            },
          })}
        />
      </div>
      <div className='form flex gap-3 items-center mb-2'>
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
          <label className='block text-gray-700 font-bold mb-2 text-xs'>
            Start Time
            {<span className='text-red-500'>*</span>}
          </label>
          <input
            type='time'
            name={`${keyField}#startTime`}
            className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-[#FF5B2E] focus:border-[#FF5B2E]'
            {...register(`${keyField}#startTime`, {
              validate: (value) => {
                return value ? true : 'Start time is required';
              },
            })}
          />
          {
            <p className='text-red-500 text-xs absolute'>
              {errors?.[`${keyField}#startTime`]?.message}
            </p>
          }
        </div>
        <div className='end-date w-full'>
          <label className='block text-gray-700 font-bold mb-2 text-xs'>
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
        <div className='end-date w-full'>
          <label className='block text-gray-700 font-bold mb-2 text-xs'>
            End Time
            {<span className='text-red-500'>*</span>}
          </label>
          <input
            type='time'
            name={`${keyField}#endTime`}
            className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-[#FF5B2E] focus:border-[#FF5B2E]'
            {...register(`${keyField}#endTime`, {
              validate: (value) => {
                return value ? true : 'End time is required';
              },
            })}
          />
          {
            <p className='text-red-500 text-xs absolute'>
              {errors?.[`${keyField}#endTime`]?.message}
            </p>
          }
        </div>
      </div>
      {/* <div className='form flex gap-3 items-center mb-2'>
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
      </div> */}
      <div className='line my-4 h-[0.5px] w-full bg-[#E9EBEF]'></div>

      <div className='fees'>
        <div
          className='price-div flex items-center gap-1 w-max my-2 cursor-pointer'
          onClick={() => setToggle((prev) => !prev)}
        >
          <p className='font-bold text-sm select-none'>Fees</p>
          {!toggle ? (
            <ChevronDown strokeWidth={1} width={'20px'} />
          ) : (
            <ChevronUp strokeWidth={1} width={'20px'} />
          )}
        </div>
        {toggle && (
          <div className='price-content'>
            <div className='border rounded-md p-2'>
              <div className='price'>
                <div
                  className='price-div flex items-center gap-1 w-max my-2 cursor-pointer'
                  onClick={() => setPriceToggle((prev) => !prev)}
                >
                  <p className='font-bold text-sm select-none'>Price</p>
                  {!priceToggle ? (
                    <ChevronDown strokeWidth={1} width={'20px'} />
                  ) : (
                    <ChevronUp strokeWidth={1} width={'20px'} />
                  )}
                </div>
                {priceToggle && (
                  <div className='price-content'>
                    <div className='text flex justify-between gap-3'>
                      <Input
                        type='text'
                        id={`${keyField}#priceName`}
                        name={`${keyField}#priceName`}
                        label={'Name'}
                        value={'Keynote Registration'}
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
                        value={'KEY1011'}
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
                        value={'60'}
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
                          value={'2024-05-10'}
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
                          value={'2024-05-11'}
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
                  </div>
                )}
              </div>
              <div className='line my-4 h-[0.5px] w-full bg-[#E9EBEF]'></div>
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
      <div className='line my-4 h-[0.5px] w-full bg-[#E9EBEF]'></div>

      <div className='location'>
        <div
          className='price-div flex items-center gap-1 w-max my-2 cursor-pointer'
          onClick={() => setLocationToggle((prev) => !prev)}
        >
          <p className='font-bold text-sm select-none'>Location</p>
          {!locationToggle ? (
            <ChevronDown strokeWidth={1} width={'20px'} />
          ) : (
            <ChevronUp strokeWidth={1} width={'20px'} />
          )}
        </div>
        {locationToggle && (
          <div className='fees-content border rounded-md p-2'>
            <div className='grid grid-cols-2 gap-3 items-center justify-between'>
              {data?.location.map((loc) => (
                <div className='w-full flex items-center gap-2'>
                  <CheckField />
                  <Input
                    type='text'
                    id='productCodee'
                    value={'Main Hall'}
                    name={`${keyField}#productCodee`}
                    // label={loc.locationName}
                    error={errors?.[`${keyField}#productCodee`]?.message}
                    register={register(`${keyField}#productCodee`, {
                      validate: (value) => {
                        return value ? true : 'Code is required';
                      },
                    })}
                  />
                </div>
              ))}
              <AddNew />
            </div>
          </div>
        )}
      </div>

      <div className='line my-4 h-[0.5px] w-full bg-[#E9EBEF]'>
        <div className='grid grid-cols-2'>
          {/* {data?.location?.map((loc, ind) => {
              return <div>div{ind}</div>;
            })} */}
          {/* {data?.lo} */}
        </div>
      </div>

      <div className='course'>
        <div
          className='price-div flex items-center gap-1 w-max my-2 cursor-pointer'
          onClick={() => setCourseToggle((prev) => !prev)}
        >
          <p className='font-bold text-sm select-none'>Course</p>
          {!courseToggle ? (
            <ChevronDown strokeWidth={1} width={'20px'} />
          ) : (
            <ChevronUp strokeWidth={1} width={'20px'} />
          )}
        </div>
        {courseToggle && (
          <div className='fees-content border rounded-md p-2'>
            <div className='grid grid-cols-2 gap-3 items-center justify-between'>
              {data?.course.map((loc) => (
                <div className='w-full flex items-center gap-2'>
                  <CheckField />
                  <Input
                    type='text'
                    id='courseName'
                    value={'Innovations in Tech'}
                    name={`${keyField}#courseName`}
                    // label={loc.locationName}
                    error={errors?.[`${keyField}#courseName`]?.message}
                    register={register(`${keyField}#courseName`, {
                      validate: (value) => {
                        return value ? true : 'Code is required';
                      },
                    })}
                  />
                </div>
              ))}
              <AddNew />
            </div>
          </div>
        )}
      </div>
      <div className='line my-4 h-[0.5px] w-full bg-[#E9EBEF]'></div>

      <div className='faculty'>
        <div
          className='price-div flex items-center gap-1 w-max my-2 cursor-pointer'
          onClick={() => setFacultyToggle((prev) => !prev)}
        >
          <p className='font-bold text-sm select-none'>Faculty</p>
          {!facultyToggle ? (
            <ChevronDown strokeWidth={1} width={'20px'} />
          ) : (
            <ChevronUp strokeWidth={1} width={'20px'} />
          )}
        </div>
        {facultyToggle && (
          <div className='fees-content border rounded-md p-2'>
            <div className=''>
              {Object.entries(data?.faculty).map((fac) => {
                return (
                  <FormContainer title={fac[0]}>
                    {fac[1].map((name, ind) => (
                      <div className='grid grid-cols-2'>
                        <div className='w-full flex items-center gap-2 ml-3'>
                          <CheckField />
                          <Input
                            type='text'
                            id={fac[0]}
                            value={name}
                            name={`${keyField}#${fac[0]}`}
                            // label={loc.locationName}
                            error={errors?.[`${keyField}#${fac[0]}`]?.message}
                            register={register(`${keyField}#${fac[0]}`, {
                              validate: (value) => {
                                return value ? true : 'Code is required';
                              },
                            })}
                          />
                        </div>
                        <div></div>
                      </div>
                    ))}
                    <div className='px-6 mt-3'>
                      <AddNew />
                    </div>
                  </FormContainer>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionsFormFields;
