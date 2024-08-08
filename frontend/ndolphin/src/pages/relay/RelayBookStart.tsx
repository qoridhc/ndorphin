import HTMLFlipBook from "react-pageflip";
import React, { ForwardedRef } from "react";
import { useState, useRef, useCallback } from "react";
import boardApi from "../../api/boardApi";
import axios from "axios";
import "../../css/RelayBook.css";
import "../../css/Notes.css";
import "../../css/InputPlaceHolder.css";
import BookImage from "../../components/relay/relayBookCRUD/BookImage";
import EndPage from "../../components/relay/EndPage";
import BookCoverAiPromptModal from "../../components/relay/AiImagePromptModal";
import RelayBookLeftForm from "../../components/relay/relayBookCRUD/RelayBookLeftForm";

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
  const [file, setFile] = useState<File | null>(null);
  const [dalleUrl, setDalleUrl] = useState<string | null>(null);
  const subject = useRef<string>("");
  const content = useRef<string>("");

  const handleAiImage = () => {
    setIsModalOpen(true);
  };

  const confirmAiImage = async (image: string) => {
    setIsModalOpen(false);
    setImage(image);

    // const response = await fetch(image);
    // const data = await response.blob();
    // const ext = image.split(".").pop(); // url 구조에 맞게 수정할 것
    // const filename = image.split("/").pop(); // url 구조에 맞게 수정할 것
    // const metadata = { type: `image/${ext}` };
    // const file = new File([data], filename!, metadata);
    // console.log(file);
    // setFile(file);
  };

  const cancelAiImage = () => {
    if (dalleUrl) {
      setDalleUrl(null);
    }
    
    setIsModalOpen(false);
  };

  const handleRelayBookStart = async (subject: string, content: string, endPage: number | undefined) => {
    const formData = new FormData();

    if (file) {
      formData.append("files", file);
    }

    // 객체를 동적으로 생성하기 위해 변수를 사용
    const requestData: {
      subject: string;
      content: string;
      boardType: string;
      maxPage: number | undefined;
      dalleUrl?: string;
    } = {
      subject: subject,
      content: content,
      boardType: "RELAY_BOARD",
      maxPage: endPage,
    };

    // dalleUrl이 있을 경우 추가
    if (dalleUrl) {
      console.log("잘왔나?", dalleUrl);
      requestData.dalleUrl = dalleUrl;
    }

    formData.append("request", new Blob([JSON.stringify(requestData)], { type: "application/json" }));

    try {
      const response = await boardApi.create(formData);
      if (response.status === 200) {
        console.log("릴레이북 이야기 작성 성공");
      }
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
            <RelayBookLeftForm dalleUrl={dalleUrl} handleRelayBookStart={handleRelayBookStart} />
          </Page>
          <Page>
            <div className="flex flex-col items-center justify-center">
              <div className="flex justify-end w-full px-8 my-[1.37rem]">
                {/* {file ? (
                  <button
                    onClick={() => {
                      handleRelayBookStart("파일 업로드 테스트 제목", "파일 업로드 테스트 내용");
                    }}
                    className="w-16 mx-3 text-[#6C6C6C] font-semibold border-solid border-2 border-[#FFDE2F] rounded-md hover:text-white hover:bg-[#FFDE2F] duration-200">
                    등록
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleRelayBookStart("파일 업로드 테스트 제목", "파일 업로드 테스트 내용");
                    }}
                    className="w-16 mx-3 text-[#6C6C6C] font-semibold border-solid border-2 border-[#FFDE2F] rounded-md hover:text-white hover:bg-[#FFDE2F] duration-200">
                    등록
                  </button>
                )} */}
              </div>
              <div className="w-full">
                <div className="flex flex-col items-center">
                  <hr className="flex justify-center w-[88%] border-zinc-950" />
                </div>
              </div>
              <BookImage handleAiImage={handleAiImage} image={image} setImage={setImage} setFile={setFile} dalleUrl={dalleUrl} setDalleUrl={setDalleUrl} />
            </div>
          </Page>
        </HTMLFlipBook>
      </div>
      <BookCoverAiPromptModal isOpen={isModalOpen} onClose={cancelAiImage} onConfirm={confirmAiImage} image={image} setImage={setImage} coverImage={"/assets/relay/bookCoverDefault.png"} setFile={setFile} setDalleUrl={setDalleUrl} file={file} />
    </div>
  );
};

export default MyAlbum;
