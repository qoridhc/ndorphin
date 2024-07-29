import React, { useState } from "react";
import { useNavigate } from "react-router";
import SearchBar from "../../components/relay/SearchBar";
import IfCardList from "../../components/if/IfCardList";

const IfList = () => {
  const navigate = useNavigate();
  const [tabs, setTabs] = useState("투표");
  const underline = "underline underline-offset-8 decoration-4 decoration-yellow-300";

  return (
    <div>
      <div className="bg-yellow-100 flex items-center flex-col">
        <div className="w-full h-60 py-10 flex flex-col justify-around">
          <div>
            <p className="text-center text-3xl font-bold">만약에</p>
            <p className="text-center">‘만약에~’를 공유하고 투표와 의견으로 소통하는 게시판</p>
          </div>
          <SearchBar />
        </div>
      </div>

      <div className="px-44 flex justify-center">
        <button
          className={`px-10 py-5 font-semibold ${tabs === "투표" ? underline : "text-[#6C6C6C]"}`}
          onClick={() => {
            setTabs("투표");
          }}>
          투표
        </button>
        <button
          className={`px-10 py-5 font-semibold ${tabs === "의견" ? underline : "text-[#6C6C6C]"}`}
          onClick={() => {
            setTabs("의견");
          }}>
          의견
        </button>
      </div>

      <div className="px-44 text-right">
        <button
          className="px-7 py-1 shadow-md rounded-xl font-bold bg-amber-300 text-white"
          onClick={() => {
            navigate("/ifstart");
          }}>
          만약에 등록
        </button>
      </div>

      <IfCardList tabs={tabs} />
    </div>
  );
};

export default IfList;
