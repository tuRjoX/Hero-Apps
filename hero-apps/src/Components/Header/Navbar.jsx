import React from "react";
import { Link, NavLink } from "react-router";
import Logo from "../../assets/logo.png";
import { FaGithub } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { FaAppStore } from "react-icons/fa";
import { MdOutlineInstallMobile } from "react-icons/md";

const Navbar = () => {
  return (
    <div>
      <div className="navbar bg-base-100 px-10">
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2"
            >
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "active relative group" : "relative group"
                  }
                >
                  <span className="relative px-4 py-2">
                    Home
                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#632EE3] transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/apps"
                  className={({ isActive }) =>
                    isActive ? "active relative group" : "relative group"
                  }
                >
                  <span className="relative px-4 py-2">
                    Apps
                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#632EE3] transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/installation"
                  className={({ isActive }) =>
                    isActive ? "active relative group" : "relative group"
                  }
                >
                  <span className="relative px-4 py-2">
                    Installation
                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#632EE3] transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
          <Link to="/" className="flex items-center gap-2">
            <img src={Logo} alt="HERO.IO Logo" className="h-10" />
            <span className="text-xl font-bold bg-gradient-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent">
              HERO.IO
            </span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "active relative group" : "relative group"
                }
              >
                <span className="relative px-4 py-2 text-lg flex items-center">
                  <IoHomeOutline className="mr-2" />
                  Home
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#632EE3] transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/apps"
                className={({ isActive }) =>
                  isActive ? "active relative group" : "relative group"
                }
              >
                <span className="relative px-4 py-2 text-lg flex items-center">
                  <FaAppStore className="mr-2" />
                  Apps
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#632EE3] transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/installation"
                className={({ isActive }) =>
                  isActive ? "active relative group" : "relative group"
                }
              >
                <span className="relative px-4 py-2 text-lg flex items-center">
                  <MdOutlineInstallMobile className="mr-2" />
                  Installation
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#632EE3] transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end ">
          <a
            className="btn bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white"
            href="https://github.com/tuRjoX"
          >
            <FaGithub />
            Contribution
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
