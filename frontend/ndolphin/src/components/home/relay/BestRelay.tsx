import React, { useEffect, useState } from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import RankingFilter from "../RankingFilter";
import RankingDate from "../RankingDate";
import MainRelayBook from "./MainRelayBook";
import ServeRelayBook from "./ServeRelayBook";
import rankingApi from "../../../api/rankingApi";
import Lottie from "lottie-react";
import detailLoading from "../../../lottie/detailLoading.json";

interface Relay {
  id: number;
  hit: number;
  content: string;
  subject: string;
  fileUrls: string[] | null;
  reactionCount: number;
  summary: string;
  user: {
    nickName: string;
    profileImage: string;
    mbti: string;
    userId: number;
  };
}

const BestRelay = () => {
  const [rankingType, setRankingType] = useState("일간");
  const [currentIndex, setCurrentIndex] = useState(1);
  const [mainIndex, setMainIndex] = useState(0);
  const [relayBoardList, setRelayBoardList] = useState<Relay[] | null>(null);
  const [visibleBooks, setVisibleBooks] = useState<Relay[] | null>(null);
  const [bookListLength, setBookListLength] = useState(0);

  useEffect(() => {
    getRelayBoardList();
    setMainIndex(0);
    setCurrentIndex(1);
  }, [rankingType]);

  useEffect(() => {
    if (relayBoardList) {
      setVisibleBooks(relayBoardList.concat(relayBoardList).slice(currentIndex, currentIndex + 2));
      setBookListLength(relayBoardList.length);
    }
  }, [relayBoardList, mainIndex, currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextClick();
    }, 5000); // 5초마다 슬라이드 변경

    return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 클리어
  }, [mainIndex, currentIndex, bookListLength]);

  const getRelayBoardList = async () => {
    try {
      let period = "";
      switch (rankingType) {
        case "일간":
          period = "daily";
          break;
        case "주간":
          period = "weekly";
          break;
        case "월간":
          period = "monthly";
          break;
      }
      const response = await rankingApi.relaylist(period);
      setRelayBoardList(response.data.data);
    } catch (error) {
      console.error("rankingApi relaylist : ", error);
    }
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? bookListLength - 1 : prevIndex - 1));
    setMainIndex((prevIndex) => (prevIndex === 0 ? bookListLength - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bookListLength);
    setMainIndex((prevIndex) => (prevIndex + 1) % bookListLength);
  };

  return (
    <div className="py-14 bg-[#FFFDEF]">
      <div className="px-44 flex items-end">
        <span className="pr-5 text-2xl font-bold underline decoration-[#FFDE2F] decoration-4 underline-offset-8">Best 릴레이북</span>
        <RankingFilter updateRankingType={setRankingType} />
      </div>

      <div className="px-44 py-4">
        <RankingDate type={rankingType} />
      </div>

      <div className="py-5 relative flex items-center">
        <button className="absolute left-20" onClick={handlePrevClick}>
          <IoIosArrowDropleft className="text-5xl text-[#565656]" />
        </button>

        <div className="w-full h-[300px] px-44 grid grid-cols-[6fr_4fr] gap-40">
          {relayBoardList && visibleBooks ? (
            <>
              <MainRelayBook mainIndex={mainIndex} relay={relayBoardList[mainIndex]} />
              <ServeRelayBook bookListLength={bookListLength} currentIndex={currentIndex} visibleBooks={visibleBooks} />
            </>
          ) : (
            <div className="col-span-2 flex justify-center">
              <Lottie className="w-36" animationData={detailLoading} />
            </div>
          )}
        </div>

        <button className="absolute right-20" onClick={handleNextClick}>
          <IoIosArrowDropright className="text-5xl text-[#565656]" />
        </button>
      </div>
    </div>
  );
};

export default BestRelay;
