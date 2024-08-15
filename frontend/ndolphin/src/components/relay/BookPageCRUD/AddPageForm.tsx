import "../../../css/InputPlaceHolder.css";
import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router";
import commentApi from "../../../api/commentApi";

interface AddPageFormProps {
  bookId: string;
  setPageAdd: any;
  handleAiImage: any;
  image: string | null;
  setImage: any;
  file: File | null;
  setFile: (file: File) => void;
  onLastPageAdded?: () => void;
}

const AddPageForm: React.FC<AddPageFormProps> = ({ bookId, setPageAdd, handleAiImage, image, setImage, file, setFile, onLastPageAdded }) => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const isFormValid = image && content;

  const handlePageAdd = async () => {
    const formData = new FormData();

    if (file) {
      formData.append("files", file);
    }

    formData.append(
      "request",
      new Blob(
        [
          JSON.stringify({
            content: content,
          }),
        ],
        { type: "application/json" }
      )
    );

    try {
      const response = await commentApi.create(bookId, formData);
      if (response.status === 200 && response.data) {
        console.log("릴레이북 페이지 작성 성공");
        // navigate(`/relaybookdetail/${bookId}`);

        // 마지막 페이지 추가 시 알람
        if (onLastPageAdded) {
          onLastPageAdded();
        }

        window.location.reload();
      }
    } catch (error) {
      console.error("릴레이북 페이지 작성 오류: ", error);
    }
  };

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setContent(newValue);
  };

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
    <div className="flex flex-col items-between">
      {/* 구분선 및 등록 버튼 */}
      <div>
        <div className="w-full flex justify-between m-2">
          <p className="mx-4 text-lg font-bold">릴레이북 페이지 추가하기</p>
          <div>
            <button
              onClick={() => {
                setPageAdd(false);
                setImage(null);
              }}
              className="w-16 mx-2 text-[#6C6C6C] font-semibold border-solid border-2 border-[#c2c2c2] rounded-md hover:text-white hover:bg-[#c2c2c2] duration-200"
            >
              취소
            </button>
            <button
              onClick={handlePageAdd}
              disabled={!isFormValid}
              className={`w-16 mr-10 font-semibold border-solid border-2 rounded-md duration-200 ${isFormValid ? "text-[#6C6C6C] border-[#FFDE2F] hover:text-white hover:bg-[#FFDE2F]" : "text-[#c2c2c2] border-[#e0e0e0] cursor-not-allowed"}`}
            >
              등록
            </button>
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
          <textarea onChange={onChangeContent} className="notes w-full h-[100px] resize-none focus:outline-none placeholder:text-zinc-400" placeholder="'만약에~' 내용을 입력해 이야기를 이어주세요" value={content} maxLength={115}></textarea>
        </div>
      </div>

      {/* 이미지 첨부 form */}
      <div className="flex flex-col items-center">
        <div className="w-[90%] mt-3 border border-zinc-950">
          <p className="mx-2 my-1 font-bold flex">이미지</p>
          <hr className="mx-3 my-1 border-zinc-900" />
          <div className="mt-2">
            <div className="flex justify-center items-center">
              <img src={image || "/assets/relay/defaultImage.png"} alt="#" className="w-64 h-56 border rounded-md" />
            </div>

            {/* 이미지 첨부 버튼 */}
            <div className="py-3 h-full grid grid-cols-[49%_2%_49%]">
              {/* AI 이미지 첨부 버튼 */}
              <div className="flex flex-col items-center justify-center">
                <button
                  onClick={() => {
                    handleAiImage();
                  }}
                  className="w-32 px-2 py-1 flex justify-between items-center rounded-3xl border border-solid border-zinc-300 font-bold text-zinc-800"
                >
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
                <input className="hidden" id="image-input" type="file" accept="image/jpeg, image/png, image/bmp" onChange={handleImageChange} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPageForm;
