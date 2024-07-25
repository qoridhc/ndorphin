import { useState } from "react";
import InProgress from "../../components/relay/InProgress";
import Done from "../../components/relay/Done";
import SearchBar from "../../components/relay/SearchBar";

function Relaybooklist() {
  const [tabs, setTabs] = useState(0);
  const underline = "underline underline-offset-8 decoration-4 decoration-yellow-300";

  return (
    <div>
      <div className="bg-yellow-100 flex items-center flex-col">
        <div className="w-full h-60 py-10 flex flex-col justify-around">
          <div>
            <p className="text-center text-3xl font-bold">릴레이북</p>
            <p className="text-center">'만약에~'를 이어 하나의 이야기를 완성시키는 릴레이북 게시판</p>
          </div>
          <SearchBar />
        </div>
      </div>
      <div className="px-28 flex justify-center">
        <button
          className={`px-10 py-5 font-semibold ${tabs === 0 ? underline : "text-[#6C6C6C]"}`}
          onClick={() => {
            setTabs(0);
          }}>
          진행 중
        </button>
        <button
          className={`px-10 py-5 font-semibold ${tabs === 1 ? underline : "text-[#6C6C6C]"}`}
          onClick={() => {
            setTabs(1);
          }}>
          완료
        </button>
      </div>
      <div className="px-28 text-right">
        <button className="px-7 py-1 shadow-md rounded-xl font-bold bg-amber-300 text-white">이야기 시작하기</button>
      </div>
      {tabs === 0 ? <InProgress /> : <Done />}
    </div>
  );
}

export default Relaybooklist;
