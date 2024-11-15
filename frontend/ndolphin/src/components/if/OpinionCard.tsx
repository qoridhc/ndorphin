import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router";
import TimeDifference from "../common/TimeDifference";

interface If {
  id: number;
  user: {
    userId: number;
    profileImage: string | null;
    mbti: string | null;
    nickName: string;
  };
  content: string;
  subject: string;
  fileNames: string[];
  fileUrls: string[];
  hit: number;
  createdAt: string;
  updatedAt: string | null;
  avatarUrl: string | null;
  bestComment: string | null;
  commentCount: number;
}

interface Props {
  ifBoard: If;
}

const OpinionCard = ({ ifBoard }: Props) => {
  const navigate = useNavigate();

  const goToDetail = (boardId: number) => {
    navigate(`/ifdetail/${boardId}`);
    window.scrollTo(0, 0);
  };

  const handleUserClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    navigate(`/profile/${ifBoard.user.userId}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="h-72 p-5 border-solid border-[#565656] border-[1px] rounded-lg grid grid-rows-[1fr_1fr_3fr] gap-3 cursor-pointer duration-300 ease-out hover:-translate-y-3 hover:shadow-lg" onClick={() => goToDetail(ifBoard.id)}>
      <div className="flex justify-between">
        <div className="flex items-center">
          <img
            onClick={handleUserClick}
            className="w-9 h-9 mr-3 border rounded-[50%] cursor-pointer hover:brightness-90 transition duration-200 ease-in-out"
            src={ifBoard.user.profileImage === null ? "/assets/user/defaultProfile.png" : ifBoard.user.profileImage}
            alt=""
          />
          <div>
            <div className="w-40 flex justify-between items-center">
              <div className="flex items-center">
                <p className="font-bold">{ifBoard.user.nickName}</p>
                {<img className="w-5 h-5 ml-1" src={`/assets/${ifBoard.user.mbti === null ? "noBadget.png" : ifBoard.user.mbti === "N" ? "nBadget.png" : "sBadget.png"}`} alt="badget" />}
              </div>
            </div>
            <div>
              {/* <p className="text-xs text-left">{ifBoard.createdAt}</p> */}
              <TimeDifference timestamp={new Date(ifBoard.createdAt)} />
            </div>
          </div>
        </div>
      </div>
      <p className="text-justify line-clamp-2">{ifBoard.subject}</p>

      <div className="flex flex-col justify-end">
        {ifBoard.commentCount === 0 ? <></> : <p className="py-3 text-sm font-semibold text-[#565656] text-right">{ifBoard.commentCount}명 참여</p>}
        <div className={`h-10 px-2 border-solid border-[1px] border-[#565656] rounded-md flex items-center`}>
          {ifBoard.commentCount === 0 ? <></> : <img src="/assets/if/hotCommentIcon.png" alt="" />}
          <p className={`text-xs font-semibold text-[#565656] line-clamp-1`}>{ifBoard.commentCount === 0 ? "가장 먼저 댓글을 달아보세요!" : ifBoard.bestComment}</p>
        </div>
      </div>
    </div>
  );
};

export default OpinionCard;
