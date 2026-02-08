/**
 * Dashboard Utility Functions
 * Business logic separated from UI components
 */

import { EVENT_STATUS, STATUS_CONFIG } from "./constants.js";

/**
 * Get event status based on start and end dates
 * @param {string} startDate - Event start date
 * @param {string} endDate - Event end date
 * @returns {string} Event status (Upcoming, Ongoing, or Past)
 */
export const getEventStatus = (startDate, endDate) => {
  const now = new Date();
  const eventStart = new Date(startDate);
  const eventEnd = new Date(endDate);

  if (eventEnd < now) return EVENT_STATUS.PAST;
  if (eventStart <= now && eventEnd >= now) return EVENT_STATUS.ONGOING;
  return EVENT_STATUS.UPCOMING;
};

/**
 * Calculate event counts by status
 * @param {Array} events - List of events
 * @returns {Object} Count of events by status
 */
export const calculateEventCounts = (events) => {
  if (!Array.isArray(events) || events.length === 0) {
    return { upcoming: 0, ongoing: 0, past: 0 };
  }

  return events.reduce(
    (acc, event) => {
      const status = getEventStatus(event.startDate, event.endDate);
      const statusKey = status.toLowerCase();
      return { ...acc, [statusKey]: (acc[statusKey] || 0) + 1 };
    },
    { upcoming: 0, ongoing: 0, past: 0 }
  );
};

/**
 * Filter events based on search query
 * @param {Array} events - List of events
 * @param {string} query - Search query
 * @returns {Array} Filtered events
 */
export const filterEventsBySearch = (events, query) => {
  if (!query.trim()) return events;

  const lowerQuery = query.toLowerCase();
  return events?.filter(
    (event) =>
      event?.eventName?.toLowerCase().includes(lowerQuery) ||
      event?.eventCode?.toLowerCase().includes(lowerQuery)
  );
};

/**
 * Sort events by status priority
 * @param {Array} events - List of events to sort
 * @returns {Array} Sorted events
 */
export const sortEventsByStatus = (events) => {
  if (!Array.isArray(events)) return [];

  return [...events].sort((eventA, eventB) => {
    const statusA = getEventStatus(eventA.startDate, eventA.endDate);
    const statusB = getEventStatus(eventB.startDate, eventB.endDate);

    const priorityA = STATUS_CONFIG[statusA]?.priority || 999;
    const priorityB = STATUS_CONFIG[statusB]?.priority || 999;

    return priorityA - priorityB;
  });
};

/**
 * Format date for display
 * @param {string} dateString - Date string to format
 * @returns {string} Formatted date
 */
export const formatDate = (dateString) => {
  if (!dateString) return "-";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
};
