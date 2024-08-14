import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import InsertionImage from "../../components/common/InsertionImage";
import { useNavigate } from "react-router";
import boardApi from "../../api/boardApi";
import BookCoverAiPromptModal from "../../components/relay/AiImagePromptModal";
import userApi from "../../api/userApi";

const BalanceStart = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [aiImage, setAiImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dalleUrl, setDalleUrl] = useState<string | null>(null);

  const [voteCategoryList, setVoteCategoryList] = useState(["", ""]);

  const boxClass = "h-full mb-3 border border-[#9E9E9E]";
  const boxContentClass = "p-5";
  const inputClass = "w-full p-1 text-left border border-[#9E9E9E] rounded-sm outline-none";
  const titleClass = "text-lg font-bold";
  const hrClass = "h-[1px] mt-1 mb-4 bg-[#9E9E9E]";

  const addVoteCategoryList = () => {
    setVoteCategoryList([...voteCategoryList, ""]);
  };

  const deleteVoteCategoryList = (deleteId: number) => {
    let tempList = voteCategoryList.filter((category, index) => index !== deleteId);
    tempList = tempList.map((item) => item);
    setVoteCategoryList(tempList);
  };

  const updateVoteCategoryList = (newText: string, updateId: number) => {
    let tempList = voteCategoryList.map((category, index) => (index === updateId ? newText : category));
    setVoteCategoryList(tempList);
  };

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
            boardType: "VOTE_BOARD",
            voteContents: voteCategoryList,
          }),
        ],
        { type: "application/json" }
      )
    );

    if (file) {
      formData.append("files", file);
    }

    try {
      const response = await boardApi.create(formData);
      if (response.status === 200) {
        navigate(`/balancedetail/${response.data.data.id}`);
      }
    } catch (error) {
      console.error("boardApi create : ", error);
    }
  };

  // 밸런스 등록 시 팔로워들에게 알림 전송
  const postAlarm = async () => {
    const userId = localStorage.getItem("userId");
    const response = await userApi.getFollower(userId as string);
    const content = ' 님이 새로운 밸런스게임을 등록했습니다';
    response.data.data.forEach((item: any) => {
      userApi.postNotifications(item.followerId, content, Number(userId));
    });
  };

  return (
    <div className="px-[30%] py-5">
      <button className="py-4 flex" onClick={() => navigate("/iflist")}>
        <FaArrowLeftLong className="text-3xl" />
        <p className="px-3 text-xl font-bold">밸런스게임 게시판</p>
      </button>

      <div className={`${boxClass}`}>
        <div className={`${boxContentClass}`}>
          <p className={`${titleClass}`}>제목</p>
          <hr className={`${hrClass}`} />
          <input className={`${inputClass}`} type="text" placeholder="제목을 입력해 주세요" onChange={(e) => setSubject(e.target.value)} />
        </div>

        <div className={`${boxContentClass}`}>
          <p className={`${titleClass}`}>당신이 생각하는 만약에는?</p>
          <hr className={`${hrClass}`} />
          <textarea className={`h-40 ${inputClass} resize-none`} placeholder="만약에를 입력해 주세요" onChange={(e) => setContent(e.target.value)} />
        </div>
      </div>

      <div className={`${boxClass}`}>
        <div className={`${boxContentClass}`}>
          <p className={`${titleClass}`}>이미지</p>
          <hr className={`${hrClass}`} />
          {image ? (
            <div className="py-3 flex justify-center">
              <img className="max-w-full max-h-[400px] object-cover" src={image} alt="" />
            </div>
          ) : (
            <></>
          )}
          <InsertionImage handleAiImage={handleAiImage} setImage={setImage} setFile={setFile} />
        </div>
      </div>

      <div className={`${boxClass}`}>
        <div className={`${boxContentClass}`}>
          <p className={`${titleClass}`}>투표</p>
          <hr className={`${hrClass}`} />
          <div className="grid grid-cols-1 gap-2">
            {voteCategoryList.map((category, index) => (
              <div className="grid grid-cols-[90%_10%]" key={index}>
                <input className={`${inputClass}`} type="text" value={category} placeholder={`항목 ${index + 1}`} onChange={(e) => updateVoteCategoryList(e.target.value, index)} />
                {index <= 1 ? (
                  <button className="flex justify-center items-center" onClick={() => alert("기본 항목은 삭제할 수 없습니다.")}>
                    <RiDeleteBin6Line className="text-xl opacity-20" />
                  </button>
                ) : (
                  <button className="flex justify-center items-center" onClick={() => deleteVoteCategoryList(index)}>
                    <RiDeleteBin6Line className="text-xl" />
                  </button>
                )}
              </div>
            ))}
            {voteCategoryList.length < 4 ? (
              <div className="grid grid-cols-[90%_10%]">
                <button className="p-1 text-xl border border-[#9E9E9E] rounded-sm flex justify-center" onClick={() => addVoteCategoryList()}>
                  <FaPlus />
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="w-16 text-[#6C6C6C] font-semibold border-solid border-2 border-[#FFDE2F] rounded-md hover:text-white hover:bg-[#FFDE2F] duration-200"
          onClick={() => {
            handleCreate();
            postAlarm();
          }}>
          등록
        </button>
      </div>

      <BookCoverAiPromptModal setFile={setFile} isOpen={isModalOpen} onClose={cancelAiImage} onConfirm={confirmAiImage} image={aiImage} setImage={setAiImage} coverImage={"/assets/relay/bookCoverDefault.png"} />
    </div>
  );
};

export default BalanceStart;
