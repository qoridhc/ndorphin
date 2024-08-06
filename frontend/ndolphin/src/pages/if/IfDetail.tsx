import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router";
import SettingMenu from "../../components/common/SettingMenu";
import OpinionCard from "../../components/if/OpinionCard";
import ifApi from "../../api/ifApi";
import boardApi from "../../api/boardApi";
import commentApi from "../../api/commentApi";

interface IfBoard {
  avatarUrl: string;
  commentCount: number | null;
  commentResponseDtos: {
    avatarUrl: string | null;
    commentId: number;
    content: string;
    createdAt: string | null;
    likeCnt: number;
    likedByUser: false;
    nickName: string;
  }[];
  content: string;
  contentFileUrl: string | null;
  createdAt: string;
  hit: number;
  nickName: string | null;
  subject: string;
  userId: 2;
}

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

const IfDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [textCount, setTextCount] = useState(0);
  const [ifBoardData, setIfBoardData] = useState<IfBoard | null>(null);
  const [recommendationList, setRecommendationList] = useState<If[] | null>(null);

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

  const readBoardData = async (boardId: string) => {
    try {
      const response = await ifApi.read(boardId);
      if (response.status === 200) {
        console.log(response.data.data);
        setIfBoardData(response.data.data);
      }
    } catch (error) {
      console.error("ifApi read : ", error);
    }
  };

  const getRecommendationList = async () => {
    try {
      const response = await boardApi.list("OPINION_BOARD");
      if (response.status === 200) {
        // console.log(response.data.data);
        setRecommendationList(response.data.data);
      }
    } catch (error) {
      console.error("boardApi list : ", error);
    }
  };

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value.length;
    setTextCount(text);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  };

  const handleComment = async () => {
    if (params.boardId !== undefined && textareaRef.current) {
      const formData = new FormData();

      formData.append(
        "request",
        new Blob(
          [
            JSON.stringify({
              content: textareaRef.current.value,
            }),
          ],
          { type: "application/json" }
        )
      );

      try {
        const response = await commentApi.create(params.boardId, formData);
        if (response.status === 200) {
          readBoardData(params.boardId);
          textareaRef.current.value = "";
        }
      } catch (error) {
        console.log("commentApi create : ", error);
      }
    }
  };

  useEffect(() => {
    if (params.boardId !== undefined) {
      readBoardData(params.boardId);
      getRecommendationList();
    }
  }, [params.boardId]);

  return (
    <>
      {ifBoardData && recommendationList ? (
        <div className="px-44 py-5">
          <button className="py-4 flex" onClick={() => navigate("/iflist")}>
            <FaArrowLeftLong className="text-3xl" />
            <p className="px-3 text-xl font-bold">만약에 목록</p>
          </button>

          <div className="grid grid-cols-[4fr_2fr] gap-20">
            <div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <img className="w-9 h-9 mr-3 rounded-[50%]" src={`${ifBoardData.avatarUrl}`} alt="" />
                  <div>
                    <div className="w-40 flex justify-between items-center">
                      <div className="flex items-center">
                        <p className="font-bold">{ifBoardData.nickName}</p>
                        {<img className="w-5 h-5 ml-1" src={`/assets/${userData.badget === "N" ? "nBadget.png" : "sBadget.png"}`} alt="badget" />}
                      </div>
                    </div>
                    <div className="">
                      <p className="text-xs text-left">{ifBoardData.createdAt}</p>
                    </div>
                  </div>
                </div>

                <p className="text-xl font-bold">Q : {ifBoardData.subject}</p>
                <hr className="h-[1px] mt-2 mb-4 bg-[#9E9E9E]" />
                <p className="text-[#565656] font-semibold">{ifBoardData.content}</p>
              </div>

              <div className="py-5 flex justify-center">
                <img className="w-3/4 object-cover" src={`${ifBoardData.contentFileUrl}`} alt="" />
              </div>

              <div className="pt-3 grid gap-2">
                <div className="flex justify-end items-center">
                  <img src="/assets/if/hotCommentIcon.png" alt="" />
                  <p className="text-sm text-[#4B91F9] font-semibold text-right">의견 {ifBoardData.commentCount}개</p>
                </div>

                <div>
                  <div className="p-5 border-y">
                    <div className="flex">
                      <img className="w-11 h-11 mr-3 rounded-[50%]" src={`${userData.profileImgUrl}`} alt="" />
                      <textarea className="w-full min-h-10 text-xl outline-none resize-none" placeholder="댓글을 작성해 주세요" id="target" ref={textareaRef} onChange={(e) => handleTextareaChange(e)} />
                    </div>
                    <div className="flex justify-end">
                      <button className={`px-7 py-1 shadow-md rounded-3xl font-bold bg-amber-300 text-white ${textCount === 0 ? "opacity-50" : ""}`} disabled={textCount === 0} onClick={() => handleComment()}>
                        등록
                      </button>
                    </div>
                  </div>

                  {ifBoardData.commentResponseDtos.map((comment) => (
                    <div className="p-5 border-b flex" key={comment.commentId}>
                      <img className="w-9 h-9 mr-3 rounded-[50%]" src={`${comment.avatarUrl}`} alt="" />

                      <div className="w-full grid gap-2">
                        <div className="grid grid-cols-[6fr_1fr]">
                          <div className="flex flex-col justify-around">
                            <p className="font-bold">{comment.nickName}</p>
                            <p className="text-xs text-[#565656]">3일 전</p>
                          </div>
                          <SettingMenu />
                        </div>

                        <p className="text-[#565656] font-medium text-justify">{comment.content}</p>
                        <div className="flex justify-between items-center">
                          <div className="flex">
                            <button>{comment.likedByUser ? <img className="w-4" src="/assets/like/likeCheckedIcon.png" alt="" /> : <img className="w-4" src="/assets/like/likeIcon.png" alt="" />}</button>
                            {comment.likeCnt === 0 ? <></> : <p className="px-1 text-sm text-[#565656] font-semibold">{comment.likeCnt}</p>}
                          </div>
                          <p className="text-sm text-[#565656] text-right">{comment.createdAt}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              {recommendationList.map((opinion) => (
                <div className="pb-5">
                  <OpinionCard key={opinion.id} ifBoard={opinion} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default IfDetail;
