import React from "react";
import Logo from "../../assets/logo.png";
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm px-5">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Home</a>
              </li>
              <li>
                <a>Apps</a>
              </li>
              <li>
                <a>Installation</a>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-2">
            <img src={Logo} alt="HERO.IO Logo" className="h-10" />
            <a className="text-xl font-bold bg-gradient-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent">
              HERO.IO
            </a>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>Apps</a>
            </li>
            <li>
              <a>Installation</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end ">
          <a className="btn bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white">
            <FaGithub />
            Contribution
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
