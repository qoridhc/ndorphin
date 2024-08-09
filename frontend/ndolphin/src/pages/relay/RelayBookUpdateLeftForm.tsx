import React, { useRef, ChangeEvent, memo, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import EndPage from "../../components/relay/EndPage";
import "../../css/RelayBook.css";
import "../../css/Notes.css";
import "../../css/InputPlaceHolder.css";

interface RelayBookUpdateLeftFormProps {
  bookId: string | undefined;
  handleRelayBookUpdate: (subjectValue: string, contentValue: string) => void;
  subject: any;
  content: any;
  currentEndPage: number | null;
  setCurrentEndPage: (endPage: number) => void;
}

const RelayBookUpdateLeftForm = ({ bookId, handleRelayBookUpdate, subject, content, currentEndPage, setCurrentEndPage }: RelayBookUpdateLeftFormProps) => {
  const navigate = useNavigate();
  const [subjectValue, setSubjectValue] = useState(subject.current);
  const [contentValue, setContentValue] = useState(content.current);
  const [endPageValue, setEndPageValue] = useState<number>();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSubjectValue(subject.current);
    setContentValue(content.current);
  }, [subject.current, content.current]);

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 200);
  }, []);

  const onChangeSubject = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 실절적으로 보낼 값
    const newValue = e.target.value;
    // 부모컴포넌트의 props데이터가 아니기 때문에, 부모컴포넌트까지 리렌더링이 발생하지 않음 (관리만 할 값임)
    setSubjectValue(newValue);
  };

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // 실절적으로 보낼 값
    const newValue = e.target.value;
    // 부모컴포넌트의 props데이터가 아니기 때문에, 부모컴포넌트까지 리렌더링이 발생하지 않음 (관리만 할 값임)
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
                <input ref={inputRef} onChange={onChangeSubject} className="w-full my-3 p-1 rounded-lg focus:outline-none bg-yellow-200 text-left" type="text" placeholder="제목을 입력해 주세요 (최대 30자)" value={subjectValue} />
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
                handleRelayBookUpdate(subjectValue, contentValue);
              }}
              className="w-16 mx-3 text-[#6C6C6C] font-semibold border-solid border-2 border-[#FFDE2F] rounded-md hover:text-white hover:bg-[#FFDE2F] duration-200">
              수정
            </button>
            <button
              onClick={() => {
                navigate(`/relaybookdetail/${bookId}`);
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

export default RelayBookUpdateLeftForm;
