import React from "react";
import Logo from "../../assets/images/logo.png";
import { useNavigate, useLocation } from "react-router-dom";
// import useAuth from '../../hooks/useAuth.js';

/**
 * Navbar Component
 * Shows different content based on:
 * - Login/Signup pages: Minimal navbar with login/signup links
 * - Authenticated pages: Full navbar with profile and notifications
 */
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const { isAuthenticated, logout, user } = useAuth();

  const isAuthenticated = !!localStorage.getItem("user");
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const logout = () => localStorage.removeItem("user");

  // Determine which pages should show minimal navbar
  const isAuthPage = location.pathname === "/login";
  const isMinimalNavbar = isAuthPage;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white py-4 border-b border-[#D9D9D9] w-full sticky top-0 z-50">
      <div className="flex justify-between items-center w-4/5 mx-auto">
        {/* Logo */}
        <img
          src={Logo}
          alt="logo"
          onClick={() => navigate("/dashboard")}
          className="cursor-pointer h-10"
        />

        {/* Navbar Content - Changes based on page */}
        {isMinimalNavbar ? (
          // On Login/Signup Pages - Show login/signup links
          <div className="flex gap-4 items-center">
            <button
              onClick={() => navigate("/login")}
              className="text-[#201502] font-medium hover:text-[#FF5B2E] transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/login")}
              className="bg-[#201502] text-white px-4 py-2 rounded-md hover:bg-[#2a1d06] transition"
            >
              Sign Up
            </button>
          </div>
        ) : isAuthenticated ? (
          // Authenticated Pages - Show profile and notifications
          <div className="profile flex gap-4 items-center">
            {/* Notifications Icon */}
            <button
              className="relative hover:opacity-80 transition"
              title="Notifications"
            >
              <img src="/bell.png" alt="Notifications" className="w-6 h-7" />
              {/* Optional: Badge for notification count */}
              {/* <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>3</span> */}
            </button>

            {/* Profile Menu */}
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-gray-700">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <img
                src="/ProfilePic.png"
                alt="Profile"
                className="w-11 h-11 rounded-full cursor-pointer hover:opacity-80 transition"
                onClick={() => {
                  // Could open a profile dropdown menu here
                  console.log("Profile clicked");
                }}
              />
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="text-xs text-red-600 hover:text-red-700 font-medium ml-2"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          // Unauthenticated (other pages) - Show login button
          <button
            onClick={() => navigate("/login")}
            className="bg-[#201502] text-white px-4 py-2 rounded-md hover:bg-[#2a1d06] transition"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
