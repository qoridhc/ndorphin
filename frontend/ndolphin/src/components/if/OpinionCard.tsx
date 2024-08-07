import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router";

interface If {
  avatarUrl: string | null;
  bestComment: string | null;
  commentCount: number;
  createdAt: string;
  hit: number;
  id: number;
  nickName: string;
  subject: string;
  badget: "N";
}

interface Props {
  ifBoard: If;
}

const OpinionCard = ({ ifBoard }: Props) => {
  const navigate = useNavigate();
  const goToDetail = (boardId: number) => {
    navigate(`/ifdetail/${boardId}`);
  };

  return (
    <div className="h-72 p-5 border-solid border-[#565656] border-[1px] rounded-lg grid grid-rows-[1fr_1fr_3fr] gap-3 cursor-pointer duration-300 ease-out hover:-translate-y-3 hover:shadow-lg" onClick={() => goToDetail(ifBoard.id)}>
      <div className="flex justify-between">
        <div className="flex items-center">
          <img className="w-9 h-9 mr-3 rounded-[50%]" src={`${ifBoard.avatarUrl}`} alt="" />
          <div>
            <div className="w-40 flex justify-between items-center">
              <div className="flex items-center">
                <p className="font-bold">{ifBoard.nickName}</p>
                {<img className="w-5 h-5 ml-1" src={`/assets/${ifBoard.badget === "N" ? "nBadget.png" : "sBadget.png"}`} alt="badget" />}
              </div>
            </div>
            <div>
              <p className="text-xs text-left">{ifBoard.createdAt}</p>
            </div>
          </div>
        </div>

        {/* <IoIosArrowForward className="text-2xl" /> */}
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
