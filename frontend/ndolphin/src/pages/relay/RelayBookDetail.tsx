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
    <div style={{ backgroundColor: "white" }}>
      <div>
        <br></br>
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
          useMouseEvents={false}
        >
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
          <PageEndCover></PageEndCover>
        </HTMLFlipBook>
        <div className="h-full w-1/5 absolute top-0" onClick={(e) => onPrev("Y")}>
          <button className="mt-[26rem]">이전</button>
        </div>
        <div className="h-full w-1/5 absolute top-0 right-0" onClick={(e) => onNext("Y")}>
          <button className="mt-[26rem] ml-[90%]">다음</button>
        </div>
        <div className="flex justify-center">
          [<span>{page}</span> of
          <span> {totalPage}</span>]
        </div>
      </div>
    </div>
  );
};

export default MyAlbum;
