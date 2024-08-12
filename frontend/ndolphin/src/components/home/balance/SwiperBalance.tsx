import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import "../../../css/home/BestBalance.css";

import { Autoplay, Mousewheel, Pagination } from "swiper/modules";
import rankingApi from "../../../api/rankingApi";
import BalanceCard from "../../balance/BalanceCard";

interface Props {
  rankingType: string;
  startIndex: number;
  delay: number;
}

interface Balance {
  id: number;
  user: {
    userId: number;
    profileImage: string | null;
    mbti: string | null;
    nickName: string;
  };
  content: string;
  subject: string;
  fileNames: string[];
  fileUrls: string[];
  hit: number;
  createdAt: string;
  updatedAt: string | null;
  voteContents: string[];
  totalVoteCnt: number;
}

const SwiperBalance = ({ rankingType, startIndex, delay }: Props) => {
  const [balanceBoardList, setBalanceBoardList] = useState<Balance[] | null>(null);

  useEffect(() => {
    getBalanceBoardList();
  }, [rankingType]);

  const getBalanceBoardList = async () => {
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
      const response = await rankingApi.balancelist(period);
      setBalanceBoardList(response.data.data);
    } catch (error) {
      console.error("rankingApi balancelist : ", error);
    }
  };

  return (
    <div>
      {balanceBoardList ? (
        <Swiper
          initialSlide={startIndex}
          direction={"vertical"}
          slidesPerView={1}
          spaceBetween={30}
          mousewheel={true}
          loop={true}
          autoplay={{
            delay: delay,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Mousewheel, Pagination]}
          className="mySwiper">
          {balanceBoardList.map((balance, index) => (
            <SwiperSlide key={index}>
              <BalanceCard balance={balance} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SwiperBalance;
