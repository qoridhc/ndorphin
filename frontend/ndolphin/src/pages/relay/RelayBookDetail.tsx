import HTMLFlipBook from "react-pageflip";
import React, { useRef, useState, useCallback, ForwardedRef } from "react";
import "../../css/RelayBook.css";
import { useParams } from "react-router";
import AddPage from "../../components/relay/AddPage";

interface PageProps {
  number?: string;
  children?: React.ReactNode;
}

const PageCover = React.forwardRef<HTMLDivElement>((props, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <div className="cover" ref={ref} data-density="hard">
      <div className="h-full flex flex-col items-center justify-around">
        <img src="/assets/relayStartSample.png" width="300px" alt="#"></img>
        <h2>책 표지</h2>
      </div>
    </div>
  );
});

const PageEndCover = React.forwardRef<HTMLDivElement>((props, ref: ForwardedRef<HTMLDivElement>) => {
  return <div className="cover" ref={ref} data-density="hard"></div>;
});

const Page = React.forwardRef<HTMLDivElement, PageProps>((props, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <div className="page" ref={ref}>
      <h1>사용자 정보 표시</h1>
      <div className="h-full">{props.children}</div>
      <div className="page-footer">{props.number}</div>
    </div>
  );
});

const MyAlbum: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(4);
  const bookRef = useRef<typeof HTMLFlipBook>();

  const onFlip = useCallback((e: { data: number }) => {
    setPage(e.data);
  }, []);

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
          <PageCover></PageCover>
          <Page number="1">
            <hr></hr>
            <div className="w-full flex justify-center">
              <img className="w-4/5" src="/assets/relayStartSample.png" alt="" />
            </div>
            <p contentEditable="true">릴레이 북 내용</p>
          </Page>
          <Page number="2">
            <hr></hr>
            <div className="w-full flex justify-center">
              <img className="w-4/5" src="/assets/relayStartSample.png" alt="" />
            </div>
            <p contentEditable="true">릴레이 북 내용</p>
          </Page>
          <Page number="3">
            <hr></hr>
            <div className="w-full flex justify-center">
              <img className="w-4/5" src="/assets/relayStartSample.png" alt="" />
            </div>
            <p contentEditable="true">릴레이 북 내용</p>
          </Page>
          <Page number="4">
            <hr></hr>
            <p contentEditable="true">릴레이 북 내용</p>
          </Page>
          <Page number="5">
            <hr></hr>
            <AddPage />
          </Page>
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

export default MyAlbum;
