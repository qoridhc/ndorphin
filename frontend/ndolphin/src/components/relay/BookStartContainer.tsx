import HTMLFlipBook from "react-pageflip";
import React, { useState, useCallback, ForwardedRef } from "react";
import "../../css/RelayBook.css";
import "../../css/Notes.css";
import BookImage from "./BookImage";
import EndPage from "./EndPage";

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
      {props.children}
    </div>
  );
});

const MyAlbum: React.FC = () => {
  return (
    <div className="mt-[3%] grid h-full" style={{ backgroundColor: "white" }}>
      <br></br>

      <div className="col-start-1 row-start-1 z-0">
        {/* @ts-ignore */}
        <HTMLFlipBook width={600} height={700} minWidth={315} maxWidth={1000} minHeight={420} maxHeight={1350} flippingTime={600} style={{ margin: "0 auto" }} maxShadowOpacity={0.5}>
          <Page></Page>
          <Page>
            <div className="w-full flex justify-end m-3">
              <button className="w-16 mx-20 text-[#6C6C6C] font-semibold border-solid border-2 border-[#FFDE2F] rounded-md hover:text-white hover:bg-[#FFDE2F] duration-200">등록</button>
            </div>
            <div className="w-full">
              <div className="flex flex-col items-center">
                <hr className="flex justify-center w-4/5 border-zinc-950" />
              </div>
            </div>
          </Page>
        </HTMLFlipBook>
      </div>

      <div className="mx-[21.5%] mt-[2.8%] col-start-1 row-start-1 z-10">
        <div className="w-[45%]">
          <div className="flex flex-col items-center">
            <hr className="w-full border-zinc-950" />
            <input className="w-full my-4 p-1 rounded-lg focus:outline-none bg-yellow-200 text-left" type="text" placeholder="제목을 입력해 주세요 (최대 30자)" />
          </div>
        </div>
        <div className="w-[45%] border border-zinc-950">
          <p className="m-3 text-xl font-bold">본문</p>
          <hr className="mx-3 my-2 border-zinc-900" />
          <textarea className="notes w-full h-[370px] resize-none focus:outline-none placeholder:text-zinc-400" placeholder="이야기가 시작될 '만약에~' 내용을 입력해 주세요 (최소 글자수 100자 이상)"></textarea>
        </div>
        <div className="w-[45%] mt-3 border border-zinc-950">
          <p className="m-3 text-xl font-bold">종료장수</p>
          <hr className="mx-3 border-zinc-900" />
          <div className="p-4 flex justify-center">
            <div className="w-4/5 flex justify-between">
              <EndPage />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-[21.5%] mt-[2.8%] col-start-1 row-start-1 z-10">
        <BookImage />
      </div>
    </div>
  );
};

export default MyAlbum;
