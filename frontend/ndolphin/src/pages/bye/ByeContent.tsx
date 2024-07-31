import React, { useState } from "react";
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
  const [reactionUserList, setreactionUserList] = useState([
    {
      user: "근데 말약에",
      reactionId: [false, true]
    },
    {
      user: "만약핑인데",
      reactionId: [true, true],
    },
    {
      user: "제로",
      reactionId: [false, true],
    },
  ]);

  // const clickButton = (user: string, id: number): void => {
  //   let copy = [...reactionList];
  //   let reactionUserListCopy = [...reactionUserList];
  //   let clickedCopy = [...clicked];
  //   const userExists = reactionUserList.find((reactionUser) => reactionUser.user === user);
  //   if (userExists != undefined) {
  //     const reactionId = userExists.reactionId;
  //     const userIndex = reactionUserList.findIndex((reactionUser) => reactionUser.user === user);
  //     if (id === 0 && reactionId[0]) {
  //       copy[id] -= 1;
  //       reactionUserListCopy.splice(userIndex, 1);
  //       clickedCopy[id] = false;
  //     } else if (id === 0 && reactionId[0] === false) {
  //       copy[id] += 1;
  //       clickedCopy[id] = true;
  //       // reactionUserListCopy[userIndex] = { ...reactionUserListCopy[userIndex], reactionId: [true] };
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
          <img className="w-9 h-9 rounded-[50%]" src={`${content.profileImgUrl}`} alt="" />
        </div>

        <div className="grid gap-3">
          <div>
            <p className="font-bold">{content.user}</p>
            <p className="text-sm font-semibold text-[#565656]">{content.date}</p>
          </div>

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

          <div className="mt-3 flex justify-end">
            <div className="flex w-48 justify-between">
              <button className="p-1 w-[5.8rem] flex justify-around border-[1.8px] border-pink-400 rounded-2xl">
                <p className="font-bold text-sm text-pink-400">환영해요</p>
                <p className="font-bold text-sm text-pink-400">{reactionList[0]}</p>
              </button>
              <button className="p-1 w-[5.8rem] flex justify-around border-[1.8px] border-blue-400 rounded-2xl">
                <p className="font-bold text-sm text-blue-400">잘 가요</p>
                <p className="font-bold text-sm text-blue-400">{reactionList[1]}</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ByeContent;
