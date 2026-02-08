import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormContext } from "../../contexts/formContext.js";
import { filterEventByRole } from "../../utils/eventFieldsUtils.js";
import { ChevronLeft, Shield, Users } from "react-feather";

const ViewEvent = () => {
  const navigate = useNavigate();
  const { currentEvent, userRole, setUserRole } = useContext(FormContext);
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    registration: true,
    location: true,
    sessions: true,
    fees: true,
    attendance: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (!currentEvent || !currentEvent.eventName) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            No Event Selected
          </h2>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-[#201502] text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const filteredEvent = filterEventByRole(currentEvent, userRole);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button & Role Toggle */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-[#201502] hover:text-gray-700 font-semibold"
          >
            <ChevronLeft width={20} /> Back to Dashboard
          </button>

          {/* Role Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setUserRole("user")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                userRole === "user"
                  ? "bg-[#FF5B2E] text-white"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Users width={18} /> User View
            </button>
            <button
              onClick={() => setUserRole("admin")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                userRole === "admin"
                  ? "bg-[#201502] text-white"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Shield width={18} /> Admin View
            </button>
          </div>
        </div>

        {/* Header Card */}
        <div className="bg-gradient-to-r from-[#201502] to-[#3a2f24] text-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold mb-2">{filteredEvent.eventName}</h1>
          <p className="text-gray-300 text-lg">
            Code: {filteredEvent.eventCode}
          </p>
          {filteredEvent.category && (
            <p className="text-orange-300 mt-2">
              Category: {filteredEvent.category}
            </p>
          )}
        </div>

        {/* Basic Information */}
        {filteredEvent.eventName && (
          <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
            <div
              className="bg-gray-100 p-4 flex items-center justify-between cursor-pointer hover:bg-gray-150 transition"
              onClick={() => toggleSection("basic")}
            >
              <h2 className="font-bold text-lg text-[#201502]">
                Basic Information
              </h2>
              <span>{expandedSections.basic ? "▼" : "▶"}</span>
            </div>
            {expandedSections.basic && (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-semibold text-gray-600 uppercase">
                      Event Name
                    </label>
                    <p className="text-lg text-gray-900">
                      {filteredEvent.eventName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600 uppercase">
                      Event Code
                    </label>
                    <p className="text-lg text-gray-900 font-mono">
                      {filteredEvent.eventCode}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600 uppercase">
                      Category
                    </label>
                    <p className="text-lg text-gray-900">
                      {filteredEvent.category || "N/A"}
                    </p>
                  </div>
                  {filteredEvent.eventUrl && (
                    <div>
                      <label className="text-sm font-semibold text-gray-600 uppercase">
                        Event URL
                      </label>
                      <a
                        href={filteredEvent.eventUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {filteredEvent.eventUrl}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Event Schedule */}
        {(filteredEvent.startDate || filteredEvent.endDate) && (
          <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
            <div
              className="bg-gray-100 p-4 flex items-center justify-between cursor-pointer hover:bg-gray-150 transition"
              onClick={() => toggleSection("registration")}
            >
              <h2 className="font-bold text-lg text-[#201502]">
                Event Schedule
              </h2>
              <span>{expandedSections.registration ? "▼" : "▶"}</span>
            </div>
            {expandedSections.registration && (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-semibold text-gray-600 uppercase">
                      Start Date
                    </label>
                    <p className="text-lg text-gray-900">
                      {filteredEvent.startDate}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600 uppercase">
                      Start Time
                    </label>
                    <p className="text-lg text-gray-900">
                      {filteredEvent.startTime}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600 uppercase">
                      End Date
                    </label>
                    <p className="text-lg text-gray-900">
                      {filteredEvent.endDate}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600 uppercase">
                      End Time
                    </label>
                    <p className="text-lg text-gray-900">
                      {filteredEvent.endTime}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Location */}
        {filteredEvent.location && (
          <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
            <div
              className="bg-gray-100 p-4 flex items-center justify-between cursor-pointer hover:bg-gray-150 transition"
              onClick={() => toggleSection("location")}
            >
              <h2 className="font-bold text-lg text-[#201502]">Location</h2>
              <span>{expandedSections.location ? "▼" : "▶"}</span>
            </div>
            {expandedSections.location && (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  {filteredEvent.location.address && (
                    <div>
                      <label className="text-sm font-semibold text-gray-600 uppercase">
                        Address
                      </label>
                      <p className="text-gray-900">
                        {filteredEvent.location.address}
                      </p>
                    </div>
                  )}
                  {filteredEvent.location.city && (
                    <div>
                      <label className="text-sm font-semibold text-gray-600 uppercase">
                        City
                      </label>
                      <p className="text-gray-900">
                        {filteredEvent.location.city}
                      </p>
                    </div>
                  )}
                  {filteredEvent.location.state && (
                    <div>
                      <label className="text-sm font-semibold text-gray-600 uppercase">
                        State/Province
                      </label>
                      <p className="text-gray-900">
                        {filteredEvent.location.state}
                      </p>
                    </div>
                  )}
                  {filteredEvent.location.country && (
                    <div>
                      <label className="text-sm font-semibold text-gray-600 uppercase">
                        Country
                      </label>
                      <p className="text-gray-900">
                        {filteredEvent.location.country}
                      </p>
                    </div>
                  )}
                  {filteredEvent.location.postalCode && (
                    <div>
                      <label className="text-sm font-semibold text-gray-600 uppercase">
                        Postal Code
                      </label>
                      <p className="text-gray-900">
                        {filteredEvent.location.postalCode}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Registration Options */}
        {filteredEvent.registrationOptions && (
          <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
            <div
              className="bg-gray-100 p-4 flex items-center justify-between cursor-pointer hover:bg-gray-150 transition"
              onClick={() => toggleSection("fees")}
            >
              <h2 className="font-bold text-lg text-[#201502]">
                Registration Options
              </h2>
              <span>{expandedSections.fees ? "▼" : "▶"}</span>
            </div>
            {expandedSections.fees && (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  {filteredEvent.registrationOptions.isRegistrationRequired !==
                    undefined && (
                    <div className="flex items-center">
                      <span className="text-gray-600">
                        Registration Required:
                      </span>
                      <span
                        className={`ml-2 px-3 py-1 rounded text-sm font-semibold ${
                          filteredEvent.registrationOptions
                            .isRegistrationRequired
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {filteredEvent.registrationOptions
                          .isRegistrationRequired
                          ? "Yes"
                          : "No"}
                      </span>
                    </div>
                  )}
                  {filteredEvent.registrationOptions.isFreeEvent !==
                    undefined && (
                    <div className="flex items-center">
                      <span className="text-gray-600">Free Event:</span>
                      <span
                        className={`ml-2 px-3 py-1 rounded text-sm font-semibold ${
                          filteredEvent.registrationOptions.isFreeEvent
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {filteredEvent.registrationOptions.isFreeEvent
                          ? "Yes"
                          : "Paid"}
                      </span>
                    </div>
                  )}
                  {filteredEvent.registrationOptions.isWaitlistAllowed !==
                    undefined && (
                    <div className="flex items-center">
                      <span className="text-gray-600">Waitlist Allowed:</span>
                      <span
                        className={`ml-2 px-3 py-1 rounded text-sm font-semibold ${
                          filteredEvent.registrationOptions.isWaitlistAllowed
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {filteredEvent.registrationOptions.isWaitlistAllowed
                          ? "Yes"
                          : "No"}
                      </span>
                    </div>
                  )}
                  {filteredEvent.registrationOptions.hasAbstract !==
                    undefined && (
                    <div className="flex items-center">
                      <span className="text-gray-600">Abstract Available:</span>
                      <span
                        className={`ml-2 px-3 py-1 rounded text-sm font-semibold ${
                          filteredEvent.registrationOptions.hasAbstract
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {filteredEvent.registrationOptions.hasAbstract
                          ? "Yes"
                          : "No"}
                      </span>
                    </div>
                  )}
                  {filteredEvent.registrationOptions.isWaiverRequired !==
                    undefined && (
                    <div className="flex items-center">
                      <span className="text-gray-600">Waiver Required:</span>
                      <span
                        className={`ml-2 px-3 py-1 rounded text-sm font-semibold ${
                          filteredEvent.registrationOptions.isWaiverRequired
                            ? "bg-orange-100 text-orange-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {filteredEvent.registrationOptions.isWaiverRequired
                          ? "Yes"
                          : "No"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Pricing Information */}
        {filteredEvent.pricing && (
          <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
            <div
              className="bg-gray-100 p-4 flex items-center justify-between cursor-pointer hover:bg-gray-150 transition"
              onClick={() => toggleSection("attendance")}
            >
              <h2 className="font-bold text-lg text-[#201502]">Pricing</h2>
              <span>{expandedSections.attendance ? "▼" : "▶"}</span>
            </div>
            {expandedSections.attendance && (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  {filteredEvent.pricing.ticketPrice && (
                    <div>
                      <label className="text-sm font-semibold text-gray-600 uppercase">
                        Ticket Price
                      </label>
                      <p className="text-2xl font-bold text-[#FF5B2E]">
                        {filteredEvent.pricing.currency}{" "}
                        {filteredEvent.pricing.ticketPrice}
                      </p>
                    </div>
                  )}
                  {filteredEvent.pricing.discountCode && (
                    <div>
                      <label className="text-sm font-semibold text-gray-600 uppercase">
                        Discount Code
                      </label>
                      <p className="text-lg text-gray-900 font-mono bg-gray-100 px-3 py-2 rounded">
                        {filteredEvent.pricing.discountCode}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Attendance Count */}
        {filteredEvent.count && (
          <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
            <div className="bg-gray-100 p-4">
              <h2 className="font-bold text-lg text-[#201502]">Attendance</h2>
            </div>
            <div className="p-6 grid grid-cols-2 gap-6">
              {filteredEvent.count.registeredMain && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 uppercase font-semibold">
                    Registered (Main)
                  </p>
                  <p className="text-3xl font-bold text-blue-600">
                    {filteredEvent.count.registeredMain}
                  </p>
                </div>
              )}
              {filteredEvent.count.registeredGuests && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 uppercase font-semibold">
                    Registered (Guests)
                  </p>
                  <p className="text-3xl font-bold text-green-600">
                    {filteredEvent.count.registeredGuests}
                  </p>
                </div>
              )}
              {filteredEvent.count.waitlistMain && (
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 uppercase font-semibold">
                    Waitlist (Main)
                  </p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {filteredEvent.count.waitlistMain}
                  </p>
                </div>
              )}
              {filteredEvent.count.available && (
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 uppercase font-semibold">
                    Available Spots
                  </p>
                  <p className="text-3xl font-bold text-purple-600">
                    {filteredEvent.count.available}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Sessions */}
        {filteredEvent.sessions && filteredEvent.sessions.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
            <div
              className="bg-gray-100 p-4 flex items-center justify-between cursor-pointer hover:bg-gray-150 transition"
              onClick={() => toggleSection("sessions")}
            >
              <h2 className="font-bold text-lg text-[#201502]">
                Sessions ({filteredEvent.sessions.length})
              </h2>
              <span>{expandedSections.sessions ? "▼" : "▶"}</span>
            </div>
            {expandedSections.sessions && (
              <div className="p-6 space-y-6">
                {filteredEvent.sessions.map((session, idx) => (
                  <div
                    key={idx}
                    className="border-l-4 border-[#FF5B2E] pl-6 py-4 bg-gray-50 rounded"
                  >
                    <h3 className="font-bold text-lg text-[#201502] mb-3">
                      {session.sessionTitle || `Session ${idx + 1}`}
                    </h3>
                    {session.sessionCode && (
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-semibold">Code:</span>{" "}
                        {session.sessionCode}
                      </p>
                    )}
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <p className="font-semibold text-gray-700">Date</p>
                        <p className="text-gray-900">
                          {session.startDate} - {session.endDate}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700">Time</p>
                        <p className="text-gray-900">
                          {session.startTime} - {session.endTime}
                        </p>
                      </div>
                    </div>

                    {/* Session Location */}
                    {session.location && session.location.length > 0 && (
                      <div className="mb-4">
                        <p className="font-semibold text-gray-700 mb-2">
                          Location(s)
                        </p>
                        <div className="space-y-2">
                          {session.location.map((loc, locIdx) => (
                            <div
                              key={locIdx}
                              className={`p-3 rounded ${
                                loc.isVirtual
                                  ? "bg-blue-100 border-l-4 border-blue-500"
                                  : "bg-gray-200"
                              }`}
                            >
                              <p className="text-gray-900">
                                {loc.locationName}
                                {loc.isVirtual && (
                                  <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                                    VIRTUAL
                                  </span>
                                )}
                              </p>
                              {loc.room && (
                                <p className="text-sm text-gray-700">
                                  Room: {loc.room}
                                </p>
                              )}
                              {loc.setup && (
                                <p className="text-sm text-gray-700">
                                  Setup: {loc.setup}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Session Course */}
                    {session.course && (
                      <div className="mb-4">
                        <p className="font-semibold text-gray-700 mb-2">
                          Course
                        </p>
                        <p className="text-gray-900">
                          {typeof session.course === "object"
                            ? session.course.courseName
                            : session.course}
                        </p>
                      </div>
                    )}

                    {/* Session Faculty */}
                    {session.faculty && (
                      <div>
                        <p className="font-semibold text-gray-700 mb-2">
                          Faculty
                        </p>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          {session.faculty.speakers &&
                            session.faculty.speakers.length > 0 && (
                              <div>
                                <p className="font-semibold text-gray-600">
                                  Speakers
                                </p>
                                <ul className="list-disc list-inside text-gray-900">
                                  {session.faculty.speakers.map(
                                    (speaker, idx) => (
                                      <li key={idx}>{speaker}</li>
                                    ),
                                  )}
                                </ul>
                              </div>
                            )}
                          {session.faculty.staff &&
                            session.faculty.staff.length > 0 && (
                              <div>
                                <p className="font-semibold text-gray-600">
                                  Staff
                                </p>
                                <ul className="list-disc list-inside text-gray-900">
                                  {session.faculty.staff.map((staff, idx) => (
                                    <li key={idx}>{staff}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          {session.faculty.volunteers &&
                            session.faculty.volunteers.length > 0 && (
                              <div>
                                <p className="font-semibold text-gray-600">
                                  Volunteers
                                </p>
                                <ul className="list-disc list-inside text-gray-900">
                                  {session.faculty.volunteers.map(
                                    (vol, idx) => (
                                      <li key={idx}>{vol}</li>
                                    ),
                                  )}
                                </ul>
                              </div>
                            )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Organizer Information */}
        {filteredEvent.organizer && (
          <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
            <h2 className="font-bold text-lg text-[#201502] mb-4">Organizer</h2>
            <div className="grid grid-cols-2 gap-6">
              {filteredEvent.organizer.organizerName && (
                <div>
                  <label className="text-sm font-semibold text-gray-600 uppercase">
                    Name
                  </label>
                  <p className="text-gray-900">
                    {filteredEvent.organizer.organizerName}
                  </p>
                </div>
              )}
              {filteredEvent.organizer.organizerContact && (
                <div>
                  <label className="text-sm font-semibold text-gray-600 uppercase">
                    Contact
                  </label>
                  <a
                    href={`mailto:${filteredEvent.organizer.organizerContact}`}
                    className="text-blue-600 hover:underline"
                  >
                    {filteredEvent.organizer.organizerContact}
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Admin-only: Goals */}
        {userRole === "admin" && filteredEvent.goals && (
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg shadow-sm mb-6 p-6">
            <h2 className="font-bold text-lg text-red-700 mb-4">
              📊 Admin: Goals & Targets
            </h2>
            <div className="grid grid-cols-2 gap-6">
              {filteredEvent.goals.registrationGoal && (
                <div>
                  <label className="text-sm font-semibold text-gray-600 uppercase">
                    Registration Goal
                  </label>
                  <p className="text-2xl font-bold text-red-600">
                    {filteredEvent.goals.registrationGoal}
                  </p>
                </div>
              )}
              {filteredEvent.goals.revenueGoal && (
                <div>
                  <label className="text-sm font-semibold text-gray-600 uppercase">
                    Revenue Goal
                  </label>
                  <p className="text-2xl font-bold text-red-600">
                    ${filteredEvent.goals.revenueGoal}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Admin-only: Attendance Projections */}
        {userRole === "admin" && filteredEvent.attendance && (
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg shadow-sm mb-6 p-6">
            <h2 className="font-bold text-lg text-red-700 mb-4">
              📈 Admin: Attendance Projections
            </h2>
            <div className="grid grid-cols-3 gap-6">
              {filteredEvent.attendance.projected && (
                <div>
                  <label className="text-sm font-semibold text-gray-600 uppercase">
                    Projected
                  </label>
                  <p className="text-2xl font-bold text-blue-600">
                    {filteredEvent.attendance.projected}
                  </p>
                </div>
              )}
              {filteredEvent.attendance.guaranteed && (
                <div>
                  <label className="text-sm font-semibold text-gray-600 uppercase">
                    Guaranteed
                  </label>
                  <p className="text-2xl font-bold text-green-600">
                    {filteredEvent.attendance.guaranteed}
                  </p>
                </div>
              )}
              {filteredEvent.attendance.capacity && (
                <div>
                  <label className="text-sm font-semibold text-gray-600 uppercase">
                    Capacity
                  </label>
                  <p className="text-2xl font-bold text-purple-600">
                    {filteredEvent.attendance.capacity}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8 mb-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
          >
            Back to Dashboard
          </button>
          <button
            onClick={() => navigate("/event/edit")}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Edit Event
          </button>
          <button
            onClick={() => navigate("/event/copy")}
            className="flex-1 px-6 py-3 bg-[#FF5B2E] text-white rounded-lg hover:bg-[#e04d24] transition font-semibold"
          >
            Copy Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewEvent;
