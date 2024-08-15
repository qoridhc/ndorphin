import React, { useState } from "react";
import { useNavigate } from "react-router";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../../../css/home/BestProfile.css";

import { Autoplay, EffectFlip, Pagination, Navigation } from "swiper/modules";

interface Props {
  userList: User[];
  delay: number;
}

interface User {
  profileImage: string | null;
  mbti: string | null;
  nickName: string;
  npoint: number;
  rank: number;
  userId: string;
}

const SwiperProfile = ({ userList, delay }: Props) => {
  const navigate = useNavigate();

  const handleUserClick = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <Swiper
      direction={"vertical"}
      loop={true}
      autoplay={{
        delay: delay,
        disableOnInteraction: false,
      }}
      effect={"flip"}
      // grabCursor={true}
      // pagination={true}
      // navigation={true}
      modules={[Autoplay, EffectFlip, Pagination, Navigation]}
      className="mySwiper">
      {userList.map((user) => (
        <SwiperSlide>
          <div
            onClick={() => {
              handleUserClick(user.userId);
            }}
            className="w-full px-10 py-2 grid grid-cols-[1fr_6fr_2fr] hover:scale-110 duration-200 cursor-pointer"
            key={user.rank}>
            <div className="w-14 flex items-center">{user.rank < 4 ? <img className="w-8 h-8" src={`/assets/ranking/rank${user.rank}.png`} alt="" /> : <p className="w-8 text-center text-2xl font-bold">{user.rank}</p>}</div>
            <div className="flex items-center">
              <img className="w-9 h-9 mr-3 border rounded-[50%] cursor-pointer hover:brightness-90 transition duration-200 ease-in-out object-contain" src={user.profileImage === null ? "/assets/user/defaultProfile.png" : user.profileImage} alt="" />
              <p className="font-semibold hover:underline hover:underline-offset-2">{user.nickName}</p>
              {<img className="w-5 h-5 ml-1" src={`/assets/${user.mbti === null ? "noBadget.png" : user.mbti === "N" ? "nBadget.png" : "sBadget.png"}`} alt="badget" />}
            </div>
            <div className="flex justify-end items-center">
              <p className="font-medium">{user.npoint}</p>
              <p className="font-medium">P</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperProfile;
