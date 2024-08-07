import React, { useRef, useState, useCallback, ForwardedRef } from "react";
import { useNavigate } from "react-router";
import UserInfo from "./UserInfo";
import RelayBookPageUpdate from "./BookPageCRUD/RelayBookPageUpdate";
import BookPageDeleteModal from "../relay/BookPageCRUD/BookPageDeleteModal";
import BookDetailDone from "./BookDetailDone";
import AddPage from "./BookPageCRUD/AddPage";

interface BookDetailPageProps {
  readPage: string;
  bookId: any;
  number?: any;
  pages: any[];
  totalPage: number;
  handleAiImage: any;
  image: string | null;
  setImage: any;
  isFinished: boolean;
}

const BookDetailPage = React.forwardRef<HTMLDivElement, BookDetailPageProps>(({ readPage, number, pages, totalPage, bookId, handleAiImage, image, setImage, isFinished }, ref: ForwardedRef<HTMLDivElement>) => {
  const navigate = useNavigate();
  const [pageUpdateStates, setPageUpdateStates] = useState<boolean[]>(Array(pages.length).fill(false));

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

  const handlePageUpdate = (index: number, value: boolean) => {
    setPageUpdateStates((prevState) => {
      const newState = [...prevState];
      newState[index] = value;
      return newState;
    });
  };

  return (
    <div>
      {/* readPage= content 일 경우 페이지 매핑 */}
      {readPage === "content"
        ? pages.map((page, index) => (
            <div key={index} className="page" ref={ref}>
              {pageUpdateStates[index] ? (
                <RelayBookPageUpdate page={page} setPageUpdate={(value: boolean) => handlePageUpdate(index, value)} handleAiImage={handleAiImage} image={image} setImage={setImage} />
              ) : (
                index !== totalPage + 1 && <UserInfo firstPage={false} user={page.nickName} badget={"N"} setPageUpdate={(value: boolean) => handlePageUpdate(index, value)} handleDelete={handleDelete} />
              )}
              {!pageUpdateStates[index] && (
                <div className="h-full">
                  <div className="py-3">
                    {(index + 1) % 2 === 0 ? (
                      <div className="p-2 grid grid-rows-[6.8fr_3.2fr]">
                        {/* 홀수쪽일 경우 그림, 글 순서 */}
                        <div className="w-full h-72 flex justify-center">{page.contentFileUrl && <img className="w-[78%] object-cover" src={page.contentFileUrl} alt="" />}</div>
                        <p className="h-full mx-10 relaybookpagenotes text-sm text-justify">{page.content}</p>
                      </div>
                    ) : (
                      <div className="p-2 grid grid-rows-[3.2fr_6.8fr]">
                        {/* 짝수쪽일 경우 글, 그림 순서 */}
                        <p className="h-full mx-10 relaybookpagenotes text-sm text-justify">{page.content}</p>
                        <div className="w-full h-72 flex justify-center">{page.contentFileUrl && <img className="w-[78%] object-cover" src={page.contentFileUrl} alt="" />}</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {pageUpdateStates[index] || number === totalPage + 2 ? null : index % 2 === 1 ? (
                <div>
                  <div className="absolute bottom-5 mx-5">{index + 2}</div>
                  <p className="text-zinc-500 text-xs absolute bottom-6 left-12">{page.createdAt}</p>
                </div>
              ) : (
                <div>
                  <div className="absolute bottom-5 right-0 mx-5">{index + 2}</div>
                  <p className="text-zinc-500 text-xs absolute bottom-6 right-12">{page.createdAt}</p>
                </div>
              )}
              <BookPageDeleteModal isOpen={isModalOpen} onClose={cancelDelete} onConfirm={confirmDelete} />
            </div>
          ))
        : readPage === "last" // readPage = last일 경우 마지막 페이지 보여줌
        ? pages.map((page, index) => (
            <div key={index} className="page" ref={ref}>
              {isFinished ? (
                // 완료된 이야기일 경우 이모티콘 반응
                <BookDetailDone />
              ) : (
                // 진행 중인 이야기일 경우 페이지 추가
                <AddPage pages={pages} handleAiImage={handleAiImage} image={image} setImage={setImage} />
              )}
            </div>
          ))
        : // readPage == first일 경우 첫 번째 페이지 보여줌
          pages.map((page, index) => (
            <div key={index} className="page" ref={ref}>
              <UserInfo firstPage={true} user={page.nickName} badget={"N"} setPageUpdate={(value: boolean) => handlePageUpdate(index, value)} handleDelete={handleDelete} />
              <div className="h-full">
                <div className="py-3">
                  {(index + 1) % 2 === 1 ? (
                    <div className="p-2 grid grid-rows-[6.8fr_3.2fr]">
                      {/* 홀수쪽일 경우 그림, 글 순서 */}
                      <div className="w-full h-72 flex justify-center">{page.contentFileUrl && <img className="w-[78%] object-cover" src={page.contentFileUrl} alt="" />}</div>
                      <p className="h-full mx-10 relaybookpagenotes text-sm text-justify">{page.content}</p>
                    </div>
                  ) : (
                    <div className="p-2 grid grid-rows-[3.2fr_6.8fr]">
                      {/* 짝수쪽일 경우 글, 그림 순서 */}
                      <p className="h-full mx-10 relaybookpagenotes text-sm text-justify">{page.content}</p>
                      <div className="w-full h-72 flex justify-center">{page.contentFileUrl && <img className="w-[78%] object-cover" src={page.contentFileUrl} alt="" />}</div>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div className="absolute bottom-5 mx-5">{index + 1}</div>
                <p className="text-zinc-500 text-xs absolute bottom-6 left-12">{page.createdAt}</p>
              </div>
            </div>
          ))}
    </div>
  );
});

export default BookDetailPage;
