import "../../../css/Text.css";
import { useState } from "react";
import AddPageForm from "./AddPageForm";
import AlreadyWrittenPage from "../relayBookCRUD/AlreadyWrittenPage";
import AiImagePromptModal from "../AiImagePromptModal";

interface Page {
  commentId: number;
  nickName: string;
  content: string;
  likeCnt: number;
  createdAt: string | null;
  updatedAt: string | null;
  avatarUrl: string | null;
  contentFileUrl: string | null;
  likedByUser: boolean;
}

interface AddPageProps {
  bookId: string;
  page: {
    maxPage: number;
    commentResponseDtos: any[];
  };
  handleAiImage: any;
  image: string | null;
  setImage: any;
  file: File | null;
  setFile: (file: File) => void;
  hasParticipated: boolean;
}

const AddPage = ({ bookId, page, handleAiImage, image, setImage, file, setFile, hasParticipated }: AddPageProps) => {
  const [isPageAdd, setPageAdd] = useState(false);
  const testParticipated = false;
  const maxPage = page.maxPage;
  const currentPages = page.commentResponseDtos.length;
  const remainingPages = maxPage - (currentPages + 1);

  return (
    <>
      {testParticipated ? (
        <AlreadyWrittenPage />
      ) : isPageAdd === false ? (
        <div className="h-[90%] flex flex-col justify-center items-center gap-2">
          {/* 페이지 추가 버튼을 클릭하지 않았을 시 */}
          <div className="flex flex-col items-center gap-6">
            <button
              onClick={() => {
                setPageAdd(true);
              }}
              className="w-[30%]">
              <img src="/assets/addPageButton.png" alt="#" />
            </button>
            <p className="text-outline text-2xl font-bold drop-shadow-md text-[#F4D325]">버튼을 눌러 페이지 추가</p>
          </div>
          {/* <p className="font-bold text-zinc-600">N돌핀이 넘치는 다음 이야기를 이어주세요</p> */}
          <p className="">
            이야기가 끝날 때까지 앞으로
            <span className="font-bold text-zinc-900"> {remainingPages}장 </span>
            남았어요
          </p>
        </div>
      ) : (
        // 페이지 추가 버튼 클릭 후 form으로 전환
        <div>
          <AddPageForm bookId={bookId} setPageAdd={setPageAdd} handleAiImage={handleAiImage} image={image} setImage={setImage} file={file} setFile={setFile} />
        </div>
      )}
    </>
  );
};

export default AddPage;
