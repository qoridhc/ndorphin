import React, { useRef, useState, useCallback, ForwardedRef, useEffect } from "react";
import DropDown from "./relayBookCRUD/RelayBookDropDown";
import DeleteModal from "./relayBookCRUD/BookDeleteModal";
import Lottie from "lottie-react";
import detailLoading from "../../lottie/detailLoading.json";

interface BookPageCoverProps {
  firstPage: {
    id: number;
    subject: string;
    content: string;
    hit: number;
    boardType: string;
    createdAt: string;
    updatedAt: string;
    contentFileUrl: string;
    hasParticipated: boolean;
    maxPage: number;
    commentResponseDtos: [];
    reactionTypeCounts: {};
    userReactionId: null;
    userReactionType: string;
    fileUrls: any[];
    user: {
      userId: number;
    };
  }[];
  bookId: any;
  isDeleteOpen: boolean;
  isAiOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  handleDelete: () => void;
}

const BookPageCover = React.forwardRef<HTMLDivElement, BookPageCoverProps>(({ firstPage, bookId, handleDelete }, ref: ForwardedRef<HTMLDivElement>) => {
  const localUserId = Number(localStorage.getItem("userId"));
  const [userId, setUserId] = useState(0);
  const [contentFileUrl, setContentFileUrl] = useState("");
  const [subject, setSubject] = useState("");

  useEffect(() => {
    if (firstPage && firstPage.length > 0) {
      setContentFileUrl(firstPage[0].fileUrls[0]);
      setSubject(firstPage[0].subject);
      setUserId(firstPage[0].user.userId);
    }
  }, [firstPage]);

  return (
    <>
      {
        <div className="cover" ref={ref} data-density="hard">
          <div className="h-full flex flex-col justify-between">
            <div className="pt-5 pr-5 ">{localUserId === userId && <DropDown bookId={bookId} handleDelete={handleDelete} firstPage={firstPage} />}</div>
            <div className="flex justify-center">{contentFileUrl ? <img src={contentFileUrl} width="300px" alt="로딩 중..."></img> : <Lottie className="w-36" animationData={detailLoading} />}</div>
            <p className="text-xl font-bold">{subject}</p>
            <div className="w-full flex justify-end"></div>
          </div>
        </div>
      }
    </>
  );
});

export default BookPageCover;
