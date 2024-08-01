import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import "../../../css/styles.css";

const ServeRelayBook = () => {
  const bookList = [
    {
      id: 1,
      title: "코딱지 대장 버티 1",
      imgUrl: "https://image.yes24.com/Goods/72214794/L",
    },
    {
      id: 2,
      title: "코딱지 대장 버티 2",
      imgUrl: "https://image.yes24.com/goods/33350436/L",
    },
    {
      id: 3,
      title: "코딱지 대장 버티 3",
      imgUrl: "https://image.yes24.com/goods/36916976/L",
    },
    {
      id: 4,
      title: "코딱지 대장 버티 4",
      imgUrl: "https://image.yes24.com/goods/96352123/L",
    },
    {
      id: 5,
      title: "수상한 편의점",
      imgUrl: "https://image.yes24.com/goods/36917053/L",
    },
    {
      id: 6,
      title: "코딱지 대장 버티 1",
      imgUrl: "https://image.yes24.com/goods/45370178/L",
    },
    {
      id: 7,
      title: "수상한 편의점",
      imgUrl: "https://image.yes24.com/goods/45370179/L",
    },
    {
      id: 8,
      title: "코딱지 대장 버티 1",
      imgUrl: "https://image.yes24.com/goods/101477745/L",
    },
    {
      id: 9,
      title: "수상한 편의점",
      imgUrl: "https://image.yes24.com/goods/101477743/L",
    },
    {
      id: 10,
      title: "코딱지 대장 버티 1",
      imgUrl: "https://image.yes24.com/goods/34151542/L",
    },
  ];

  return (
    <Swiper slidesPerView={3} spaceBetween={10} loop={true} navigation={true} modules={[Navigation]} className="mySwiper">
      {bookList.map((book) => (
        <SwiperSlide key={book.id}>
          <div>
            <img className="rounded-xl" src={book.imgUrl} alt="" />
            <div className="pt-1 flex font-semibold">
              <p className="pr-1">{book.id}</p>
              <p className="text-sm">{book.title}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ServeRelayBook;
