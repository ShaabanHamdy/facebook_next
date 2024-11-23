import { useState } from "react";

// Define the custom hook
 function useToggle (){
  
    // State to track expanded item
    const [expandedItem, setExpandedItem] = useState<string | null>(null);
    const [darkMode, setDarkMode] = useState(false);
    const handleItemClick = (itemName: string) => {
        setExpandedItem(expandedItem === itemName ? null : itemName);
      };
    // Return the state and the toggle function
  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark", !darkMode);
  };
    return [expandedItem, handleItemClick , darkMode, toggleDarkMode];
  }
  
  export default useToggle