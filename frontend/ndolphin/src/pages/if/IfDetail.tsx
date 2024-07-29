import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router";
import UserDocSettings from "../../components/common/MeatballsMenu";

const IfDetail = () => {
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

  const ifOpinionData = {
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
      <button className="py-4 flex" onClick={() => navigate("/iflist")}>
        <FaArrowLeftLong className="text-3xl" />
        <p className="px-3 text-xl font-bold">만약에 게시판</p>
      </button>

      <div className={`p-5 ${boxClass}`}>
        <p className="text-xl font-bold">Q : {ifVoteData.title}</p>
        <hr className="h-[1px] mt-2 mb-4 bg-[#9E9E9E]" />
        <p className="text-[#565656] font-semibold">{ifVoteData.content}</p>
      </div>

      <div className="mb-3 ">
        <img src={`/assets/if/${ifVoteData.imgUrl}.png`} alt="" />
      </div>

      {type === "vote" ? (
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
      ) : (
        <div>
          <div className="flex justify-end items-center">
            <img src="/assets/if/hotCommentIcon.png" alt="" />
            <p className="text-sm text-[#4B91F9] font-semibold text-right">의견 {ifOpinionData.joinCount}개</p>
          </div>

          <div className="grid gap-2">
            <div className="px-5 py-3 border border-[#565656] rounded-md">
              <div className="flex">
                <img className="w-11 h-11 mr-3 rounded-[50%]" src={`${userData.profileImgUrl}`} alt="" />
                <textarea className="w-full p-1 text-lg text-left outline-none resize-none	" placeholder="댓글을 작성해 주세요" />
              </div>
              <div className="flex justify-end">
                <button className="w-16 text-[#6C6C6C] font-semibold border-solid border-2 border-[#FFDE2F] rounded-md hover:text-white hover:bg-[#FFDE2F] duration-200">등록</button>
              </div>
            </div>

            {ifOpinionData.commentData.map((comment) => (
              <div className="px-5 py-3 border border-[#565656] rounded-md flex" key={comment.id}>
                <img className="w-9 h-9 mr-3 rounded-[50%]" src={`${comment.profileImgUrl}`} alt="" />

                <div className="w-full grid gap-2">
                  <div className="flex justify-between items-center ">
                    <p className="font-bold">{comment.user}</p>
                    <UserDocSettings />
                  </div>
                  <p className="text-[#565656] font-medium text-justify">{comment.content}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex">
                      <button>{userData.profileImgUrl[comment.id] ? <img className="w-4" src="/assets/like/likeCheckedIcon.png" alt="" /> : <img className="w-4" src="/assets/like/likeIcon.png" alt="" />}</button>
                      {comment.likeCount === 0 ? <></> : <p className="px-1 text-sm text-[#565656] font-semibold">{comment.likeCount}</p>}
                    </div>
                    <div>{comment.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IfDetail;
