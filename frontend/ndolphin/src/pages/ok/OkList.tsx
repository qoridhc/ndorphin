import React, { useState } from "react";
import MiniSearchBar from "../../components/ok/MiniSearchBar";
import OkContent from "../../components/ok/OkContent";
import OkStartModal from "./OkStartModal";

const OkList = () => {
  const [isCreateModal, setIsCreateModal] = useState(false);
  const okContentList = [
    {
      id: 1,
      profileImgUrl: "/assets/profile/profile3.png",
      user: "상상의 나무꾼",
      badget: "N",
      date: "2024-07-30 01:22",
      content: "5일 전에 사랑니 뺐는데 왜 안아프죠..? 만약에 갑자기 내일 죽을정도로 아프진 않겠죠?? 드라이소켓이라는 병도 있던데 ㅜㅜ 아직 아프진 않는데.. 하도 안아파서 만약에 아프면 엄청 아플거 같은데..",
      imgList: [
        {
          id: 1,
          imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3AwHJ2UrkzSv6PqPhCBZGRR8RrpQNCuDAxg&s",
        },
      ],
      joinCount: 12,
    },
    {
      id: 2,
      profileImgUrl: "/assets/profile/profile2.png",
      user: "삶은계란",
      badget: "S",
      date: "2024-07-29 01:22",
      content: "어제 계란을 삶았는데 냉장고에 안넣었거든요 오늘 먹어도 되나요?? 만약에 배탈나면 어떡해요 ㅠ 요즘 날 더워서 조심해야되는데 만약에 배탈나서 맹장터지고!!",
      imgList: [
        {
          id: 1,
          imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1DZxbcaol1q-N-iA_jJkk95PssTlYXMobyA&s",
        },
        {
          id: 2,
          imgUrl: "https://img.freepik.com/premium-photo/burnt-hard-boiled-eggs-pot-eggs-burned-by-boiling-until-water-dries_45264-78.jpg",
        },
        {
          id: 3,
          imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQXLssi3iB0pd0cNqThGw-X1bg8WMPOaKCaQ&s",
        },
        {
          id: 4,
          imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYCPaPeFrnWYu9EYHBBDKcdOORiGhvosNZBg&s",
        },
      ],
      joinCount: 0,
    },
    {
      id: 3,
      profileImgUrl: "/assets/profile/profile5.png",
      user: "근데 말약에",
      badget: "S",
      date: "2024-06-29 01:22",
      content: "오늘 일어났는데 다래끼 났어요 다래끼 너무 커지면 어떻게 돼요 ㅠㅠㅠ 수술해요?? 만약에 다래끼 안빠지면 어떡하지 ㅠ 저 내일 초등학교 졸업사진 찍어요",
      imgList: [
        {
          id: 1,
          imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUzn7lDyMA6kHGqAVj_Gd3p59vnhMwuvXb-g&s",
        },
        {
          id: 2,
          imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGa_e2SL0_u_Hb_SKanee1SDVSpUog7rdQMg&s",
        },
      ],
      joinCount: 5,
    },
    {
      id: 4,
      profileImgUrl: "/assets/profile/profile2.png",
      user: "만약핑인데",
      badget: "N",
      date: "2024-07-30 14:00",
      content: "제가 어제 청소를 한다고 냉동실 문을 열었는데 오늘 출근할 때 냉동실 문을 닫았는지 기억이 안나요2박동안 집에 안들어 갈 예정인데 냉동실 문 열려있으면 어떡하죠 안에 있는 거 다 녹고 전기세도 만만치 않죠 ..o..",
      imgList: [
        {
          id: 1,
          imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRH6Fk1AXjnDQT9WZgqO_VPigAdxSQst7qvQ&s",
        },
        {
          id: 2,
          imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAxWBeSt1k9cOrUcNEvuOaBD2RMiLtmRX98g&s",
        },
        {
          id: 3,
          imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRH6Fk1AXjnDQT9WZgqO_VPigAdxSQst7qvQ&s",
        },
      ],
      joinCount: 3,
    },
  ];

  return (
    <div>
      <div className="flex flex-col justify-center">
        <div className="w-full px-44 py-6 flex-col items-center">
          <div className="py-5 flex items-end">
            <p className="text-xl font-bold">괜찮아</p>
            <p className="pl-3 text-xs">‘만약에~’로 시작된 걱정으로 고민하는 사람들이 위로받는 공간</p>
          </div>
          <hr className="w-full" />
        </div>
      </div>

      <div className="px-44">
        <div className="py-5 grid grid-cols-[1fr_2fr_1fr] gap-5">
          <div className="col-start-2">
            {okContentList.map((content, index) => (
              <OkContent content={content} key={index} />
            ))}
          </div>

          <div className="">
            <MiniSearchBar />

            <button
              className="w-full my-3 px-7 py-2 shadow-md rounded-2xl font-bold bg-amber-300 text-black"
              onClick={() => {
                setIsCreateModal(true);
              }}>
              고민 작성하기
            </button>
          </div>
        </div>
      </div>

      {isCreateModal && <OkStartModal setIsCreateModal={setIsCreateModal} />}
    </div>
  );
};

export default OkList;
