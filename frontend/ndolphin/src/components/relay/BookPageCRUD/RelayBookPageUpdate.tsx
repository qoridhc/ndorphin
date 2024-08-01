import "../../../css/InputPlaceHolder.css";
import React, { useState, ChangeEvent } from "react";

interface RelayBookPageUpdateProps {
  page: {
    id: number;
    userId: number;
    user: string;
    content: string;
    pageImage: string;
  };
  setPageUpdate: (type: boolean) => void;
}

const RelayBookPageUpdate: React.FC<RelayBookPageUpdateProps> = ({ page, setPageUpdate }) => {
  const [image, setImage] = useState<string | null>(null);
  const [contentUpdate, setContentUpdate] = useState(page.content);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContentUpdate(value);
  };

  return (
    <div className="flex flex-col items-between">
      {/* 구분선 및 등록 버튼 */}
      <div>
        <div className="w-full flex justify-between m-2">
          <p className="mx-4 text-lg font-bold">릴레이북 페이지 수정하기</p>
          <div className="flex justify-end">
            <button
              onClick={() => {
                setPageUpdate(false);
              }}
              className="w-16 mx-3 text-[#6C6C6C] font-semibold border-solid border-2 border-[#c2c2c2] rounded-md hover:text-white hover:bg-[#c2c2c2] duration-200">
              취소
            </button>
            <button className="w-16 mr-12 text-[#6C6C6C] font-semibold border-solid border-2 border-[#FFDE2F] rounded-md hover:text-white hover:bg-[#FFDE2F] duration-200">완료</button>
          </div>
        </div>
        <div className="w-full mb-2">
          <div className="flex flex-col items-center">
            <hr className="flex justify-center w-[90%] border-zinc-950" />
          </div>
        </div>
      </div>

      {/* 본문 작성 form */}
      <div className="flex flex-col items-center">
        <div className="w-[90%] border border-zinc-950">
          <p className="mx-2 my-1 font-bold flex">본문</p>
          <hr className="mx-3 my-1 border-zinc-900" />
          <textarea onChange={handleContentChange} className="notes w-full h-[100px] resize-none focus:outline-none placeholder:text-zinc-400" placeholder="'만약에~' 내용을 입력해 이야기를 이어주세요" aria-label={contentUpdate} value={contentUpdate}></textarea>
        </div>
      </div>

      {/* 이미지 첨부 form */}
      <div className="flex flex-col items-center">
        <div className="w-[90%] mt-3 border border-zinc-950">
          <p className="mx-2 my-1 font-bold flex">이미지</p>
          <hr className="mx-3 my-1 border-zinc-900" />
          <div className="mt-2">
            <div className="flex justify-center items-center">
              <img src={image || page.pageImage} alt="#" className="w-64 h-56 border rounded-md" />
            </div>

            {/* 이미지 첨부 버튼 */}
            <div className="py-3 h-full grid grid-cols-[49%_2%_49%]">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelayBookPageUpdate;
