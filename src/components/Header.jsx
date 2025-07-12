import React, { useEffect, useState, useRef } from "react";
import { jwtDecode } from "jwt-decode"; // ✅ correct for Vite + ESM
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaCogs, FaSignOutAlt, FaRegUser } from "react-icons/fa";
import { Logout } from "../services/authService";


const Header = () => {
  const [userName, setUserName] = useState("Admin");
  const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
  const dropdownRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem("token");

   if (token) {
  try {
    const decoded = jwtDecode(token);

    // Check for Supreme Admin (has name)
    if (decoded?.name) {
      setUserName(decoded.name);
    }

    // Check for Staff (has firstName + lastName)
    else if (decoded?.firstName && decoded?.lastName) {
      setUserName(`${decoded.firstName} ${decoded.lastName}`);
    }

    // Fallback if only firstName exists
    else if (decoded?.firstName) {
      setUserName(decoded.firstName);
    }

    // Fallback
    else {
      setUserName("Admin");
    }

  } catch (error) {
    console.error("Invalid token:", error);
    setUserName("Admin");
  }
}

  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed top-0 left-16 sm:left-64 right-0 z-50 bg-white shadow-md py-3 px-4">
      <div className="flex items-center justify-end relative" ref={dropdownRef}>
        {/* User Profile Icon */}
        <div
          className="flex items-center space-x-2 cursor-pointer hover:text-blue-600 transition-all"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <FaUserCircle className="text-xl sm:text-2xl" />
          <span className="hidden md:inline text-sm font-medium text-gray-700">
            {userName}
          </span>
        </div>

        {/* Dropdown */}
        {dropdownOpen && (
          <div className="absolute top-12 right-0 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <ul className="py-2 text-sm text-gray-700">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                <FaRegUser /> Profile
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                <FaCogs /> Settings
              </li>
              <li
                className="px-4 py-2 text-red-600 hover:bg-red-50 cursor-pointer flex items-center gap-2"
                onClick={async () => {
                  await Logout();
                  setTimeout(() =>{
                    navigate("/login")
                  } , 400)
                  // window.location.href = "/login";
                }}
              >
                <FaSignOutAlt /> Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
