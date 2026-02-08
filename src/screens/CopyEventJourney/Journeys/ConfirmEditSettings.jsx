import React, { useContext, useState } from "react";
import {
  ActionButtonNext,
  ActionButtonPrev,
} from "../../../components/ActionButton/ActionButton";
import { FormContext } from "../../../contexts/formContext.js";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { ChevronDown, ChevronUp } from "react-feather";
import eventService from "../../../services/eventService.js";

const ConfirmEditSettings = ({ steps }) => {
  const navigate = useNavigate();
  const { currentEvent, currentStep } = useContext(FormContext);
  const { watch } = useFormContext();
  const formData = watch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [expandedSections, setExpandedSections] = useState({
    eventDetails: true,
    fees: true,
    sessions: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      // Build updated event object with only form fields
      const updatedEvent = {
        eventName: formData?.eventName,
        eventCode: formData?.eventCode,
        category: formData?.category || "",
        startDate: formData?.startDate,
        startTime: formData?.startTime,
        endDate: formData?.endDate,
        endTime: formData?.endTime,
        fees: formData?.fees || {
          registration: [],
          cancellation: [],
          sponsorship: [],
          transfer: [],
          substitution: [],
        },
        sessions: formData?.sessions || [],
      };

      // Detect which fields have changed compared to original
      const changedFields = {};
      const fieldsToCheck = [
        "eventName",
        "eventCode",
        "category",
        "startDate",
        "startTime",
        "endDate",
        "endTime",
        "fees",
        "sessions",
      ];

      fieldsToCheck.forEach((field) => {
        const originalValue = currentEvent[field];
        const newValue = updatedEvent[field];

        // Deep comparison for objects and arrays
        if (JSON.stringify(originalValue) !== JSON.stringify(newValue)) {
          changedFields[field] = newValue;
        }
      });

      // Only update if there are changes
      if (Object.keys(changedFields).length === 0) {
        alert("No changes detected");
        return;
      }

      console.log("Changed fields:", changedFields);

      // Update in database using PATCH (only changed fields)
      await eventService.patchEvent(
        currentEvent.id || currentEvent.eventId,
        changedFields,
      );

      // Navigate to success/dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
      console.error("Update error:", err);
    } finally {
      setLoading(false);
    }
  };

  const renderFeeTypes = () => {
    const feeTypes = [
      { key: "registration", label: "Registration Fees" },
      { key: "cancellation", label: "Cancellation Fees" },
      { key: "sponsorship", label: "Sponsorship Fees" },
      { key: "transfer", label: "Transfer Fees" },
      { key: "substitution", label: "Substitution Fees" },
    ];

    return (
      <div className="space-y-4">
        {feeTypes.map((feeType) => {
          const fees = formData?.fees?.[feeType.key] || [];
          return (
            <div key={feeType.key} className="border rounded-md p-3">
              <h4 className="font-bold text-sm mb-2">{feeType.label}</h4>
              {fees.length > 0 ? (
                <div className="space-y-2">
                  {fees.map((fee, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-50 p-2 rounded text-xs border-l-4 border-blue-400"
                    >
                      <p className="font-semibold text-gray-900">
                        {fee.productName}
                      </p>
                      <p className="text-gray-600">Code: {fee.productCode}</p>
                      {fee.price && (
                        <p className="text-gray-700 font-bold">
                          Price: ${fee.price}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-xs italic">No fees added</p>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderSessions = () => {
    const sessions = formData?.sessions || [];
    return (
      <div className="space-y-4">
        {sessions.length > 0 ? (
          sessions.map((session, idx) => (
            <div
              key={idx}
              className="border-l-4 border-orange-400 bg-gray-50 p-4 rounded"
            >
              <p className="font-bold text-gray-900 mb-2">
                {session.sessionTitle || `Session ${idx + 1}`}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                {session.startDate} {session.startTime} - {session.endDate}{" "}
                {session.endTime}
              </p>

              {/* Locations */}
              {session.location && session.location.length > 0 && (
                <div className="mb-2">
                  <p className="text-xs font-semibold text-gray-700">
                    Locations:
                  </p>
                  <div className="space-y-1">
                    {session.location.map((loc, lIdx) => (
                      <div
                        key={lIdx}
                        className={`text-xs p-2 rounded ${
                          loc.isVirtual
                            ? "bg-blue-100 border-l-2 border-blue-500"
                            : "bg-gray-200"
                        }`}
                      >
                        {loc.locationName}
                        {loc.isVirtual && (
                          <span className="ml-2 text-blue-600 font-bold">
                            [VIRTUAL]
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Courses */}
              {session.courses && session.courses.length > 0 && (
                <div className="mb-2">
                  <p className="text-xs font-semibold text-gray-700">
                    Courses: {session.courses.join(", ")}
                  </p>
                </div>
              )}

              {/* Faculty */}
              {session.faculty && (
                <div className="text-xs text-gray-600">
                  {session.faculty.speakers &&
                    session.faculty.speakers.length > 0 && (
                      <p>Speakers: {session.faculty.speakers.join(", ")}</p>
                    )}
                  {session.faculty.staff &&
                    session.faculty.staff.length > 0 && (
                      <p>Staff: {session.faculty.staff.join(", ")}</p>
                    )}
                  {session.faculty.volunteers &&
                    session.faculty.volunteers.length > 0 && (
                      <p>Volunteers: {session.faculty.volunteers.join(", ")}</p>
                    )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm italic">No sessions added</p>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 mb-20">
      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Event Details Section */}
      <div className="border rounded-md mb-4">
        <div
          className="bg-[#F5F5F5] p-4 flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection("eventDetails")}
        >
          <h3 className="font-bold text-[#201502] text-lg">Event Details</h3>
          {expandedSections.eventDetails ? (
            <ChevronUp width={20} />
          ) : (
            <ChevronDown width={20} />
          )}
        </div>
        {expandedSections.eventDetails && (
          <div className="p-4 space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold text-gray-600 uppercase">
                  Event Name
                </p>
                <p className="text-gray-900 font-semibold">
                  {formData?.eventName}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-600 uppercase">
                  Event Code
                </p>
                <p className="text-gray-900 font-mono">{formData?.eventCode}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-600 uppercase">
                  Start Date & Time
                </p>
                <p className="text-gray-900">
                  {formData?.startDate} {formData?.startTime}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-600 uppercase">
                  End Date & Time
                </p>
                <p className="text-gray-900">
                  {formData?.endDate} {formData?.endTime}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fees Section */}
      <div className="border rounded-md mb-4">
        <div
          className="bg-[#F5F5F5] p-4 flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection("fees")}
        >
          <h3 className="font-bold text-[#201502] text-lg">
            Registration Fees
          </h3>
          {expandedSections.fees ? (
            <ChevronUp width={20} />
          ) : (
            <ChevronDown width={20} />
          )}
        </div>
        {expandedSections.fees && <div className="p-4">{renderFeeTypes()}</div>}
      </div>

      {/* Sessions Section */}
      <div className="border rounded-md mb-6">
        <div
          className="bg-[#F5F5F5] p-4 flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection("sessions")}
        >
          <h3 className="font-bold text-[#201502] text-lg">Sessions</h3>
          {expandedSections.sessions ? (
            <ChevronUp width={20} />
          ) : (
            <ChevronDown width={20} />
          )}
        </div>
        {expandedSections.sessions && (
          <div className="p-4">{renderSessions()}</div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-6 mb-2">
        <ActionButtonPrev
          classNames={`${
            currentStep - 1 === 0
              ? "border border-gray-300 text-gray-500 cursor-not-allowed"
              : "border border-[#201502] text-[#201502] hover:bg-[#201502] hover:text-white transition duration-200"
          } px-4 py-2`}
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-[#201502] text-white hover:bg-gray-700 transition duration-200 px-4 py-2 rounded-md disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default ConfirmEditSettings;
