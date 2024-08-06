import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router";

interface Props {
  opinion: {
    id: number;
    profileImgUrl: string;
    user: string;
    badget: string;
    date: string;
    title: string;
    joinCount: number;
    comment: null | string;
  };
}

const OpinionCard = ({ opinion }: Props) => {
  const navigate = useNavigate();
  const goToDetail = (boardId: number) => {
    navigate(`/ifdetail/${boardId}`);
  };

  return (
    <div className="h-72 p-5 border-solid border-[#565656] border-[1px] rounded-lg grid grid-rows-[1fr_1fr_3fr] gap-3 cursor-pointer duration-300 ease-out hover:-translate-y-3 hover:shadow-lg" onClick={() => goToDetail(opinion.id)}>
      <div className="flex justify-between">
        <div className="flex items-center">
          <img className="w-9 h-9 mr-3 rounded-[50%]" src={`/assets/profile/${opinion.profileImgUrl}.png`} alt="" />
          <div>
            <div className="w-40 flex justify-between items-center">
              <div className="flex items-center">
                <p className="font-bold">{opinion.user}</p>
                {<img className="w-5 h-5 ml-1" src={`/assets/${opinion.badget === "N" ? "nBadget.png" : "sBadget.png"}`} alt="badget" />}
              </div>
            </div>
            <div>
              <p className="text-xs text-left">{opinion.date}</p>
            </div>
          </div>
        </div>

        <IoIosArrowForward className="text-2xl" />
      </div>
      <p className="text-justify line-clamp-2">{opinion.title}</p>

      <div className="flex flex-col justify-end">
        {opinion.joinCount === 0 ? <></> : <p className="py-3 text-sm font-semibold text-[#565656] text-right">의견 {opinion.joinCount}개</p>}
        <div className={`h-10 px-2 border-solid border-[1px] border-[#565656] rounded-md flex items-center`}>
          {opinion.joinCount === 0 ? <></> : <img src="/assets/if/hotCommentIcon.png" alt="" />}
          <p className={`text-xs font-semibold text-[#565656] line-clamp-1`}>{opinion.joinCount === 0 ? "가장 먼저 댓글을 달아보세요!" : opinion.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default OpinionCard;
