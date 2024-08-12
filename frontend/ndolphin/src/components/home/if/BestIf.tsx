import React, { useState } from "react";
import RankingFilter from "../RankingFilter";
import RankingDate from "../RankingDate";
import MainIfCard from "./MainIfCard";
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdArrowDropleft } from "react-icons/io";
import ServeIfCard from "./ServeIfCard";

const BestIf = () => {
  const [rankingType, setRankingType] = useState("일간");
  const [mainIndex, setMainIndex] = useState(0);
  const [prevIndex, setPreIndex] = useState(4);
  const [nextIndex, setNextIndex] = useState(1);
  const cardListLength = 5;

  const handlePrevClick = () => {
    setMainIndex((prevIndex) => (prevIndex === 0 ? cardListLength - 1 : prevIndex - 1));
    setPreIndex((prevIndex) => (prevIndex === 0 ? cardListLength - 1 : prevIndex - 1));
    setNextIndex((prevIndex) => (prevIndex === 0 ? cardListLength - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setMainIndex((prevIndex) => (prevIndex + 1) % cardListLength);
    setPreIndex((prevIndex) => (prevIndex + 1) % cardListLength);
    setNextIndex((prevIndex) => (prevIndex + 1) % cardListLength);
  };

  return (
    <div>
      <div className="flex items-end">
        <span className="pr-5 text-2xl font-bold underline decoration-[#FFDE2F] decoration-4 underline-offset-8">Best 만약에</span>
        <RankingFilter updateRankingType={setRankingType} />
      </div>

      <div className="py-4">
        <RankingDate type={rankingType} />
      </div>

      <div className="h-[75%] relative flex justify-around items-center">
        <MainIfCard mainIndex={mainIndex} />
        <ServeIfCard serveIndex={prevIndex} />
        <ServeIfCard serveIndex={nextIndex} />
      </div>
      <div className="flex justify-center">
        <IoMdArrowDropleft className="text-4xl text-[#565656]" onClick={handlePrevClick} />
        <IoMdArrowDropright className="text-4xl text-[#565656]" onClick={handleNextClick} />
      </div>
    </div>
  );
};

export default BestIf;
