// src/screens/Login.jsx
import React from "react";
import Logo from "../../assets/images/logo.png";
import LoginBG from "../../assets/images/login.svg";
import { useNavigate } from "react-router-dom";
import Checkbox from "../../components/Checkbox/Checkbox";

const Login = () => {
  const navigate = useNavigate();
  return (
    // <div className="flex h-screen">
    //   {/* Left section with form */}

    //   <div className="w-2/5 bg-[#F3F3F3] flex flex-col justify-center text-left px-16 items-center">
    //     <div className="max-width">
    //       <div className="flex items-center">
    //         <img src={Logo} alt="EventNest Logo" />
    //       </div>

    //       <h3 className="text-xl font-bold mb-2">Welcome to EventNest!</h3>
    //       <p className="mb-6 text-[#7b746a]">
    //         Please enter your Login ID & password to continue
    //       </p>

    //       {/* Login Form */}
    //       <div className="flex flex-col mb-2 gap-2">
    //         <label htmlFor="loginId" className="block text-gray-700">
    //           Login ID
    //         </label>
    //         <input
    //           autoFocus
    //           type="text"
    //           id="loginId"
    //           placeholder="Login ID"
    //           className="border rounded-md px-3 py-2 focus:outline-none focus:border-[#FF5B2E]"
    //         />

    //         <label htmlFor="password" className="block text-gray-700">
    //           Password
    //         </label>
    //         <input
    //           type="password"
    //           id="password"
    //           placeholder="Password"
    //           className="border rounded-md px-3 py-2 focus:outline-none focus:border-[#FF5B2E]"
    //         />
    //       </div>

    //       {/* Remember me and Reset Password */}
    //       <div className="flex items-center justify-between mb-6">
    //         <div className="flex items-center">
    //           <input
    //             type="checkbox"
    //             className="mr-2 border rounded-md checked:bg-[#FF5B2E] checked:border-[#FF5B2E]"
    //           />
    //           <label className="font-[#000000] text-sm font-semibold">
    //             Remember me
    //           </label>
    //         </div>
    //         <a href="#" className="text-[#FF5B2E] text-sm font-bold">
    //           Reset password
    //         </a>
    //       </div>

    //       {/* Login Button */}
    //       <button
    //         className="bg-[#201502] text-white px-4 py-2 rounded-md w-full"
    //         type="submit"
    //         onClick={() => navigate("/dashboard")}
    //       >
    //         Login
    //       </button>
    //     </div>
    //   </div>
    //   {/* Right section with image */}
    //   <div className="w-3/5">
    //     <img
    //       src={LoginBG}
    //       alt="Event"
    //       className="w-full object-cover h-full"
    //       fetchPriority="high"
    //     />
    //   </div>
    // </div>

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
            Please enter your Login ID & password to continue
          </p>

          {/* Login Form */}
          <div className="flex flex-col mb-4 gap-2">
            <label htmlFor="loginId" className="block text-gray-700">
              Login ID
            </label>
            <input
              autoFocus
              type="text"
              id="loginId"
              placeholder="Login ID"
              className="border rounded-md px-3 py-2 focus:outline-none focus:border-[#FF5B2E] w-full"
            />

            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="border rounded-md px-3 py-2 focus:outline-none focus:border-[#FF5B2E] w-full"
            />
          </div>

          {/* Remember me and Reset Password */}
          <div className="flex flex-col lg:items-center justify-between mb-6 lg:flex-row">
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
            className="bg-[#201502] text-white px-4 py-2 rounded-md w-full"
            type="submit"
            onClick={() => navigate("/dashboard")}
          >
            Login
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
