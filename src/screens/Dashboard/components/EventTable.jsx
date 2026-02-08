/**
 * EventTable Component
 * Display events in a table format
 */
import EventTableRow from "./EventTableRow.jsx";

const EventTable = ({ events, isLoading, error, onDelete }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <div className="text-gray-500">Loading events...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <div className="text-red-500">
          Failed to load events. Please try again.
        </div>
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <div className="text-gray-500 text-lg">No events found</div>
        <p className="text-gray-400 text-sm mt-1">
          Try adjusting your search or create a new event
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg border border-gray-200 shadow-sm">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
              Event Name
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
              Code
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
              Start Date
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
              End Date
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <EventTableRow key={event.id} event={event} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;
