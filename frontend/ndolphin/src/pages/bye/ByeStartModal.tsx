import React, { ChangeEvent, useEffect, useState } from "react";
import boardApi from "../../api/boardApi";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import userApi from "../../api/userApi";

interface Props {
  setIsCreateModal: (state: boolean) => void;
}

const ByeStartModal = ({ setIsCreateModal }: Props) => {
  const userProfileImage = localStorage.getItem("profileImage");
  const userMbti = localStorage.getItem("mbti");
  const [rowCount, setRowCount] = useState(0);
  const [textCount, setTextCount] = useState(0);
  const [switched, setswitched] = useState(0);
  const [content, setContent] = useState("");

  const handleClose = () => {
    setIsCreateModal(false);
  };

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value.length;
    setTextCount(text);
    const rows = event.target.value.split(/\r\n|\r|\n/).length;
    setRowCount(rows);
    setContent(event.target.value);
  };

  const handleByeConfirm = async () => {
    const formData = new FormData();

    formData.append(
      "request",
      new Blob(
        [
          JSON.stringify({
            content: content,
            boardType: "BYE_BOARD",
          }),
        ],
        { type: "application/json" }
      )
    );

    try {
      const response = await boardApi.create(formData);
      if (response.status === 200 && response.data) {
        console.log("작별 인사 작성 성공");
        window.location.reload();
      }
    } catch (error) {
      console.error("괜찮아 작성 실패: ", error);
    }
  };

  useEffect(() => {
    const targetTextarea = document.querySelector(`#target`) as HTMLTextAreaElement | null;
    if (targetTextarea) {
      targetTextarea.style.height = rowCount * 28 + "px";
    }
  }, [rowCount]);

  // 작별인사 등록 시 팔로워들에게 알림 전송
  const postAlarm = async () => {
    const userId = localStorage.getItem("userId");
    const response = await userApi.getFollower(userId as string);
    const content = " 님이 새로운 괜찮아를 등록했습니다";
    response.data.data.forEach((item: any) => {
      userApi.postNotifications(item.followerId, content, Number(userId));
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-[40%] max-h-[90%] p-5 bg-white rounded-2xl grid gap-3">
        <button onClick={handleClose}>
          <IoMdClose className="text-2xl" />
        </button>

        <div className="grid grid-cols-[1fr_8fr]">
          <img className="w-11 h-11 rounded-[50%]" src={userProfileImage || undefined} alt="" />
          <div className="max-h-[450px] grid gap-3 overflow-y-auto">
            <textarea className="w-full min-h-28 text-xl font-medium outline-none resize-none" placeholder="어떤 인사를 전하실 건가요?" name="" id="target" onChange={(e) => handleTextareaChange(e)}></textarea>
          </div>
        </div>

        <hr />

        <div className="px-3 flex justify-between">
          <div className="w-56 flex justify-between">
            <label className="flex" htmlFor="ntos">
              <input type="checkbox" id="ntos" disabled={true} checked={userMbti === "S"} />
              <img className={`mx-2 w-[5rem] ${switched === 0 ? "opacity-30" : ""}`} src="/assets/bye/nToS.png" alt="nToS" />
            </label>
            <label className="flex" htmlFor="ston">
              <input type="checkbox" id="ston" disabled={true} checked={userMbti === "N"} />
              <img className={`mx-2 w-[5rem] ${switched === 1 ? "opacity-30" : ""}`} src="/assets/bye/sToN.png" alt="sToN" />
            </label>
          </div>
          <button onClick={() => {
            handleByeConfirm();
            postAlarm();
           }} className={`px-7 py-1 shadow-md rounded-3xl font-bold bg-amber-300 text-white ${textCount === 0 ? "opacity-50" : ""}`} disabled={textCount === 0}>
            완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default ByeStartModal;
