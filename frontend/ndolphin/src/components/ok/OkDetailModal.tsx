import React, { useState } from "react";
import { FaRegComment } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

interface Props {
  content: {
    id: number;
    profileImgUrl: string;
    user: string;
    date: string;
    content: string;
    imgList: {
      id: number;
      imgUrl: string;
    }[];
    joinCount: number;
  };
  selectedImageList: { id: number; imgUrl: string }[] | null;
  selectedImageListIndex: number;
  setSelectedImageList: (selected: { id: number; imgUrl: string }[] | null) => void;
}

const OkDetailModal = ({ content, selectedImageList, selectedImageListIndex, setSelectedImageList }: Props) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(selectedImageListIndex);
  const commentData = [
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
  ];
  const userData = {
    user: "근데 말약에",
    profileImgUrl: "/assets/profile/profile4.png",
  };

  const handleClose = () => {
    setSelectedImageList(null);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev === 0 && selectedImageList ? selectedImageList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (selectedImageList ? (prev + 1) % selectedImageList.length : prev));
  };

  return (
    <>
      {selectedImageList && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
          <div className="w-full h-full relative grid grid-cols-[3fr_1fr]">
            <button className="p-1 absolute top-2 left-2 z-50 text-white bg-black rounded-full" onClick={handleClose}>
              <IoMdClose className="text-2xl" />
            </button>

            <div className="px-5 relative flex justify-between items-center">
              <button className="p-1" onClick={handlePrev} disabled={currentSlideIndex === 0}>
                <SlArrowLeft className={currentSlideIndex === 0 ? `text-3xl text-white opacity-0` : `text-3xl text-white`} />
              </button>

              <div className="p-5 ">
                <img className="min-w-96" src={selectedImageList[currentSlideIndex].imgUrl} alt="" />
              </div>

              <button className="p-1" onClick={handleNext} disabled={currentSlideIndex === selectedImageList.length - 1}>
                <SlArrowRight className={currentSlideIndex === selectedImageList.length - 1 ? `text-3xl text-white opacity-0` : `text-3xl text-white`} />
              </button>
            </div>

            <div className="bg-white overflow-y-auto hide-scrollbar">
              <div className="p-3 border-b grid gap-2">
                <div className="grid grid-cols-[1fr_5fr]">
                  <img className="w-11 h-11 rounded-[50%]" src={`${content.profileImgUrl}`} alt="" />
                  <div className="flex flex-col justify-around">
                    <p className="font-bold">{content.user}</p>
                    <p className="text-xs text-[#565656]">3일 전</p>
                  </div>
                </div>

                <p className="font-semibold text-[#565656] text-justify leading-snug">{content.content}</p>
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <FaRegComment />
                    {content.joinCount === 0 ? <></> : <p className="px-1 text-sdm text-[#565656]">{content.joinCount}</p>}
                  </div>
                  <p className="text-sm text-[#565656] text-right">{content.date}</p>
                </div>
              </div>

              <div className="p-3 border-b">
                <div className="grid grid-cols-[1fr_6fr]">
                  <img className="w-9 h-9 rounded-[50%]" src={`${userData.profileImgUrl}`} alt="" />
                  <textarea className="w-full p-1 text-lg text-left outline-none resize-none" placeholder="댓글을 작성해 주세요" />
                </div>
                <div className="flex justify-end">
                  <button className="w-16 text-[#6C6C6C] font-semibold border-solid border-2 border-[#FFDE2F] rounded-md hover:text-white hover:bg-[#FFDE2F] duration-200">등록</button>
                </div>
              </div>

              {commentData.map((comment) => (
                <div className="p-3 border-b grid grid-cols-[1fr_6fr]" key={comment.id}>
                  <img className="w-9 h-9 rounded-[50%]" src={`${comment.profileImgUrl}`} alt="" />

                  <div className="w-full grid gap-2">
                    <div className="flex flex-col justify-around">
                      <p className="text-sm font-semibold">{comment.user}</p>
                      <p className="text-xs text-[#565656]">3일 전</p>
                    </div>

                    <p className="text-[#565656] font-medium text-justify">{comment.content}</p>

                    <p className="text-sm text-[#565656] text-right">{comment.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OkDetailModal;
