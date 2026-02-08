import { useContext } from "react";
import { Navigate } from "react-router-dom";
// import { AuthContext } from "../../contexts/AuthContext.js";

/**
 * Public Route Component
 * Redirects authenticated users to dashboard
 * Allows public access only to unauthenticated users
 *
 * @param {object} props
 * @param {ReactNode} props.children - Component to render if not authenticated
 * @param {string} props.redirectTo - Route to redirect to if authenticated (default: "/")
 */
const PublicRoute = ({ children, redirectTo = "/dashboard" }) => {
  // const { isAuthenticated, isLoading } = useContext(AuthContext);

  // Mock authentication state for testing without backend
  const isAuthenticated = !!localStorage.getItem("user");
  const isLoading = false;

  // Show loading while checking auth status
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to dashboard if already authenticated
  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Render public component if not authenticated
  return children;
};

export default PublicRoute;
