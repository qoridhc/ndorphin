import React, { useEffect, useState } from "react";
import rankingApi from "../../../api/rankingApi";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../../../css/home/BestProfile.css";

import { Autoplay, EffectFlip, Pagination, Navigation } from "swiper/modules";
import SwiperProfile from "./SwiperProfile";

interface User {
  profileImage: string | null;
  mbti: string | null;
  nickName: string;
  npoint: number;
  rank: number;
  userId: string;
}

const BestProfile = () => {
  const [userList, setUserList] = useState<User[] | null>(null);
  const [userTempList, setUserTempList] = useState<User[][] | null>(null);

  useEffect(() => {
    getUserList();
  }, []);

  useEffect(() => {
    if (userList && userList.length >= 10) {
      const tempList: User[][] = [];

      for (let i = 0; i < 5; i++) {
        tempList.push([userList[i], userList[i + 5]]);
      }

      setUserTempList(tempList);
    }
  }, [userList]);

  const getUserList = async () => {
    try {
      const response = await rankingApi.nlist();
      setUserList(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("rankingApi nlist : ", error);
    }
  };

  return <div className="best-profile">{userTempList && userTempList.map((userPair, index) => <SwiperProfile key={index} userList={userPair} delay={5000 + 50 * index} />)}</div>;
};

export default BestProfile;
