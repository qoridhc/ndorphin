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
  const voteGrids = ["grid-cols-2", "grid-cols-3", "grid-rows-2 grid-cols-2"];
  const voteColors = ["border-[#E4AE3A]", "border-[#4298B4]", "border-[#88619A]", "border-[#33A474]"];
  const voteLineClamp = ["line-clamp-2", "line-clamp-2", "line-clamp-1"];
  const goToDetail = (id: number) => {
    navigate(`/balancedetail/${id}`);
  };

  return (
    <div className="p-5 border-solid border-[#565656] border-[1px] rounded-lg grid gap-3 cursor-pointer duration-300 ease-out hover:-translate-y-3 hover:shadow-lg" onClick={() => goToDetail(balance.id)}>
      <img className="aspect-[5/3] object-cover" src="/assets/relay/relayStartSample3.png" alt="" />

      <div className="grid gap-1">
        <div className="flex items-center">
          <img className="w-5 h-5 mr-2 rounded-[50%]" src={`/assets/profile/${balance.profileImgUrl}.png`} alt="" />
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <p className="text-sm font-medium">{balance.user}</p>
              {<img className="w-5 h-5 ml-1" src={`/assets/${balance.badget === "N" ? "nBadget.png" : "sBadget.png"}`} alt="badget" />}
            </div>
          </div>
        </div>

        <p className="text-xl font-semibold text-justify line-clamp-2">{balance.title}</p>
      </div>

      <div className="grid gap-1">
        <p className="text-sm text-[#565656] text-right">{balance.joinCount}명 참여</p>
        <button className="w-full py-2 text-md font-medium border-2 border-amber-300 rounded-md">참여하기</button>
      </div>
    </div>
  );
};

export default BalanceCard;
