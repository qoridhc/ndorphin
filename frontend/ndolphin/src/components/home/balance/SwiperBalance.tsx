import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import "../../../css/home/BestBalance.css";

import { Autoplay, Mousewheel, Pagination } from "swiper/modules";

interface Props {
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

const SwiperBalance = ({ startIndex, delay }: Props) => {
  return (
    <div>
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
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SwiperBalance;
