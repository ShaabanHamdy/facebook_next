import React, { useEffect } from "react";
import {
  FaAdjust,
  FaCog,
  FaCommentDots,
  FaMoon,
  FaQuestionCircle,
  FaSignOutAlt,
  FaSun,
} from "react-icons/fa";

interface ProfileDropdownProps {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  showThemeToggle: boolean;
  setShowThemeToggle: React.Dispatch<React.SetStateAction<boolean>>;
}
export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  isDarkMode,
  setIsDarkMode,
  setShowThemeToggle,
  showThemeToggle,
}) => {
  // Update the document class and localStorage when isDarkMode changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newMode;
    });
  };

  // Menu items
  const menuItems = [
    { name: "Settings & Privacy", icon: <FaCog /> },
    { name: "Help", icon: <FaQuestionCircle /> },
    {
      name: "Display & Accessibility",
      icon: <FaAdjust />,
      onClick: () => setShowThemeToggle((prev) => !prev),
    },
    { name: "Feedback", icon: <FaCommentDots /> },
    { name: "Log Out", icon: <FaSignOutAlt /> },
  ];
  return (
    <div className="p-3 dark:text-white">
      {menuItems.map((item, index) => (
        <div key={index}>
          {/* Each Menu Item */}
          <div
            onClick={item.onClick}
            className="flex items-center py-3 w-64 hover:bg-gray-200 dark:hover:bg-gray-800  cursor-pointer rounded-lg"
          >
            <span className="text-xl mx-2">{item.icon}</span> {/* Icon */}
            <span>{item.name}</span> {/* Text label */}
          </div>

          {/* Render Toggle Button directly under "Display & Accessibility" */}
          {item.name === "Display & Accessibility" && showThemeToggle && (
            <div className="flex items-center justify-between p-3 mt-1 ml-8 bg-gray-100 dark:bg-gray-700 rounded-lg">
              {isDarkMode ? <span>Light Mode</span> : <span>Dark Mode</span>}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full focus:outline-none"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <FaSun className="text-yellow-400" />
                ) : (
                  <FaMoon className="text-gray-600" />
                )}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
