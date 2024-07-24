import React, { useState } from "react";
import RankingFilter from "./RankingFilter";
import RankingDate from "./RankingDate";

const BestRelay = () => {
  const [rankingType, setRankingType] = useState("일간");

  return (
    <div className="px-28 py-14 bg-[#FFFDEF]">
      <div className="h-20 flex flex-col justify-around">
        <div className="flex items-end">
          <span className="pr-5 text-2xl font-bold underline decoration-[#FFDE2F] decoration-4 underline-offset-8">Best 릴레이북</span>
          <RankingFilter updateRankingType={setRankingType} />
        </div>
        <RankingDate type={rankingType} />
      </div>
    </div>
  );
};

export default BestRelay;
