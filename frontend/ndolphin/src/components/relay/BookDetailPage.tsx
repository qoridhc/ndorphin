import React, { useRef, useState, useCallback, ForwardedRef } from "react";
import { useNavigate } from "react-router";
import UserInfo from "./UserInfo";
import RelayBookPageUpdate from "./BookPageCRUD/RelayBookPageUpdate";
import BookPageDeleteModal from "../relay/BookPageCRUD/BookPageDeleteModal";

interface BookDetailPageProps {
  bookId: any;
  number?: any;
  children?: React.ReactNode;
  page: {
    id: number;
    userId: number;
    user: string;
    content: string;
    pageImage: string;
  };
  totalPage: number;
}

const BookDetailPage = React.forwardRef<HTMLDivElement, BookDetailPageProps>(({ number, children, page, totalPage, bookId }, ref: ForwardedRef<HTMLDivElement>) => {
  const navigate = useNavigate();
  const [pageUpdate, setPageUpdate] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    setIsModalOpen(false);
    navigate(`/relaybookdetail/${bookId}`);
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="page" ref={ref}>
      {pageUpdate ? <RelayBookPageUpdate page={page} setPageUpdate={setPageUpdate} /> : <>{number === totalPage + 1 ? null : <UserInfo user={page.user} userId={page.userId} setPageUpdate={setPageUpdate} handleDelete={handleDelete} />}</>}
      {!pageUpdate && <div className="h-full">{children}</div>}
      {pageUpdate || number === totalPage + 1 ? null : number % 2 == 1 ? <div className="absolute bottom-0 m-5">{number}</div> : <div className="absolute bottom-0 right-0 m-5">{number}</div>}
      <BookPageDeleteModal isOpen={isModalOpen} onClose={cancelDelete} onConfirm={confirmDelete} />
    </div>
  );
});

export default BookDetailPage;
