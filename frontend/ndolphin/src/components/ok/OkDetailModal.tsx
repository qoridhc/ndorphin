import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

interface Props {
  selectedImageList: { id: number; imgUrl: string }[] | null;
  selectedImageListIndex: number;
  setSelectedImageList: (selected: { id: number; imgUrl: string }[] | null) => void;
}

const OkDetailModal = ({ selectedImageList, selectedImageListIndex, setSelectedImageList }: Props) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(selectedImageListIndex);

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

            <div className="bg-white"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default OkDetailModal;
