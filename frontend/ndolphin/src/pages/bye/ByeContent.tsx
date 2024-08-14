import React, { useState, useEffect } from "react";
import boardApi from "../../api/boardApi";

interface Props {
  content: {
    id: number;
    user: {
      nickName: string;
      mbti: string;
      profileImage: string | null;
    };
    createdAt: string;
    content: string;
    userReactionId: string | null;
    userReactionType: string;
    reactionTypeCounts: {
      WELCOME: number;
      GOODBYE: number;
    };
  };
  getByeList: () => void;
  updateContent: (id: number) => void;
}

const ByeContent = ({ content, getByeList, updateContent }: Props) => {
  const reactionList = ["WELCOME", "GOODBYE"];
  const [reactionTypeCounts, setReactionTypeCounts] = useState<number[]>([0, 0]);
  const [userReactionType, setUserReactionType] = useState<string | null>(null);
  const [userReactionId, setUserReactionId] = useState<string | null>(null);
  const [isActive, setIsActive] = useState<boolean[]>([false, false]);

useEffect(() => {
  if (content) {
    const recentWelcome = content?.reactionTypeCounts?.WELCOME || 0;
    const recentGoodbye = content?.reactionTypeCounts?.GOODBYE || 0;
    setReactionTypeCounts([recentWelcome, recentGoodbye]);

    const userReactionType = content.userReactionType;
    if (userReactionType === "WELCOME" || userReactionType === "GOODBYE") {
      setUserReactionType(userReactionType);
      setIsActive([userReactionType === "WELCOME", userReactionType === "GOODBYE"]);
    } else {
      setIsActive([false, false]);
    }

    const userReactionId = content.userReactionId;
    if (userReactionId) {
      setUserReactionId(userReactionId);
    }
  }
}, [content]);

  const handleAddReaction = async (reactionType: string, index: number) => {
    try {
      const response = await boardApi.reaction(String(content.id), reactionType);
      if (response.status === 200 && response.data) {
        setUserReactionType(reactionType);
        setUserReactionId(response.data.reactionId);

        const newReactionCounts = [...reactionTypeCounts];
        newReactionCounts[index] += 1;
        setReactionTypeCounts(newReactionCounts);

        setIsActive(reactionType === "WELCOME" ? [true, false] : [false, true]);
      }
    } catch (error) {
      console.error("작별 인사 반응 추가 오류: ", error);
    }
  };

  const handleDeleteReaction = async (index: number) => {
    if (userReactionId) {
      try {
        const response = await boardApi.reactionDelete(userReactionId);
        if (response.status === 200) {
          const newReactionCounts = [...reactionTypeCounts];
          const reactionIndex = userReactionType === "WELCOME" ? 0 : 1;
          newReactionCounts[reactionIndex] -= 1;
          setReactionTypeCounts(newReactionCounts);

          setIsActive([false, false]);
          setUserReactionType("NONE");
          setUserReactionId(null);
        }
      } catch (error) {
        console.error("작별 인사 반응 삭제 오류: ", error);
      }
    }
  };

  const handleUpdateReaction = async (reactionType: string) => {
    if (userReactionId && userReactionType) {
      try {
        const response = await boardApi.reactionUpdate(userReactionId, reactionType);
        if (response.status === 200 && response.data) {
          const newReactionCounts = [...reactionTypeCounts];
          const prevIndex = userReactionType === "WELCOME" ? 0 : 1;
          const newIndex = reactionType === "WELCOME" ? 0 : 1;

          newReactionCounts[prevIndex] -= 1;
          newReactionCounts[newIndex] += 1;
          setReactionTypeCounts(newReactionCounts);

          setUserReactionType(reactionType);
          setIsActive(reactionType === "WELCOME" ? [true, false] : [false, true]);
        }
      } catch (error) {
        console.error("작별 인사 반응 수정 오류: ", error);
      }
    }
  };

  const clickButton = (reactionType: string, index: number): void => {
    if (userReactionType === reactionType) {
      // 동일한 반응을 다시 눌렀을 때 삭제
      handleDeleteReaction(index);
      setIsActive([false, false]);
      setUserReactionType("NONE");
      setUserReactionId(null);
    } else if (userReactionId === null) {
      // 처음 반응 추가 시
      handleAddReaction(reactionType, index);
      setIsActive(reactionType === "WELCOME" ? [true, false] : [false, true]);
    } else if (userReactionId !== null && userReactionType !== reactionType) {
      // 다른 반응을 누른 경우 반응 수정
      handleUpdateReaction(reactionType);
      setIsActive(reactionType === "WELCOME" ? [true, false] : [false, true]);
    }
  };

  return (
    <div>
      <div className="p-5 border-t border-x grid grid-cols-[1fr_9fr]">
        <div className="">
          <img className="w-9 h-9 rounded-[50%]" src={`${content.user.profileImage}`} alt="" />
        </div>

        <div className="grid gap-3">
          <div>
            <p className="font-bold">{content.user.nickName}</p>
            <p className="text-sm font-semibold text-[#565656]">{content.createdAt}</p>
          </div>

          {/* S->N or N->S 이미지 표시 */}
          {content.user.mbti === "S" ? (
            <div>
              <img className="w-16" src="/assets/bye/nToS.png" alt="#" />
            </div>
          ) : (
            <div>
              <img className="w-16" src="/assets/bye/sToN.png" alt="#" />
            </div>
          )}

          <p className="font-medium text-justify leading-snug">{content.content}</p>

          {/* 환영해요 잘 가요 버튼 */}
          <div className="mt-3 flex justify-end">
            <div className="flex w-48 justify-between">
              {["환영해요", "잘 가요"].map((label, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => clickButton(reactionList[index], index)}
                    className={`p-1 w-[5.9rem] flex justify-around border-[1.8px] rounded-2xl ${isActive[index] ? (index === 0 ? "bg-pink-400 border-pink-400" : "bg-blue-400 border-blue-400") : index === 0 ? "border-pink-400" : "border-blue-400"}`}>
                    <p className={`font-bold text-sm ${isActive[index] ? "text-white" : index === 0 ? "text-pink-400" : "text-blue-400"}`}>{label}</p>
                    <p className={`font-bold text-sm ${isActive[index] ? "text-white" : index === 0 ? "text-pink-400" : "text-blue-400"}`}>{reactionTypeCounts[index]}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ByeContent;
