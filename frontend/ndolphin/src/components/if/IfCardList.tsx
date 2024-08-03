import React from "react";
import Filter from "../common/Filter";
import Paging from "../common/Paging";
import VoteCard from "./VoteCard";
import OpinionCard from "./OpinionCard";

interface Props {
  tabs: string;
}

const IfCardList = (props: Props) => {
  const voteList = [
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
          content: "Enter, 무게 1kg에 매일이 뷔폐 + 휴가비",
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
    {
      id: 4,
      profileImgUrl: "profile1",
      user: "코에촉촉",
      badget: "S",
      title: "눈 앞에 공룡이 나타났는데 도망은 못가고 잡아먹지도 않는다 숨을 것이냐 싸울 것이냐? 어떻게 할 것이냐",
      joinCount: 12,
      date: "2024-07-18 13:22",
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
      badget: "N",
      title: "키보드 밑에서 자판이 눌릴 때마다 앉았다 일어났다 일해야한다면?",
      joinCount: 12,
      date: "2023-10-30 09:22",
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
      badget: "S",
      title: "키보드 밑에서 자판이 눌릴 때마다 앉았다 일어났다 일해야한다면?",
      joinCount: 12,
      date: "2024-07-30 01:22",
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
      badget: "N",
      title: "키보드 밑에서 자판이 눌릴 때마다 앉았다 일어났다 일해야한다면?",
      joinCount: 12,
      date: "2024-07-30 01:22",
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
      badget: "N",
      title: "키보드 밑에서 자판이 눌릴 때마다 앉았다 일어났다 일해야한다면?",
      joinCount: 12,
      date: "2024-07-30 01:22",
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
      badget: "S",
      title: "키보드 밑에서 자판이 눌릴 때마다 앉았다 일어났다 일해야한다면?",
      joinCount: 12,
      date: "2024-07-30 01:22",
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
      badget: "N",
      title: "키보드 밑에서 자판이 눌릴 때마다 앉았다 일어났다 일해야한다면?",
      joinCount: 12,
      date: "2024-07-30 01:22",
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
      badget: "N",
      title: "키보드 밑에서 자판이 눌릴 때마다 앉았다 일어났다 일해야한다면?",
      joinCount: 12,
      date: "2024-07-30 01:22",
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
      badget: "S",
      title: "키보드 밑에서 자판이 눌릴 때마다 앉았다 일어났다 일해야한다면?",
      joinCount: 12,
      date: "2024-07-30 01:22",
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
    {
      id: 4,
      profileImgUrl: "profile4",
      user: "코에촉촉",
      badget: "N",
      date: "2024-07-30 01:22",
      title: "눈 앞에 공룡이 나타나면?",
      joinCount: 12,
      comment: "티라노가 나 가지고 놀면 ㅠ? 6수 가자",
    },
    {
      id: 5,
      profileImgUrl: "profile5",
      user: "코에촉촉",
      badget: "N",
      date: "2024-07-30 01:22",
      title: "눈 앞에 공룡이 나타나면?",
      joinCount: 12,
      comment: "티라노가 나 가지고 놀면 ㅠ? 6수 가자",
    },
    {
      id: 6,
      profileImgUrl: "profile3",
      user: "코에촉촉",
      badget: "S",
      date: "2024-07-30 01:22",
      title: "눈 앞에 공룡이 나타나면?",
      joinCount: 0,
      comment: null,
    },
    {
      id: 7,
      profileImgUrl: "profile1",
      user: "코에촉촉",
      badget: "N",
      date: "2024-07-30 01:22",
      title: "눈 앞에 공룡이 나타나면?",
      joinCount: 12,
      comment: "티라노가 나 가지고 놀면 ㅠ? 6수 가자",
    },
    {
      id: 8,
      profileImgUrl: "profile2",
      user: "코에촉촉",
      badget: "S",
      date: "2024-07-30 01:22",
      title: "눈 앞에 공룡이 나타나면?",
      joinCount: 0,
      comment: null,
    },
    {
      id: 9,
      profileImgUrl: "profile3",
      user: "코에촉촉",
      badget: "N",
      date: "2024-07-30 01:22",
      title: "눈 앞에 공룡이 나타나면?",
      joinCount: 12,
      comment: "티라노가 나 가지고 놀면 ㅠ? 6수 가자",
    },
    {
      id: 10,
      profileImgUrl: "profile4",
      user: "코에촉촉",
      badget: "S",
      date: "2024-07-30 01:22",
      title: "눈 앞에 공룡이 나타나면?",
      joinCount: 12,
      comment: "티라노가 나 가지고 놀면 ㅠ? 6수 가자",
    },
    {
      id: 11,
      profileImgUrl: "profile5",
      user: "코에촉촉",
      badget: "S",
      date: "2024-07-30 01:22",
      title: "눈 앞에 공룡이 나타나면?",
      joinCount: 12,
      comment: "티라노가 나 가지고 놀면 ㅠ? 6수 가자",
    },
    {
      id: 12,
      profileImgUrl: "profile2",
      user: "코에촉촉",
      badget: "N",
      date: "2024-07-30 01:22",
      title: "눈 앞에 공룡이 나타나면?",
      joinCount: 0,
      comment: null,
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
        <div className="px-44 py-10 grid grid-cols-4 gap-5">
          {opinionList.map((opinion) => (
            <OpinionCard key={opinion.id} opinion={opinion} />
          ))}
        </div>
      )}

      <Paging />
    </div>
  );
};

export default IfCardList;
