import React, { useState, useEffect } from "react";
import userApi from "../../api/userApi";

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
  const [mbti, setMbti] = useState<string | null>(null);

  
  useEffect(() => {
    const myUserId = Number(localStorage.getItem('userId'));
    if (myUserId) {
      setCheck(myUserId);
    }

    userApi.getUserInfo(follow.id.toString())
      .then((response) => {
        setMbti(response.data.data.mbti);
      })
      .catch((error) => {
      console.error('팔로우 목록 유저 정보 불러오기 실패: ', error)
    })
  })

  const shiftProfile = () => {
    window.location.href = `/profile/${follow.id}`
    onClose();
  }

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    await onFollowToggle(follow.id);
  };

  const renderMbti = () => {
    if (!mbti) {
      return "/assets/noBadget.png";
    } else if (mbti === "N") {
      return "/assets/nBadget.png";
    } else if (mbti === "S") {
      return "/assets/sBadget.png";
    }
    return "/assets/noBadget.png";
  };

  const renderButton = check !== follow.id;

  return (
    <div className="w-full px-8 py-2 flex items-center relative" onClick={shiftProfile}>
      <img className="w-10 h-10 rounded-full" src={follow.profileImage || "assets/user/profile.png"} alt="프로필 이미지" />
      <span className="ms-5 font-semibold">{follow.nickName}</span>
      <img className="w-7 h-7 ms-1" src={renderMbti()} alt="badge" />
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
