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

const ConfirmCopySettings = ({ steps }) => {
  const navigate = useNavigate();
  const { currentEvent, currentStep, moveToNextStep } = useContext(FormContext);
  const { watch } = useFormContext();
  const formData = watch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [expandedSections, setExpandedSections] = useState({
    eventDetails: true,
    fees: true,
    sessions: true,
  });

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      // Create new event object from form data
      const newEvent = {
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

      // Save to database
      await eventService.createEvent(newEvent);

      // Navigate to success page
      navigate("/success");
    } catch (err) {
      setError(err.message);
      console.error("Submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
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
                      className="bg-gray-50 p-2 rounded text-sm ml-2"
                    >
                      <p className="font-semibold">
                        {fee.productName || "Unnamed Fee"}
                      </p>
                      <div className="text-xs text-gray-600 mt-1 space-y-1">
                        <p>Code: {fee.productCode}</p>
                        {fee.priceName && (
                          <>
                            <p>Price Name: {fee.priceName}</p>
                            <p>Price: ${fee.price}</p>
                            <p>
                              Dates: {fee.priceStartDate} to {fee.priceEndDate}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500 italic">No fees added</p>
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
      <div className="space-y-3">
        {sessions.length > 0 ? (
          sessions.map((session, idx) => (
            <div key={idx} className="border rounded-md p-3 bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h4 className="font-bold text-sm">
                    {session.sessionTitle || "Unnamed Session"}
                  </h4>
                  <p className="text-xs text-gray-600">
                    Code: {session.sessionCode}
                  </p>
                </div>
              </div>

              <div className="text-xs text-gray-600 space-y-1 mb-3">
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {session.startDate} ({session.startTime}) to {session.endDate}{" "}
                  ({session.endTime})
                </p>

                {/* Locations */}
                {session.locations && session.locations.length > 0 && (
                  <div>
                    <span className="font-semibold">Locations:</span>
                    {session.locations.map((loc, locIdx) => (
                      <p
                        key={locIdx}
                        className={`ml-4 p-2 rounded ${
                          loc.isVirtual
                            ? "bg-blue-100 border-l-4 border-blue-500 animate-pulse"
                            : ""
                        }`}
                      >
                        • {loc.locationName}{" "}
                        {loc.isVirtual && (
                          <span className="ml-2 px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded">
                            VIRTUAL
                          </span>
                        )}{" "}
                        (Room: {loc.room}, Setup: {loc.setup})
                      </p>
                    ))}
                  </div>
                )}

                {/* Courses */}
                {session.courses && session.courses.length > 0 && (
                  <div>
                    <span className="font-semibold">Courses:</span>
                    {session.courses.map((course, courseIdx) => (
                      <p key={courseIdx} className="ml-4">
                        • {course.courseName}
                      </p>
                    ))}
                  </div>
                )}

                {/* Faculty */}
                {session.faculty && (
                  <div>
                    {session.faculty.speakers &&
                      session.faculty.speakers.length > 0 && (
                        <div>
                          <span className="font-semibold">Speakers:</span>
                          {session.faculty.speakers.map((speaker, spkIdx) => (
                            <p key={spkIdx} className="ml-4">
                              • {speaker}
                            </p>
                          ))}
                        </div>
                      )}
                    {session.faculty.staff &&
                      session.faculty.staff.length > 0 && (
                        <div>
                          <span className="font-semibold">Staff:</span>
                          {session.faculty.staff.map((staff, stfIdx) => (
                            <p key={stfIdx} className="ml-4">
                              • {staff}
                            </p>
                          ))}
                        </div>
                      )}
                    {session.faculty.volunteers &&
                      session.faculty.volunteers.length > 0 && (
                        <div>
                          <span className="font-semibold">Volunteers:</span>
                          {session.faculty.volunteers.map((vol, volIdx) => (
                            <p key={volIdx} className="ml-4">
                              • {vol}
                            </p>
                          ))}
                        </div>
                      )}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-xs text-gray-500 italic">No sessions added</p>
        )}
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#201502] mb-2">
          Confirm Event Copy
        </h2>
        <p className="text-gray-600 text-sm">
          Review your event copy details below. Click sections to
          expand/collapse and click the Previous button to edit any fields.
        </p>
      </div>

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
                <label className="text-xs font-bold text-gray-600">
                  Event Name
                </label>
                <p className="text-sm">{formData?.eventName || "N/A"}</p>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600">
                  Event Code
                </label>
                <p className="text-sm">{formData?.eventCode || "N/A"}</p>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600">
                  Start Date & Time
                </label>
                <p className="text-sm">
                  {formData?.startDate} {formData?.startTime}
                </p>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600">
                  End Date & Time
                </label>
                <p className="text-sm">
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

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

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
          {loading ? "Saving..." : "Confirm Event Copy"}
        </button>
      </div>
    </div>
  );
};

export default ConfirmCopySettings;
