import React, { useRef, useState, useCallback, ForwardedRef } from "react";
import DropDown from "./relayBookCRUD/RelayBookDropDown";

interface RelayBookPageUpdateProps {
  bookId: string | undefined;
}

const BookPageCover = React.forwardRef<HTMLDivElement, RelayBookPageUpdateProps>((bookId, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <div className="cover" ref={ref} data-density="hard">
      <div className="h-full flex flex-col justify-between">
        <div className="pt-5 pr-5 ">
          <DropDown />
        </div>
        <div className="flex justify-center">
          <img src="/assets/relayStartSample.png" width="300px" alt="#"></img>
        </div>
        <p className="text-xl font-bold">책 제목</p>
        <div className="w-full flex justify-end"></div>
      </div>
    </div>
  );
});

export default BookPageCover;
