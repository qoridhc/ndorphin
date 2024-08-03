import React, { useState } from "react";
import { useNavigate } from "react-router";
import SearchBar from "../../components/relay/SearchBar";
import BalanceCardList from "../../components/balance/BalanceCardList";

const BalanceList = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="bg-yellow-100 flex items-center flex-col">
        <div className="w-full h-60 py-10 flex flex-col justify-around">
          <div>
            <p className="text-center text-3xl font-bold">밸런스게임</p>
            <p className="text-center">밸런스게임을 공유해주세요</p>
          </div>
          <SearchBar />
        </div>
      </div>

      <div className="py-10">
        <div className="px-44 text-right">
          <button
            className="px-7 py-1 shadow-md rounded-xl font-bold bg-amber-300 text-white"
            onClick={() => {
              navigate("/ifstart");
            }}>
            만약에 등록
          </button>
        </div>

        <BalanceCardList />
      </div>
    </div>
  );
};

export default BalanceList;
