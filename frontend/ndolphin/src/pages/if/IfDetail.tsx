import React, { ChangeEvent, useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router";
import SettingMenu from "../../components/common/SettingMenu";
import OpinionCard from "../../components/if/OpinionCard";

const IfDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [rowCount, setRowCount] = useState(0);

  const ifOpinionData = {
    date: "2023-10-30 09:22",
    title: "수업 중에 앞문으로 티라노사우르스가 들어온다면?",
    content: "만약에... 진짜 무서운 선생님이 수업 중이신데, 앞문으로 티라노 사우르가 들어와 어떻게 할거야?",
    imgUrl: "ifDetailSample",
    joinCount: 32,
    commentData: [
      {
        id: 1,
        profileImgUrl: "/assets/profile/profile1.png",
        user: "상상의 나무꾼",
        content: "이참에 티라노 사우르스랑 싸워고 평생 안주감 어때 이참에 영웅놀이 해보자",
        likeCount: 12,
        date: "2024-07-29 21:02",
      },
      {
        id: 2,
        profileImgUrl: "/assets/profile/profile2.png",
        user: "만약핑인데",
        content: "허허허..... 하루만 더 생각좀..",
        likeCount: 0,
        date: "2024-07-29 21:02",
      },
      {
        id: 3,
        profileImgUrl: "/assets/profile/profile3.png",
        user: "별이 빛나는 밤",
        content: "혹시 무기 있음? 있으면 내가 영웅할게",
        likeCount: 4,
        date: "2024-07-29 21:02",
      },
    ],
  };

  const opinionList = [
    {
      id: 1,
      profileImgUrl: "profile5",
      user: "코에촉촉",
      badget: "S",
      date: "2024-07-30 01:22",
      title: "눈 앞에 공룡이 나타나면?",
      joinCount: 12,
      comment: "티라노가 나 가지고 놀면 ㅠ? 6수 가자",
    },
    {
      id: 2,
      profileImgUrl: "profile3",
      user: "코에촉촉",
      badget: "N",
      date: "2024-07-30 01:22",
      title: "눈 앞에 공룡이 나타났는데 도망은 못가고 잡아먹지도 않는다 숨을 것이냐 싸울 것이냐? 어떻게 할 것이냐",
      joinCount: 0,
      comment: null,
    },
    {
      id: 3,
      profileImgUrl: "profile2",
      user: "코에촉촉",
      badget: "S",
      date: "2024-07-30 01:22",
      title: "눈 앞에 공룡이 나타나면?",
      joinCount: 12,
      comment: "티라노가 나 가지고 놀면 ㅠ? 6수 가자",
    },
  ];

  const userData = {
    profileImgUrl: "/assets/profile/profile4.png",
    user: "콘수수",
    badget: "N",
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

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    // const text = event.target.value.length;
    // setTextCount(text);
    const rows = event.target.value.split(/\r\n|\r|\n/).length;
    setRowCount(rows);
  };

  useEffect(() => {
    const targetTextarea = document.querySelector(`#target`) as HTMLTextAreaElement | null;
    if (targetTextarea) {
      targetTextarea.style.height = rowCount * 28 + "px";
    }
  }, [rowCount]);

  return (
    <div className="px-44 py-5">
      <button className="py-4 flex" onClick={() => navigate("/iflist")}>
        <FaArrowLeftLong className="text-3xl" />
        <p className="px-3 text-xl font-bold">만약에 목록</p>
      </button>

      <div className="grid grid-cols-[4fr_2fr] gap-20">
        <div>
          <div className="grid gap-3">
            <div className="flex items-center">
              <img className="w-9 h-9 mr-3 rounded-[50%]" src={`${userData.profileImgUrl}`} alt="" />
              <div>
                <div className="w-40 flex justify-between items-center">
                  <div className="flex items-center">
                    <p className="font-bold">{userData.user}</p>
                    {<img className="w-5 h-5 ml-1" src={`/assets/${userData.badget === "N" ? "nBadget.png" : "sBadget.png"}`} alt="badget" />}
                  </div>
                </div>
                <div className="">
                  <p className="text-xs text-left">{ifOpinionData.date}</p>
                </div>
              </div>
            </div>

            <p className="text-xl font-bold">Q : {ifOpinionData.title}</p>
            <hr className="h-[1px] mt-2 mb-4 bg-[#9E9E9E]" />
            <p className="text-[#565656] font-semibold">{ifOpinionData.content}</p>
          </div>

          <div className="py-5 flex justify-center">
            <img className="w-3/4 object-cover" src={`/assets/if/${ifOpinionData.imgUrl}.png`} alt="" />
          </div>

          <div className="pt-3 grid gap-2">
            <div className="flex justify-end items-center">
              <img src="/assets/if/hotCommentIcon.png" alt="" />
              <p className="text-sm text-[#4B91F9] font-semibold text-right">의견 {ifOpinionData.joinCount}개</p>
            </div>

            <div className="">
              <div className="p-5 border-y">
                <div className="flex">
                  <img className="w-11 h-11 mr-3 rounded-[50%]" src={`${userData.profileImgUrl}`} alt="" />
                  <textarea className="w-full min-h-10 text-xl outline-none resize-none" placeholder="댓글을 작성해 주세요" id="target" onChange={(e) => handleTextareaChange(e)} />
                </div>
                <div className="flex justify-end">
                  <button className="w-16 text-[#6C6C6C] font-semibold border-solid border-2 border-[#FFDE2F] rounded-md hover:text-white hover:bg-[#FFDE2F] duration-200">등록</button>
                </div>
              </div>

              {ifOpinionData.commentData.map((comment) => (
                <div className="p-5 border-b flex" key={comment.id}>
                  <img className="w-9 h-9 mr-3 rounded-[50%]" src={`${comment.profileImgUrl}`} alt="" />

                  <div className="w-full grid gap-2">
                    <div className="grid grid-cols-[6fr_1fr]">
                      <div className="flex flex-col justify-around">
                        <p className="font-bold">{comment.user}</p>
                        <p className="text-xs text-[#565656]">3일 전</p>
                      </div>
                      <SettingMenu />
                    </div>

                    <p className="text-[#565656] font-medium text-justify">{comment.content}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex">
                        <button>{userData.profileImgUrl[comment.id] ? <img className="w-4" src="/assets/like/likeCheckedIcon.png" alt="" /> : <img className="w-4" src="/assets/like/likeIcon.png" alt="" />}</button>
                        {comment.likeCount === 0 ? <></> : <p className="px-1 text-sm text-[#565656] font-semibold">{comment.likeCount}</p>}
                      </div>
                      <p className="text-sm text-[#565656] text-right">{comment.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          {opinionList.map((opinion) => (
            <div className="pb-5">
              <OpinionCard key={opinion.id} opinion={opinion} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IfDetail;
