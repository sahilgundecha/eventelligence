// import { AuthContext } from "../../contexts/AuthContext.js";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

/**
 * Protected Route Component
 * Currently disabled for development - renders all routes without authentication
 * Redirects to login if user is not authenticated
 * Shows loading state while auth is being checked
 *
 * @param {object} props
 * @param {ReactNode} props.children - Component to render if authenticated
 * @param {string} props.redirectTo - Route to redirect to if not authenticated (default: "/login")
 * @param {boolean} props.enabled - Enable/disable protection (default: false for development)
 */
const ProtectedRoute = ({
  children,
  redirectTo = "/login",
  enabled = false,
}) => {
  // const { isAuthenticated, isLoading } = useContext(AuthContext);
  // Mock authentication state for testing without backend
  const isAuthenticated = !!localStorage.getItem("user");
  const isLoading = false;

  // If protection is disabled, render children without checking auth
  if (!enabled) {
    return children;
  }

  // Show loading while checking auth status
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Render protected component if authenticated
  return children;
};

export default ProtectedRoute;
