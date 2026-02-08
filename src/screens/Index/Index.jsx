import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Logo from "../../assets/images/logo.png";

/**
 * Index/Home Page
 * Landing page that shows different content based on auth status
 */
const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center">
        <div className="mb-8">
          <img src={Logo} alt="EventNest Logo" className="h-20 mx-auto mb-6" />
        </div>

        <h1 className="text-5xl font-bold text-gray-800 mb-4">EventNest</h1>
        <p className="text-xl text-gray-600 mb-8">
          Manage your events with ease and efficiency
        </p>

        <div className="flex gap-4 justify-center">
          {isAuthenticated ? (
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-[#201502] text-white px-8 py-3 rounded-md hover:bg-[#2a1d06] font-semibold"
            >
              Go to Dashboard
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="bg-[#201502] text-white px-8 py-3 rounded-md hover:bg-[#2a1d06] font-semibold"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/login")}
                className="border-2 border-[#201502] text-[#201502] px-8 py-3 rounded-md hover:bg-gray-200 font-semibold"
              >
                Get Started
              </button>
            </>
          )}
        </div>

        <p className="text-gray-500 mt-12 text-sm">
          © 2024 EventNest. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Index;
