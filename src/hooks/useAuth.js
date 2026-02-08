import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.js";

/**
 * Custom hook for accessing auth context
 * Throws error if used outside of AuthProvider
 */
const useAuth = () => {
  const context = useContext(AuthContext);

  // if (!context) {
  //   throw new Error("useAuth must be used within AuthProvider");
  // }

  return context;
};

export default useAuth;
