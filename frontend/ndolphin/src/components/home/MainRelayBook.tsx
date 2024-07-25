import React from "react";

const MainRelayBook = () => {
  return (
    <div className="grid grid-cols-2">
      <img className="w-[90%] rounded-xl shadow-[5px_5px_5px_5px_rgba(150,150,150,0.3)]" src="assets/sampleBook1.png" alt="" />
      <div className="grid grid-rows-[auto_auto_auto_auto_auto]">
        <div className="flex items-end">
          <p className="text-6xl font-bold">1</p>
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
