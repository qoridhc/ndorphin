import React, { useState } from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import RankingFilter from "./RankingFilter";
import RankingDate from "./RankingDate";
import MainRelayBook from "./MainRelayBook";
import ServeRelayBook from "./ServeRelayBook";

const BestRelay = () => {
  const [rankingType, setRankingType] = useState("일간");

  return (
    <div className="px-48 py-14 bg-[#FFFDEF]">
      <div className="flex items-end">
        <span className="pr-5 text-2xl font-bold underline decoration-[#FFDE2F] decoration-4 underline-offset-8">Best 릴레이북</span>
        <RankingFilter updateRankingType={setRankingType} />
      </div>

      <div className="py-4">
        <RankingDate type={rankingType} />
      </div>

      <div className="grid grid-cols-[100px_auto_100px]">
        <button className="flex items-center">
          <IoIosArrowDropleft className="text-5xl text-[#565656]" />
        </button>

        <div className="grid grid-cols-[50%_5%_45%]">
          <MainRelayBook />
          <div className="grid grid-cols-3 gap-x-2 col-start-3">
            <ServeRelayBook />
            <ServeRelayBook />
            <ServeRelayBook />
          </div>
        </div>

        <button className="flex justify-end items-center">
          <IoIosArrowDropright className="text-5xl text-[#565656]" />
        </button>
      </div>
    </div>
  );
};

export default BestRelay;
