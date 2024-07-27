import HTMLFlipBook from "react-pageflip";
import React, { useState, useCallback, ForwardedRef } from "react";
import "../../css/RelayBook.css";
import { useParams } from "react-router";

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

const Page = React.forwardRef<HTMLDivElement, PageProps>((props, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <div className="page" ref={ref}>
      <h1>사용자 정보 표시</h1>
      <div className="w-full flex justify-center">
        <img className="w-4/5" src="/assets/relayStartSample.png" alt="" />
      </div>
      <p>{props.children}</p>
      <div className="page-footer">{props.number}</div>
    </div>
  );
});

const MyAlbum: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(4);

  const onFlip = useCallback((e: { data: number }) => {
    setPage(e.data);
  }, []);

  return (
    <div style={{ backgroundColor: "white" }}>
      <div>
        <br></br>
        {/* @ts-ignore */}
        <HTMLFlipBook
          width={600}
          height={700}
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
        >
          <PageCover></PageCover>
          <Page number="1">
            <hr></hr>
            <p contentEditable="true">릴레이 북 내용</p>
          </Page>
          <Page number="2">
            <hr></hr>
            <p contentEditable="true">릴레이 북 내용</p>
          </Page>
          <Page number="3">
            <hr></hr>
            <p contentEditable="true">릴레이 북 내용</p>
          </Page>
          <Page number="4">
            <hr></hr>
            <button></button>
            <p>버튼을 눌러 페이지 추가</p>
          </Page>
        </HTMLFlipBook>
        <div className="flex justify-center">
          [<span>{page}</span> of
          <span> {totalPage}</span>]
        </div>
      </div>
    </div>
  );
};

export default MyAlbum;
