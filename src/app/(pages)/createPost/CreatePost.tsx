"use client";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import { FaImage, FaRegSmile, FaTimes, FaVideo } from "react-icons/fa";
import { IoMdPhotos } from "react-icons/io";
import shaaban from "../../images/shaaban.jpg";
import PostCard from "../PostPage/PostCard";

interface ErrorResponse {
  message: string;
}
const CreatePost = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postText, setPostText] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [privacy, setPrivacy] = useState("public");
  const [editPostToModal, setEditPostToModal] = useState(false);
  const [getAllPosts, setGetAllPosts] = useState([]);
  // const [imagePreview, setImagePreview] = useState<string | null>(null);
  // Open and close modal handlers
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setEditPostToModal(false);
    setPostText("");
    setSelectedImage(null);
  };
  const handleEdit = () => {
    setEditPostToModal(true);
    console.log("handleEdit");
  };

  // Handle image selection
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };
  // Form submission to send post data to the API
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Prepare the data to send
    const formData = new FormData();
    formData.append("postContent", postText);
    if (selectedImage) formData.append("postImage", selectedImage);
    formData.append("privacy", privacy);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/post/createPost",
        formData,
        {
          headers: { auth: localStorage.getItem("token") },
        }
      );
      if (data.message === "success") {
        setGetAllPosts(data.getAllPosts);
        // console.log(data);
      }

      closeModal(); // Close modal after submission
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;

      if (axiosError.response) {
        //   setBackError(axiosError.response.data.message);
        // console.log(axiosError.response.data.message); // TypeScript will now recognize `message`
      } else {
        // console.log("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="">
      {/* Main Post Input (Outside Modal) */}

      <div className="lg:w-[45%] md:w-[60%]  w-[90%] m-auto bg-white dark:bg-gray-800 rounded-lg shadow-md cursor-pointer">
        <div className="flex   space-x-3 p-3 " onClick={openModal}>
          <Image
            src={shaaban} // Replace with actual user image
            alt="User"
            width={40}
            height={40}
            className="rounded-full"
          />
          <input
            type="text"
            placeholder="What's on your mind, Shaaban?"
            className="flex-1 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 cursor-pointer"
            readOnly
          />
        </div>
        <hr />
        <div className="flex justify-around ">
          <div className="flex space-x-2 items-center py-2  w-[30%]  justify-center hover:bg-gray-200 rounded-md">
            <FaVideo size={30} className="text-red-500" />
            <p className="text-gray-500">Live video</p>
          </div>
          <div className="flex space-x-2 items-center py-2  w-[30%]   justify-center hover:bg-gray-200 rounded-md">
            <IoMdPhotos size={30} className="text-green-500" />
            <p className="text-gray-500">Photo/video</p>
          </div>
          <div className="flex space-x-2 items-center  py-2 w-[35%]   justify-center hover:bg-gray-200 rounded-md">
            <FaRegSmile size={30} className="text-orange-400" />
            <p className="text-gray-500">Feeling/activity</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-950 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg w-full sm:max-w-md shadow-lg relative overflow-y-auto max-h-full">
            {/* Modal Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {" "}
                {editPostToModal ? "Edit Post" : "Create Post"}{" "}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-800"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <hr className="my-3" />

            {/* Post Form */}
            <form onSubmit={handleSubmit}>
              {/* User info and privacy selector */}
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src={shaaban}
                  alt="User"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <div className="font-semibold text-sm sm:text-base">
                    Shaaban
                  </div>
                  <select
                    value={privacy}
                    onChange={(e) => setPrivacy(e.target.value)}
                    className="mt-1 border dark:bg-gray-800 border-gray-300 rounded px-2 py-1 text-sm sm:text-base"
                  >
                    <option value="public">Public</option>
                    <option value="friends">Friends</option>
                    <option value="only-me">Only Me</option>
                  </select>
                </div>
              </div>

              {/* Text Input */}
              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full border border-gray-300  dark:bg-gray-700 rounded-lg p-3 mb-4 text-sm sm:text-base"
              />

              {/* Image Selector */}
              <div className="">
                <label className="flex items-center cursor-pointer text-blue-500">
                  <FaImage className="m-2" /> Add Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                {selectedImage && (
                  <div>
                    <span className="text-sm text-green-500  flex justify-center">
                      <Image
                        width={200}
                        height={200}
                        src={URL.createObjectURL(selectedImage)}
                        alt="image"
                      />
                    </span>
                    <p className="text-center">{selectedImage.name}</p>
                  </div>
                )}

                {/* {console.log(selectedImage && selectedImage?.name  +  selectedImage?.type)} */}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 text-sm sm:text-base"
              >
                Post
              </button>
            </form>
          </div>
        </div>
      )}

      <div className=" ">
        <PostCard
          setGetAllPosts={setGetAllPosts}
          getAllPosts={getAllPosts}
          handleEdit={handleEdit}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
    </div>
  );
};

export default CreatePost;
