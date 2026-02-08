/**
 * Dashboard Component
 * Main event management page - displays events with filtering, sorting, and CRUD actions
 */
import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import API_ENDPOINTS from "../../constants/api.js";
import EventStatsSection from "./components/EventStatsSection.jsx";
import SearchFilterBar from "./components/SearchFilterBar.jsx";
import EventTable from "./components/EventTable.jsx";
import {
  calculateEventCounts,
  filterEventsBySearch,
  sortEventsByStatus,
} from "./utils.js";
import "./Dashboard.css";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const queryClient = useQueryClient();

  // Fetch events using React Query
  const {
    data: events = [],
    isLoading: eventsLoading,
    error: eventsError,
    refetch: refetchEvents,
  } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await fetch(API_ENDPOINTS.EVENTS);
      if (!response.ok) throw new Error("Failed to fetch events");
      return response.json();
    },
  });

  // Fetch accounts using React Query (for user context if needed)
  const {
    data: accounts = [],
    isLoading: accountsLoading,
    error: accountsError,
  } = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const response = await fetch(API_ENDPOINTS.ACCOUNTS);
      if (!response.ok) throw new Error("Failed to fetch accounts");
      return response.json();
    },
  });

  const isLoading = eventsLoading || accountsLoading;
  const error = eventsError || accountsError;

  // Calculate event statistics
  const stats = useMemo(() => {
    return calculateEventCounts(events);
  }, [events]);

  // Filter and sort events based on search and filter criteria
  const processedEvents = useMemo(() => {
    let filtered = filterEventsBySearch(events, searchQuery);

    // Apply status filter if selected
    if (filterValue) {
      filtered = filtered.filter((event) => {
        const eventStart = new Date(event.startDate);
        const eventEnd = new Date(event.endDate);
        const now = new Date();

        if (filterValue === "PAST" && eventEnd < now) return true;
        if (filterValue === "ONGOING" && eventStart <= now && eventEnd >= now)
          return true;
        if (filterValue === "UPCOMING" && eventStart > now) return true;
        return false;
      });
    }

    // Sort events
    return sortEventsByStatus(filtered);
  }, [events, searchQuery, filterValue]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Events</h1>
          <p className="text-gray-600">
            Manage and track all your events in one place
          </p>
        </div>

        {/* Event Statistics Section */}
        <div className="mb-8">
          <EventStatsSection stats={stats} />
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-6">
          <SearchFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filterValue={filterValue}
            onFilterChange={setFilterValue}
            sortValue={sortValue}
            onSortChange={setSortValue}
          />
        </div>

        {/* Events Table */}
        <div>
          <EventTable
            events={processedEvents}
            isLoading={isLoading}
            error={error}
            onDelete={() => refetchEvents()}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
