import HTMLFlipBook from "react-pageflip";
import React, { ForwardedRef, useMemo, useRef } from "react";
import { useState, ChangeEvent, useEffect, useCallback } from "react";
import { useLocation, useParams } from "react-router";
import boardApi from "../../api/boardApi";
import "../../css/RelayBook.css";
import "../../css/Notes.css";
import "../../css/InputPlaceHolder.css";
import EndPage from "../../components/relay/EndPage";
import BookCoverAiPromptModal from "../../components/relay/AiImagePromptModal";
import RelayBookUpdateLeftForm from "./RelayBookUpdateLeftForm";

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

const RelayBookUpdate: React.FC = () => {
  const { bookId } = useParams();
  const subject = useRef<string>("");
  const content = useRef<string>("");
  const [contentFileUrl, setContentFileUrl] = useState("");
  const [endPageValue, setEndPageValue] = useState<number>();
  const [currentEndPage, setCurrentEndPage] = useState<number | null>(null);
  const [image, setImage] = useState<string>(contentFileUrl);
  const [file, setFile] = useState<File | null>(null);
  const [dalleUrl, setDalleUrl] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    // axios GET
    const getRelayDetail = async () => {
      try {
        if (bookId) {
          const response = await boardApi.read(bookId);
          if (response.status === 200 && isMounted) {
            const book = response.data.data;
            console.log("릴레이북 이야기 상세 조회 성공");
            const contentFileUrl = book.fileUrls[0];
            subject.current = book.subject;
            content.current = book.content;
            setContentFileUrl(contentFileUrl);
            setImage(contentFileUrl);
            setCurrentEndPage(book.maxPage);
          }
        }
      } catch (error) {
        console.log("릴레이북 상세 불러오기 오류: ", error);
      }
    };

    getRelayDetail();

    return () => {
      isMounted = false;
    };
  }, [bookId]);

  // axios PUT
  const handleRelayBookUpdate = async (subject: string, content: string) => {
    const formData = new FormData();

    if (file) {
      formData.append("files", file);
    }

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

    if (bookId !== undefined) {
      try {
        const response = await boardApi.update(formData, bookId);
        if (response.status === 200) {
          console.log("릴레이북 이야기 수정 성공");
        }
      } catch (error) {
        console.error("릴레이북 이야기 수정 오류: ", error);
      }
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    // 이미 AI 생성 이미지가 있을 경우
    if (dalleUrl) {
      setDalleUrl(null);
      console.log("AI 이미지 제거 완료");
    }

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

  // AI 이미지 모달 관련
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAiImage = () => {
    setIsModalOpen(true);
  };

  const confirmAiImage = async (image: string) => {
    setIsModalOpen(false);
    setImage(image);

    // try {
    //   const response = await fetch(image);
    //   const data = await response.blob();
    //   const ext = image.split(".").pop() || "";
    //   const filename = image.split("/").pop() || "";
    //   const metadata = { type: `image/${ext}` };
    //   const file = new File([data], filename, metadata);
    //   setFile(file);
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  };

  const cancelAiImage = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mt-[1%] grid h-full" style={{ backgroundColor: "white" }}>
      <br></br>
      <div className="">
        {/* @ts-ignore */}
        <HTMLFlipBook width={480} height={580} minWidth={315} maxWidth={1000} minHeight={420} maxHeight={1350} flippingTime={600} style={{ margin: "0 auto" }} maxShadowOpacity={0.5} useMouseEvents={false}>
          <Page key="left-form">{<RelayBookUpdateLeftForm bookId={bookId} handleRelayBookUpdate={handleRelayBookUpdate} subject={subject} content={content} currentEndPage={currentEndPage} setCurrentEndPage={setCurrentEndPage} />}</Page>
          <Page key="right-form">
            {/* 표지 이미지 form */}
            <div className="mt-11 flex flex-col items-center justify-center">
              <div className="w-full">
                <div className="flex flex-col items-center">
                  <hr className="flex justify-center w-[88%] border-zinc-950" />
                </div>
              </div>
              <div className="w-[88%] mt-3 border border-zinc-950">
                <p className="m-3 text-xl font-bold">표지</p>
                <hr className="mx-3 my-2 border-zinc-900" />
                <div className="grid grid-rows-[60%_40%]">
                  <div className="flex justify-center items-center">
                    <img src={image} alt="coverImage" className="w-[22rem] h-64 border rounded-md" />
                  </div>

                  {/* 이미지 첨부 버튼 */}
                  <div className="pt-4 pb-6 h-full grid grid-cols-[49%_2%_49%]">
                    {/* AI 이미지 첨부 버튼 */}
                    <div className="flex flex-col items-center justify-center">
                      <button onClick={handleAiImage} className="w-32 px-2 py-1 flex justify-between items-center rounded-3xl border border-solid border-zinc-300 font-bold text-zinc-800">
                        <img src="/assets/aiImageIcon.png" className="w-5" alt="#"></img>
                        <p className="text-xs">AI 이미지 생성</p>
                      </button>
                      <div className="my-5 flex flex-col items-center justify-center">
                        <div>
                          <span className="font-bold">AI로 이미지</span>를
                        </div>
                        <p>만들어 표지로 생성</p>
                      </div>
                    </div>

                    <div className="flex justify-center items-center">
                      <hr className="h-36 border-l border-dashed border-zinc-400"></hr>
                    </div>

                    {/* 직접 사진 첨부 버튼 */}
                    <div className="flex flex-col items-center justify-center">
                      <label htmlFor="image-input">
                        <div className="w-32 px-2 py-1 flex items-center cursor-pointer rounded-3xl border border-solid border-zinc-300 font-bold text-zinc-800">
                          <img src="/assets/addImageIcon.png" className="w-5" alt="#"></img>
                          <p className="ml-5 text-xs">사진 첨부</p>
                        </div>
                      </label>
                      <input className="hidden" id="image-input" type="file" accept="image/*" onChange={handleImageChange} />

                      <div className="my-5 flex flex-col items-center">
                        <span>
                          표지 이미지<span className="font-bold"> 직접</span> 첨부
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Page>
        </HTMLFlipBook>
      </div>
      <BookCoverAiPromptModal file={file} isOpen={isModalOpen} onClose={cancelAiImage} onConfirm={confirmAiImage} image={image} coverImage={image} setImage={setImage} setFile={setFile} setDalleUrl={setDalleUrl} />
    </div>
  );
};

export default RelayBookUpdate;
