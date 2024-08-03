import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router";
import SettingMenu from "../../components/common/SettingMenu";

const BalanceDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get("type");
  const boxClass = "mb-3 border border-[#9E9E9E]";
  const boxContentClass = "p-5";
  const inputClass = "w-full p-1 text-left border border-[#9E9E9E] rounded-sm outline-none";
  const titleClass = "text-lg font-bold";
  const hrClass = "h-[1px] mt-1 mb-4 bg-[#9E9E9E]";
  const voteColors = ["border-[#E4AE3A]", "border-[#4298B4]", "border-[#88619A]", "border-[#33A474]"];

  const ifVoteData = {
    title: "수업 중에 앞문으로 티라노사우르스가 들어온다면?",
    content: "만약에... 진짜 무서운 선생님이 수업 중이신데, 앞문으로 티라노 사우르가 들어와 어떻게 할거야?",
    imgUrl: "ifDetailSample",
    joinCount: 301,
    categoryList: [
      {
        id: 1,
        content: "선생님이고 뭐고 그냥 뛰어서 나간다",
      },
      {
        id: 2,
        content: "티라노 사우르스보다 선생님이 더 무섭다. 쌤이 하라는대로 한다. 화이팅!",
      },
      {
        id: 3,
        content: "이참에 티라노 사우르스랑 싸워고 평생 안주감",
      },
      {
        id: 4,
        content: "그냥 티라노사우르스랑 친해질래",
      },
    ],
  };

  const userData = {
    profileImgUrl: "/assets/profile/profile4.png",
    isLikedList: [
      {
        id: 1,
        isLiked: true,
      },
      {
        id: 2,
        isLiked: true,
      },
      {
        id: 3,
        isLiked: false,
      },
    ],
  };

  return (
    <div className="px-[30%] py-5">
      <button className="py-4 flex" onClick={() => navigate("/balancelist")}>
        <FaArrowLeftLong className="text-3xl" />
        <p className="px-3 text-xl font-bold">밸런스게임 목록</p>
      </button>

      <div className={`p-5 ${boxClass}`}>
        <p className="text-xl font-bold">Q : {ifVoteData.title}</p>
        <hr className="h-[1px] mt-2 mb-4 bg-[#9E9E9E]" />
        <p className="text-[#565656] font-semibold">{ifVoteData.content}</p>
      </div>

      <div className="mb-3 ">
        <img src={`/assets/if/${ifVoteData.imgUrl}.png`} alt="" />
      </div>

      <div className="grid gap-2">
        <div className="flex justify-end items-center">
          <img src="/assets/if/hotCommentIcon.png" alt="" />
          <p className="text-sm text-[#F07676] font-semibold text-right">투표수 {ifVoteData.joinCount}회</p>
        </div>
        {ifVoteData.categoryList.map((category) => (
          <div className={`px-5 py-2 border-solid border-2 ${voteColors[category.id - 1]} rounded-[30px] flex justify-center items-center`} key={category.id}>
            <p className="font-semibold text-[#565656]">{category.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BalanceDetail;
