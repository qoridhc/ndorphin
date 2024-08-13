import React, { useEffect, useRef, useState } from "react";
import RankingFilter from "../RankingFilter";
import RankingDate from "../RankingDate";
import MainIfCard from "./MainIfCard";
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdArrowDropleft } from "react-icons/io";
import ServeIfCard from "./ServeIfCard";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../../../css/home/BestIf.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import rankingApi from "../../../api/rankingApi";

interface If {
  commentCount: number;
  content: string;
  fileUrls: string[];
  hit: number;
  id: number;
  subject: string;
  user: {
    mbti: string | null;
    nickName: string;
    profileImage: string | null;
    userId: number;
  };
}

const BestIf = () => {
  const [rankingType, setRankingType] = useState("일간");
  const [mainIndex, setMainIndex] = useState(0);
  const [prevIndex, setPreIndex] = useState(4);
  const [nextIndex, setNextIndex] = useState(1);
  const [IfBoardList, setIfBoardList] = useState<If[] | null>(null);
  const swiperRef = useRef<any>(null);
  const [cardListLength, setCardListLength] = useState(0);

  useEffect(() => {
    getIfBoardList();
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(0);
    }
  }, [rankingType]);

  useEffect(() => {
    if (IfBoardList) {
      setCardListLength(IfBoardList.length);
    }
  }, [IfBoardList]);

  const getIfBoardList = async () => {
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
      const response = await rankingApi.iflist("weekly");
      setIfBoardList(response.data.data);
    } catch (error) {
      console.error("rankingApi iflist : ", error);
    }
  };

  return (
    <div className="best-if">
      <div className="flex items-end">
        <span className="pr-5 text-2xl font-bold underline decoration-[#FFDE2F] decoration-4 underline-offset-8">Best 만약에</span>
        <RankingFilter updateRankingType={setRankingType} />
      </div>

      <div className="py-4">
        <RankingDate type={rankingType} />
      </div>

      {IfBoardList && (
        <Swiper
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
          ref={swiperRef}>
          <SwiperSlide>
            <MainIfCard board={IfBoardList[0]} />
          </SwiperSlide>
          {IfBoardList.map((board, index) => (
            <>
              {index !== 0 ? (
                <SwiperSlide key={index}>
                  <MainIfCard board={board} />
                </SwiperSlide>
              ) : (
                <></>
              )}
            </>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default BestIf;
