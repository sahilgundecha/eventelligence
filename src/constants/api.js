/**
 * API Configuration and Endpoints
 * Centralized API constants for better maintainability
 */

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://api.jsonbin.io/v3/b/698887e4ae596e708f1a767a";

export const API_ENDPOINTS = {
  EVENTS: `${API_BASE_URL}`,
  ACCOUNTS: `${API_BASE_URL}/accounts`,
};

export default API_ENDPOINTS;
