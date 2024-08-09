import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router";
import SettingMenu from "../../components/if/CommentSettingMenu";
import BalanceCard from "../../components/balance/BalanceCard";

const BalanceDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get("type");
  const boxContentClass = "p-5";
  const inputClass = "w-full p-1 text-left border border-[#9E9E9E] rounded-sm outline-none";
  const titleClass = "text-lg font-bold";
  const hrClass = "h-[1px] mt-1 mb-4 bg-[#9E9E9E]";
  const voteColors = ["border-[#E4AE3A]", "border-[#4298B4]", "border-[#88619A]", "border-[#33A474]"];

  const ifVoteData = {
    date: "2023-10-30 09:22",
    title: "수업 중에 앞문으로 티라노사우르스가 들어온다면?",
    content: "만약에... 진짜 무서운 선생님이 수업 중이신데, 앞문으로 티라노 사우르가 들어와 어떻게 할거야? 진짜 만약에~~ 어떻게 할거야? 나 너무 궁금해 얘들아 ? 진짜 만약에~~ 어떻게 할거야? 나 너무 궁 ? 진짜 만약에~~ 어떻게 할거야? 나 너무 궁",
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

  const balanceList = [
    {
      id: 1,
      profileImgUrl: "profile1",
      user: "코에촉촉",
      badget: "S",
      title: "눈 앞에 공룡이 나타나면?",
      joinCount: 12,
      date: "2024-07-30 01:22",
      category: [
        {
          id: 1,
          content: "Enter, 무게 1kg에 매일이 뷔폐 + 휴가비 Enter, 무게 1kg에 매일이 뷔폐 + 휴가비",
        },
        {
          id: 2,
          content: "Spacebar, 주 3일",
        },
        {
          id: 3,
          content: "enter, 연봉 1억",
        },
        {
          id: 4,
          content: "backspace, 대저택 제공",
        },
      ],
    },
    {
      id: 2,
      profileImgUrl: "profile1",
      user: "코에촉촉",
      badget: "N",
      title: "눈 앞에 공룡이 나타나면?",
      joinCount: 12,
      date: "2024-07-22 01:22",
      category: [
        {
          id: 1,
          content: "Enter, 무게 1kg Enter, 무게 1kg Enter, 무게 1kg Enter, 무게 1kg Enter, 무게 1kg Enter, 무게 1kg",
        },
        {
          id: 2,
          content: "Spacebar, 주 3일 Enter, 무게 1kg Enter, 무게 1kg",
        },
      ],
    },
    {
      id: 3,
      profileImgUrl: "profile1",
      user: "코에촉촉",
      badget: "S",
      title: "눈 앞에 공룡이 나타나면?",
      joinCount: 12,
      date: "2024-06-20 01:22",
      category: [
        {
          id: 1,
          content: "Enter, 무게 1kg",
        },
        {
          id: 2,
          content: "Spacebar, 주 3일",
        },
        {
          id: 3,
          content: "enter, 연봉 1억",
        },
        {
          id: 4,
          content: "backspace, 대저택 제공",
        },
      ],
    },
  ];

  const userData = {
    profileImgUrl: "profile4",
    user: "콘수수",
    badget: "N",
  };

  return (
    <div className="px-44 py-5">
      <button className="py-4 flex" onClick={() => navigate("/balancelist")}>
        <FaArrowLeftLong className="text-3xl" />
        <p className="px-3 text-xl font-bold">밸런스게임 목록</p>
      </button>

      <div className="grid grid-cols-[4fr_2fr] gap-20">
        <div>
          <div className="grid gap-3">
            <div className="flex items-center">
              <img className="w-9 h-9 mr-3 rounded-[50%]" src={`/assets/profile/${userData.profileImgUrl}.png`} alt="" />
              <div>
                <div className="w-40 flex justify-between items-center">
                  <div className="flex items-center">
                    <p className="font-bold">{userData.user}</p>
                    {<img className="w-5 h-5 ml-1" src={`/assets/${userData.badget === "N" ? "nBadget.png" : "sBadget.png"}`} alt="badget" />}
                  </div>
                </div>
                <div className="">
                  <p className="text-xs text-left">{ifVoteData.date}</p>
                </div>
              </div>
            </div>

            <p className="text-xl font-bold">Q : {ifVoteData.title}</p>
            <hr className="h-[1px] bg-[#9E9E9E]" />
            <p className="text-[#565656] font-semibold">{ifVoteData.content}</p>
          </div>

          <div className="pt-3 grid gap-2">
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

          <div className="py-5 flex justify-center">
            <img className="w-3/4 object-cover" src={`/assets/if/${ifVoteData.imgUrl}.png`} alt="" />
          </div>
        </div>

        {/* <div className="grid grid-rows-3 gap-5">
          {balanceList.map((balance) => (
            <BalanceCard key={balance.id} balance={balance} />
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default BalanceDetail;
