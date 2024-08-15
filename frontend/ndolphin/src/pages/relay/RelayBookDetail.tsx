import HTMLFlipBook from "react-pageflip";
import React, { useRef, useState, useCallback, ForwardedRef, useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import boardApi from "../../api/boardApi";
import "../../css/RelayBook.css";
import "../../css/Notes.css";
import { useParams } from "react-router";
import BookDetailPage from "../../components/relay/BookDetailPage";
import BookPageCover from "../../components/relay/BookPageCover";
import DeleteModal from "../../components/relay/relayBookCRUD/BookDeleteModal";
import AiImagePromptModal from "../../components/relay/AiImagePromptModal";

interface PageEndCoverProps {
  totalPage: number | null;
}

// 마지막 페이지 이후 나오는 책 커버
const PageEndCover = React.forwardRef<HTMLDivElement, PageEndCoverProps>(({ totalPage }, ref: ForwardedRef<HTMLDivElement>) => {
  return totalPage && totalPage % 2 === 1 ? <div className="cover" ref={ref} data-density="hard"></div> : <></>;
});

const RelayBookDetail = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [pages, setPages] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageId, setPageId] = useState<number | null>(null);
  const bookRef = useRef<typeof HTMLFlipBook>();
  const [isFinished, setIsFinished] = useState(false);
  const [inputPage, setInputPage] = useState<number | string>(page);
  const [isHoverd, setIsHoverd] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [firstPage, setFirstPage] = useState<any[]>([]);
  const [lastPage, setLastPage] = useState<any[]>([]);
  const [hasParticipated, setHasParticipated] = useState<boolean>(false);
  const [isChanged, setIsChanged] = useState<boolean>(false);

  // BGM 제어를 위한 상태와 ref 사용
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioPageRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false); // 음악이 재생 중인지 여부

  // useEffect -> 렌더링이 다 되고나서 실행 (html부터 다 그려준 뒤 실행)
  useEffect(() => {
    let isMounted = true;
    // axios GET
    const getRelayDetail = async () => {
      try {
        if (bookId) {
          const response = await boardApi.read(bookId);
          if (response.status === 200 && isMounted) {
            const bookDetail = response.data.data.commentResponseDtos;
            const firstPage = response.data.data;
            setPages(bookDetail);
            setFirstPage([firstPage]);
            setLastPage([firstPage]);
            setHasParticipated(firstPage.hasParticipated);
            setIsFinished(firstPage.done);
          }
        }
      } catch (error) {
        console.log("릴레이북 상세 불러오기 오류: ", error);
      }
    };

    getRelayDetail();

    // 페이지가 로드되면 BGM 자동 재생 시도
    const playAudio = () => {
      if (audioRef.current) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true); // 재생 성공
            })
            .catch((error) => {
              console.log("자동 재생 실패: 사용자가 상호작용하지 않음");
            });
        }
      }
    };

    // 브라우저 정책에 따라 자동 재생이 실패할 수 있으므로 시도
    playAudio();

    return () => {
      isMounted = false;
    };
  }, [bookId]);

  const playAudioPage = () => {
    if (audioPageRef.current) {
      const playPromise = audioPageRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true); // 재생 성공
          })
          .catch((error) => {
            console.log("자동 재생 실패: 사용자가 상호작용하지 않음");
          });
      }
    }
  };

  // 음악 재생/정지 제어
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.log("재생 실패: ", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  // 페이지 넘어갈 시 page를 현재 페이지 쪽수로 업데이트
  const onFlip = useCallback((e: { data: number }) => {
    setPage(e.data);
    setInputPage(e.data);
  }, []);

  // 이전 버튼
  const onPrev = (hasFlip = "N") => {
    if (bookRef.current) {
      // @ts-ignore
      // const pageIndex = bookRef.current.pageFlip().getCurrentPageIndex();
      if (hasFlip === "Y") {
        // @ts-ignore
        bookRef.current.pageFlip().flipPrev("bottom");
      } else {
        // @ts-ignore
        bookRef.current.pageFlip().turnToPrevPage();
      }

      playAudioPage();
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

    playAudioPage();
  };

  // 릴레이북 삭제 관련
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteAIModalOpen] = useState(false);

  // 삭제 버튼 클릭 시 모달 true
  const handleDelete = () => {
    setDeleteAIModalOpen(true);
  };

  // 삭제 모달 확인 시 axios delete
  const confirmDelete = async () => {
    setDeleteAIModalOpen(false);

    try {
      if (bookId) {
        const response = await boardApi.delete(bookId);
        if (response.status === 200) {
          console.log("릴레이북 삭제 성공");
          navigate("/relaybooklist");
        }
      }
    } catch (error) {
      console.error("릴레이북 삭제 오류: ", error);
    }
  };

  // 삭제 모달 취소 시 모달 닫음
  const cancelDelete = () => {
    setDeleteAIModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value)) && Number(value) >= 1 && Number(value) <= pages.length + 1) {
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
    setIsChanged(true);
  };

  const cancelAiImage = () => {
    setIsAiModalOpen(false);
  };

  return (
    <div className="overflow-hidden relay-book">
      {/* 배경 음악 오디오 요소 */}
      <audio ref={audioRef} src="/bgms/relayBookBGM.mp3" loop />
      <audio ref={audioPageRef} src="/bgms/soundPageFlip.mp3" />

      <div className="relative grid grid-rows-[93%_7%]" style={{ backgroundColor: "white" }}>
        {/* BGM 제어 버튼 */}
        <button onClick={toggleAudio} className="absolute z-50 right-5 top-5   border-2 border-zinc-200 rounded-full px-2 py-2 bg-amber-50 hover:bg-amber-200 transition duration-200 ease-in-out">
          <img className="w-7" src={isPlaying ? "/assets/playMusic.png" : "/assets/silentMusic.png"} alt="음악 재생 버튼" />
        </button>

        {/* 좌우 이동 버튼 */}
        <div className="h-full w-1/6 absolute top-0 hover:cursor-pointer hover:bg-zinc-300 hover:opacity-40">
          <button className="mt-[18rem] absolute left-5" onClick={(e) => onPrev("Y")}>
            <img className="w-16" src="/assets/relay/prevButton.png" alt="prev" />
          </button>
        </div>
        <div className="h-full w-1/6 absolute top-0 right-0 hover:cursor-pointer hover:bg-zinc-300 hover:opacity-40">
          <button className="mt-[18rem] absolute right-5" onClick={(e) => onNext("Y")} disabled={pages.length % 2 === 0 ? inputPage === pages.length + 1 : inputPage === pages.length + 2}>
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
            {/* 책 표지 */}
            <BookPageCover firstPage={firstPage} bookId={bookId} isDeleteOpen={isDeleteModalOpen} isAiOpen={isAiModalOpen} onClose={cancelDelete} onConfirm={confirmDelete} handleDelete={handleDelete}></BookPageCover>

            {/* 첫 번째 페이지 */}
            <BookDetailPage
              readPage={"first"}
              hasParticipated={hasParticipated}
              bookId={bookId}
              pageId={pageId}
              number={page}
              pages={firstPage}
              totalPage={pages.length}
              handleAiImage={handleAiImage}
              image={image}
              setImage={setImage}
              file={file}
              setFile={setFile}
              isFinished={isFinished}
              setPageId={setPageId}
              isChanged={isChanged}
              setIsChanged={setIsChanged}></BookDetailPage>
            {/* 내부 상세 페이지 */}
            <BookDetailPage
              readPage={"content"}
              hasParticipated={hasParticipated}
              bookId={bookId}
              pageId={pageId}
              number={page}
              pages={pages}
              totalPage={pages.length}
              handleAiImage={handleAiImage}
              image={image}
              setImage={setImage}
              file={file}
              setFile={setFile}
              isFinished={isFinished}
              setPageId={setPageId}
              isChanged={isChanged}
              setIsChanged={setIsChanged}></BookDetailPage>
            {/* 마지막 페이지 (이모티콘 반응 or 페이지 추가) */}
            <BookDetailPage
              readPage={"last"}
              hasParticipated={hasParticipated}
              bookId={bookId}
              pageId={pageId}
              number={page}
              pages={lastPage}
              totalPage={pages.length}
              handleAiImage={handleAiImage}
              image={image}
              setImage={setImage}
              file={file}
              setFile={setFile}
              isFinished={isFinished}
              setPageId={setPageId}
              isChanged={isChanged}
              setIsChanged={setIsChanged}></BookDetailPage>

            {/* 페이지가 짝수일 경우 마지막 커버 표시 */}
            <PageEndCover totalPage={pages.length + 2} />
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
          <span className="pl-4 font-bold">{pages.length + 2}</span>
        </div>
      </div>

      {/* 릴레이북 삭제 모달 */}
      <DeleteModal bookId={bookId} isOpen={isDeleteModalOpen} onClose={cancelDelete} onConfirm={confirmDelete} />

      {/* AI 이미지 생성 모달 */}
      <AiImagePromptModal isOpen={isAiModalOpen} onClose={cancelAiImage} onConfirm={confirmAiImage} image={image} coverImage={"/assets/relay/defaultImage.png"} setImage={setImage} setFile={setFile} />
    </div>
  );
};

export default RelayBookDetail;
