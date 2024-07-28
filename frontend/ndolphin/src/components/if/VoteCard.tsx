import React from "react";
import { IoIosArrowForward } from "react-icons/io";

interface Props {
  vote: {
    id: number;
    profileImgUrl: string;
    user: string;
    title: string;
    joinCount: number;
    category: {
      id: number;
      content: string;
    }[];
  };
}

const VoteCard = ({ vote }: Props) => {
  const voteGrids = ["grid-rows-2", "grid-rows-3", "grid-rows-4"];
  const voteColors = ["border-[#E4AE3A]", "border-[#4298B4]", "border-[#88619A]", "border-[#33A474]"];

  return (
    <div className="h-80 p-5 border-solid border-[#565656] border-[1px] rounded-lg grid grid-rows-[15%_25%_10%_50%]">
      <div className="w-full flex items-center">
        <img className="w-9 h-9 mr-3 rounded-[50%]" src={`/assets/profile/${vote.profileImgUrl}.png`} alt="" />
        <div className="w-full flex justify-between">
          <p className="font-bold">{vote.user}</p>
          <IoIosArrowForward className="text-2xl" />
        </div>
      </div>
      <p className="my-3 text-justify line-clamp-2  ">{vote.title}</p>
      <p className="py-1 text-sm font-semibold text-[#565656] text-right">투표수 {vote.joinCount}회</p>

      <div className={`grid ${voteGrids[vote.category.length - 2]} gap-1`}>
        {vote.category.map((item) => (
          <div className={`border-solid border-2 ${voteColors[item.id - 1]} rounded-[10px] flex justify-center items-center`}>
            <p className="px-3 text-sm text-[#565656] text-center line-clamp-1" key={item.id}>
              {item.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoteCard;
