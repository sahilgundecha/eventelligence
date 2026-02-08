// src/screens/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import LoginBG from "../../assets/images/login.svg";
import Checkbox from "../../components/Checkbox/Checkbox";
// import useAuth from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  // const { login, isLoading } = useAuth();
  const isLoading = false; // Mock loading state for testing without backend

  const [credentials, setCredentials] = useState({
    email: "user@example.com",
    password: "Admin123",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!credentials.email || !credentials.password) {
      setError("Please enter both email and password");
      return;
    }

    // const result = await login(credentials);
    // if (result.success) {
    //   navigate("/dashboard");
    // } else {
    //   setError(result.error || "Login failed");
    // }
    localStorage.setItem(
      "user",
      JSON.stringify({ id: 1, email: credentials.email, name: "User" }),
    ); // Mock user data for testing without backend

    console.log({ user: localStorage.getItem("user") });
    navigate("/dashboard"); // Mock navigation for testing without backend
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left section with form */}
      <div className="w-full md:w-2/5 bg-[#F3F3F3] flex flex-col justify-center text-left px-6 md:px-16 items-center h-screen">
        <div className="max-w-md w-full">
          <div className="flex items-center justify-center md:justify-start mb-4">
            <img src={Logo} alt="EventNest Logo" className="h-10 md:h-auto" />
          </div>

          <h3 className="text-lg md:text-xl font-bold mb-2">
            Welcome to EventNest!
          </h3>
          <p className="mb-6 text-[#7b746a] text-sm md:text-base text-center md:text-left">
            Please enter your email & password to continue
          </p>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form className="flex flex-col mb-4 gap-2">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              autoFocus
              type="email"
              id="email"
              placeholder="Enter your email"
              value={credentials.email}
              onChange={handleInputChange}
              className="border rounded-md px-3 py-2 focus:outline-none focus:border-[#FF5B2E] w-full"
              disabled={isLoading}
            />

            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={handleInputChange}
              className="border rounded-md px-3 py-2 focus:outline-none focus:border-[#FF5B2E] w-full"
              disabled={isLoading}
            />
          </form>

          {/* Remember me and Reset Password */}
          <div className="flex flex-col lg:items-center justify-between mb-6 lg:flex-row sm:flex-row">
            <Checkbox
              label="Rememer me"
              id="rememberMe"
              inputClasses="w-4 h-4"
            />
            <a
              href="#"
              className="text-[#FF5B2E] text-sm font-bold hover:underline"
            >
              Reset password
            </a>
          </div>

          {/* Login Button */}
          <button
            className="bg-[#201502] text-white px-4 py-2 rounded-md w-full hover:bg-[#2a1d06] disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            onClick={handleLogin}
            // disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>

      {/* Right section with image */}
      <div className="hidden md:block md:w-3/5">
        <img
          src={LoginBG}
          alt="Event"
          className="w-full object-cover h-full"
          fetchPriority="high"
        />
      </div>
    </div>
  );
};

export default Login;
