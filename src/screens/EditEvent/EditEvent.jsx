import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FormContext } from "../../contexts/formContext.js";
import EditEventJourney from "../EditEventJourney/EditEventJourney.jsx";

const EditEvent = () => {
  const navigate = useNavigate();
  const { currentEvent } = useContext(FormContext);

  if (!currentEvent || !currentEvent.eventId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            No Event Selected
          </h2>
          <p className="text-gray-600 mb-6">
            Please select an event to edit from the dashboard.
          </p>
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

  return <EditEventJourney />;
};

export default EditEvent;
