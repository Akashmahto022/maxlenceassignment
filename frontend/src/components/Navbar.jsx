import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="p-6 bg-blue-700 text-white">
      <div className="flex justify-between items-center">
        <div>
          <Link to={"/"}>maxlenceassignment</Link>
        </div>
        {/* Hamburger for mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        {/* Desktop menu */}
        <div className="hidden md:block">
          <ul className="flex gap-4">
            <Link to={"/"}>
              <li className="hover:underline hover:cursor-pointer px-2 rounded-2xl">
                Home
              </li>
            </Link>
            <Link to={"/all-users"}>
              <li className="hover:underline hover:cursor-pointer px-2 rounded-2xl">
                Users
              </li>
            </Link>
            <Link to={"/register"}>
              <li className="hover:cursor-pointer px-2 rounded-2xl border-2 border-white hover:bg-black hover:text-white">
                Register
              </li>
            </Link>
            <Link to={"/login"}>
              <li className="hover:cursor-pointer px-2 rounded-2xl border-2 border-white hover:bg-black hover:text-white">
                Login
              </li>
            </Link>
          </ul>
        </div>
      </div>
      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-4">
          <ul className="flex flex-col gap-2">
            <Link to={"/"} onClick={() => setMenuOpen(false)}>
              <li className="hover:underline hover:cursor-pointer px-2 py-2 rounded-2xl bg-blue-800">
                Home
              </li>
            </Link>
            <Link to={"/all-users"} onClick={() => setMenuOpen(false)}>
              <li className="hover:underline hover:cursor-pointer px-2 py-2 rounded-2xl bg-blue-800">
                users
              </li>
            </Link>
            <Link to={"/register"} onClick={() => setMenuOpen(false)}>
              <li className="hover:cursor-pointer px-2 py-2 rounded-2xl border-2 border-white hover:bg-black hover:text-white bg-blue-800">
                Register
              </li>
            </Link>
            <Link to={"/login"} onClick={() => setMenuOpen(false)}>
              <li className="hover:cursor-pointer px-2 py-2 rounded-2xl border-2 border-white hover:bg-black hover:text-white bg-blue-800">
                Login
              </li>
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
