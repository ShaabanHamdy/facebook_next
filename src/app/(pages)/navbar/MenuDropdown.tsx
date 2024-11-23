import {
  FaCalendar,
  FaFilm,
  FaFlag,
  FaHeart,
  FaNewspaper,
  FaRegEdit,
  FaRegStickyNote,
  FaUserFriends,
  FaUsers,
} from "react-icons/fa";

// Menu Dropdown - Adjusted for mobile and desktop
export const MenuDropdown: React.FC<{ isMobile?: boolean }> = ({
  isMobile = false,
}) => {
  const items = [
    { name: "Events", icon: <FaCalendar /> },
    { name: "Friends", icon: <FaUserFriends /> },
    { name: "Groups", icon: <FaUsers /> },
    { name: "News Feed", icon: <FaNewspaper /> },
    { name: "Pages", icon: <FaFlag /> },
  ];
  const itemsTow = [
    { name: "Post", icon: <FaRegEdit /> }, // Post icon
    { name: "Story", icon: <FaRegStickyNote /> }, // Story icon
    { name: "Reel", icon: <FaFilm /> }, // Reel icon
    { name: "Life Event", icon: <FaHeart /> }, // Life Event icon
  ];

  return (
    <div className={`${isMobile ? "block md:hidden" : "hidden md:flex "}`}>
      <div className="p-4 ">
        <input
          type="text"
          placeholder="Search Menu"
          className=" p-2 mb-3 rounded-lg focus:outline-none dark:bg-gray-900"
        />
        <h2 className="font-semibold text-lg mb-2 ">Social</h2>
        <div>
          {items.map((item) => (
            <div
              key={item.name}
              className="flex items-center  py-2 my-3 hover:bg-gray-200 cursor-pointer rounded-md dark:hover:bg-gray-700"
            >
              <span className="text-xl mx-2">{item.icon}</span>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {!isMobile && (
        <div className="p-4">
          <h2 className="font-semibold text-lg mt-10">Create</h2>
          {itemsTow.map((item) => (
            <div
              key={item.name}
              className="flex items-center  py-2 my-3 w-32  hover:bg-gray-200 cursor-pointer rounded-lg dark:hover:bg-gray-700"
            >
              <span className="text-xl mx-2">{item.icon}</span>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
