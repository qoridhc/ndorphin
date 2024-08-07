import React, { useRef, useState, useCallback, ForwardedRef } from "react";
import DropDown from "./relayBookCRUD/RelayBookDropDown";
import DeleteModal from "./relayBookCRUD/BookDeleteModal";

interface BookPageCoverProps {
  firstPage: any;
  bookId: any;
  isDeleteOpen: boolean;
  isAiOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  handleDelete: () => void;
}

const BookPageCover = React.forwardRef<HTMLDivElement, BookPageCoverProps>(({ firstPage, bookId, handleDelete }, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <>
      <div className="cover" ref={ref} data-density="hard">
        <div className="h-full flex flex-col justify-between">
          <div className="pt-5 pr-5 ">
            <DropDown bookId={bookId} handleDelete={handleDelete} firstPage={firstPage} />
          </div>
          <div className="flex justify-center">
            <img src="/assets/relay/relayStartSample1.png" width="300px" alt="#"></img>
          </div>
          <p className="text-xl font-bold">책 제목</p>
          <div className="w-full flex justify-end"></div>
        </div>
      </div>
    </>
  );
});

export default BookPageCover;
