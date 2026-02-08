/**
 * EventStatsCard Component
 * Displays event count statistics
 */

const EventStatsCard = ({ count, label, color }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{count}</p>
        </div>
        <div
          className="w-12 h-12 rounded-full opacity-10"
          style={{ backgroundColor: color }}
        />
      </div>
      <div
        className="h-1 w-full rounded-full mt-4"
        style={{ backgroundColor: color }}
      />
    </div>
  );
};

export default EventStatsCard;
