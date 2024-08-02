import "../../../css/Text.css";
import { useState } from "react";
import AddPageForm from "./AddPageForm";
import AlreadyWrittenPage from "../relayBookCRUD/AlreadyWrittenPage";
import AiImagePromptModal from "../AiImagePromptModal";

interface Page {
  id: number;
  userId: number;
  user: string;
  content: string;
  pageImage: string;
}

interface AddPageProps {
  PageList: Page[];
  handleAiImage: any;
  image: string | null;
  setImage: any;
}

const AddPage = ({ PageList, handleAiImage, image, setImage }: AddPageProps) => {
  const [pageAdd, setPageAdd] = useState(false);
  const userName = "코에촉";
  const userHasWritten = PageList.some((page) => page.user === userName);

  return (
    <>
      {userHasWritten ? (
        <AlreadyWrittenPage />
      ) : pageAdd === false ? (
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
          <p className="font-bold text-zinc-600">N돌핀이 넘치는 다음 이야기를 이어주세요</p>
        </div>
      ) : (
        // 페이지 추가 버튼 클릭 후 form으로 전환
        <div>
          <AddPageForm handleAiImage={handleAiImage} image={image} setImage={setImage} />
        </div>
      )}
    </>
  );
};

export default AddPage;
