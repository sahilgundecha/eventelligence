/**
 * Event Fields Utility
 * Filters event data based on user role (admin/user)
 */

export const USER_VISIBLE_FIELDS = {
  // Basic Info
  eventName: true,
  eventCode: true,
  category: true,
  eventUrl: true,

  // Dates & Times
  startDate: true,
  startTime: true,
  endDate: true,
  endTime: true,

  // Location (partial)
  location: {
    address: true,
    city: true,
    state: true,
    country: true,
    postalCode: true,
  },

  // Organizer
  organizer: {
    organizerName: true,
    organizerContact: true,
  },

  // Registration Info (partial)
  registrationOptions: {
    isRegistrationRequired: true,
    isFreeEvent: true,
    isWaitlistAllowed: true,
    hasAbstract: true,
    isWaiverRequired: true,
  },

  // Pricing (basic)
  pricing: {
    ticketPrice: true,
    discountCode: true,
    currency: true,
  },

  // Attendance (public counts)
  count: {
    registeredMain: true,
    registeredGuests: true,
    waitlistMain: true,
    available: true,
  },

  // Sessions (all)
  sessions: true,

  // Attendees
  attendees: {
    attendeeCount: true,
    attendeeList: true,
  },

  // Social Media (partial)
  socialMedia: {
    facebookEventUrl: true,
    twitterEventUrl: true,
    instagramEventUrl: true,
  },
};

export const ADMIN_VISIBLE_FIELDS = {
  // All fields visible to admin
};

/**
 * Filter event object to show only relevant fields for user role
 * @param {Object} event - Event object from database
 * @param {String} role - 'admin' or 'user'
 * @returns {Object} Filtered event object
 */
export const filterEventByRole = (event, role = "user") => {
  if (role === "admin") {
    // Admin sees all fields
    return event;
  }

  // User sees filtered fields
  const filtered = {};
  const userFields = USER_VISIBLE_FIELDS;

  for (const [key, value] of Object.entries(userFields)) {
    if (event.hasOwnProperty(key)) {
      if (typeof value === "object" && !Array.isArray(value)) {
        // Nested object - filter specific fields
        filtered[key] = {};
        for (const [nestedKey, nestedValue] of Object.entries(value)) {
          if (nestedValue && event[key]?.hasOwnProperty(nestedKey)) {
            filtered[key][nestedKey] = event[key][nestedKey];
          }
        }
      } else if (value === true) {
        // Include this field
        filtered[key] = event[key];
      }
    }
  }

  return filtered;
};

/**
 * Get all visible field keys for a role
 * @param {String} role - 'admin' or 'user'
 * @returns {Array} Array of visible field keys
 */
export const getVisibleFieldsForRole = (role = "user") => {
  if (role === "admin") {
    return Object.keys(USER_VISIBLE_FIELDS); // Admin sees everything
  }
  return Object.keys(USER_VISIBLE_FIELDS); // User filtered
};
