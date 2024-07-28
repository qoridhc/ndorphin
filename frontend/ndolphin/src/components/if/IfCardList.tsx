import React from "react";
import Filter from "../common/Filter";
import Paging from "../common/Paging";
import VoteCard from "./VoteCard";

interface Props {
  tabs: string;
}

const IfCardList = (props: Props) => {
  const voteList = [
    {
      id: 1,
      profileImgUrl: "profile1",
      user: "코에촉촉",
      title: "눈 앞에 공룡이 나타나면?",
      joinCount: 12,
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
    {
      id: 2,
      profileImgUrl: "profile1",
      user: "코에촉촉",
      title: "눈 앞에 공룡이 나타나면?",
      joinCount: 12,
      category: [
        {
          id: 1,
          content: "Enter, 무게 1kg",
        },
        {
          id: 2,
          content: "Spacebar, 주 3일",
        },
      ],
    },
    {
      id: 3,
      profileImgUrl: "profile1",
      user: "코에촉촉",
      title: "눈 앞에 공룡이 나타나면?",
      joinCount: 12,
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
    {
      id: 4,
      profileImgUrl: "profile1",
      user: "코에촉촉",
      title: "눈 앞에 공룡이 나타났는데 도망은 못가고 잡아먹지도 않는다 숨을 것이냐 싸울 것이냐? 어떻게 할 것이냐",
      joinCount: 12,
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
      ],
    },
    {
      id: 5,
      profileImgUrl: "profile1",
      user: "코에촉촉",
      title: "키보드 밑에서 자판이 눌릴 때마다 앉았다 일어났다 일해야한다면?",
      joinCount: 12,
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
    {
      id: 6,
      profileImgUrl: "profile1",
      user: "코에촉촉",
      title: "키보드 밑에서 자판이 눌릴 때마다 앉았다 일어났다 일해야한다면?",
      joinCount: 12,
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
      ],
    },
    {
      id: 7,
      profileImgUrl: "profile1",
      user: "코에촉촉",
      title: "키보드 밑에서 자판이 눌릴 때마다 앉았다 일어났다 일해야한다면?",
      joinCount: 12,
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
    {
      id: 8,
      profileImgUrl: "profile1",
      user: "코에촉촉",
      title: "키보드 밑에서 자판이 눌릴 때마다 앉았다 일어났다 일해야한다면?",
      joinCount: 12,
      category: [
        {
          id: 1,
          content: "Enter, 무게 1kg",
        },
        {
          id: 2,
          content: "Spacebar, 주 3일",
        },
      ],
    },
    {
      id: 9,
      profileImgUrl: "profile1",
      user: "코에촉촉",
      title: "키보드 밑에서 자판이 눌릴 때마다 앉았다 일어났다 일해야한다면?",
      joinCount: 12,
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
    {
      id: 10,
      profileImgUrl: "profile1",
      user: "코에촉촉",
      title: "키보드 밑에서 자판이 눌릴 때마다 앉았다 일어났다 일해야한다면?",
      joinCount: 12,
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
    {
      id: 11,
      profileImgUrl: "profile1",
      user: "코에촉촉",
      title: "키보드 밑에서 자판이 눌릴 때마다 앉았다 일어났다 일해야한다면?",
      joinCount: 12,
      category: [
        {
          id: 1,
          content: "Enter, 무게 1kg",
        },
        {
          id: 2,
          content: "Spacebar, 주 3일",
        },
      ],
    },
    {
      id: 12,
      profileImgUrl: "profile1",
      user: "코에촉촉",
      title: "키보드 밑에서 자판이 눌릴 때마다 앉았다 일어났다 일해야한다면?",
      joinCount: 12,
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
      ],
    },
  ];

  return (
    <div>
      <Filter />

      {props.tabs === "투표" ? (
        <div className="px-44 py-10 grid grid-cols-4 gap-5">
          {voteList.map((vote) => (
            <VoteCard key={vote.id} vote={vote} />
          ))}
        </div>
      ) : (
        <div className="px-44 py-10">의견입니다</div>
      )}

      <Paging />
    </div>
  );
};

export default IfCardList;
