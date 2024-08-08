import React, { useRef, ChangeEvent, memo, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import EndPage from "../EndPage";
import "../../../css/RelayBook.css";
import "../../../css/Notes.css";
import "../../../css/InputPlaceHolder.css";

interface RelayBookLeftFormProps {
  dalleUrl: string | null;
  handleRelayBookStart: (subject: string, content: string, endPage: number | undefined, dalleUrl?: string) => void;
}

const RelayBookLeftForm = ({ dalleUrl, handleRelayBookStart }: RelayBookLeftFormProps) => {
  const navigate = useNavigate();
  const [subjectValue, setSubjectValue] = useState("");
  const [contentValue, setContentValue] = useState("");
  const [endPageValue, setEndPageValue] = useState<number>();
  const [currentEndPage, setCurrentEndPage] = useState<number | null>(null);

  const onChangeSubject = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSubjectValue(newValue);
  };

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setContentValue(newValue);
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
            <button
              onClick={() => {
                if (dalleUrl) {
                  handleRelayBookStart(subjectValue, contentValue, endPageValue, dalleUrl);
                } else {
                  handleRelayBookStart(subjectValue, contentValue, endPageValue);
                }
              }}
              className="w-16 mx-3 text-[#6C6C6C] font-semibold border-solid border-2 border-[#FFDE2F] rounded-md hover:text-white hover:bg-[#FFDE2F] duration-200">
              등록
            </button>
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