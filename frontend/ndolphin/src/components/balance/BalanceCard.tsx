import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router";

interface Props {
  balance: {
    id: number;
    profileImgUrl: string;
    user: string;
    badget: string;
    title: string;
    joinCount: number;
    date: string;
    category: {
      id: number;
      content: string;
    }[];
  };
}

const BalanceCard = ({ balance }: Props) => {
  const navigate = useNavigate();
  const voteGrids = ["grid-rows-2", "grid-rows-3", "grid-rows-4"];
  const voteColors = ["border-[#E4AE3A]", "border-[#4298B4]", "border-[#88619A]", "border-[#33A474]"];
  const goToDetail = (id: number, type: string) => {
    navigate(`/ifdetail/${id}?type=${type}`);
  };

  return (
    <div className="h-80 p-5 border-solid border-[#565656] border-[1px] rounded-lg grid grid-rows-[15%_25%_10%_50%] cursor-pointer" onClick={() => goToDetail(balance.id, "vote")}>
      <div className="w-full flex items-center">
        <img className="w-9 h-9 mr-3 rounded-[50%]" src={`/assets/profile/${balance.profileImgUrl}.png`} alt="" />
        <div>
          <div className="w-40 flex justify-between items-center">
            <div className="flex items-center">
              <p className="font-bold">{balance.user}</p>
              {<img className="w-5 h-5 ml-1" src={`/assets/${balance.badget === "N" ? "nBadget.png" : "sBadget.png"}`} alt="badget" />}
            </div>
            <IoIosArrowForward className="text-2xl" />
          </div>
          <div className="">
            <p className="text-xs text-left">{balance.date}</p>
          </div>
        </div>
      </div>
      <p className="my-[10px] text-justify line-clamp-2 hover:underline hover:underline-offset-2">{balance.title}</p>
      <p className="py-1 text-sm font-semibold text-[#565656] text-right">투표수 {balance.joinCount}회</p>

      <div className={`grid ${voteGrids[balance.category.length - 2]} gap-1`}>
        {balance.category.map((item) => (
          <div className={`border-solid border-2 ${voteColors[item.id - 1]} rounded-[10px] flex justify-center items-center`}>
            <p className="px-3 text-xs font-semibold text-[#565656] text-center line-clamp-1" key={item.id}>
              {item.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BalanceCard;
