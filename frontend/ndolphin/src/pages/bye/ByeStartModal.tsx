import React, { ChangeEvent, useEffect, useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

interface Props {
  setIsCreateModal: (state: boolean) => void;
}

const ByeStartModal = ({ setIsCreateModal }: Props) => {
  const [imageList, setImageList] = useState<string[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [textCount, setTextCount] = useState(0);
  const [slideState, setSlideState] = useState(0); // 0 : 앞, 1 : 뒤
  const [currentSlideList, setCurrentSlideList] = useState<string[]>([]);
  const [switched, setswitched] = useState(0)

  const handleClose = () => {
    setIsCreateModal(false);
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImageList: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          newImageList.push(result);
          if (newImageList.length === files.length) {
            setImageList((prev) => {
              const updatedList = [...prev, ...newImageList].slice(0, 4);
              if (updatedList.length > 2) {
                setSlideState(1);
                setCurrentSlideList(updatedList.slice(2, 4));
              } else {
                setSlideState(0);
                setCurrentSlideList(updatedList.slice(0, 2));
              }
              return updatedList;
            });
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value.length;
    setTextCount(text);
    const rows = event.target.value.split(/\r\n|\r|\n/).length;
    setRowCount(rows);
  };

  const handlePrev = () => {
    setSlideState(0);
    setCurrentSlideList(imageList.slice(0, 2));
  };

  const handleNext = () => {
    setSlideState(1);
    setCurrentSlideList(imageList.slice(2, 4));
  };

  const deleteImage = (currentIndex: number) => {
    const actualIndex = slideState === 0 ? currentIndex : currentIndex + 2;
    setImageList((prev) => {
      const newImageList = prev.filter((_, i) => i !== actualIndex);
      if (newImageList.length > 2) {
        setCurrentSlideList(newImageList.slice(slideState === 0 ? 0 : 2, slideState === 0 ? 2 : 4));
      } else {
        setSlideState(0);
        setCurrentSlideList(newImageList);
      }
      return newImageList;
    });
  };

  useEffect(() => {
    const targetTextarea = document.querySelector(`#target`) as HTMLTextAreaElement | null;
    if (targetTextarea) {
      targetTextarea.style.height = rowCount * 28 + "px";
    }
  }, [rowCount]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-[40%] max-h-[90%] p-5 bg-white rounded-2xl grid gap-3">
        <button onClick={handleClose}>
          <IoMdClose className="text-2xl" />
        </button>

        <div className="grid grid-cols-[1fr_8fr]">
          <img className="w-11 h-11 rounded-[50%]" src="/assets/profile/profile3.png" alt="" />
          <div className="max-h-[450px] grid gap-3 overflow-y-auto">
            <textarea className="w-full min-h-28 text-xl font-medium outline-none resize-none" placeholder="어떤 인사를 전하실 건가요?" name="" id="target" onChange={(e) => handleTextareaChange(e)}></textarea>

            <div className="grid grid-cols-2 gap-2 relative">
              {imageList.length <= 2 || slideState === 0 ? (
                <></>
              ) : (
                <button className="absolute top-1/2 left-1 translate-y-[-50%] z-50" onClick={handlePrev}>
                  <SlArrowLeft className="text-4xl p-2 text-white bg-black rounded-[50%] opacity-85" />
                </button>
              )}
              {currentSlideList.map((image, index) => (
                <div className="relative">
                  <img key={index} className="w-full h-72 rounded-md object-cover" src={image} alt="" />
                  <button className="absolute top-1 right-1 z-50" onClick={() => deleteImage(index)}>
                    <RiDeleteBinLine className="p-1 text-3xl bg-white rounded-[50%] opacity-85" />
                  </button>
                </div>
              ))}
              {imageList.length <= 2 || slideState === 1 ? (
                <></>
              ) : (
                <button className="absolute top-1/2 right-1 translate-y-[-50%] z-50" onClick={handleNext}>
                  <SlArrowRight className="p-2 text-4xl text-white bg-black rounded-[50%] opacity-70" />
                </button>
              )}
            </div>
          </div>
        </div>

        <hr />

        <div className="px-3 flex justify-between">
          <div className="w-56 flex justify-between">
            <label className="flex" htmlFor="ntos">
              <input type="checkbox" id="ntos" disabled={switched === 0} checked={switched === 1} />
              <img className={`mx-2 w-[5rem] ${switched === 0 ? "opacity-20" : ""}`} src="/assets/bye/nToS.png" alt="nToS" />
            </label>
            <label className="flex" htmlFor="ston">
              <input type="checkbox" id="ston" disabled={switched === 1} checked={switched === 0} />
              <img className={`mx-2 w-[5rem] ${switched === 1 ? "opacity-20" : ""}`} src="/assets/bye/sToN.png" alt="sToN" />
            </label>
          </div>
          <button className={`px-7 py-1 shadow-md rounded-3xl font-bold bg-amber-300 text-white ${textCount === 0 ? "opacity-50" : ""}`} disabled={textCount === 0}>
            완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default ByeStartModal;
