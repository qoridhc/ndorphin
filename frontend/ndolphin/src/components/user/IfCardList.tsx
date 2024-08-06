import React from "react";
import OpinionCard from "../if/OpinionCard";

interface Opinion {
  id: number;
  profileImgUrl: string;
  badget: string;
  user: string;
  date: string;
  title: string;
  joinCount: number;
  comment: string | null;
}

const IfCardList: React.FC = () => {
  const opinionList: Opinion[] = [
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
      <div className="px-44 py-10 grid grid-cols-4 gap-5">{opinionList.map((opinion) => <OpinionCard key={opinion.id} opinion={opinion} />)}</div>
    </div>
  );
};

export default IfCardList;
