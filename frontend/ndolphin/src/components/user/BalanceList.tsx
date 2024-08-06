import React from "react";
import BalanceCard from "../balance/BalanceCard";

interface Vote {
  id: number;
  profileImgUrl: string;
  user: string;
  badget: string;
  title: string;
  joinCount: number;
  date: string;
  category: { id: number; content: string }[];
}

const BalanceList = () => {
  const balanceList = [
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
          content: "Enter, 무게 1kg에 매일이 뷔폐 + 휴가비 Enter, 무게 1kg에 매일이 뷔폐 + 휴가비",
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
          content: "Enter, 무게 1kg Enter, 무게 1kg Enter, 무게 1kg Enter, 무게 1kg Enter, 무게 1kg Enter, 무게 1kg",
        },
        {
          id: 2,
          content: "Spacebar, 주 3일 Enter, 무게 1kg Enter, 무게 1kg",
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
      title: "눈 앞에 공룡이 나타났는데 도망은 못가고 눈 앞에 공룡이 나타났는데 도망은 눈 앞에 공룡이 나타났는데 도망은 잡아먹지도 않는다 숨을 것이냐 싸울 것이냐? 어떻게 할 것이냐",
      joinCount: 12,
      date: "2024-07-18 13:22",
      category: [
        {
          id: 1,
          content: "Enter, 무게 1kg Enter, 무게 1kg Enter, 무게 1kg",
        },
        {
          id: 2,
          content: "Spacebar, 주 3일 Spacebar, 주 3일 Spacebar, 주 3일 Spacebar, 주 3일",
        },
        {
          id: 3,
          content: "enter, 연봉 1억 enter, 연봉 1억 enter, 연봉 1억",
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
  ];

  return (
    <div>
      <div className="px-44 py-10 grid grid-cols-3 gap-5">
        {balanceList.map((balance) => (
          <BalanceCard key={balance.id} balance={balance} />
        ))}
      </div>
    </div>
  )
}

export default BalanceList;