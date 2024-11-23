"use client"
import React, { useState } from "react";
import { FiThumbsUp } from "react-icons/fi";
import { FaHeart, FaLaugh, FaSadTear, FaAngry } from "react-icons/fa";

type ReactionPickerProps = {
  currentReaction?: string | null;
  onSelect: (reaction: string) => void;
};

const ReactionPicker: React.FC<ReactionPickerProps> = ({
  currentReaction,
  onSelect,
}) => {
  const [showReactions, setShowReactions] = useState(false);

  const reactions = [
    { type: "like", icon: <FiThumbsUp className="text-blue-500" /> },
    { type: "love", icon: <FaHeart className="text-red-500" /> },
    { type: "haha", icon: <FaLaugh className="text-yellow-500" /> },
    { type: "sad", icon: <FaSadTear className="text-blue-400" /> },
    { type: "angry", icon: <FaAngry className="text-red-600" /> },
  ];

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowReactions(true)}
      onMouseLeave={() => setShowReactions(false)}
    >
      {/* Current Reaction */}
      <button
        className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
        onClick={() => onSelect(currentReaction || "like")}
      >
        {currentReaction
          ? reactions.find((r) => r.type === currentReaction)?.icon
          : <FiThumbsUp />}
        <span>Like</span>
      </button>

      {/* Reaction Options */}
      {showReactions && (
        <div className="absolute top-[-50px] left-0 flex space-x-2 p-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
          {reactions.map((reaction) => (
            <button
              key={reaction.type}
              onClick={() => onSelect(reaction.type)}
              className="p-2 hover:scale-110 transition-transform"
            >
              {reaction.icon}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReactionPicker;
