/**
 * EventTableRow Component
 * Single event row with status, details, and actions
 */
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FormContext } from "../../../contexts/formContext.js";
import { getEventStatus, formatDate } from "../utils.js";
import { STATUS_CONFIG } from "../constants.js";
import ActionTooltip from "./ActionTooltip.jsx";
import eventService from "../../../services/eventService.js";

const EventTableRow = ({ event, onDelete }) => {
  const navigate = useNavigate();
  const { setCurrentEvent } = useContext(FormContext);
  const [deleting, setDeleting] = useState(false);

  const status = getEventStatus(event.startDate, event.endDate);
  const statusConfig = STATUS_CONFIG[status];

  const handleView = () => {
    setCurrentEvent(event);
    navigate(`/event/view`);
  };

  const handleEdit = () => {
    setCurrentEvent(event);
    navigate("/event/edit");
  };

  const handleCopy = () => {
    setCurrentEvent(event);
    navigate("/event/copy");
  };

  const handleDelete = async () => {
    if (window.confirm(`Delete event "${event.eventName}"?`)) {
      setDeleting(true);
      try {
        await eventService.deleteEvent(event.id);
        if (onDelete) onDelete(event.id);
      } catch (err) {
        alert("Failed to delete event: " + err.message);
      } finally {
        setDeleting(false);
      }
    }
  };

  return (
    <tr className="border-b hover:bg-gray-50 transition-colors">
      {/* Status Badge */}
      <td className="px-4 py-3">
        <span
          className="px-3 py-1 rounded-full text-xs font-semibold"
          style={{
            backgroundColor: `${statusConfig.bgColor}20`,
            color: statusConfig.color,
            border: `1px solid ${statusConfig.borderColor}`,
          }}
        >
          {status}
        </span>
      </td>

      {/* Event Name */}
      <td className="px-4 py-3 font-medium text-gray-900">{event.eventName}</td>

      {/* Event Code */}
      <td className="px-4 py-3 text-gray-600 font-mono text-sm">
        {event.eventCode}
      </td>

      {/* Start Date */}
      <td className="px-4 py-3 text-gray-600 text-sm">
        {formatDate(event.startDate)}
      </td>

      {/* End Date */}
      <td className="px-4 py-3 text-gray-600 text-sm">
        {formatDate(event.endDate)}
      </td>

      {/* Actions */}
      <td className="px-4 py-3 flex gap-2">
        <ActionTooltip
          icon="👁️"
          label="View"
          tooltip="View event details"
          onClick={handleView}
        />
        <ActionTooltip
          icon="✏️"
          label="Edit"
          tooltip="Edit event"
          onClick={handleEdit}
        />
        <ActionTooltip
          icon="📋"
          label="Copy"
          tooltip="Copy event"
          onClick={handleCopy}
        />
        <ActionTooltip
          icon="🗑️"
          label="Delete"
          tooltip="Delete event"
          onClick={handleDelete}
          disabled={deleting}
          className="hover:bg-red-50"
        />
      </td>
    </tr>
  );
};

export default EventTableRow;
