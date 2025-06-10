import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
       
        <div className="flex items-center gap-3">
          {/* House Icon */}
          <div className="p-2 bg-indigo-101 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-indigo-600"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 3L2 12h3v8h6v-5h2v5h6v-8h3L12 3z" />
            </svg>
          </div>

          {/* Company Name */}
          <h1 className="text-2xl font-extrabold text-indigo-700 tracking-wide">
            RAJ <span className="text-gray-600">HOMES</span>
          </h1>
        </div>
        <nav className="space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-500">
            Home
          </Link>
          <Link to="/aboutus" className="text-gray-700 hover:text-blue-500">
            About Us
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-500">
            Contact Us
          </Link>
          <Link to="/login" className="text-white bg-green-400 p-2 border-2 rounded-2xl text-center hover:text-blue-500">
            Login
          </Link>
         
        </nav>
      </header>
    </>
  );
};

export default Header;
