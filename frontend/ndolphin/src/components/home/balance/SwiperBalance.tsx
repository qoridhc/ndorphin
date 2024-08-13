import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "../../../css/home/BestBalance.css";
import { Autoplay, Pagination } from "swiper/modules";
import rankingApi from "../../../api/rankingApi";
import BalanceCard from "../../balance/BalanceCard";

interface Props {
  rankingType: string;
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

const SwiperBalance = ({ rankingType }: Props) => {
  const [balanceBoardList, setBalanceBoardList] = useState<Balance[] | null>(null);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    getBalanceBoardList();
  }, [rankingType]);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(0); // Move to the first slide
    }
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
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
          ref={swiperRef} // Attach ref to Swiper
        >
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
