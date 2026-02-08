import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

/**
 * 404 Not Found Page
 */
const NotFound = () => {
  const navigate = useNavigate();
  // const { isAuthenticated } = useAuth();

  const isAuthenticated = !!localStorage.getItem("user");
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-2xl text-gray-600 mb-8">Page Not Found</p>
        <p className="text-gray-500 mb-8">
          Sorry, the page you are looking for does not exist.
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-[#201502] text-white px-6 py-3 rounded-md hover:bg-[#2a1d06] mr-4"
        >
          Go to Dashboard
        </button>
        {!isAuthenticated && (
          <button
            onClick={() => navigate("/login")}
            className="bg-gray-400 text-white px-6 py-3 rounded-md hover:bg-gray-500"
          >
            Go to Login
          </button>
        )}
      </div>
    </div>
  );
};

export default NotFound;
