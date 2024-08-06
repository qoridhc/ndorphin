import HTMLFlipBook from "react-pageflip";
import React, { useRef, useState, useCallback, ForwardedRef } from "react";
import { Navigate, useNavigate } from "react-router";
import "../../css/RelayBook.css";
import "../../css/Notes.css";
import { useParams } from "react-router";
import AddPage from "../../components/relay/BookPageCRUD/AddPage";
import BookDetailPage from "../../components/relay/BookDetailPage";
import BookPageCover from "../../components/relay/BookPageCover";
import BookDetailDone from "../../components/relay/BookDetailDone";
import DeleteModal from "../../components/relay/relayBookCRUD/BookDeleteModal";
import AiImagePromptModal from "../../components/relay/AiImagePromptModal";

// 마지막 페이지 이후 나오는 책 커버
const PageEndCover = React.forwardRef<HTMLDivElement>((props, ref: ForwardedRef<HTMLDivElement>) => {
  return <div className="cover" ref={ref} data-density="hard"></div>;
});

const RelayBookDetail = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(6);
  const bookRef = useRef<typeof HTMLFlipBook>();
  const [isFinished, setIsFinished] = useState(false);
  const [inputPage, setInputPage] = useState<number | string>(page);
  const [isHoverd, setIsHoverd] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  // 페이지 넘어갈 시 page를 현재 페이지 쪽수로 업데이트
  const onFlip = useCallback((e: { data: number }) => {
    setPage(e.data);
    setInputPage(e.data);
  }, []);

  // 이전 버튼
  const onPrev = (hasFlip = "N") => {
    if (bookRef.current) {
      // @ts-ignore
      const pageIndex = bookRef.current.pageFlip().getCurrentPageIndex();
      if (hasFlip === "Y") {
        // @ts-ignore
        bookRef.current.pageFlip().flipPrev("bottom");
      } else {
        // @ts-ignore
        bookRef.current.pageFlip().turnToPrevPage();
      }
    }
  };

  // 이후 버튼
  const onNext = (hasFlip = "N") => {
    // @ts-ignore
    const pageIndex = bookRef.current.pageFlip().getCurrentPageIndex();
    if (pageIndex === 7) return;
    if (hasFlip === "Y") {
      // @ts-ignore
      bookRef.current.pageFlip().flipNext();
    } else {
      // @ts-ignore
      bookRef.current.pageFlip().turnToNextPage();
    }
  };

  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteAIModalOpen] = useState(false);

  const handleDelete = () => {
    setDeleteAIModalOpen(true);
  };

  const confirmDelete = () => {
    setDeleteAIModalOpen(false);
    navigate("/relaybooklist");
  };

  const cancelDelete = () => {
    setDeleteAIModalOpen(false);
  };

  const PageList = [
    {
      id: 1,
      userId: 1,
      user: "삶은계란",
      badget: "N",
      date: "2024-07-30 01:22",
      content: "내용입니다안녕하세요 제가 이예림입니다 하하하 입니다1안녕 ? 공부 많이 했어? 오늘 밥 뭐먹지 다1내용입니다진짜 내일은 통신하자 알겠지? 내용입니다1내용입니다1내용입니다1내용입니다",
      pageImage: "/assets/relay/relayStartSample1.png",
    },
    {
      id: 2,
      userId: 2,
      user: "만약핑인데",
      badget: "S",
      date: "2024-12-10 21:45",
      content: "내용입니다2",
      pageImage: "/assets/relay/relayStartSample2.png",
    },
    {
      id: 3,
      userId: 3,
      user: "별이 빛나는 밤",
      badget: "S",
      date: "2024-07-30 01:22",
      content: "내용입니다3",
      pageImage: "/assets/relay/relayStartSample3.png",
    },
    {
      id: 4,
      userId: 4,
      user: "코에촉촉",
      badget: "N",
      date: "2024-07-30 01:22",
      content: "내용입니다안녕하세요 제가 이예림입니다 하하하니다진짜 내일은 통신하자 알겠지? 내용입니다1내용입니다1내용입니다1내용입니다",
      pageImage: "/assets/relay/relayStartSample4.png",
    },
    {
      id: 5,
      userId: 5,
      user: "상상의 나무꾼",
      badget: "N",
      date: "2024-07-30 01:22",
      content: "내용입니다5",
      pageImage: "/assets/relay/relayStartSample5.png",
    },
    {
      id: 6,
      userId: 6,
      user: "상상의 나무꾼",
      badget: "S",
      date: "2024-07-30 01:22",
      content: "내용입니다5",
      pageImage: "/assets/relay/relayStartSample6.png",
    },
  ];

  const BookStart = [
    {
      coverImage: "/assets/relay/relayStartSample1.png",
      title: "책 제목1",
      content: PageList[0].content,
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value)) && Number(value) >= 1 && Number(value) <= totalPage) {
      setInputPage(Number(value));
    } else {
      setInputPage(value);
    }
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && typeof inputPage === "number") {
      // @ts-ignore
      bookRef.current.pageFlip().turnToPage(inputPage);
      setPage(inputPage);
    }
  };

  // AI 이미지 모달 관련

  const handleAiImage = () => {
    setIsAiModalOpen(true);
  };

  const confirmAiImage = async (image: string) => {
    setIsAiModalOpen(false);
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
    setIsAiModalOpen(false);
  };

  return (
    <div className="overflow-hidden">
      <div className="relative grid grid-rows-[93%_7%]" style={{ backgroundColor: "white" }}>
        {/* 좌우 이동 버튼 */}
        <div className="h-full w-1/6 absolute top-0 hover:cursor-pointer hover:bg-zinc-300 hover:opacity-40" onClick={(e) => onPrev("Y")}>
          <button className="mt-[18rem] absolute left-5 ">
            <img className="w-16" src="/assets/relay/prevButton.png" alt="prev" />
          </button>
        </div>
        <div className="h-full w-1/6 absolute top-0 right-0 hover:cursor-pointer hover:bg-zinc-300 hover:opacity-40" onClick={(e) => onNext("Y")}>
          <button className="mt-[18rem] absolute right-5">
            <img className="w-16" src="/assets/relay/nextButton.png" alt="next" />
          </button>
        </div>

        <div className="mt-[0.4rem] pt-[1rem] pb-[0.9rem]">
          {/* 책 라이브러리 내부 */}
          {/* @ts-ignore */}
          <HTMLFlipBook
            ref={bookRef}
            width={480}
            height={550}
            minWidth={315}
            maxWidth={1000}
            minHeight={420}
            maxHeight={1350}
            showCover={true}
            mobileScrollSupport={true}
            flippingTime={600}
            style={{ margin: "0 auto" }}
            maxShadowOpacity={0.5}
            className="album-web"
            onFlip={onFlip}
            useMouseEvents={false}>
            <BookPageCover BookStart={BookStart} bookId={bookId} isDeleteOpen={isDeleteModalOpen} isAiOpen={isAiModalOpen} onClose={cancelDelete} onConfirm={confirmDelete} handleDelete={handleDelete}></BookPageCover>

            {/* 페이지 매핑 */}
            {PageList.map((page) => (
              <BookDetailPage bookId={bookId} number={page.id} page={page} totalPage={PageList.length} handleAiImage={handleAiImage} image={image} setImage={setImage}>
                <div className="py-3">
                  {page.id % 2 == 1 ? (
                    <div className="p-2 grid grid-rows-[6.8fr_3.2fr]">
                      {/* 홀수쪽일 경우 그림, 글 순서 */}
                      <div className="w-full h-72 flex justify-center">
                        <img className="w-[78%] object-cover" src={page.pageImage} alt="" />
                      </div>
                      <p className="h-full mx-10 relaybookpagenotes text-sm text-justify">{page.content}</p>
                    </div>
                  ) : (
                    <div className="p-2 grid grid-rows-[3.2fr_6.8fr]">
                      {/* 짝수쪽일 경우 글, 그림 순서 */}
                      <p className="h-full mx-10 relaybookpagenotes text-sm text-justify">{page.content}</p>
                      <div className="w-full h-72 flex justify-center">
                        <img className="w-[78%] object-cover" src={page.pageImage} alt="" />
                      </div>
                    </div>
                  )}
                </div>
              </BookDetailPage>
            ))}

            {/* 마지막 페이지 */}
            {isFinished ? (
              // 완료된 이야기일 경우 이모티콘 반응
              <BookDetailPage bookId={bookId} number={PageList.length + 1} page={PageList[0]} totalPage={PageList.length} handleAiImage={handleAiImage} image={image} setImage={setImage}>
                <BookDetailDone />
              </BookDetailPage>
            ) : (
              // 진행 중인 이야기일 경우 페이지 추가
              <BookDetailPage bookId={bookId} number={PageList.length + 1} page={PageList[0]} totalPage={PageList.length} handleAiImage={handleAiImage} image={image} setImage={setImage}>
                <hr></hr>
                <AddPage PageList={PageList} handleAiImage={handleAiImage} image={image} setImage={setImage} />
              </BookDetailPage>
            )}
            {/* 페이지가 짝수일 경우 마지막 커버 표시 */}
            {totalPage % 2 === 0 ? <PageEndCover></PageEndCover> : <></>}
          </HTMLFlipBook>
        </div>

        {/* 페이지 하단바 */}
        <div className="relative py-[1.36rem] flex justify-center items-center bg-zinc-200 z-30">
          {isHoverd ? (
            <div
              onMouseEnter={() => {
                setIsHoverd(true);
              }}
              onMouseLeave={() => {
                setIsHoverd(false);
              }}
              className="border-2 border-blue-500 rounded-sm ">
              <input className="w-8 bg-slate-100 text-center focus:outline-none font-bold text-zinc-600" type="text" value={inputPage} onChange={handleInputChange} onKeyDown={handleInputKeyPress} />
            </div>
          ) : (
            <div
              onMouseEnter={() => {
                setIsHoverd(true);
              }}
              onMouseLeave={() => {
                setIsHoverd(false);
              }}
              className="border-2 border-stone-500 rounded-sm ">
              <input className="w-8 bg-slate-100 text-center focus:outline-none font-bold text-zinc-600" type="text" value={inputPage} onChange={handleInputChange} onKeyDown={handleInputKeyPress} />
            </div>
          )}
          <span className="pl-4 font-bold">/</span>
          <span className="pl-4 font-bold">{totalPage + 1}</span>
        </div>
      </div>

      {/* 릴레이북 삭제 모달 */}
      <DeleteModal isOpen={isDeleteModalOpen} onClose={cancelDelete} onConfirm={confirmDelete} />

      {/* AI 이미지 생성 모달 */}
      <AiImagePromptModal isOpen={isAiModalOpen} onClose={cancelAiImage} onConfirm={confirmAiImage} image={image} coverImage={"/assets/relay/defaultImage.png"} setImage={setImage} setFile={setFile}/>
    </div>
  );
};

export default RelayBookDetail;
