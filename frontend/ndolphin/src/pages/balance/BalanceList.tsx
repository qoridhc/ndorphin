import React, { useState } from "react";
import { useNavigate } from "react-router";
import SearchBar from "../../components/relay/SearchBar";
import BalanceCardList from "../../components/balance/BalanceCardList";
import Filter from "../../components/common/Filter";

const BalanceList = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex flex-col justify-center">
        <div className="w-full px-44 py-6 flex-col items-center">
          <div className="py-5 flex items-end">
            <p className="text-2xl font-bold">밸런스게임</p>
            <p className="pl-3 text-md">‘만약에~’ 밸런스게임</p>
          </div>
          <hr className="w-full" />
          <div className="py-6 pb-10 flex flex-col justify-around">
            <SearchBar />
          </div>
        </div>
      </div>

      <div className="">
        <div className="px-44 text-right flex justify-between items-center">
          <Filter />
          <button
            className="px-7 py-1 shadow-md rounded-xl font-bold bg-amber-300 text-white"
            onClick={() => {
              navigate("/ifstart");
            }}>
            밸런스게임 등록
          </button>
        </div>

        <BalanceCardList />
      </div>
    </div>
  );
};

export default BalanceList;
