import React, { useState, ChangeEvent } from "react";

interface Props {
  setImage: (image: string) => void;
  setFile: (file: File) => void;
}

const InsertionImage = ({ setImage, setFile }: Props) => {
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="py-3 grid grid-cols-[49%_2%_49%]">
      {/* 이미지 첨부 버튼 */}
      {/* AI 이미지 첨부 버튼 */}
      <div className="flex flex-col items-center justify-center">
        <button className="w-32 px-2 py-1 flex justify-between items-center rounded-3xl border border-solid border-zinc-300 font-bold text-zinc-800">
          <img src="/assets/aiImageIcon.png" className="w-5" alt="#"></img>
          <p className="text-xs">AI 이미지 생성</p>
        </button>
      </div>

      <div className="flex justify-center items-center">
        <hr className="h-10 border-l border-dashed border-zinc-400"></hr>
      </div>

      {/* 직접 사진 첨부 버튼 */}
      <div className="flex flex-col items-center justify-center">
        <label htmlFor="image-input">
          <div className="w-32 px-2 py-1 flex items-center cursor-pointer rounded-3xl border border-solid border-zinc-300 font-bold text-zinc-800">
            <img src="/assets/addImageIcon.png" className="w-5" alt="#"></img>
            <p className="ml-5 text-xs">사진 첨부</p>
          </div>
        </label>
        <input className="hidden" id="image-input" type="file" accept="image/*" onChange={handleImageChange} />
      </div>
    </div>
  );
};

export default InsertionImage;
