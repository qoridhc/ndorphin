import React from "react";
import { useNavigate } from "react-router";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../../../css/home/MainRelayBook.css";
import { IoIosArrowForward } from "react-icons/io";

interface If {
  commentCount: number;
  content: string;
  fileUrls: string[];
  hit: number;
  id: number;
  subject: string;
  user: {
    mbti: string | null;
    nickName: string;
    profileImage: string | null;
    userId: number;
  };
}
interface Props {
  board: If;
}

const BestIfCard = ({ board }: Props) => {
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate(`/profile/${board.user.userId}`);
  };

  const goToDetail = () => {
      navigate(`/ifdetail/${board.id}`);
  }

  return (
    <div className="w-[40%] h-64 p-5 absolute z-10 bg-white border-solid border-[1px] border-[#565656] rounded-[10px] shadow-[2px_5px_8px_rgb(0,0,0,0.2)] grid grid-rows-[25%_auto_20%]" onClick={() => goToDetail()}>
      <div className="flex justify-between items-start">
        <div className="w-full flex items-center">
          <img
            onClick={handleUserClick}
            className="w-9 h-9 mr-3 rounded-[50%] cursor-pointer hover:brightness-90 transition duration-200 ease-in-out"
            src={board.user.profileImage == null ? "/assets/user/defaultProfile.png" : board.user.profileImage}
            alt=""
          />
          <div className="w-full flex justify-between">
            <p className="font-semibold">{board.user.nickName}</p>
            <IoIosArrowForward className="text-2xl" />
          </div>
        </div>
      </div>
      <p className="font-medium text-justify line-clamp-5 hover:underline hover:underline-offset-2">{board.content}</p>
      <div className="flex justify-end items-end">
        <p className="text-sm text-[#F07676] font-semibold">의견수 {board.commentCount}회</p>
      </div>
    </div>
  );
};

export default BestIfCard;
