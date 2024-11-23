"use client";
import React, { useEffect, useState } from "react";
import { CgMenuGridO } from "react-icons/cg";
import {
  FaBars,
  FaBell,
  FaFacebook,
  FaFacebookMessenger,
  FaGamepad,
  FaHome,
  FaStore,
  FaUserCircle,
  FaUsers,
} from "react-icons/fa";
import { LuSearch } from "react-icons/lu";
import { MdOutlineLiveTv } from "react-icons/md";
import { MenuDropdown } from "./MenuDropdown";
import { MessengerDropdown } from "./MessengerDropdown";
import { NotificationsDropdown } from "./NotificationsDropdown";
import { ProfileDropdown } from "./ProfileDropdown";

// Function to handle item click

const Navbar = () => {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown((prevDropdown) =>
      prevDropdown === dropdown ? null : dropdown
    );
  };
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showThemeToggle, setShowThemeToggle] = useState(false);

  //  // Check localStorage for theme preference on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    // Set dark mode if local storage theme is dark or the user preference is dark
    if (savedTheme === "dark" || (!savedTheme && prefersDarkMode)) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, [setIsDarkMode]);

  return (
    <nav
      className={` fixed  w-full z-20 bg-white text-black shadow-md p-2 flex justify-between items-center dark:bg-gray-800 dark:text-white`}
    >
      {/* Left Section */}
      <div className="flex items-center  space-x-3 lg:space-x-8">
        <FaFacebook
          size={40}
          className="text-blue-600  dark:text-white cursor-pointer"
        />
        <div className=" relative">
          <input
            type="text"
            placeholder="Search facebook"
            className="hidden sm:block  ps-8 py-2 bg-gray-100 rounded-full focus:outline-none dark:bg-gray-900"
          />
          <div className=" hidden sm:block absolute  top-2 left-2 ">
            <LuSearch size={20} />
          </div>
        </div>
      </div>

      {/* Center Section - Only show on medium screens and up */}

      <div className="hidden sm:flex space-x-4 lg:space-x-7">
        {[
          { icon: FaHome, name: "Home" },
          { icon: MdOutlineLiveTv, name: "Videos" },
          { icon: FaStore, name: "Marketplace" },
          { icon: FaUsers, name: "Groups" },
          { icon: FaGamepad, name: "Gaming" },
        ].map((item) => (
          <div
            key={item.name}
            title={item.name}
            onClick={() => setSelectedIcon(item.name)}
            className={`relative  p-3 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md cursor-pointer ${
              selectedIcon === item.name
                ? "dark:bg-gray-100  text-blue-600 border-b-4 bg-gray-200 rounded-md border-blue-600"
                : ""
            }`}
          >
            <item.icon size={35} />

            <span className="absolute bottom-10 p-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100">
              {item.name}
            </span>
          </div>
        ))}
      </div>

      {/* Right Section */}
      <div className="flex items-center   ">
        {/* Toggle Menu Icon on smaller screens */}
        <div className="block md:hidden">
          <IconWithDropdown
            icon={FaBars}
            isOpen={openDropdown === "menu"}
            toggle={() => toggleDropdown("menu")}
          >
            <MenuDropdown isMobile={true} />
          </IconWithDropdown>
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex  space-x-2  ">
          <IconWithDropdown
            icon={CgMenuGridO}
            isOpen={openDropdown === "menu"}
            toggle={() => toggleDropdown("menu")}
          >
            <MenuDropdown />
          </IconWithDropdown>
          <div className=" relative ">
            <div className="z-10 absolute bg-red-500 text-white rounded-lg p-1 text-[10px] right-0  bottom-7">
              12
            </div>
            <IconWithDropdown
              icon={FaFacebookMessenger}
              isOpen={openDropdown === "messenger"}
              toggle={() => toggleDropdown("messenger")}
            >
              <MessengerDropdown />
            </IconWithDropdown>
          </div>

          <div className=" relative ">
            <div className="z-10 absolute bg-red-500 text-white rounded-lg p-1 text-[10px] right-0  bottom-7">
              12
            </div>
            <IconWithDropdown
              icon={FaBell}
              isOpen={openDropdown === "notifications"}
              toggle={() => toggleDropdown("notifications")}
            >
              <NotificationsDropdown />
            </IconWithDropdown>
          </div>

          <IconWithDropdown
            icon={FaUserCircle}
            isOpen={openDropdown === "profile"}
            toggle={() => toggleDropdown("profile")}
          >
            <ProfileDropdown
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
              setShowThemeToggle={setShowThemeToggle}
              showThemeToggle={showThemeToggle}
            />
          </IconWithDropdown>
        </div>
      </div>
    </nav>
  );
};

// Reusable IconWithDropdown Component
const IconWithDropdown: React.FC<{
  icon: React.ElementType;
  isOpen: boolean;
  toggle: () => void;
  children: React.ReactNode;
}> = ({ icon: Icon, isOpen, toggle, children }) => (
  <div
    className={`relative p-2  bg-gray-200 dark:bg-gray-600 hover:bg-gray-300  dark:hover:bg-gray-400 rounded-lg  ${
      isOpen && "bg-gray-300 dark:bg-gray-600"
    }`}
  >
    <Icon
      size={25}
      className="text-black  dark:text-white lg:mx-3 cursor-pointer"
      onClick={toggle}
    />
    {isOpen && (
      <div className="absolute right-3 mt-3   bg-gray-300 shadow-lg  rounded-md   dark:bg-gray-900  ">
        {children}
      </div>
    )}
  </div>
);

export default Navbar;
