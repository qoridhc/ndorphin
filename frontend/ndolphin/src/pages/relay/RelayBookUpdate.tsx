import HTMLFlipBook from "react-pageflip";
import React, { ForwardedRef } from "react";
import { useState, ChangeEvent } from "react";
import { useLocation } from "react-router";
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

const RelayBookUpdate: React.FC = () => {
  const { state } = useLocation();
  const coverImage = state.BookStart[0].coverImage;
  const title = state.BookStart[0].title;
  const content = state.BookStart[0].content;
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null)
  const [titleUpdate, setTitleUpdate] = useState(title);
  const [contentUpdate, setContentUpdate] = useState(content);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitleUpdate(value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContentUpdate(value);
  };

  // AI 이미지 모달 관련
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAiImage = () => {
    setIsModalOpen(true);
  };

  const confirmAiImage = async (image: string) => {
    setIsModalOpen(false);
    setImage(image);

    try {
      const response = await fetch(image);
      const data = await response.blob();
      const ext = image.split(".").pop() || "";
      const filename = image.split("/").pop() || "";
      const metadata = { type: `image/${ext}` };
      const file = new File([data], filename, metadata);
      setFile(file);
    } catch (error) {
      console.error("Error:", error);
    }
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
          <Page>
            <div className="flex justify-center items-center">
              <div className="pt-[2.8rem] mr-[7%] flex flex-col items-end w-full">
                <div className="w-[95%]">
                  <div className="flex flex-col items-center">
                    <hr className="w-full border-zinc-950" />
                    <input onChange={handleTitleChange} className="w-full my-3 p-1 rounded-lg focus:outline-none bg-yellow-200 text-left" type="text" placeholder="제목을 입력해 주세요 (최대 30자)" aria-label={titleUpdate} value={titleUpdate} />
                  </div>
                </div>

                {/* 본문 작성 form */}
                <div className="w-[95%] border border-zinc-950">
                  <p className="m-2 text-xl font-bold">본문</p>
                  <hr className="mx-3 my-2 border-zinc-900" />
                  <textarea
                    onChange={handleContentChange}
                    className="notes w-full h-[283px] resize-none focus:outline-none placeholder:text-zinc-400"
                    placeholder="이야기가 시작될 '만약에~' 내용을 입력해 주세요 (최소 글자수 100자 이상)"
                    aria-label={contentUpdate}
                    value={contentUpdate}></textarea>
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
            {/* 표지 이미지 form */}
            <div className="flex flex-col items-center justify-center">
              <div className="flex justify-end w-full px-8 my-2">
                <button className="w-16 mx-3 text-[#6C6C6C] font-semibold border-solid border-2 border-[#FFDE2F] rounded-md hover:text-white hover:bg-[#FFDE2F] duration-200">수정</button>
              </div>
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
                    <img src={image || coverImage} alt="coverImage" className="w-[22rem] h-64 border rounded-md" />
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
      <BookCoverAiPromptModal isOpen={isModalOpen} onClose={cancelAiImage} onConfirm={confirmAiImage} image={image} coverImage={coverImage} setImage={setImage} setFile={setFile}/>
    </div>
  );
};

export default RelayBookUpdate;
