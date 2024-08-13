import React, { ChangeEvent, useEffect, useState } from "react";
import OkDetailModal from "../../components/ok/OkDetailModal";
import { FaArrowLeftLong, FaRegComment } from "react-icons/fa6";
import SettingsMenu from "../../components/if/CommentSettingMenu";
import { useNavigate } from "react-router";

const OkDetail = () => {
  const navigate = useNavigate();
  const [selectedImageList, setSelectedImageList] = useState<{ id: number; imgUrl: string }[] | null>(null);
  const [selectedImageListIndex, setSelectedImageListIndex] = useState(0);
  const [rowCount, setRowCount] = useState(0);

  const okContentList = [
    {
      id: 1,
      profileImgUrl: "/assets/profile/profile3.png",
      user: "상상의 나무꾼",
      date: "2024-07-30 01:22",
      content: "5일 전에 사랑니 뺐는데 왜 안아프죠..? 만약에 갑자기 내일 죽을정도로 아프진 않겠죠?? 드라이소켓이라는 병도 있던데 ㅜㅜ 아직 아프진 않는데.. 하도 안아파서 만약에 아프면 엄청 아플거 같은데..",
      imgList: [
        {
          id: 1,
          imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3AwHJ2UrkzSv6PqPhCBZGRR8RrpQNCuDAxg&s",
        },
      ],
      joinCount: 12,
      commentData: [
        {
          id: 1,
          profileImgUrl: "/assets/profile/profile1.png",
          user: "상상의 나무꾼",
          content: "이참에 티라노 사우르스랑 싸워고 평생 안주감 어때 이참에 영웅놀이 해보자 진심 어때",
          date: "2024-07-29 21:02",
        },
        {
          id: 2,
          profileImgUrl: "/assets/profile/profile2.png",
          user: "만약핑인데",
          content: "허허허..... 하루만 더 생각좀.. 생각이 많아지는 만약에 잘썼다",
          date: "2024-07-29 21:02",
        },
        {
          id: 3,
          profileImgUrl: "/assets/profile/profile3.png",
          user: "별이 빛나는 밤",
          content: "혹시 무기 있음? 있으면 내가 영웅할게",
          date: "2024-07-29 21:02",
        },
      ],
    },
    {
      id: 2,
      profileImgUrl: "/assets/profile/profile2.png",
      user: "삶은계란",
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
      commentData: [
        {
          id: 1,
          profileImgUrl: "/assets/profile/profile1.png",
          user: "상상의 나무꾼",
          content: "이참에 티라노 사우르스랑 싸워고 평생 안주감 어때 이참에 영웅놀이 해보자 진심 어때",
          date: "2024-07-29 21:02",
        },
        {
          id: 2,
          profileImgUrl: "/assets/profile/profile2.png",
          user: "만약핑인데",
          content: "허허허..... 하루만 더 생각좀.. 생각이 많아지는 만약에 잘썼다",
          date: "2024-07-29 21:02",
        },
        {
          id: 3,
          profileImgUrl: "/assets/profile/profile3.png",
          user: "별이 빛나는 밤",
          content: "혹시 무기 있음? 있으면 내가 영웅할게",
          date: "2024-07-29 21:02",
        },
      ],
    },
    {
      id: 3,
      profileImgUrl: "/assets/profile/profile5.png",
      user: "근데 말약에",
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
      commentData: [
        {
          id: 1,
          profileImgUrl: "/assets/profile/profile1.png",
          user: "상상의 나무꾼",
          content: "이참에 티라노 사우르스랑 싸워고 평생 안주감 어때 이참에 영웅놀이 해보자 진심 어때",
          date: "2024-07-29 21:02",
        },
        {
          id: 2,
          profileImgUrl: "/assets/profile/profile2.png",
          user: "만약핑인데",
          content: "허허허..... 하루만 더 생각좀.. 생각이 많아지는 만약에 잘썼다",
          date: "2024-07-29 21:02",
        },
        {
          id: 3,
          profileImgUrl: "/assets/profile/profile3.png",
          user: "별이 빛나는 밤",
          content: "혹시 무기 있음? 있으면 내가 영웅할게",
          date: "2024-07-29 21:02",
        },
      ],
    },
    {
      id: 4,
      profileImgUrl: "/assets/profile/profile2.png",
      user: "만약핑인데",
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
      commentData: [
        {
          id: 1,
          profileImgUrl: "/assets/profile/profile1.png",
          user: "상상의 나무꾼",
          content: "이참에 티라노 사우르스랑 싸워고 평생 안주감 어때 이참에 영웅놀이 해보자 진심 어때",
          date: "2024-07-29 21:02",
        },
        {
          id: 2,
          profileImgUrl: "/assets/profile/profile2.png",
          user: "만약핑인데",
          content: "허허허..... 하루만 더 생각좀.. 생각이 많아지는 만약에 잘썼다",
          date: "2024-07-29 21:02",
        },
        {
          id: 3,
          profileImgUrl: "/assets/profile/profile3.png",
          user: "별이 빛나는 밤",
          content: "혹시 무기 있음? 있으면 내가 영웅할게",
          date: "2024-07-29 21:02",
        },
      ],
    },
  ];
  const userData = {
    user: "근데 말약에",
    profileImgUrl: "/assets/profile/profile4.png",
  };

  const handleselectedImageList = (currentIndex: number) => {
    setSelectedImageList(okContentList[1].imgList);
    setSelectedImageListIndex(currentIndex);
  };

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    // const text = event.target.value.length;
    // setTextCount(text);
    const rows = event.target.value.split(/\r\n|\r|\n/).length;
    setRowCount(rows);
  };

  useEffect(() => {
    const targetTextarea = document.querySelector(`#target`) as HTMLTextAreaElement | null;
    if (targetTextarea) {
      targetTextarea.style.height = rowCount * 28 + "px";
    }
  }, [rowCount]);

  const renderImages = () => {
    switch (okContentList[1].imgList.length) {
      case 1:
        return <img className="w-full rounded-md object-cover cursor-pointer" src={`${okContentList[1].imgList[1].imgUrl}`} alt="" onClick={() => handleselectedImageList(0)} />;

      case 2:
        return (
          <div className="grid grid-cols-2 gap-1">
            {okContentList[1].imgList.map((img, idx) => (
              <img className={`w-full h-72 object-cover ${idx === 0 ? "rounded-tl-md rounded-bl-md" : "rounded-tr-md rounded-br-md"} cursor-pointer`} src={`${img.imgUrl}`} alt="" key={img.id} onClick={() => handleselectedImageList(idx)} />
            ))}
          </div>
        );

      case 3:
        return (
          <div className="grid grid-rows-2 grid-cols-2 gap-1">
            <img className="w-full h-full object-cover row-span-2 rounded-tl-md rounded-bl-md cursor-pointer" src={`${okContentList[1].imgList[1].imgUrl}`} alt="" onClick={() => handleselectedImageList(0)} />
            <img className="w-full h-36 object-cover rounded-tr-md cursor-pointer" src={`${okContentList[1].imgList[1].imgUrl}`} alt="" onClick={() => handleselectedImageList(1)} />
            <img className="w-full h-36 object-cover rounded-br-md cursor-pointer" src={`${okContentList[1].imgList[2].imgUrl}`} alt="" onClick={() => handleselectedImageList(2)} />
          </div>
        );

      case 4:
        return (
          <div className="grid grid-cols-2 gap-1">
            {okContentList[1].imgList.map((img, idx) => (
              <img
                className={`w-full h-36 object-cover ${idx === 0 ? "rounded-tl-md" : idx === 1 ? "rounded-tr-md" : idx === 2 ? "rounded-bl-md" : "rounded-br-md"} cursor-pointer`}
                src={`${img.imgUrl}`}
                alt=""
                key={img.id}
                onClick={() => handleselectedImageList(idx)}
              />
            ))}
          </div>
        );
    }
  };

  return (
    <div className="px-44 py-5 grid grid-cols-[1fr_2fr_1fr] gap-5">
      <div className="col-start-2">
        <button className="py-4 flex" onClick={() => navigate("/oklist")}>
          <FaArrowLeftLong className="text-3xl" />
          <p className="px-3 text-xl font-bold">괜찮아 게시판</p>
        </button>
        <div className="border-t border-x">
          <div className="p-5 border-b flex">
            <img className="w-9 h-9 mr-3 rounded-[50%]" src={`${okContentList[1].profileImgUrl}`} alt="" />

            <div className="grid gap-3">
              <div>
                <p className="font-bold">{okContentList[1].user}</p>
                <p className="text-sm font-semibold text-[#565656]">{okContentList[1].date}</p>
              </div>

              <p className="font-medium text-justify leading-snug">{okContentList[1].content}</p>

              {renderImages()}

              <div className="flex items-center">
                <FaRegComment />
                {okContentList[1].joinCount === 0 ? <></> : <p className="px-1 text-[#565656] font-semibold">{okContentList[1].joinCount}</p>}
              </div>
            </div>
          </div>

          <div className="p-5 border-b">
            <div className="flex">
              <img className="w-11 h-11 mr-3 rounded-[50%]" src={`${userData.profileImgUrl}`} alt="" />
              <textarea className="w-full min-h-10 text-xl outline-none resize-none" placeholder="댓글을 작성해 주세요" id="target" onChange={(e) => handleTextareaChange(e)} />
            </div>
            <div className="flex justify-end">
              <button className="w-16 text-[#6C6C6C] font-semibold border-solid border-2 border-[#FFDE2F] rounded-md hover:text-white hover:bg-[#FFDE2F] duration-200">등록</button>
            </div>
          </div>

          {okContentList[1].commentData.map((comment) => (
            <div className="p-5 border-b flex" key={comment.id}>
              <img className="w-9 h-9 mr-3 rounded-[50%]" src={`${comment.profileImgUrl}`} alt="" />

              <div className="w-full grid gap-2">
                <div className="grid grid-cols-[6fr_1fr]">
                  <div className="flex flex-col justify-around">
                    <p className="font-bold">{comment.user}</p>
                    <p className="text-xs text-[#565656]">3일 전</p>
                  </div>
                  {/* <SettingsMenu /> */}
                </div>

                <p className="text-[#565656] font-medium text-justify">{comment.content}</p>

                <p className="text-sm text-[#565656] text-right">{comment.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* {selectedImageList && <OkDetailModal content={okContentList[1]} selectedImageList={selectedImageList} selectedImageListIndex={selectedImageListIndex} setSelectedImageList={setSelectedImageList} />} */}
    </div>
  );
};

export default OkDetail;
