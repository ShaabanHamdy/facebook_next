"use client"
import React, { useState } from "react";
import axios from "axios";

type EditPostModalProps = {
  postId: string;
  initialContent: string;
  initialImage?: string;
  onClose: () => void;
};

const EditPostModal: React.FC<EditPostModalProps> = ({
  postId,
  initialContent,
  initialImage,
  onClose,
}) => {
  const [content, setContent] = useState(initialContent);
  const [image, setImage] = useState<File | null>(null);

  const handleEdit = async () => {
    const formData = new FormData();
    formData.append("postContent", content);
    if (image) formData.append("postImage", image);

    await axios.put(`/api/posts/${postId}`, formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg w-96">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 dark:text-gray-400"
        >
          X
        </button>
        <h2 className="text-lg font-semibold">Edit Post</h2>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 mt-4 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="w-full mt-4"
        />
        <button
          onClick={handleEdit}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditPostModal;
