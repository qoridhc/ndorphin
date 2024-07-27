import React, { useState } from "react";
import RankingFilter from "../RankingFilter";
import RankingDate from "../RankingDate";

const BestIf = () => {
  const [rankingType, setRankingType] = useState("일간");

  return (
    <div className="py-14">
      <div className="flex items-end">
        <span className="pr-5 text-2xl font-bold underline decoration-[#FFDE2F] decoration-4 underline-offset-8">Best 만약에</span>
        <RankingFilter updateRankingType={setRankingType} />
      </div>

      <div className="py-4">
        <RankingDate type={rankingType} />
      </div>
    </div>
  );
};

export default BestIf;
