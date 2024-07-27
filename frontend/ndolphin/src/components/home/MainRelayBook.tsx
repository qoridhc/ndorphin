import React from "react";

interface Props {
  mainIndex: number;
}

const MainRelayBook = (props: Props) => {
  const bookList = [
    {
      id: 1,
      title: "코딱지 대장 버티 1",
      imgUrl: "https://image.yes24.com/Goods/72214794/L",
    },
    {
      id: 2,
      title: "코딱지 대장 버티 2",
      imgUrl: "https://image.yes24.com/goods/33350436/L",
    },
    {
      id: 3,
      title: "코딱지 대장 버티 3",
      imgUrl: "https://image.yes24.com/goods/36916976/L",
    },
    {
      id: 4,
      title: "코딱지 대장 버티 4",
      imgUrl: "https://image.yes24.com/goods/96352123/L",
    },
    {
      id: 5,
      title: "수상한 편의점",
      imgUrl: "https://image.yes24.com/goods/36917053/L",
    },
    {
      id: 6,
      title: "코딱지 대장 버티 1",
      imgUrl: "https://image.yes24.com/goods/45370178/L",
    },
    {
      id: 7,
      title: "수상한 편의점",
      imgUrl: "https://image.yes24.com/goods/45370179/L",
    },
    {
      id: 8,
      title: "코딱지 대장 버티 1",
      imgUrl: "https://image.yes24.com/goods/101477745/L",
    },
    {
      id: 9,
      title: "수상한 편의점",
      imgUrl: "https://image.yes24.com/goods/101477743/L",
    },
    {
      id: 10,
      title: "코딱지 대장 버티 1",
      imgUrl: "https://image.yes24.com/goods/34151542/L",
    },
  ];

  console.log(props.mainIndex);

  return (
    <div className="grid grid-cols-2 ease-in">
      <img className="w-[90%] rounded-xl shadow-[5px_5px_5px_5px_rgba(150,150,150,0.3)]" src={bookList[props.mainIndex].imgUrl} alt="" />
      <div className="grid grid-rows-[auto_auto_auto_auto_auto]">
        <div className="flex items-end">
          <p className="text-6xl font-bold">{bookList[props.mainIndex].id}</p>
          <p className="text-xl font-semibold">코딱지 대장 버티 1</p>
        </div>
        <div className="flex items-center">
          <img className="w-10 h-10 rounded-[50%]" src="assets/profile1.png" alt="" />
          <p className="pl-4 font-semibold">상상의 나무꾼</p>
        </div>
        <p className="text-justify">편의점에 근무하는 사람들이 모두 수상한 점을 하나씩 가지고 있는 내용이다. 뭐가 그렇게 수상한걸까..</p>
        <hr className="h-[2px] bg-[#9E9E9E]" />
        <div>
          <div className="flex">
            <p className="font-semibold text-[#333333]">조회수</p>
            <p className="pl-2 text-[#565656]">216 회</p>
          </div>
          <div className="flex">
            <p className="font-semibold text-[#333333]">공감수</p>
            <p className="pl-2 text-[#565656]">64 개</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainRelayBook;
