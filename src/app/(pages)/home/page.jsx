import CreatePost from "../createPost/CreatePost";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";

const Home = () => {
  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="pt-24 dark:bg-gray-900 dark:text-white sm:ps-16">
        <CreatePost />
      </div>
    </>
  );
};

export default Home;
