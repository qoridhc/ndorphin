import React, { useState, useEffect } from "react";

interface UserInfo {
  id: number;
  nickName: string;
  profileImage: string;
  isFollowing: boolean;
}

interface FollowListItemProps {
  follow: UserInfo;
  onFollowToggle: (id: number) => void;
  onClose: () => void;
}

const FollowListItem: React.FC<FollowListItemProps> = ({ follow, onFollowToggle, onClose }) => {
  const [check, setCheck] = useState<number | null>(null);

  
  useEffect(() => {
    const myUserId = Number(localStorage.getItem('userId'));
    if (myUserId) {
      setCheck(myUserId);
    }
  })

  const shiftProfile = () => {
    window.location.href = `/profile/${follow.id}`
    onClose();
  }

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    await onFollowToggle(follow.id);
  };

  const renderButton = check !== follow.id;

  return (
    <div className="w-full px-8 py-2 flex items-center relative" onClick={shiftProfile}>
      <img className="w-10 h-10 rounded-full" src={follow.profileImage || "assets/user/profile.png"} alt="프로필 이미지" />
      <span className="ms-5 me-8 font-semibold">{follow.nickName}</span>
      {renderButton && (
        <button
          className={`ms-14 absolute right-16 text-xs w-auto h-auto p-2 border-none rounded-lg shadow-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 ${
            follow.isFollowing ? "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-300" : "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300"
          }`}
          onClick={handleClick}>
          {follow.isFollowing ? "팔로잉" : "팔로우"}
        </button>
      )}
    </div>
  );
};

export default FollowListItem;
