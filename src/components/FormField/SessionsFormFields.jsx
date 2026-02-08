import React, { useContext, useState } from "react";
import { FormContext } from "../../contexts/formContext.js";
import { useFormContext, useFieldArray } from "react-hook-form";
import Input from "../Input/Input.jsx";
import { ChevronDown, ChevronUp, Trash2 } from "react-feather";
import Select from "../Select/Select.jsx";
import AddNew from "../AddNew/AddNew.jsx";

const SessionsFormFields = ({ fieldIndex, onRemove }) => {
  const [feesToggle, setFeesToggle] = useState(false);
  const [priceToggle, setPriceToggle] = useState(false);
  const [accountsToggle, setAccountsToggle] = useState(false);
  const [locationToggle, setLocationToggle] = useState(false);
  const [courseToggle, setCourseToggle] = useState(false);
  const [facultyToggle, setFacultyToggle] = useState(false);

  const { accounts } = useContext(FormContext);
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  // Speakers field array
  const {
    fields: speakerFields,
    append: appendSpeaker,
    remove: removeSpeaker,
  } = useFieldArray({
    control,
    name: `sessions.${fieldIndex}.faculty.speakers`,
  });

  // Staff field array
  const {
    fields: staffFields,
    append: appendStaff,
    remove: removeStaff,
  } = useFieldArray({
    control,
    name: `sessions.${fieldIndex}.faculty.staff`,
  });

  // Volunteers field array
  const {
    fields: volunteersFields,
    append: appendVolunteer,
    remove: removeVolunteer,
  } = useFieldArray({
    control,
    name: `sessions.${fieldIndex}.faculty.volunteers`,
  });

  // Locations field array
  const {
    fields: locationFields,
    append: appendLocation,
    remove: removeLocation,
  } = useFieldArray({
    control,
    name: `sessions.${fieldIndex}.locations`,
  });

  // Courses field array
  const {
    fields: courseFields,
    append: appendCourse,
    remove: removeCourse,
  } = useFieldArray({
    control,
    name: `sessions.${fieldIndex}.courses`,
  });

  return (
    <div
      className="container bg-[#FFFFFF] w-full rounded-lg p-3 mb-3 relative"
      style={{ boxShadow: " 0px 0px 12px 0px #00000029" }}
    >
      {/* Delete Button */}
      <button
        type="button"
        onMouseDown={(e) => {
          console.log("Delete button mouseDown for session", fieldIndex);
          e.preventDefault();
          e.stopPropagation();
        }}
        onClick={(e) => {
          console.log("Delete button clicked for session", fieldIndex);
          e.preventDefault();
          e.stopPropagation();
          if (onRemove) {
            console.log("Calling onRemove for session", fieldIndex);
            onRemove();
          } else {
            console.warn(
              "onRemove function not provided for session",
              fieldIndex,
            );
          }
        }}
        className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition-colors z-50 cursor-pointer p-1"
        style={{ pointerEvents: "auto" }}
        title="Delete this session"
      >
        <Trash2 width={18} height={18} style={{ pointerEvents: "auto" }} />
      </button>

      <div className="form flex gap-3 items-center mb-2">
        <Input
          type="text"
          id={`sessions.${fieldIndex}.sessionTitle`}
          name={`sessions.${fieldIndex}.sessionTitle`}
          label={"Session Title"}
          error={errors?.sessions?.[fieldIndex]?.sessionTitle?.message}
          register={register(`sessions.${fieldIndex}.sessionTitle`, {
            required: "Title is required",
          })}
        />
        <Input
          type="text"
          id={`sessions.${fieldIndex}.sessionCode`}
          name={`sessions.${fieldIndex}.sessionCode`}
          label={"Session Code"}
          error={errors?.sessions?.[fieldIndex]?.sessionCode?.message}
          register={register(`sessions.${fieldIndex}.sessionCode`, {
            required: "Code is required",
          })}
        />
      </div>
      <div className="form flex gap-3 items-center mb-2">
        <div className="w-full">
          <label className="block text-gray-700 font-bold mb-2 text-xs">
            Start Date
            {<span className="text-red-500">*</span>}
          </label>
          <input
            type="date"
            {...register(`sessions.${fieldIndex}.startDate`, {
              required: "Start date is required",
            })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-[#FF5B2E] focus:border-[#FF5B2E]"
          />
          {errors?.sessions?.[fieldIndex]?.startDate && (
            <p className="text-red-500 text-xs">
              {errors.sessions[fieldIndex].startDate.message}
            </p>
          )}
        </div>
        <div className="w-full">
          <label className="block text-gray-700 font-bold mb-2 text-xs">
            Start Time
            {<span className="text-red-500">*</span>}
          </label>
          <input
            type="time"
            {...register(`sessions.${fieldIndex}.startTime`, {
              required: "Start time is required",
            })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-[#FF5B2E] focus:border-[#FF5B2E]"
          />
          {errors?.sessions?.[fieldIndex]?.startTime && (
            <p className="text-red-500 text-xs">
              {errors.sessions[fieldIndex].startTime.message}
            </p>
          )}
        </div>
        <div className="w-full">
          <label className="block text-gray-700 font-bold mb-2 text-xs">
            End Date
            {<span className="text-red-500">*</span>}
          </label>
          <input
            type="date"
            {...register(`sessions.${fieldIndex}.endDate`, {
              required: "End date is required",
            })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-[#FF5B2E] focus:border-[#FF5B2E]"
          />
          {errors?.sessions?.[fieldIndex]?.endDate && (
            <p className="text-red-500 text-xs">
              {errors.sessions[fieldIndex].endDate.message}
            </p>
          )}
        </div>
        <div className="w-full">
          <label className="block text-gray-700 font-bold mb-2 text-xs">
            End Time
            {<span className="text-red-500">*</span>}
          </label>
          <input
            type="time"
            {...register(`sessions.${fieldIndex}.endTime`, {
              required: "End time is required",
            })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-[#FF5B2E] focus:border-[#FF5B2E]"
          />
          {errors?.sessions?.[fieldIndex]?.endTime && (
            <p className="text-red-500 text-xs">
              {errors.sessions[fieldIndex].endTime.message}
            </p>
          )}
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
      <div className="line my-4 h-[0.5px] w-full bg-[#E9EBEF]"></div>

      {/* Fees Section */}
      <div className="fees mb-3">
        <div
          className="price-div flex items-center gap-1 w-max my-2 cursor-pointer"
          onClick={() => setFeesToggle((prev) => !prev)}
        >
          <p className="font-bold text-sm select-none">Fees</p>
          {!feesToggle ? (
            <ChevronDown strokeWidth={1} width="20px" />
          ) : (
            <ChevronUp strokeWidth={1} width="20px" />
          )}
        </div>
        {feesToggle && (
          <div className="border rounded-md p-2 ml-3">
            {/* Price Subsection */}
            <div className="price mb-3">
              <div
                className="price-div flex items-center gap-1 w-max my-2 cursor-pointer"
                onClick={() => setPriceToggle((prev) => !prev)}
              >
                <p className="font-bold text-sm select-none">Price</p>
                {!priceToggle ? (
                  <ChevronDown strokeWidth={1} width="20px" />
                ) : (
                  <ChevronUp strokeWidth={1} width="20px" />
                )}
              </div>
              {priceToggle && (
                <div className="border rounded-md p-2 ml-2">
                  <div className="flex justify-between gap-3 mb-3">
                    <Input
                      type="text"
                      id={`sessions.${fieldIndex}.priceName`}
                      name={`sessions.${fieldIndex}.priceName`}
                      label="Price Name"
                      error={errors?.sessions?.[fieldIndex]?.priceName?.message}
                      register={register(`sessions.${fieldIndex}.priceName`, {
                        required: "Price Name is required",
                      })}
                    />
                    <Input
                      type="text"
                      id={`sessions.${fieldIndex}.priceCode`}
                      name={`sessions.${fieldIndex}.priceCode`}
                      label="Price Code"
                      error={errors?.sessions?.[fieldIndex]?.priceCode?.message}
                      register={register(`sessions.${fieldIndex}.priceCode`, {
                        required: "Code is required",
                      })}
                    />
                  </div>
                  <div className="flex justify-between gap-3 mb-3">
                    <Input
                      type="text"
                      id={`sessions.${fieldIndex}.price`}
                      name={`sessions.${fieldIndex}.price`}
                      label="Amount"
                      error={errors?.sessions?.[fieldIndex]?.price?.message}
                      register={register(`sessions.${fieldIndex}.price`, {
                        required: "Amount is required",
                      })}
                    />
                    <div className="w-full">
                      <label className="block text-gray-700 font-bold mb-2 text-xs">
                        Start Date<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        {...register(`sessions.${fieldIndex}.priceStartDate`)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-[#FF5B2E] focus:border-[#FF5B2E]"
                      />
                      {errors?.sessions?.[fieldIndex]?.priceStartDate && (
                        <p className="text-red-500 text-xs">
                          {errors.sessions[fieldIndex].priceStartDate.message}
                        </p>
                      )}
                    </div>
                    <div className="w-full">
                      <label className="block text-gray-700 font-bold mb-2 text-xs">
                        End Date<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        {...register(`sessions.${fieldIndex}.priceEndDate`)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-[#FF5B2E] focus:border-[#FF5B2E]"
                      />
                      {errors?.sessions?.[fieldIndex]?.priceEndDate && (
                        <p className="text-red-500 text-xs">
                          {errors.sessions[fieldIndex].priceEndDate.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="line my-2 h-[0.5px] w-full bg-[#E9EBEF]"></div>

            {/* Accounts Subsection */}
            <div className="accounts">
              <div
                className="price-div flex items-center gap-1 w-max my-2 cursor-pointer"
                onClick={() => setAccountsToggle((prev) => !prev)}
              >
                <p className="font-bold text-sm select-none">Accounts</p>
                {!accountsToggle ? (
                  <ChevronDown strokeWidth={1} width="20px" />
                ) : (
                  <ChevronUp strokeWidth={1} width="20px" />
                )}
              </div>
              {accountsToggle && (
                <div className="border rounded-md p-2 ml-2">
                  <div className="flex justify-between gap-3 mb-2">
                    <Select
                      id={`sessions.${fieldIndex}.accountAR1`}
                      name={`sessions.${fieldIndex}.accountAR1`}
                      data={accounts?.accountsReceivable?.map((account) => ({
                        id: account?.accountCode,
                        name: account?.accountName,
                      }))}
                      label="A/R account"
                    />
                    <Select
                      id={`sessions.${fieldIndex}.returnAccount1`}
                      name={`sessions.${fieldIndex}.returnAccount1`}
                      data={accounts?.returns?.map((account) => ({
                        id: account?.accountCode,
                        name: account?.accountName,
                      }))}
                      label="Return account"
                    />
                  </div>
                  <div className="flex justify-between gap-3 mb-2">
                    <Select
                      id={`sessions.${fieldIndex}.accountAR2`}
                      name={`sessions.${fieldIndex}.accountAR2`}
                      data={accounts?.accountsReceivable?.map((account) => ({
                        id: account?.accountCode,
                        name: account?.accountName,
                      }))}
                      label="A/R account"
                    />
                    <Select
                      id={`sessions.${fieldIndex}.returnAccount2`}
                      name={`sessions.${fieldIndex}.returnAccount2`}
                      data={accounts?.returns?.map((account) => ({
                        id: account?.accountCode,
                        name: account?.accountName,
                      }))}
                      label="Return account"
                    />
                  </div>
                  <div className="flex justify-between gap-3 mb-2 items-end">
                    <Select
                      id={`sessions.${fieldIndex}.accountAR3`}
                      name={`sessions.${fieldIndex}.accountAR3`}
                      data={accounts?.accountsReceivable?.map((account) => ({
                        id: account?.accountCode,
                        name: account?.accountName,
                      }))}
                      label="A/R account"
                    />
                    <div className="w-full">
                      <label className="w-max flex items-center px-3 py-2 rounded-md cursor-pointer">
                        <input
                          type="checkbox"
                          {...register(`sessions.${fieldIndex}.isDeferred`)}
                          className="custom-checkbox rounded-md mr-1 accent-[#FF5B2E] w-5 h-5"
                        />
                        <span className="text-[#201502] text-sm font-bold mr-2">
                          Deferred?
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="line my-4 h-[0.5px] w-full bg-[#E9EBEF]"></div>

      {/* Location Section */}
      <div className="location mb-3">
        <div
          className="price-div flex items-center gap-1 w-max my-2 cursor-pointer"
          onClick={() => setLocationToggle((prev) => !prev)}
        >
          <p className="font-bold text-sm select-none">Locations</p>
          {!locationToggle ? (
            <ChevronDown strokeWidth={1} width="20px" />
          ) : (
            <ChevronUp strokeWidth={1} width="20px" />
          )}
        </div>
        {locationToggle && (
          <div className="border rounded-md p-2 ml-3">
            {locationFields && locationFields.length > 0 ? (
              locationFields.map((location, idx) => (
                <div
                  key={location.id}
                  className="mb-3 pb-3 border-b last:border-b-0"
                >
                  <div className="flex gap-3 mb-2">
                    <Input
                      type="text"
                      id={`sessions.${fieldIndex}.locations.${idx}.locationName`}
                      name={`sessions.${fieldIndex}.locations.${idx}.locationName`}
                      label="Location Name"
                      error={
                        errors?.sessions?.[fieldIndex]?.locations?.[idx]
                          ?.locationName?.message
                      }
                      register={register(
                        `sessions.${fieldIndex}.locations.${idx}.locationName`,
                      )}
                    />
                    <Input
                      type="text"
                      id={`sessions.${fieldIndex}.locations.${idx}.room`}
                      name={`sessions.${fieldIndex}.locations.${idx}.room`}
                      label="Room"
                      error={
                        errors?.sessions?.[fieldIndex]?.locations?.[idx]?.room
                          ?.message
                      }
                      register={register(
                        `sessions.${fieldIndex}.locations.${idx}.room`,
                      )}
                    />
                    <Input
                      type="text"
                      id={`sessions.${fieldIndex}.locations.${idx}.setup`}
                      name={`sessions.${fieldIndex}.locations.${idx}.setup`}
                      label="Setup"
                      error={
                        errors?.sessions?.[fieldIndex]?.locations?.[idx]?.setup
                          ?.message
                      }
                      register={register(
                        `sessions.${fieldIndex}.locations.${idx}.setup`,
                      )}
                    />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="flex items-center px-3 py-2 rounded-md cursor-pointer">
                      <input
                        type="checkbox"
                        {...register(
                          `sessions.${fieldIndex}.locations.${idx}.isVirtual`,
                        )}
                        className="custom-checkbox rounded-md mr-2 accent-[#FF5B2E] w-4 h-4"
                      />
                      <span className="text-[#201502] text-sm font-bold">
                        Virtual Location?
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={() => removeLocation(idx)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete location"
                    >
                      <Trash2 width={18} height={18} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 text-sm mb-3">
                No locations added yet. Click "Add New" to add a location.
              </div>
            )}
            <AddNew
              label="Add New Location"
              onClick={() =>
                appendLocation({ locationName: "", room: "", setup: "" })
              }
            />
          </div>
        )}
      </div>

      <div className="line my-4 h-[0.5px] w-full bg-[#E9EBEF]"></div>

      {/* Course Section */}
      <div className="course mb-3">
        <div
          className="price-div flex items-center gap-1 w-max my-2 cursor-pointer"
          onClick={() => setCourseToggle((prev) => !prev)}
        >
          <p className="font-bold text-sm select-none">Courses</p>
          {!courseToggle ? (
            <ChevronDown strokeWidth={1} width="20px" />
          ) : (
            <ChevronUp strokeWidth={1} width="20px" />
          )}
        </div>
        {courseToggle && (
          <div className="border rounded-md p-2 ml-3">
            {courseFields && courseFields.length > 0 ? (
              courseFields.map((course, idx) => (
                <div
                  key={course.id}
                  className="mb-3 pb-3 border-b last:border-b-0"
                >
                  <div className="flex justify-between items-center">
                    <Input
                      type="text"
                      id={`sessions.${fieldIndex}.courses.${idx}.courseName`}
                      name={`sessions.${fieldIndex}.courses.${idx}.courseName`}
                      label="Course Name"
                      error={
                        errors?.sessions?.[fieldIndex]?.courses?.[idx]
                          ?.courseName?.message
                      }
                      register={register(
                        `sessions.${fieldIndex}.courses.${idx}.courseName`,
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => removeCourse(idx)}
                      className="text-red-500 hover:text-red-700 mt-5 ml-2"
                      title="Delete course"
                    >
                      <Trash2 width={18} height={18} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 text-sm mb-3">
                No courses added yet. Click "Add New" to add a course.
              </div>
            )}
            <AddNew
              label="Add New Course"
              onClick={() => appendCourse({ courseName: "" })}
            />
          </div>
        )}
      </div>

      <div className="line my-4 h-[0.5px] w-full bg-[#E9EBEF]"></div>

      {/* Faculty Section */}
      <div className="faculty">
        <div
          className="price-div flex items-center gap-1 w-max my-2 cursor-pointer"
          onClick={() => setFacultyToggle((prev) => !prev)}
        >
          <p className="font-bold text-sm select-none">Faculty</p>
          {!facultyToggle ? (
            <ChevronDown strokeWidth={1} width="20px" />
          ) : (
            <ChevronUp strokeWidth={1} width="20px" />
          )}
        </div>
        {facultyToggle && (
          <div className="border rounded-md p-2 ml-3">
            {/* Speakers Subsection */}
            <div className="speakers-subsection mb-3">
              <div
                className="price-div flex items-center gap-1 w-max my-2 cursor-pointer"
                onClick={() => {
                  const elem = document.getElementById(
                    `speakers-${fieldIndex}`,
                  );
                  if (elem) elem.classList.toggle("hidden");
                }}
              >
                <p className="font-bold text-sm select-none">Speakers</p>
                <ChevronDown strokeWidth={1} width="16px" />
              </div>
              <div
                id={`speakers-${fieldIndex}`}
                className="border rounded-md p-2 ml-2"
              >
                {speakerFields && speakerFields.length > 0 ? (
                  speakerFields.map((speaker, idx) => (
                    <div
                      key={speaker.id}
                      className="mb-2 pb-2 border-b last:border-b-0"
                    >
                      <div className="flex justify-between items-center">
                        <input
                          type="text"
                          placeholder="Speaker Name"
                          {...register(
                            `sessions.${fieldIndex}.faculty.speakers.${idx}`,
                          )}
                          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-[#FF5B2E] focus:border-[#FF5B2E]"
                        />
                        <button
                          type="button"
                          onClick={() => removeSpeaker(idx)}
                          className="text-red-500 hover:text-red-700 ml-2"
                        >
                          <Trash2 width={16} height={16} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-xs py-2">
                    No speakers added.
                  </p>
                )}
                <AddNew label="Add Speaker" onClick={() => appendSpeaker("")} />
              </div>
            </div>

            <div className="line my-2 h-[0.5px] w-full bg-[#E9EBEF]"></div>

            {/* Staff Subsection */}
            <div className="staff-subsection mb-3">
              <div
                className="price-div flex items-center gap-1 w-max my-2 cursor-pointer"
                onClick={() => {
                  const elem = document.getElementById(`staff-${fieldIndex}`);
                  if (elem) elem.classList.toggle("hidden");
                }}
              >
                <p className="font-bold text-sm select-none">Staff</p>
                <ChevronDown strokeWidth={1} width="16px" />
              </div>
              <div
                id={`staff-${fieldIndex}`}
                className="border rounded-md p-2 ml-2"
              >
                {staffFields && staffFields.length > 0 ? (
                  staffFields.map((staff, idx) => (
                    <div
                      key={staff.id}
                      className="mb-2 pb-2 border-b last:border-b-0"
                    >
                      <div className="flex justify-between items-center">
                        <input
                          type="text"
                          placeholder="Staff Name"
                          {...register(
                            `sessions.${fieldIndex}.faculty.staff.${idx}`,
                          )}
                          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-[#FF5B2E] focus:border-[#FF5B2E]"
                        />
                        <button
                          type="button"
                          onClick={() => removeStaff(idx)}
                          className="text-red-500 hover:text-red-700 ml-2"
                        >
                          <Trash2 width={16} height={16} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-xs py-2">No staff added.</p>
                )}
                <AddNew label="Add Staff" onClick={() => appendStaff("")} />
              </div>
            </div>

            <div className="line my-2 h-[0.5px] w-full bg-[#E9EBEF]"></div>

            {/* Volunteers Subsection */}
            <div className="volunteers-subsection">
              <div
                className="price-div flex items-center gap-1 w-max my-2 cursor-pointer"
                onClick={() => {
                  const elem = document.getElementById(
                    `volunteers-${fieldIndex}`,
                  );
                  if (elem) elem.classList.toggle("hidden");
                }}
              >
                <p className="font-bold text-sm select-none">Volunteers</p>
                <ChevronDown strokeWidth={1} width="16px" />
              </div>
              <div
                id={`volunteers-${fieldIndex}`}
                className="border rounded-md p-2 ml-2"
              >
                {volunteersFields && volunteersFields.length > 0 ? (
                  volunteersFields.map((volunteer, idx) => (
                    <div
                      key={volunteer.id}
                      className="mb-2 pb-2 border-b last:border-b-0"
                    >
                      <div className="flex justify-between items-center">
                        <input
                          type="text"
                          placeholder="Volunteer Name"
                          {...register(
                            `sessions.${fieldIndex}.faculty.volunteers.${idx}`,
                          )}
                          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-[#FF5B2E] focus:border-[#FF5B2E]"
                        />
                        <button
                          type="button"
                          onClick={() => removeVolunteer(idx)}
                          className="text-red-500 hover:text-red-700 ml-2"
                        >
                          <Trash2 width={16} height={16} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-xs py-2">
                    No volunteers added.
                  </p>
                )}
                <AddNew
                  label="Add Volunteer"
                  onClick={() => appendVolunteer("")}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionsFormFields;
