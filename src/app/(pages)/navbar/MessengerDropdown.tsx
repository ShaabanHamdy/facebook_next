import { FaUserCircle } from "react-icons/fa";

// Messenger Dropdown
export const MessengerDropdown = () => {
  return (
    <div className="p-4">
      <h1 className="font-semibold text-lg mb-4">Chat</h1>
      <input
        type="text"
        placeholder="Search Messenger"
        className="p-2 mb-3 bg-gray-100 rounded-full focus:outline-none dark:bg-gray-900"
      />
      <div className="flex flex-col space-y-2">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 py-2 hover:bg-gray-200 cursor-pointer rounded-lg dark:hover:bg-gray-700"
          >
            <FaUserCircle className="text-gray-600 mx-2" size={30} />
            <span>User {index + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
