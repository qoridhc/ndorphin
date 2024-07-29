import { useState } from "react";
import { Navigate, useNavigate } from "react-router";

function Book() {
  const [join, setJoin] = useState(false);
  const navigate = useNavigate();

  const goBookDetail = () => {
    navigate("/relaybookdetail/1");
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full mr-36 flex justify-end">
        {join ? <p className="mx-1 px-3 py-1 rounded-t-lg text-xs font-bold text-zinc-900 bg-amber-300">참여</p> : <p className="mx-1 px-3 py-1 rounded-t-lg text-xs font-bold text-zinc-900 bg-zinc-300">미참여</p>}
      </div>

      <div className="relative">
        <img src="/assets/heart.png" className="w-9 absolute top-4 right-3 z-10" alt="#" />
        <img
          onClick={() => {
            goBookDetail();
          }}
          src="/assets/cover.jpg"
          className="hover:cursor-pointer w-72 h-[24rem] rounded-md"
          alt="#"
        />
      </div>

      <div className="w-full flex flex-col ml-36">
        <span
          onClick={() => {
            goBookDetail();
          }}
          className="hover:cursor-pointer pt-2 font-bold text-lg">
          혼자서 본 영화
        </span>
        <button className="w-32 px-2 py-1 flex justify-between items-center rounded-3xl border-2 border-solid border-zinc-300 font-bold text-zinc-800 mt-2">
          <img src="/assets/aiSummaryButton.png" className="w-5" alt="#" />
          <p className="text-xs">AI 요약하기</p>
          <img src="/assets/arrow_right.png" className="w-2" alt="#" />
        </button>
      </div>
    </div>
  );
}

export default Book;
