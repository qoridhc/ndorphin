import HTMLFlipBook from "react-pageflip";
import React, { useRef, useState, useCallback, ForwardedRef } from "react";
import { Navigate, useNavigate } from "react-router";
import "../../css/RelayBook.css";
import { useParams } from "react-router";
import AddPage from "../../components/relay/BookPageCRUD/AddPage";
import BookDetailPage from "../../components/relay/BookDetailPage";
import BookPageCover from "../../components/relay/BookPageCover";
import BookDetailDone from "../../components/relay/BookDetailDone";
import DeleteModal from "../../components/relay/relayBookCRUD/BookDeleteModal";

// 마지막 페이지 이후 나오는 책 커버
const PageEndCover = React.forwardRef<HTMLDivElement>((props, ref: ForwardedRef<HTMLDivElement>) => {
  return <div className="cover" ref={ref} data-density="hard"></div>;
});

const RelayBookDetail: React.FC = () => {
  const navigate = useNavigate()
  const { bookId } = useParams();
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(6);
  const bookRef = useRef<typeof HTMLFlipBook>();
  const [isFinished, setIsFinished] = useState(true);

  // 페이지 넘어갈 시 page를 현재 페이지 쪽수로 업데이트
  const onFlip = useCallback((e: { data: number }) => {
    setPage(e.data);
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    setIsModalOpen(false);
    navigate("/relaybooklist")
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
  };

  const PageList = [
    {
      id: 1,
      userId: 1,
      user: "삶은계란",
      content: "내용입니다1",
      pageImage: "/assets/relayStartSample.png",
    },
    {
      id: 2,
      userId: 2,
      user: "만약핑인데",
      content: "내용입니다2",
      pageImage: "/assets/relayStartSample.png",
    },
    {
      id: 3,
      userId: 3,
      user: "별이 빛나는 밤",
      content: "내용입니다3",
      pageImage: "/assets/relayStartSample.png",
    },
    {
      id: 4,
      userId: 4,
      user: "코에촉촉",
      content: "내용입니다4",
      pageImage: "/assets/relayStartSample.png",
    },
    {
      id: 5,
      userId: 5,
      user: "상상의 나무꾼",
      content: "내용입니다5",
      pageImage: "/assets/relayStartSample.png",
    },
    {
      id: 6,
      userId: 6,
      user: "상상의 나무꾼",
      content: "내용입니다5",
      pageImage: "/assets/relayStartSample.png",
    },
  ];

  return (
    <>
      <div className="relative grid grid-rows-[93%_7%] overflow-hidden" style={{ backgroundColor: "white" }}>
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
            <BookPageCover bookId={bookId} isOpen={isModalOpen} onClose={cancelDelete} onConfirm={confirmDelete} handleDelete={handleDelete}></BookPageCover>

            {/* 페이지 매핑 */}
            {PageList.map((page) => (
              <BookDetailPage bookId={bookId} number={page.id} page={page} totalPage={PageList.length}>
                <div className="h-[80%] flex flex-col justify-around">
                  {page.id % 2 == 1 ? (
                    <>
                    {/* 홀수쪽일 경우 그림, 글 순서 */}
                      <div className="w-full flex justify-center">
                        <img className="w-2/3" src="/assets/relayStartSample.png" alt="" />
                      </div>
                      <p>{page.content}</p>
                    </>
                  ) : (
                      <>
                        {/* 짝수쪽일 경우 글, 그림 순서 */}
                      <p>{page.content}</p>
                      <div className="w-full flex justify-center">
                        <img className="w-2/3" src="/assets/relayStartSample.png" alt="" />
                      </div>
                    </>
                  )}
                </div>
              </BookDetailPage>
            ))}

            {/* 마지막 페이지 */}
            {isFinished ? (
              // 완료된 이야기일 경우 이모티콘 반응
              <BookDetailPage bookId={bookId} number={PageList.length + 1} page={PageList[0]} totalPage={PageList.length}>
                <BookDetailDone />
              </BookDetailPage>
            ) : (
              // 진행 중인 이야기일 경우 페이지 추가
              <BookDetailPage bookId={bookId} number={PageList.length + 1} page={PageList[0]} totalPage={PageList.length}>
                <hr></hr>
                <AddPage PageList={PageList} />
              </BookDetailPage>
            )}
            {/* 페이지가 짝수일 경우 마지막 커버 표시 */}
            {totalPage % 2 == 0 ? <PageEndCover></PageEndCover> : <></>}
          </HTMLFlipBook>
        </div>

        {/* 페이지 하단바 */}
        <div className="py-6 flex justify-center items-center bg-zinc-200">
          [<span>{page}</span> of
          <span> {totalPage}</span>]
        </div>
      </div>

      {/* 릴레이북 삭제 모달 */}
      <DeleteModal isOpen={isModalOpen} onClose={cancelDelete} onConfirm={confirmDelete} />
    </>
  );
};

export default RelayBookDetail;
