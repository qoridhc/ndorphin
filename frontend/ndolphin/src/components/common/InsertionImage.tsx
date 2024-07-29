import React from "react";

const InsertionImage = () => {
  return (
    <div className="h-full grid grid-cols-[49%_2%_49%]">
      <div className="flex flex-col items-center justify-center">
        <button className="w-32 px-2 py-1 flex justify-between items-center rounded-3xl border border-solid border-zinc-300 font-bold text-zinc-800">
          <img src="/assets/aiImageIcon.png" className="w-5" alt="#"></img>
          <p className="text-xs">AI 이미지 생성</p>
        </button>
        <div className="my-5 flex flex-col items-center justify-center">
          <div>
            <span className="font-bold">AI로 이미지</span>를
          </div>
          <p>만들어 표지로 생성</p>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <hr className="h-36 border-l border-dashed border-zinc-400"></hr>
      </div>

      <div className="flex flex-col items-center justify-center">
        <button className="w-32 px-2 py-1 flex items-center rounded-3xl border border-solid border-zinc-300 font-bold text-zinc-800">
          <img src="/assets/addImageIcon.png" className="w-5" alt="#"></img>
          <p className="ml-5 text-xs">사진 첨부</p>
        </button>
        <div className="my-5 flex flex-col items-center">
          <span>
            표지 이미지<span className="font-bold"> 직접</span> 첨부
          </span>
        </div>
      </div>
    </div>
  );
};

export default InsertionImage;
