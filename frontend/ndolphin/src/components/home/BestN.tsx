import React, { useState } from "react";
import RankingFilter from "./RankingFilter";
import RankingDate from "./RankingDate";

const BestN = () => {
  const [rankingType, setRankingType] = useState("일간");

  return (
    <div className="py-14">
      <div className="flex items-end">
        <span className="pr-5 text-2xl font-bold underline decoration-[#FFDE2F] decoration-4 underline-offset-8">Best N</span>
      </div>

      <div className="py-4">
        <RankingDate type={rankingType} />
      </div>

      
    </div>
  );
};

export default BestN;
