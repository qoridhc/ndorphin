import React, { useRef, useState, useCallback, ForwardedRef } from "react";
import { useNavigate } from "react-router";
import commentApi from "../../api/commentApi";
import UserInfo from "./UserInfo";
import RelayBookPageUpdate from "./BookPageCRUD/RelayBookPageUpdate";
import BookPageDeleteModal from "../relay/BookPageCRUD/BookPageDeleteModal";
import BookDetailDone from "./BookDetailDone";
import AddPage from "./BookPageCRUD/AddPage";

interface BookDetailPageProps {
  readPage: string;
  hasParticipated: boolean;
  bookId: any;
  pageId: number | null;
  number?: any;
  pages: any[];
  totalPage: number;
  handleAiImage: any;
  image: string | null;
  setImage: any;
  isFinished: boolean;
  file: File | null;
  setFile: (file: File | null) => void;
  setPageId: (pageId: number | null) => void;
  isChanged: boolean;
  setIsChanged: (isChanged: boolean) => void;
}

const BookDetailPage = React.forwardRef<HTMLDivElement, BookDetailPageProps>(
  ({ readPage, hasParticipated, number, pages, pageId, totalPage, bookId, handleAiImage, image, file, setImage, setFile, isFinished, setPageId, setIsChanged, isChanged }, ref: ForwardedRef<HTMLDivElement>) => {
    const navigate = useNavigate();
    const [pageUpdateStates, setPageUpdateStates] = useState<boolean[]>(Array(pages.length).fill(false));
    const [isModalOpen, setIsModalOpen] = useState<number | null>(null);
    const [currentFileName, setCurrentFileName] = useState<string | null>(null);

    // 페이지 삭제 관련
    const handleDelete = (index: number) => {
      setIsModalOpen(index);
    };

    const confirmDelete = async (commentId: number) => {
      setIsModalOpen(null);
      // 페이지 삭제 api 호출
      try {
        if (bookId && commentId) {
          const response = await commentApi.delete(bookId, commentId);
          if (response.status === 200) {
            console.log("릴레이북 페이지 삭제 성공");
            window.location.reload();
          }
        }
      } catch (error) {
        console.error("릴레이북 페이지 삭제 오류: ", error);
      }
    };

    const cancelDelete = () => {
      setIsModalOpen(null);
    };

    // 페이지 수정 관련
    const handlePageUpdate = (index: number, value: boolean) => {
      setPageUpdateStates((prevState) => {
        const newState = [...prevState];
        newState[index] = value;
        return newState;
      });
    };

    const confirmUpdate = async (content: string) => {
      // 페이지 수정 api 호출
      const formData = new FormData();

      if (currentFileName !== null && isChanged && file) {
        const fileName = [];
        fileName.push(currentFileName);
        const deleteFilesJson = JSON.stringify(fileName);
        formData.append("deleteFiles", new Blob([deleteFilesJson], { type: "application/json" }));
        formData.append("files", file);
      } else if (currentFileName === null && file) {
        formData.append("files", file);
      }

      formData.append(
        "request",
        new Blob(
          [
            JSON.stringify({
              content: content,
            }),
          ],
          { type: "application/json" }
        )
      );

      try {
        if (bookId && pageId) {
          // const response = await commentApi.update("1", 72, formData);
          const response = await commentApi.update(bookId, pageId, formData);
          if (response.status === 200) {
            console.log("릴레이북 페이지 수정 성공");
            // window.location.reload();
          }
        }
      } catch (error) {
        console.error("릴레이북 페이지 수정 오류: ", error);
      }
    };

    return (
      <div>
        {/* readPage= content 일 경우 페이지 매핑 */}
        {readPage === "content"
          ? pages.map((page, index) => (
              <div key={index} className="page" ref={ref}>
                {pageUpdateStates[index] ? (
                  <RelayBookPageUpdate
                    setPageId={setPageId}
                    confirmUpdate={confirmUpdate}
                    page={page}
                    setPageUpdate={(value: boolean) => handlePageUpdate(index, value)}
                    handleAiImage={handleAiImage}
                    image={image}
                    setImage={setImage}
                    setFile={setFile}
                    setCurrentFileName={setCurrentFileName}
                    setIsChanged={setIsChanged}
                  />
                ) : (
                  index !== totalPage + 1 && (
                    <UserInfo index={index} firstPage={false} user={page.user.nickName} userImage={page.user.profileImage} badget={page.user.mbti} setPageUpdate={(value: boolean) => handlePageUpdate(index, value)} handleDelete={handleDelete} />
                  )
                )}
                {!pageUpdateStates[index] && (
                  <div className="h-full">
                    <div className="py-3">
                      {(index + 1) % 2 === 0 ? (
                        <div className="p-2 grid grid-rows-[6.8fr_3.2fr]">
                          {/* 홀수쪽일 경우 그림, 글 순서 */}
                          <div className="w-full h-72 flex justify-center">{page.fileUrl && <img className="w-[78%] object-cover" src={page.fileUrl} alt="" />}</div>
                          <p className="h-full mx-10 relaybookpagenotes text-sm text-justify">{page.content}</p>
                        </div>
                      ) : (
                        <div className="p-2 grid grid-rows-[3.2fr_6.8fr]">
                          {/* 짝수쪽일 경우 글, 그림 순서 */}
                          <p className="h-full mx-10 relaybookpagenotes text-sm text-justify">{page.content}</p>
                          <div className="w-full h-72 flex justify-center">{page.fileUrl && <img className="w-[78%] object-cover" src={page.fileUrl} alt="" />}</div>
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
                <BookPageDeleteModal isOpen={isModalOpen === index} onClose={cancelDelete} onConfirm={confirmDelete} commentId={page.commentId} />
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
                  <AddPage hasParticipated={hasParticipated} bookId={bookId} pages={pages} handleAiImage={handleAiImage} image={image} setImage={setImage} file={file} setFile={setFile} />
                )}
              </div>
            ))
          : // readPage == first일 경우 첫 번째 페이지 보여줌
            pages.map((page, index) => (
              <div key={index} className="page" ref={ref}>
                <UserInfo index={index} firstPage={true} user={page.user.nickName} userImage={page.user.profileImage} badget={page.user.mbti} setPageUpdate={(value: boolean) => handlePageUpdate(index, value)} handleDelete={handleDelete} />
                <div className="h-full">
                  <div className="py-3">
                    {(index + 1) % 2 === 1 ? (
                      <div className="p-2 grid grid-rows-[6.8fr_3.2fr]">
                        {/* 홀수쪽일 경우 그림, 글 순서 */}
                        <div className="w-full h-72 flex justify-center">{page.fileUrls[0] && <img className="w-[78%] object-cover" src={page.fileUrls[0]} alt="" />}</div>
                        <p className="h-full mx-10 relaybookpagenotes text-sm text-justify">{page.content}</p>
                      </div>
                    ) : (
                      <div className="p-2 grid grid-rows-[3.2fr_6.8fr]">
                        {/* 짝수쪽일 경우 글, 그림 순서 */}
                        <p className="h-full mx-10 relaybookpagenotes text-sm text-justify">{page.content}</p>
                        <div className="w-full h-72 flex justify-center">{page.fileUrls[0] && <img className="w-[78%] object-cover" src={page.fileUrls[0]} alt="" />}</div>
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
  }
);

export default BookDetailPage;
