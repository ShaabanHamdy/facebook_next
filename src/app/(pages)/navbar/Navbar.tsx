"use client";

import React, { useState } from "react";
import { MdOutlineLiveTv } from "react-icons/md";
import { LuSearch } from "react-icons/lu";
import {
  FaFacebook,
  FaHome,
  FaStore,
  FaUsers,
  FaGamepad,
  FaBell,
  FaEnvelope,
  FaUserCircle,
  FaBars,
  FaPlus,
} from "react-icons/fa";

const Navbar: React.FC = () => {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown((prevDropdown) =>
      prevDropdown === dropdown ? null : dropdown
    );
  };

  const handleDarkModeToggle = () => setIsDarkMode(!isDarkMode);

  return (
    <nav
      className={`${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      } shadow-md p-2 flex justify-between items-center`}
    >
      {/* Left Section */}
      <div className="flex items-center  space-x-3 lg:space-x-8">
        <FaFacebook
          size={40}
          className="text-blue-600  cursor-pointer"
        />
        <div className=" relative">
          <input
            type="text"
            placeholder="Search facebook"
            className="hidden sm:block   ps-8 py-2 bg-gray-100 rounded-full focus:outline-none dark:bg-gray-800"
          />
          <div className=" hidden sm:block absolute  top-2 left-2 ">
            <LuSearch size={20} />
          </div>
        </div>
      </div>

      {/* Center Section - Only show on medium screens and up */}

      <div className="hidden sm:flex space-x-4 lg:space-x-10">
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
            className={`relative lg:p-5 p-3 cursor-pointer ${
              selectedIcon === item.name
                ? "text-blue-600 border-b-4 bg-gray-200 rounded-md border-blue-600"
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
      <div className="flex items-center  ">
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
        <div className="hidden md:flex lg:space-x-4 space-x-2 ">
          <IconWithDropdown
          
          icon={FaBars}
            isOpen={openDropdown === "menu"}
            toggle={() => toggleDropdown("menu")}
          >
            <MenuDropdown />
          </IconWithDropdown>

          <IconWithDropdown
            icon={FaEnvelope}
            isOpen={openDropdown === "messenger"}
            toggle={() => toggleDropdown("messenger")}
          >
            <MessengerDropdown />
          </IconWithDropdown>

          <IconWithDropdown
            icon={FaBell}
            isOpen={openDropdown === "notifications"}
            toggle={() => toggleDropdown("notifications")}
          >
            <NotificationsDropdown />
          </IconWithDropdown>

          <IconWithDropdown
            icon={FaUserCircle}
            isOpen={openDropdown === "profile"}
            toggle={() => toggleDropdown("profile")}
          >
            <ProfileDropdown toggleDarkMode={handleDarkModeToggle} />
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
  <div className="relative">
    <Icon size={25} className="text-black hover:bg-gray-500 lg:me-5 cursor-pointer" onClick={toggle} />
    {isOpen && (
      <div className
      ="absolute right-3 mt-2 w-[400px] bg-gray-300 shadow-lg rounded-md p-4  dark:bg-gray-900  md:absolute">
        {children}
      </div>
    )}
  </div>
);

// Menu Dropdown - Adjusted for mobile and desktop
const MenuDropdown: React.FC<{ isMobile?: boolean }> = ({
  isMobile = false,
}) => (
  <div
    className={`${
      isMobile ? "block md:hidden" : 
      "hidden md:flex  md:w-[300px]"
    }`}
  >
    <div className="p-4">
      <input
        type="text"
        placeholder="Search Menu"
        className="px-4 py-2 mb-4 w-full bg-gray-100 rounded-full focus:outline-none dark:bg-gray-800"
      />
      <h2 className="font-semibold text-lg mb-2 ">Social</h2>
      {["Events", "Friends", "Groups", "News Feed", "Pages"].map((item) => (
        <div
          key={item}
          className="flex items-center py-2 my-3 hover:bg-gray-200 cursor-pointer rounded-lg dark:hover:bg-gray-700 "
        >
          <FaUserCircle className="mr-2" /> {item}
        </div>
      ))}
    </div>
    
    {!isMobile && (
      <div className="p-4  ">
        <h2 className="font-semibold text-lg mb-2">Create</h2>
        {["Post", "Story", "Reel", "Life Event"].map((item) => (
          <div
            key={item}
            className="flex items-center  w-36 my-3 py-2 hover:bg-gray-200 cursor-pointer rounded-lg dark:hover:bg-gray-700"
          >
            <FaPlus className="mr-2" /> {item}
          </div>
        ))}
      </div>
    )}
  </div>
);

// Messenger Dropdown
const MessengerDropdown: React.FC = () => (
  <div>
    <h1 className="font-semibold text-lg mb-4">Chat</h1>
    <input
      type="text"
      placeholder="Search Messenger"
      className="px-4 py-2 mb-4 w-full bg-gray-100 rounded-full focus:outline-none dark:bg-gray-800"
    />
    <div className="flex flex-col space-y-2">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="flex items-center space-x-3 py-2 hover:bg-gray-200 cursor-pointer rounded-lg dark:hover:bg-gray-700"
        >
          <FaUserCircle className="text-gray-600" size={30} />
          <span>User {index + 1}</span>
        </div>
      ))}
    </div>
  </div>
);

// Notifications Dropdown
const NotificationsDropdown: React.FC = () => (
  <div>
    <h2 className="font-semibold text-lg mb-4">Notifications</h2>
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="flex items-center space-x-3 py-2 hover:bg-gray-200 cursor-pointer rounded-lg dark:hover:bg-gray-700"
      >
        <FaUserCircle className="text-gray-600" size={30} />
        <div>
          <span className="font-semibold">User {index + 1}</span> action details
        </div>
      </div>
    ))}
  </div>
);

// Profile Dropdown with Dark Mode
const ProfileDropdown: React.FC<{ toggleDarkMode: () => void }> = ({
  toggleDarkMode,
}) => (
  <div>
    {[
      "Settings & Privacy",
      "Help",
      "Display & Accessibility",
      "Feedback",
      "Log Out",
    ].map((item, index) => (
      <div
        key={index}
        className="flex items-center py-2 hover:bg-gray-200 cursor-pointer rounded-lg dark:hover:bg-gray-700"
      >
        <FaUserCircle className="mr-2" /> {item}
      </div>
    ))}
    <div
      onClick={toggleDarkMode}
      className="flex items-center py-2 hover:bg-gray-200 cursor-pointer rounded-lg dark:hover:bg-gray-700"
    >
      <FaUserCircle className="mr-2" /> Toggle Dark Mode
    </div>
  </div>
);

export default Navbar;
