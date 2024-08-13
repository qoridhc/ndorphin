import React, { useState, useEffect } from "react";
import boardApi from "../../api/boardApi";
import { FaRegComment } from "react-icons/fa";

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
}

const ByeContent = ({ content, getByeList }: Props) => {
  const [clicked, setClicked] = useState([false, false]);
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);
  const reactionList = ["WELCOME", "GOODBYE"];
  const [reactionTypeCounts, setReactionTypeCounts] = useState<number[]>([0, 0]);
  const [userReactionType, setUserReactionType] = useState<string | null>(null);
  const [userReactionId, setUserReactionId] = useState<string | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  useEffect(() => {
    const recentWelcome = content?.reactionTypeCounts?.WELCOME || 0;
    const recentGoodbye = content?.reactionTypeCounts?.GOODBYE || 0;
    setReactionTypeCounts([recentWelcome, recentGoodbye]);

    const userReactionType = content.userReactionType;
    if (userReactionType) {
      setUserReactionType(userReactionType);
    }

    const userReactionId = content.userReactionId;
    if (userReactionId) {
      setUserReactionId(userReactionId);
    }
  }, [content]);

  const handleAddReaction = async (reactionType: string, index: number) => {
    console.log(reactionType);
    console.log(index);
    try {
      const response = await boardApi.reaction(String(content.id), reactionType);
      if (response.status === 200 && response.data) {
        console.log("작별 인사 반응 추가 완료");
        setUserReactionType(reactionType);
        // setReactionTypeCounts((prevCounts) => {
        //   // 이전 배열을 복사하고, 특정 인덱스의 값을 1 증가시킴
        //   const newCounts = [...prevCounts];
        //   newCounts[index] += 1;
        //   return newCounts;
        // });
        getByeList();
        setIsClicked(true);
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
          console.log("작별 인사 반응 삭제 완료");
          getByeList();
          setUserReactionId(null);
          // setReactionTypeCounts((prevCounts) => {
          //   // 이전 배열을 복사하고, 특정 인덱스의 값을 1 감소시킴
          //   const newCounts = [...prevCounts];
          //   newCounts[index] -= 1;
          //   return newCounts;
          // });
        }
      } catch (error) {
        console.error("작별 인사 반응 삭제 삭제 오류: ", error);
      }
    }
  };

  const clickButton = (reactionType: string, index: number): void => {
    // user의 현재 이모티콘과 누른 이모티콘이 같을 시 삭제
    if (userReactionType === reactionType) {
      handleDeleteReaction(index);
      // user가 아직 이모티콘을 누르지 않았을 시 추가
    } else if (userReactionId === null) {
      handleAddReaction(reactionType, index);
      // user가 지금 누른 이모티콘과 다른 이모티콘을 누를 경우 삭제 후 추가
    } else if (userReactionId !== null && userReactionType !== reactionType) {
      handleDeleteReaction(index);
      handleAddReaction(reactionType, index);
    }
  };
  // const clickButton = (user: string, id: number): void => {
  //   let copy = [...reactionList];
  //   let reactionUserListCopy = [...reactionUserList];
  //   let clickedCopy = [...clicked];
  //   const userExists = reactionUserList.find((reactionUser) => reactionUser.user === user);
  //   if (userExists != undefined) {
  //     const reactionId = userExists.reactionId;
  //     const userIndex = reactionUserList.findIndex((reactionUser) => reactionUser.user === user);
  //     if (id === reactionId) {
  //       copy[id] -= 1;
  //       reactionUserListCopy.splice(userIndex, 1);
  //       clickedCopy[id] = false;
  //     } else if (id != reactionId) {
  //       copy[reactionId] -= 1;
  //       copy[id] += 1;
  //       clickedCopy[reactionId] = false;
  //       clickedCopy[id] = true;
  //       reactionUserListCopy[userIndex] = { ...reactionUserListCopy[userIndex], reactionId: id };
  //     }
  //   } else {
  //     copy[id] += 1;
  //     clickedCopy[id] = true;
  //     reactionUserListCopy.push({ user: user, reactionId: id });
  //   }
  //   setClicked(clickedCopy);
  //   setreactionUserList(reactionUserListCopy);
  //   setReactionList(copy);
  // };

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
                    onMouseEnter={() => setHoveredButton(index)}
                    onMouseLeave={() => setHoveredButton(null)}
                    className={`p-1 w-[5.9rem] flex justify-around border-[1.8px] rounded-2xl ${isActive ? (index === 0 ? "bg-pink-400 border-pink-400" : "bg-blue-400 border-blue-400") : index === 0 ? "border-pink-400" : "border-blue-400"}`}
                  >
                    <p className={`left-2 font-bold text-sm ${isActive ? "text-white" : index === 0 ? "text-pink-400" : "text-blue-400"}`}>{label}</p>
                    <p className={`right-2 font-bold text-sm ${isActive ? "text-white" : index === 0 ? "text-pink-400" : "text-blue-400"}`}>{reactionTypeCounts[index]}</p>
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
