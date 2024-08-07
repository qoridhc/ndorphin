import React, { useRef, ChangeEvent, memo, useState, useEffect } from "react";
import EndPage from "../../components/relay/EndPage";
import "../../css/RelayBook.css";
import "../../css/Notes.css";
import "../../css/InputPlaceHolder.css";

interface RelayBookUpdateLeftFormProps {
  handleSubjectChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleContentChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  subject: any;
  content: any;
}

const RelayBookUpdateLeftForm = ({ handleSubjectChange, handleContentChange, subject, content }: RelayBookUpdateLeftFormProps) => {
  const [subjectValue, setSubjectValue] = useState(subject.current);
  const [contentValue, setContentValue] = useState(content.current);

  useEffect(() => {
    setSubjectValue(subject.current);
    setContentValue(content.current);
  }, [subject.current, content.current]);

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
                  <EndPage />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default RelayBookUpdateLeftForm;
