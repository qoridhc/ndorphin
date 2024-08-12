import React, { useState } from "react";
import SwiperBalance from "./SwiperBalance";
import RankingFilter from "../RankingFilter";
import RankingDate from "../RankingDate";

const BestBalance = () => {
  const [rankingType, setRankingType] = useState("일간");

  return (
    <div className="">
      <div className="flex items-end">
        <span className="pr-5 text-2xl font-bold underline decoration-[#FFDE2F] decoration-4 underline-offset-8">Best 만약에</span>
        <RankingFilter updateRankingType={setRankingType} />
      </div>

      <div className="py-4">
        <RankingDate type={rankingType} />
      </div>

      <SwiperBalance startIndex={0} delay={1500} />
      {/* <SwiperBalance startIndex={1} delay={1500} />
      <SwiperBalance startIndex={2} delay={1500} /> */}
    </div>
  );
};

export default BestBalance;
