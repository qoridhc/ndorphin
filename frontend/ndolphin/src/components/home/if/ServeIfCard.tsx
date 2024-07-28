import React from "react";
import { IoIosArrowForward } from "react-icons/io";

interface Props {
  serveIndex: number;
}

const ServeIfCard = (props: Props) => {
  const cardList = [
    {
      id: 1,
      name: "삶은계란",
      content: "키보드 밑에서 자판이 눌릴 때마다 앉았다 일어났다 일 해야한다면?",
      isVote: true,
      joinCount: 322,
    },
    {
      id: 2,
      name: "만약핑인데",
      content: "내가 만약에 2D가 되면 예쁠까?",
      isVote: false,
      joinCount: 122,
    },
    {
      id: 3,
      name: "별이 빛나는 밤",
      content: "지구 멸망하면 어떡함?",
      isVote: true,
      joinCount: 32,
    },
    {
      id: 4,
      name: "코에촉촉",
      content: "예비군 3개월 가기 vs 개발만 6시간 하기 (대신 밥은 예비군으로 통일, 식사 시간은 예비군 제한 없음 개발은 끼니별 10분, 개발은 포트폴리오 불가 대가 없이 남의 개발해주기)",
      isVote: true,
      joinCount: 2,
    },
    {
      id: 5,
      name: "상상의 나무꾼",
      content: "내가 받는다는 보장하에 하늘에서 음식 내리기 vs 하늘에서 돈 하루에 3000원만 내리기?",
      isVote: false,
      joinCount: 89,
    },
  ];

  return (
    <div className="w-[40%] h-52 p-5 border-solid border-[1px] border-[#565656] rounded-[10px] shadow-[2px_3px_5px_rgb(0,0,0,0.2)] grid grid-rows-[35%_auto_20%] opacity-70">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <img className="w-9 h-9 mr-3 rounded-[50%]" src={`/assets/profile/profile${cardList[props.serveIndex].id}.png`} alt="" />
          <p className="font-semibold">{cardList[props.serveIndex].name}</p>
        </div>
        <IoIosArrowForward className="text-2xl" />
      </div>
      <p className="font-medium text-justify line-clamp-3">{cardList[props.serveIndex].content}</p>
      <div className="flex justify-end items-end">
        {cardList[props.serveIndex].isVote ? (
          <p className="text-sm text-[#F07676] font-semibold text-right">투표수 {cardList[props.serveIndex].joinCount}회</p>
        ) : (
          <p className="text-sm text-[#4B91F9] font-semibold text-right">의견 {cardList[props.serveIndex].joinCount}개</p>
        )}
      </div>
    </div>
  );
};

export default ServeIfCard;
