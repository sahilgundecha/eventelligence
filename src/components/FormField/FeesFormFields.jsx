import React, { useContext, useEffect, useState } from "react";
import Input from "../Input/Input";
import { ChevronDown, ChevronUp, Trash2 } from "react-feather";
import { FormContext } from "../../contexts/formContext.js";
import { useFormContext } from "react-hook-form";
import Select from "../Select/Select";

const FeesFormFields = ({
  data,
  fieldIndex,
  feeType = "registration",
  onRemove,
}) => {
  const [toggle, setToggle] = useState(false);
  const [accountsToggle, setAccountsToggle] = useState(false);

  const { accounts } = useContext(FormContext);
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const fieldBaseName = `fees.${feeType}.${fieldIndex}`;

  useEffect(() => {
    const subscription = watch((value) => {
      console.log({ watchValue: value });
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <div
      className="container bg-[#FFFFFF] w-full rounded-lg p-3 mb-3 relative"
      style={{ boxShadow: " 0px 0px 12px 0px #00000029" }}
    >
      {/* Delete Button */}
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition-colors"
        title="Delete this fee"
      >
        <Trash2 width={18} height={18} />
      </button>

      <div className="form flex gap-3 flex-grow">
        <Input
          type="text"
          id={`${fieldBaseName}.productName`}
          name={`${fieldBaseName}.productName`}
          label={"Product Name"}
          error={errors?.fees?.[feeType]?.[fieldIndex]?.productName?.message}
          register={register(`${fieldBaseName}.productName`, {
            required: "Product Name is required",
          })}
        />
        <Input
          type="text"
          id={`${fieldBaseName}.productCode`}
          name={`${fieldBaseName}.productCode`}
          label={"Product Code"}
          error={errors?.fees?.[feeType]?.[fieldIndex]?.productCode?.message}
          register={register(`${fieldBaseName}.productCode`, {
            required: "Code is required",
          })}
        />
        <div className="w-full">
          <label className="block text-gray-700 font-bold mb-2 text-xs">
            Start Date
            {<span className="text-red-500">*</span>}
          </label>
          <input
            type="date"
            {...register(`${fieldBaseName}.startDate`, {
              required: "Start date is required",
            })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-[#FF5B2E] focus:border-[#FF5B2E]"
          />
          {errors?.fees?.[feeType]?.[fieldIndex]?.startDate && (
            <p className="text-red-500 text-xs">
              {errors.fees[feeType][fieldIndex].startDate.message}
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
            {...register(`${fieldBaseName}.endDate`, {
              required: "End date is required",
            })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-[#FF5B2E] focus:border-[#FF5B2E]"
          />
          {errors?.fees?.[feeType]?.[fieldIndex]?.endDate && (
            <p className="text-red-500 text-xs">
              {errors.fees[feeType][fieldIndex].endDate.message}
            </p>
          )}
        </div>
      </div>
      <div className="line my-4 h-[0.5px] w-full bg-[#E9EBEF]"></div>
      <div className="price">
        <div
          className="price-div flex items-center gap-1 w-max my-2 cursor-pointer"
          onClick={() => setToggle((prev) => !prev)}
        >
          <p className="font-bold text-sm select-none">Price</p>
          {!toggle ? (
            <ChevronDown strokeWidth={1} width={"20px"} />
          ) : (
            <ChevronUp strokeWidth={1} width={"20px"} />
          )}
        </div>
        {toggle && (
          <div className="price-content">
            <div className="border rounded-md p-2">
              <div className="text flex justify-between gap-3">
                <Input
                  type="text"
                  id={`${fieldBaseName}.priceName`}
                  name={`${fieldBaseName}.priceName`}
                  label={"Name"}
                  error={
                    errors?.fees?.[feeType]?.[fieldIndex]?.priceName?.message
                  }
                  register={register(`${fieldBaseName}.priceName`, {
                    required: "Price Name is required",
                  })}
                />
                <Input
                  type="text"
                  id={`${fieldBaseName}.priceCode`}
                  name={`${fieldBaseName}.priceCode`}
                  label={"Code"}
                  error={
                    errors?.fees?.[feeType]?.[fieldIndex]?.priceCode?.message
                  }
                  register={register(`${fieldBaseName}.priceCode`, {
                    required: "Code is required",
                  })}
                />
              </div>
              <div className="flex justify-between gap-3">
                <Input
                  type="text"
                  id={`${fieldBaseName}.price`}
                  name={`${fieldBaseName}.price`}
                  label={"Price"}
                  error={errors?.fees?.[feeType]?.[fieldIndex]?.price?.message}
                  register={register(`${fieldBaseName}.price`, {
                    required: "Price is required",
                  })}
                />

                <div className="w-full">
                  <label className="block text-gray-700 font-bold mb-2 text-xs">
                    Start Date
                    {<span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="date"
                    {...register(`${fieldBaseName}.priceStartDate`, {
                      required: "Start date is required",
                    })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-[#FF5B2E] focus:border-[#FF5B2E]"
                  />
                  {errors?.fees?.[feeType]?.[fieldIndex]?.priceStartDate && (
                    <p className="text-red-500 text-xs">
                      {errors.fees[feeType][fieldIndex].priceStartDate.message}
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
                    {...register(`${fieldBaseName}.priceEndDate`, {
                      required: "End date is required",
                    })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-[#FF5B2E] focus:border-[#FF5B2E]"
                  />
                  {errors?.fees?.[feeType]?.[fieldIndex]?.priceEndDate && (
                    <p className="text-red-500 text-xs">
                      {errors.fees[feeType][fieldIndex].priceEndDate.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="accounts">
                <div
                  className="price-div flex items-center gap-1 w-max my-2 cursor-pointer"
                  onClick={() => setAccountsToggle((prev) => !prev)}
                >
                  <p className="font-bold text-sm select-none">Accounts</p>
                  {!accountsToggle ? (
                    <ChevronDown strokeWidth={1} width={"20px"} />
                  ) : (
                    <ChevronUp strokeWidth={1} width={"20px"} />
                  )}
                </div>

                {accountsToggle && (
                  <div className="accounts-contents">
                    <div className="flex justify-between gap-3 mb-2">
                      <Select
                        id={`${fieldBaseName}.accountAR1`}
                        name={`${fieldBaseName}.accountAR1`}
                        data={accounts?.accountsReceivable?.map((account) => ({
                          id: account?.accountCode,
                          name: account?.accountName,
                        }))}
                        label={"A/R account"}
                      />
                      <Select
                        id={`${fieldBaseName}.returnAccount1`}
                        name={`${fieldBaseName}.returnAccount1`}
                        data={accounts?.returns?.map((account) => ({
                          id: account?.accountCode,
                          name: account?.accountName,
                        }))}
                        label={"Return account"}
                      />
                    </div>
                    <div className="flex justify-between gap-3 mb-2">
                      <Select
                        id={`${fieldBaseName}.accountAR2`}
                        name={`${fieldBaseName}.accountAR2`}
                        data={accounts?.accountsReceivable?.map((account) => ({
                          id: account?.accountCode,
                          name: account?.accountName,
                        }))}
                        label={"A/R account"}
                      />
                      <Select
                        id={`${fieldBaseName}.returnAccount2`}
                        name={`${fieldBaseName}.returnAccount2`}
                        data={accounts?.returns?.map((account) => ({
                          id: account?.accountCode,
                          name: account?.accountName,
                        }))}
                        label={"Return account"}
                      />
                    </div>
                    <div className="flex justify-between gap-3 mb-2 items-end">
                      <Select
                        id={`${fieldBaseName}.accountAR3`}
                        name={`${fieldBaseName}.accountAR3`}
                        data={accounts?.accountsReceivable?.map((account) => ({
                          id: account?.accountCode,
                          name: account?.accountName,
                        }))}
                        label={"A/R account"}
                      />
                      <div className="w-full">
                        <label className="w-max flex items-center px-3 py-2 rounded-md cursor-pointer">
                          <input
                            type="checkbox"
                            {...register(`${fieldBaseName}.isDeferred`)}
                            className="myClass custom-checkbox rounded-md mr-1 accent-[#FF5B2E] w-5 h-5"
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
          </div>
        )}
      </div>
    </div>
  );
};

export default FeesFormFields;
