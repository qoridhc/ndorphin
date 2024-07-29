import React from "react";
import { IoIosArrowForward } from "react-icons/io";

interface Props {
  opinion: {
    id: number;
    profileImgUrl: string;
    user: string;
    title: string;
    joinCount: number;
    comment: null | string;
  };
}

const OpinionCard = ({ opinion }: Props) => {
  return (
    <div className="h-80 p-5 border-solid border-[#565656] border-[1px] rounded-lg grid grid-rows-[15%_25%_60%] cursor-pointer">
      <div className="w-full flex items-center">
        <img className="w-9 h-9 mr-3 rounded-[50%]" src={`/assets/profile/${opinion.profileImgUrl}.png`} alt="" />
        <div className="w-full flex justify-between">
          <p className="font-bold">{opinion.user}</p>
          <button>
            <IoIosArrowForward className="text-2xl" />
          </button>
        </div>
      </div>

      <p className="my-[10px] text-justify line-clamp-2 hover:underline hover:underline-offset-2">{opinion.title}</p>

      <div className="flex flex-col justify-end">
        {opinion.joinCount === 0 ? <></> : <p className="py-1 text-sm font-semibold text-[#565656] text-right">의견 {opinion.joinCount}개</p>}
        <div className={`h-10 px-2 border-solid border-[1px] border-[#565656] rounded-md flex items-center`}>
          {opinion.joinCount === 0 ? <></> : <img src="/assets/if/hotCommentIcon.png" alt="" />}
          <p className={`text-xs font-semibold text-[#565656] line-clamp-1`}>{opinion.joinCount === 0 ? "가장 먼저 댓글을 달아보세요!" : opinion.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default OpinionCard;
