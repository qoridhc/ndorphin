import "./notes.css";
import { useState } from "react";

function RelayBookStart() {
  const [endPage, setEndPage] = useState([5, 10, 20, 30]);

  return (
    <div className="flex flex-col items-center">
      <hr />
      <input type="text" placeholder="제목을 입력해 주세요 (최대 30자)" className="w-1/3 m-6 p-1 rounded-lg focus:outline-none bg-yellow-200 " />
      <div className="w-1/3 border border-zinc-950">
        <p className="m-3 text-xl font-bold">본문</p>
        <hr className="mx-3 my-2 border-zinc-900" />
        <textarea placeholder="이야기가 시작될 '만약에~' 내용을 입력해 주세요 (최소 글자수 100자 이상)" className="notes w-full h-96 resize-none focus:outline-none placeholder:text-zinc-400"></textarea>
      </div>
      <div className="w-1/3 border border-zinc-950">
        <p className="m-3 text-xl font-bold">종료장수</p>
        <hr className="mx-3 my-2 border-zinc-900" />
        <div>
          {endPage.map((end)=>{
            return (
              <input type="checkbox" id={end} className="mr-2"></input>
              <label>5장</label>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default RelayBookStart;
