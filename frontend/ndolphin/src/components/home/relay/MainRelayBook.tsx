import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import "../../../css/styles.css";

const MainRelayBook = () => {
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
    <Swiper loop={true} navigation={true} modules={[Navigation]} className="mySwiper">
      {bookList.map((book) => (
        <SwiperSlide key={book.id}>
          <div className="w-[40%] grid grid-cols-2">
            <img className="w-36 rounded-xl shadow-[5px_5px_5px_5px_rgba(150,150,150,0.3)]" src={book.imgUrl} alt="" />
            <div className="grid grid-rows-[auto_auto_auto_auto_auto]">
              <div className="flex items-end">
                <p className="text-6xl font-bold">{book.id}</p>
                <p className="text-xl font-semibold">{book.title}</p>
              </div>
              <div className="flex items-center">
                <img className="w-10 h-10 rounded-[50%]" src="assets/profile/profile5.png" alt="" />
                <p className="pl-4 font-semibold">상상의 나무꾼</p>
              </div>
              <p className="text-justify">편의점에 근무하는 사람들이 모두 수상한 점을 하나씩 가지고 있는 내용이다. 뭐가 그렇게 수상한걸까..</p>
              <hr className="h-[2px] bg-[#9E9E9E]" />
              <div>
                <div className="flex">
                  <p className="font-semibold text-[#333333]">조회수</p>
                  <p className="pl-2 text-[#565656]">216 회</p>
                </div>

                <div className="flex">
                  <p className="font-semibold text-[#333333]">공감수</p>
                  <p className="pl-2 text-[#565656]">64 개</p>
                </div>
              </div>
            </div>
          </div>
          {/* <div>
            <p className="text-6xl font-bold">{book.id}</p>
            <p className="text-xl font-semibold">{book.title}</p>
          </div>

          <div className="flex items-center">
            <img className="w-10 h-10 rounded-[50%]" src="assets/profile/profile5.png" alt="" />
            <p className="pl-4 font-semibold">상상의 나무꾼</p>
          </div> */}
        </SwiperSlide>
      ))}
    </Swiper>

    // <Swiper loop={true} navigation={true} modules={[Navigation]} className="mySwiper">
    //   {bookList.map((book) => (
    //     <SwiperSlide key={book.id}>
    //       <div className="w-[40%] absolute grid grid-cols-2">
    //         <img className="w-[90%] rounded-xl shadow-[5px_5px_5px_5px_rgba(150,150,150,0.3)]" src={book.imgUrl} alt="" />
    //         <div className="grid grid-rows-[auto_auto_auto_auto_auto]">
    //           <div className="flex items-end">
    //             <p className="text-6xl font-bold">{book.id}</p>
    //             <p className="text-xl font-semibold">{book.title}</p>
    //           </div>
    //           <div className="flex items-center">
    //             <img className="w-10 h-10 rounded-[50%]" src="assets/profile/profile5.png" alt="" />
    //             <p className="pl-4 font-semibold">상상의 나무꾼</p>
    //           </div>
    //           <p className="text-justify">편의점에 근무하는 사람들이 모두 수상한 점을 하나씩 가지고 있는 내용이다. 뭐가 그렇게 수상한걸까..</p>
    //           <hr className="h-[2px] bg-[#9E9E9E]" />
    //           <div>
    //             <div className="flex">
    //               <p className="font-semibold text-[#333333]">조회수</p>
    //               <p className="pl-2 text-[#565656]">216 회</p>
    //             </div>
    //             <div className="flex">
    //               <p className="font-semibold text-[#333333]">공감수</p>
    //               <p className="pl-2 text-[#565656]">64 개</p>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </SwiperSlide>
    //   ))}
    // </Swiper>
  );
};

export default MainRelayBook;
