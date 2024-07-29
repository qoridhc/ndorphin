import HTMLFlipBook from "react-pageflip";
import React, { useRef, useState, useCallback, ForwardedRef } from "react";
import "../../css/RelayBook.css";
import { useParams } from "react-router";
import AddPage from "../../components/relay/AddPage";
import BookDetailPage from "../../components/relay/BookDetailPage";
import BookPageCover from "../../components/relay/BookPageCover";


// 마지막 페이지 이후 나오는 책 커버
const PageEndCover = React.forwardRef<HTMLDivElement>((props, ref: ForwardedRef<HTMLDivElement>) => {
  return <div className="cover" ref={ref} data-density="hard"></div>;
});


const RelayBookDetail: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(6);
  const bookRef = useRef<typeof HTMLFlipBook>();

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
    <div className="relative" style={{ backgroundColor: "white" }}>
      {/* 좌우 이동 버튼 */}
      <div className="h-full w-1/6 absolute top-0 hover:cursor-pointer hover:bg-zinc-300 hover:opacity-40" onClick={(e) => onPrev("Y")}>
        <button className="mt-[22rem] absolute left-5 ">
          <img className="w-20" src="/assets/relay/prevButton.png" alt="prev" />
        </button>
      </div>
      <div className="h-full w-1/6 absolute top-0 right-0 hover:cursor-pointer hover:bg-zinc-300 hover:opacity-40" onClick={(e) => onNext("Y")}>
        <button className="mt-[22rem] absolute right-5">
          <img className="w-20" src="/assets/relay/nextButton.png" alt="next" />
        </button>
      </div>

      <div className="mt-[0.4rem] pt-[2.91rem] pb-[2.95rem]">
        {/* 책 라이브러리 내부 */}
        {/* @ts-ignore */}
        <HTMLFlipBook
          ref={bookRef}
          width={600}
          height={680}
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
          <BookPageCover></BookPageCover>

          {/* 페이지 매핑 */}
          {PageList.map((page) => (
            <BookDetailPage number={page.id} page={page} totalPage={PageList.length}>
              <div>
                <hr></hr>
                <div className="w-full flex justify-center">
                  <img className="w-4/5" src="/assets/relayStartSample.png" alt="" />
                </div>
                <p>{page.content}</p>
              </div>
            </BookDetailPage>
          ))}

          {/* 페이지 추가 페이지 */}
          <BookDetailPage number={PageList.length + 1} page={PageList[0]} totalPage={PageList.length}>
            <hr></hr>
            <AddPage />
          </BookDetailPage>

          {/* 페이지가 짝수일 경우 마지막 커버 표시 */}
          {totalPage % 2 == 0 ? <PageEndCover></PageEndCover> : <></>}
        </HTMLFlipBook>
      </div>

      {/* 페이지 쪽수 표시 */}
      <div className="h-[3.7rem] flex justify-center items-center bg-zinc-200">
        [<span>{page}</span> of
        <span> {totalPage}</span>]
      </div>
    </div>
  );
};

export default RelayBookDetail;
