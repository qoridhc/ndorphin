import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import InsertionImage from "../../components/common/InsertionImage";
import { useNavigate } from "react-router";
import ifApi from "../../api/ifApi";
import BookCoverAiPromptModal from "../../components/relay/AiImagePromptModal";

const IfStart = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [aiImage, setAiImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const boxClass = "h-full mb-3 border border-[#9E9E9E]";
  const boxContentClass = "p-5";
  const inputClass = "w-full p-1 text-left border border-[#9E9E9E] rounded-sm outline-none";
  const titleClass = "text-lg font-bold";
  const hrClass = "h-[1px] mt-1 mb-4 bg-[#9E9E9E]";

  const handleAiImage = () => {
    setIsModalOpen(true);
  };

  const confirmAiImage = (image: string) => {
    setIsModalOpen(false);
    setImage(image);
  };

  const cancelAiImage = () => {
    setIsModalOpen(false);
  };

  const handleCreate = async () => {
    const formData = new FormData();

    formData.append(
      "request",
      new Blob(
        [
          JSON.stringify({
            subject: subject,
            content: content,
            boardType: "OPINION_BOARD",
          }),
        ],
        { type: "application/json" }
      )
    );

    if (file) {
      formData.append("files", file);
    }

    if (aiImage) {
      console.log("생성형 : ", aiImage);
    }

    try {
      const response = await ifApi.create(formData);
      if (response.status === 200) {
        console.log(response.data.data);
        navigate(`/ifdetail/${response.data.data.id}`);
      }
    } catch (error) {
      console.error("ifApi create : ", error);
    }
  };

  return (
    <div className="px-[30%] py-5">
      <button className="py-4 flex" onClick={() => navigate("/iflist")}>
        <FaArrowLeftLong className="text-3xl" />
        <p className="px-3 text-xl font-bold">만약에 게시판</p>
      </button>

      <div className={`${boxClass}`}>
        <div className={`${boxContentClass}`}>
          <p className={`${titleClass}`}>제목</p>
          <hr className={`${hrClass}`} />
          <input className={`${inputClass}`} type="text" onChange={(e) => setSubject(e.target.value)} />
        </div>

        <div className={`${boxContentClass}`}>
          <p className={`${titleClass}`}>만약에</p>
          <hr className={`${hrClass}`} />
          <textarea className={`h-40 ${inputClass}`} onChange={(e) => setContent(e.target.value)} />
        </div>
      </div>

      <div className={`${boxClass}`}>
        <div className={`${boxContentClass}`}>
          <p className={`${titleClass}`}>이미지</p>
          <hr className={`${hrClass}`} />
          {image ? (
            <div className="py-3 flex justify-center">
              <img className="max-w-full object-cover" src={image} alt="" />
            </div>
          ) : (
            <></>
          )}
          <InsertionImage handleAiImage={handleAiImage} setImage={setImage} setFile={setFile} />
        </div>
      </div>

      <div className="flex justify-end">
        <button className="w-16 text-[#6C6C6C] font-semibold border-solid border-2 border-[#FFDE2F] rounded-md hover:text-white hover:bg-[#FFDE2F] duration-200" onClick={() => handleCreate()}>
          등록
        </button>
      </div>

      <BookCoverAiPromptModal setFile={setFile} isOpen={isModalOpen} onClose={cancelAiImage} onConfirm={confirmAiImage} image={aiImage} setImage={setAiImage} coverImage={"/assets/relay/bookCoverDefault.png"} />
    </div>
  );
};

export default IfStart;
