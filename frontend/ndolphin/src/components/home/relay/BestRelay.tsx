import React, { useState } from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import RankingFilter from "../RankingFilter";
import RankingDate from "../RankingDate";
import MainRelayBook from "./MainRelayBook";
import ServeRelayBook from "./ServeRelayBook";
import BestRelay2 from "./BestRelay2";

const BestRelay = () => {
  const [rankingType, setRankingType] = useState("일간");
  const [currentIndex, setCurrentIndex] = useState(1);
  const [mainIndex, setMainIndex] = useState(0);
  const bookListLength = 10;

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? bookListLength - 1 : prevIndex - 1));
    setMainIndex((prevIndex) => (prevIndex === 0 ? bookListLength - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bookListLength);
    setMainIndex((prevIndex) => (prevIndex + 1) % bookListLength);
  };

  return (
    <div className="px-44 py-14 bg-[#FFFDEF]">
      <div className="flex items-end">
        <span className="pr-5 text-2xl font-bold underline decoration-[#FFDE2F] decoration-4 underline-offset-8">Best 릴레이북</span>
        <RankingFilter updateRankingType={setRankingType} />
      </div>

      <div className="py-4">
        <RankingDate type={rankingType} />
      </div>

      <div className="grid grid-cols-2">
        {/* <BestRelay2 /> */}
        <MainRelayBook />
        <ServeRelayBook />
      </div>
    </div>
  );
};

export default BestRelay;
