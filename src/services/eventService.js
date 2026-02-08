import API_ENDPOINTS from "../constants/api.js";

export const eventService = {
  // Get all events
  async getAllEvents() {
    const response = await fetch(API_ENDPOINTS.EVENTS);
    if (!response.ok) throw new Error("Failed to fetch events");
    return response.json();
  },

  // Get event by ID
  async getEventById(id) {
    const response = await fetch(`${API_ENDPOINTS.EVENTS}/${id}`);
    if (!response.ok) throw new Error("Failed to fetch event");
    return response.json();
  },

  // Create new event
  async createEvent(eventData) {
    const response = await fetch(API_ENDPOINTS.EVENTS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });
    if (!response.ok) throw new Error("Failed to create event");
    return response.json();
  },

  // Update existing event
  async updateEvent(id, eventData) {
    const response = await fetch(`${API_ENDPOINTS.EVENTS}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });
    if (!response.ok) throw new Error("Failed to update event");
    return response.json();
  },

  // Delete event
  async deleteEvent(id) {
    const response = await fetch(`${API_ENDPOINTS.EVENTS}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete event");
    return response.json();
  },

  // Partially update event (PATCH - only changed fields)
  async patchEvent(id, changedFields) {
    const response = await fetch(`${API_ENDPOINTS.EVENTS}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changedFields),
    });
    if (!response.ok) throw new Error("Failed to update event");
    return response.json();
  },

  // Get all accounts
  async getAllAccounts() {
    const response = await fetch(API_ENDPOINTS.ACCOUNTS);
    if (!response.ok) throw new Error("Failed to fetch accounts");
    return response.json();
  },
};

export default eventService;
