/**
 * Dashboard Constants
 * Centralized configuration for colors, statuses, and labels
 */

export const EVENT_STATUS = {
  UPCOMING: "Upcoming",
  ONGOING: "Ongoing",
  PAST: "Past",
};

export const STATUS_CONFIG = {
  [EVENT_STATUS.UPCOMING]: {
    color: "#5ED500",
    borderColor: "border-green-500",
    textColor: "text-green-500",
    bgColor: "bg-green-50",
    priority: 1,
  },
  [EVENT_STATUS.ONGOING]: {
    color: "#FBBF02",
    borderColor: "border-yellow-500",
    textColor: "text-yellow-500",
    bgColor: "bg-yellow-50",
    priority: 2,
  },
  [EVENT_STATUS.PAST]: {
    color: "#E00000",
    borderColor: "border-red-500",
    textColor: "text-red-500",
    bgColor: "bg-red-50",
    priority: 3,
  },
};

export const DASHBOARD_LABELS = {
  TITLE: "Event Search Result(s)",
  SUBTITLE: "Get your results using the search field. Refine further by using the filters.",
  SEARCH_PLACEHOLDER: "Search by event title or code",
  CREATE_EVENT: "Create New Event",
  COPY_EVENT: "Copy Event",
  NO_EVENTS: "No events found. Create your first event!",
  STATUS: "Status",
  EVENT_TITLE: "Event Title",
  EVENT_CODE: "Event Code",
  START_DATE: "Start Date",
  END_DATE: "End Date",
  ACTIONS: "Actions",
  VIEW: "View Event",
  EDIT: "Edit Event",
};

export const EVENT_STATS = [
  {
    key: "upcoming",
    label: "Upcoming Events",
    status: EVENT_STATUS.UPCOMING,
  },
  {
    key: "ongoing",
    label: "Ongoing Events",
    status: EVENT_STATUS.ONGOING,
  },
  {
    key: "past",
    label: "Past Events",
    status: EVENT_STATUS.PAST,
  },
];
