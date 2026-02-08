/**
 * API Configuration and Endpoints
 * Centralized API constants for better maintainability
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const API_ENDPOINTS = {
  EVENTS: `${API_BASE_URL}/events`,
  ACCOUNTS: `${API_BASE_URL}/accounts`,
};

export default API_ENDPOINTS;
