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
    badget: string;
    date: string;
    content: string;
    pageImage: string;
  };
  totalPage: number;
  handleAiImage: any;
  image: string | null;
  setImage: any;
}

const BookDetailPage = React.forwardRef<HTMLDivElement, BookDetailPageProps>(({ number, children, page, totalPage, bookId, handleAiImage, image, setImage }, ref: ForwardedRef<HTMLDivElement>) => {
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
      {pageUpdate ? (
        <RelayBookPageUpdate page={page} setPageUpdate={setPageUpdate} handleAiImage={handleAiImage} image={image} setImage={setImage} />
      ) : (
        <>{number === totalPage + 1 ? null : <UserInfo user={page.user} userId={page.userId} badget={page.badget} setPageUpdate={setPageUpdate} handleDelete={handleDelete} />}</>
      )}
      {!pageUpdate && <div className="h-full">{children}</div>}
      {pageUpdate || number === totalPage + 1 ? null : number % 2 == 1 ? (
        <div>
          <div className="absolute bottom-5 mx-5">{number}</div>
          <p className="text-zinc-500 text-xs absolute bottom-6 left-12">{page.date}</p>
        </div>
      ) : (
        <div>
          <div className="absolute bottom-5 right-0 mx-5">{number}</div>
          <p className="text-zinc-500 text-xs absolute bottom-6 right-12">{page.date}</p>
        </div>
      )}
      <BookPageDeleteModal isOpen={isModalOpen} onClose={cancelDelete} onConfirm={confirmDelete} />
    </div>
  );
});

export default BookDetailPage;
