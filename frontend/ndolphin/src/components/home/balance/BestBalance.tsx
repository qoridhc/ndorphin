import React, { useState } from "react";
import SwiperBalance from "./SwiperBalance";
import RankingFilter from "../RankingFilter";
import RankingDate from "../RankingDate";

const BestBalance = () => {
  const [rankingType, setRankingType] = useState("일간");

  return (
    <div className="px-44 py-14">
      <div className="flex items-end">
        <span className="pr-5 text-2xl font-bold underline decoration-[#FFDE2F] decoration-4 underline-offset-8">Best 밸런스게임</span>
        <RankingFilter updateRankingType={setRankingType} />
      </div>

      <div className="py-4">
        <RankingDate type={rankingType} />
      </div>

      <SwiperBalance rankingType={rankingType} />
    </div>
  );
};

export default BestBalance;
