import { useState } from "react";
import { useNavigate } from "react-router";
import BookList from "../../components/relay/BookList";
import SearchBar from "../../components/relay/SearchBar";

function Relaybooklist() {
  const navigate = useNavigate();
  const [tabs, setTabs] = useState<number>(0);
  const underline = "underline underline-offset-[10px] decoration-4 decoration-yellow-300";

  return (
    <div>
      <div className="relative flex flex-col justify-center">
        <div className="w-full px-44 flex-col items-center">
          <div className="py-5 flex items-end">
            <p className="text-xl font-bold">릴레이북</p>
            <p className="pl-3 text-xs">‘만약에~’를 이어 하나의 이야기를 완성시키는 릴레이북 게시판</p>
          </div>
          <div className="flex justify-center">
            <button
              className={`px-10 py-3 pb-5 font-semibold ${tabs === 0 ? underline : "text-[#6C6C6C]"} z-20`}
              onClick={() => {
                setTabs(0);
              }}
            >
              진행 중
            </button>
            <button
              className={`px-10 py-3 pb-5 font-semibold ${tabs === 1 ? underline : "text-[#6C6C6C]"} z-20`}
              onClick={() => {
                setTabs(1);
              }}
            >
              완료
            </button>
          </div>
          <hr className="w-full" />
        </div>
        <div className="flex items-center flex-col">
          <div className="w-full py-6 pb-10 flex flex-col justify-around">
            <SearchBar />
          </div>
        </div>
      </div>

      <div className="px-44 text-right">
        <button
          className="px-7 py-1 shadow-md rounded-xl font-bold bg-amber-300 text-white"
          onClick={() => {
            navigate("/relaybookstart");
          }}
        >
          이야기 시작하기
        </button>
      </div>
      <BookList />
    </div>
  );
}

export default Relaybooklist;
