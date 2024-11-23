"use client";
import React, { useEffect, useState } from "react";
import {
  FaEdit,
  FaEllipsisH,
  FaRegComment,
  FaShare,
  FaTrash,
} from "react-icons/fa";
// import { FiThumbsUp } from "react-icons/fi";
// import EditPostModal from "./EditPostModal";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import { BeatLoader } from "react-spinners";
// import photo from "../../images/shaaban.jpg";
import { ArrowRight } from "lucide-react";
import ReactionPicker from "./ReactionPicker";
type PostProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleEdit: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAllPosts: any;
  setGetAllPosts: React.Dispatch<React.SetStateAction<never[]>>;
};
interface ErrorResponse {
  message: string;
}

const PostCard: React.FC<PostProps> = ({
  setIsModalOpen,
  handleEdit,
  getAllPosts,
  setGetAllPosts,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  //   const [showModal, setShowModal] = useState(false);
  //   const [reaction, setReaction] = useState(userReaction || null);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<string[]>([]);
  const [noPosts, setNoPosts] = useState("");

  const handleReaction = async (type: string) => {
    // setReaction(type);
    await axios.post(`/api/posts/${"id"}/react`, { reaction: type });
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/post/getAllPosts",
          {
            headers: { auth: localStorage.getItem("token") },
          }
        );
        if (data.message === "success") {
          setGetAllPosts(data?.getAllPosts);
        }
      } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;

        if (axiosError.response) {
          if (axiosError.response.data.message === "no posts available") {
            setNoPosts("no posts available");
          }
          //   setBackError(axiosError.response.data.message);
          console.log(axiosError.response.data.message); // TypeScript will now recognize `message`
        } else {
          // console.log("An unknown error occurred.");
        }
      }
    };
    getPosts();
  }, [setGetAllPosts, getAllPosts]);

  async function handleCommentSubmit() {
    const newComment = commentText.trim();
    if (!newComment) return;
    setComments((prev) => [...prev, newComment]);
    setCommentText("");
    await axios.post(`/api/posts/${"id"}/comment`, { comment: newComment });
  }

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      await axios.delete(`/api/posts/${"id"}`);
      alert("Post deleted successfully");
    }
  };

  useEffect(() => {
    // console.log(getAllPosts.map((e)=>e));
  }, [getAllPosts]);

  return (
    <>
      {getAllPosts.length > 0 ? (
        // =====================================================================================================================================
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getAllPosts?.map((post: any) => (
          <div key={post?._id} className="flex justify-center">
            <div className="bg-white lg:w-[45%] md:w-[60%]  w-[90%] dark:bg-gray-800 shadow-lg rounded-lg p-5 my-5">
              <div className="flex items-center justify-between">
                {/* User Info */}
                <div className="flex  items-center space-x-3">
                  <Image
                    width={100}
                    height={100}
                    src={
                      post?.userId?.profileImage?.find(
                        (x: unknown) => x || null
                      ) || null
                    }
                    alt={"userName"}
                    className="w-12 h-12 dark:bg-gray-200 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{` ${post?.userId?.firstName} ${post?.userId?.lastName}`}</p>
                    <p className="text-gray-500 text-sm">
                      {"publishTime"} time
                    </p>
                  </div>
                </div>
                {/* Options */}
                <div className="relative">
                  <button
                    className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
                    onClick={() => setShowOptions((prev) => !prev)}
                  >
                    <FaEllipsisH />
                  </button>
                  {showOptions && (
                    <div className="absolute right-0 mt-2 bg-white dark:bg-gray-700 shadow-lg rounded-md w-40">
                      <button
                        className="flex items-center px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-600"
                        onClick={() => {
                          setIsModalOpen(true);
                          handleEdit();
                        }}
                      >
                        <FaEdit className="mr-2" />
                        Edit
                      </button>
                      <button
                        className="flex items-center px-4 py-2 w-full text-red-600 hover:bg-red-50"
                        onClick={handleDelete}
                      >
                        <FaTrash className="mr-2" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {/* Post Content */}
              <div className="mt-4">
                <p>{post?.postContent}</p>
                <div className="  p-4">
                  {post?.postImage?.map((x: string, i: number) => (
                    <Image
                      key={i}
                      width={400}
                      height={300}
                      src={`${x}`}
                      alt="Post"
                      className="rounded-lg  m-auto "
                    />
                  ))}
                </div>
              </div>
              <hr />
              {/* Reactions */}
              <div className="flex justify-center my-2">
                <div className="flex justify-center  w-[30%] rounded-md hover:bg-gray-200 items-center space-x-2">
                  <ReactionPicker
                    currentReaction={"reaction"}
                    onSelect={handleReaction}
                  />
                </div>
                <button className="flex justify-center  w-[30%] rounded-md hover:bg-gray-200 items-center space-x-2">
                  <FaRegComment />
                  <span>Comment</span>
                </button>
                <button className="flex justify-center  w-[30%] rounded-md hover:bg-gray-200 items-center space-x-2">
                  <FaShare />
                  <span>Share</span>
                </button>
              </div>
              <hr />
              {/* Comments */}
              <div className="mt-2 relative">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="comment as Username"
                  className="w-full bg-gray-200  p-5 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                />
                <button
                  onClick={handleCommentSubmit}
                  className=" absolute   right-1 top-5 bg-blue-500 text-white rounded-lg"
                >
                  <ArrowRight />
                </button>
                <div className="mt-4 space-y-2">
                  {comments.map((comment, idx) => (
                    <p
                      key={idx}
                      className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg"
                    >
                      {comment}
                    </p>
                  ))}
                </div>
              </div>
              {/* Edit Modal
      {showModal && (
        <EditPostModal
          postId={id}
          initialContent={content}
          initialImage={image}
          onClose={() => setShowModal(false)}
        />
      )} */}
            </div>
          </div>
        ))
      ) : // =====================================================================================================================================
      noPosts === "no posts available" ? (
        <div className="mx-60"> no posts available </div>
      ) : (
        <div className=" flex justify-center">
          <BeatLoader color="#00ffe5" margin={3} size={25} />
        </div>
      )}
    </>
  );
};

export default PostCard;
