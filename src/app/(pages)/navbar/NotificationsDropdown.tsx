import { FaUserCircle } from "react-icons/fa"





// Notifications Dropdown
export const NotificationsDropdown = () => {
    return(
        <div className="p-3">
        <h2 className="font-semibold text-lg mb-4 ">Notifications</h2>
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="flex items-center  py-2 w-56 hover:bg-gray-200 cursor-pointer rounded-lg dark:hover:bg-gray-700"
          >
            <FaUserCircle className="text-gray-600 mx-3" size={30} />
            <div>
              <span className="font-semibold ">User {index + 1}</span> action
              details
            </div>
          </div>
        ))}
      </div>
    
    )
}
    
    
   
   
  
  