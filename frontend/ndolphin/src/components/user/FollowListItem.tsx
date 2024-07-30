import React, { useState } from "react";

const FollowListItem = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleClick = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="w-full px-8 py-2 flex items-center">
      <img className="w-10 h-10" src="assets/user/profile.png" alt="프로필 이미지" />
      <span className="ms-5 me-8 font-semibold">예시 닉네임</span>
      <button className={`ms-14 text-xs w-auto h-auto p-2 border-none rounded-lg shadow-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 ${isFollowing ? "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-300" : "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300"}`} onClick={handleClick}>
        {isFollowing ? "팔로잉" : "팔로우"}
      </button>
    </div>
  );
};

export default FollowListItem;
