/**
 * SearchFilterBar Component
 * Search, filter, and action buttons
 */
import { useNavigate } from "react-router-dom";

const SearchFilterBar = ({
  searchQuery,
  onSearchChange,
  filterValue,
  onFilterChange,
  sortValue,
  onSortChange,
}) => {
  const navigate = useNavigate();

  const handleCreateNew = () => {
    navigate("/event/copy");
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Search Input */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search events by name or code..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex gap-3 md:gap-2">
          <select
            value={filterValue}
            onChange={(e) => onFilterChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">All Status</option>
            <option value="UPCOMING">Upcoming</option>
            <option value="ONGOING">Ongoing</option>
            <option value="PAST">Past</option>
          </select>

          <select
            value={sortValue}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Default</option>
            <option value="name">Name (A-Z)</option>
            <option value="date">Date (New First)</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleCreateNew}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium whitespace-nowrap"
          >
            + Create
          </button>
          <button
            onClick={() => navigate("/event/copy")}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium whitespace-nowrap"
          >
            📋 Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilterBar;
