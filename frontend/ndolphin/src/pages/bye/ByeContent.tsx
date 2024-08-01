import React, { useState, useEffect } from "react";
import { FaRegComment } from "react-icons/fa";

interface Props {
  content: {
    id: number;
    switch: number;
    profileImgUrl: string;
    user: string;
    date: string;
    content: string;
    greetingCount: number;
    goodByeCount: number;
  };
}

const ByeContent = ({ content }: Props) => {
  const [reactionList, setReactionList] = useState([content.greetingCount, content.goodByeCount]);
  const [clicked, setClicked] = useState([false, false]);
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);
  const user = "근데 말약에";
  const [reactionUserList, setreactionUserList] = useState([
    {
      user: "근데 말약에",
      reactionId: 0,
    },
    {
      user: "만약핑인데",
      reactionId: 1,
    },
    {
      user: "제로",
      reactionId: 1,
    },
  ]);

  useEffect(() => {
    const currentUserReaction = reactionUserList.find((reactionUser) => reactionUser.user === user);
    if (currentUserReaction) {
      const newClicked = [false, false];
      newClicked[currentUserReaction.reactionId] = true;
      setClicked(newClicked);
    }
  }, [reactionUserList, user]);

  const clickButton = (user: string, id: number): void => {
    let copy = [...reactionList];
    let reactionUserListCopy = [...reactionUserList];
    let clickedCopy = [...clicked];
    const userExists = reactionUserList.find((reactionUser) => reactionUser.user === user);
    if (userExists != undefined) {
      const reactionId = userExists.reactionId;
      const userIndex = reactionUserList.findIndex((reactionUser) => reactionUser.user === user);
      if (id === reactionId) {
        copy[id] -= 1;
        reactionUserListCopy.splice(userIndex, 1);
        clickedCopy[id] = false;
      } else if (id != reactionId) {
        copy[reactionId] -= 1;
        copy[id] += 1;
        clickedCopy[reactionId] = false;
        clickedCopy[id] = true;
        reactionUserListCopy[userIndex] = { ...reactionUserListCopy[userIndex], reactionId: id };
      }
    } else {
      copy[id] += 1;
      clickedCopy[id] = true;
      reactionUserListCopy.push({ user: user, reactionId: id });
    }
    setClicked(clickedCopy);
    setreactionUserList(reactionUserListCopy);
    setReactionList(copy);
  };

  return (
    <div>
      <div className="p-5 border-t border-x grid grid-cols-[1fr_9fr]">
        <div className="">
          <img className="w-9 h-9 rounded-[50%]" src={`${content.profileImgUrl}`} alt="" />
        </div>

        <div className="grid gap-3">
          <div>
            <p className="font-bold">{content.user}</p>
            <p className="text-sm font-semibold text-[#565656]">{content.date}</p>
          </div>

          {/* S->N or N->S 이미지 표시 */}
          {content.switch === 0 ? (
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
                const isActive = clicked[index] || hoveredButton === index;
                return (
                  <button
                    key={index}
                    onClick={() => clickButton(user, index)}
                    onMouseEnter={() => setHoveredButton(index)}
                    onMouseLeave={() => setHoveredButton(null)}
                    className={`p-1 w-[5.9rem] flex justify-around border-[1.8px] rounded-2xl ${isActive ? (index === 0 ? "bg-pink-400 border-pink-400" : "bg-blue-400 border-blue-400") : index === 0 ? "border-pink-400" : "border-blue-400"}`}>
                    <p className={`left-2 font-bold text-sm ${isActive ? "text-white" : index === 0 ? "text-pink-400" : "text-blue-400"}`}>{label}</p>
                    <p className={`right-2 font-bold text-sm ${isActive ? "text-white" : index === 0 ? "text-pink-400" : "text-blue-400"}`}>{reactionList[index]}</p>
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
