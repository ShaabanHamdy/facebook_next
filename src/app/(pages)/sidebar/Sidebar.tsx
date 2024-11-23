"use client";

import React, { useState } from "react";
import {
  FaBookmark,
  FaCalendarAlt,
  FaClock,
  FaGamepad,
  FaMusic,
  FaNewspaper,
  FaTv,
  FaUserFriends,
  FaUsers,
} from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

type MenuItem = {
  icon: React.ReactNode;
  label: string;
};

const sidebarItems: MenuItem[] = [
  { icon: <FaNewspaper />, label: "News Feed" },
  { icon: <FaUserFriends />, label: "Friends" },
  { icon: <FaUsers />, label: "Groups" },
  { icon: <FaBookmark />, label: "Bookmarks" },
  { icon: <FaTv />, label: "Watch" },
  { icon: <FaClock />, label: "Memories" },
];

// Additional items to show after "See More" is clicked
const additionalItems: MenuItem[] = [
  { icon: <FaCalendarAlt />, label: "Events" },
  { icon: <FaGamepad />, label: "Games" },
  { icon: <FaMusic />, label: "Music" },
];

const Sidebar: React.FC = () => {
  const [showMore, setShowMore] = useState(false);

  const handleToggle = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <>
      <aside
        className={`hidden md:block lg:w-64 w-54 fixed top-16 mt-3 left-0 z-20   h-screen bg-gray-200 dark:bg-gray-800 p-5`}
      >
        <nav className="space-y-4">
          {sidebarItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer rounded-md transition-colors"
            >
              <span className="text-2xl text-blue-600 dark:text-blue-400">
                {item.icon}
              </span>
              <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
                {item.label}
              </span>
            </div>
          ))}

          {/* "See More" button */}
          <div
            onClick={handleToggle}
            className="w-full flex items-center justify-center border cursor-pointer  mt-4 py-2 text-blue-600 bg-gray-200 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors"
          >
            {showMore ? "See Less" : "See More"}
            {showMore ? (
              <FiChevronUp className="ml-2" />
            ) : (
              <FiChevronDown className="ml-2 " />
            )}
          </div>

          {/* Show additional items when "See More" is clicked */}
          {showMore &&
            additionalItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer rounded-md transition-colors"
              >
                <span className="text-2xl text-blue-600 dark:text-blue-400">
                  {item.icon}
                </span>
                <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  {item.label}
                </span>
              </div>
            ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
