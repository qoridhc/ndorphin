import React, { useRef, ChangeEvent, memo, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import EndPage from "../EndPage";
import "../../../css/RelayBook.css";
import "../../../css/Notes.css";
import "../../../css/InputPlaceHolder.css";
import "../../../css/toolTip.css";
import userApi from "../../../api/userApi";

interface RelayBookLeftFormProps {
  handleRelayBookStart: (subject: string, content: string, endPage: number | undefined, dalleUrl?: string) => void;
  image: string | null;
}

const RelayBookLeftForm = ({ handleRelayBookStart, image }: RelayBookLeftFormProps) => {
  const navigate = useNavigate();
  const [subjectValue, setSubjectValue] = useState("");
  const [contentValue, setContentValue] = useState("");
  const [endPageValue, setEndPageValue] = useState<number>();
  const [currentEndPage, setCurrentEndPage] = useState<number | null>(null);
  const isFormValid = image && subjectValue && contentValue && endPageValue;

  const onChangeSubject = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSubjectValue(newValue);
  };

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setContentValue(newValue);
  };

  // 이야기 등록 시 팔로워들에게 알림 전송
  const postAlarm = async () => {
    const userId = localStorage.getItem("userId");
    const userNickName = localStorage.getItem("nickName");
    const response = await userApi.getFollower(userId as string);
    const content = `${userNickName} 님이 새로운 릴레이북을 등록했습니다`;
    response.data.data.forEach((item: any) => {
      userApi.postNotifications(item.followerId, content, Number(userId));
    });
  };

  return (
    <>
      {
        <div className="flex justify-center items-center">
          <div className="pt-[2.8rem] mr-[7%] flex flex-col items-end w-full">
            <div className="w-[95%]">
              <div className="flex flex-col items-center">
                <hr className="w-full border-zinc-950" />
                <input onChange={onChangeSubject} className="w-full my-3 p-1 rounded-lg focus:outline-none bg-yellow-200 text-left" type="text" placeholder="제목을 입력해 주세요 (최대 30자)" value={subjectValue} />
              </div>
            </div>

            {/* 본문 작성 form */}
            <div className="w-[95%] border border-zinc-950">
              <p className="m-2 text-xl font-bold">본문</p>
              <hr className="mx-3 my-2 border-zinc-900" />
              <textarea
                onChange={onChangeContent}
                className="notes w-full h-[283px] resize-none focus:outline-none placeholder:text-zinc-400"
                placeholder="이야기가 시작될 '만약에~' 내용을 입력해 주세요 (최소 글자수 100자 이상)"
                value={contentValue}></textarea>
            </div>

            {/* 종료 장수 선택 form */}
            <div className="w-[95%] mt-3 border border-zinc-950">
              <p className="m-2 text-xl font-bold">종료장수</p>
              <hr className="mx-3 border-zinc-900" />
              <div className="p-4 flex justify-center">
                <div className="w-4/5 flex justify-between">
                  <EndPage currentEndPage={currentEndPage} setCurrentEndPage={setCurrentEndPage} setEndPageValue={setEndPageValue} />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute z-[99] flex justify-start w-full px-8 my-2 top-0 -left-2">
            <div className="tooltip-bottom">
              <button
                onClick={() => {
                  handleRelayBookStart(subjectValue, contentValue, endPageValue);
                  postAlarm();
                }}
                disabled={!isFormValid} // 모든 값이 있을 때만 버튼 활성화
                className={`w-16 mx-3 font-semibold border-solid border-2 rounded-md duration-200 ${isFormValid ? "text-[#6C6C6C] border-[#FFDE2F] hover:text-white hover:bg-[#FFDE2F]" : "text-[#c2c2c2] border-[#e0e0e0] cursor-not-allowed"}`}>
                등록
              </button>
              {!isFormValid && <span className="tooltiptext">모든 칸을 필수로<br></br> 입력해주세요.</span>}
            </div>
            <button
              onClick={() => {
                navigate(`/relaybooklist/`);
              }}
              className="w-16 text-[#6C6C6C] font-semibold border-solid border-2 border-[#c2c2c2] rounded-md hover:text-white hover:bg-[#c2c2c2] duration-200">
              취소
            </button>
          </div>
        </div>
      }
    </>
  );
};

export default RelayBookLeftForm;
