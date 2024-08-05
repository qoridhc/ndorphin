import HTMLFlipBook from "react-pageflip";
import React, { ForwardedRef } from "react";
import { useState } from "react";
import RelayApi from "../../api/RelayApi";
import "../../css/RelayBook.css";
import "../../css/Notes.css";
import "../../css/InputPlaceHolder.css";
import BookImage from "../../components/relay/relayBookCRUD/BookImage";
import EndPage from "../../components/relay/EndPage";
import BookCoverAiPromptModal from "../../components/relay/AiImagePromptModal";

interface PageProps {
  number?: string;
  children?: React.ReactNode;
}

const Page = React.forwardRef<HTMLDivElement, PageProps>((props, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <div className="page" ref={ref}>
      {props.children}
    </div>
  );
});

const MyAlbum: React.FC = () => {
  // AI 이미지 모달 관련
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);

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

  const handleRelayBookStart = async (userId: number, subject: string, content: string) => {
    const formData = new FormData();

    formData.append(
      "request",
      new Blob(
        [
          JSON.stringify({
            subject: subject,
            content: content,
            boardType: "RELAY_BOARD",
          }),
        ],
        { type: "application/json" }
      )
    );

    try {
      const response = await RelayApi.create(formData, userId, subject, content, "RELAY_BOARD");
      console.log("릴레이북 이야기 작성 성공");
    } catch (error) {
      console.error("릴레이북 이야기 시작 오류: ", error);
    }
  };

  return (
    <div className="mt-[1%] grid h-full" style={{ backgroundColor: "white" }}>
      <br></br>
      <div className="">
        {/* @ts-ignore */}
        <HTMLFlipBook width={480} height={580} minWidth={315} maxWidth={1000} minHeight={420} maxHeight={1350} flippingTime={600} style={{ margin: "0 auto" }} maxShadowOpacity={0.5} useMouseEvents={false}>
          <Page>
            <div className="flex justify-center items-center">
              <div className="pt-[2.8rem] mr-[7%] flex flex-col items-end w-full">
                <div className="w-[95%]">
                  <div className="flex flex-col items-center">
                    <hr className="w-full border-zinc-950" />
                    <input className="w-full my-3 p-1 rounded-lg focus:outline-none bg-yellow-200 text-left" type="text" placeholder="제목을 입력해 주세요 (최대 30자)" />
                  </div>
                </div>

                {/* 본문 작성 form */}
                <div className="w-[95%] border border-zinc-950">
                  <p className="m-2 text-xl font-bold">본문</p>
                  <hr className="mx-3 my-2 border-zinc-900" />
                  <textarea className="notes w-full h-[283px] resize-none focus:outline-none placeholder:text-zinc-400" placeholder="이야기가 시작될 '만약에~' 내용을 입력해 주세요 (최소 글자수 100자 이상)"></textarea>
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
          </Page>
          <Page>
            <div className="flex flex-col items-center justify-center">
              <div className="flex justify-end w-full px-8 my-2">
                <button
                  onClick={() => {
                    handleRelayBookStart(4, "제목입니다.", "릴레이북 내용입니다");
                  }}
                  className="w-16 mx-3 text-[#6C6C6C] font-semibold border-solid border-2 border-[#FFDE2F] rounded-md hover:text-white hover:bg-[#FFDE2F] duration-200">
                  등록
                </button>
              </div>
              <div className="w-full">
                <div className="flex flex-col items-center">
                  <hr className="flex justify-center w-[88%] border-zinc-950" />
                </div>
              </div>
              <BookImage handleAiImage={handleAiImage} image={image} setImage={setImage} />
            </div>
          </Page>
        </HTMLFlipBook>
      </div>
      <BookCoverAiPromptModal isOpen={isModalOpen} onClose={cancelAiImage} onConfirm={confirmAiImage} image={image} setImage={setImage} coverImage={"/assets/relay/bookCoverDefault.png"} />
    </div>
  );
};

export default MyAlbum;
