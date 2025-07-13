import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="p-6 bg-blue-700 text-white">
      <div className="flex justify-between items-center">
        <div>
          <Link to={"/"}>maxlenceassignment</Link>
        </div>
        <div>
          <ul className="flex gap-4">
            <Link to={"/"}>
              <li className="hover:underline hover:cursor-pointer px-2 rounded-2xl">
                Home
              </li>
            </Link>
            <Link to={"/about"}>
              <li className="hover:underline hover:cursor-pointer px-2 rounded-2xl">
                About
              </li>
            </Link>
            <Link to={"/contact"}>
              <li className="hover:underline hover:cursor-pointer px-2 rounded-2xl">
                {" "}
                Contact
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
    </div>
  );
};

export default Navbar;
