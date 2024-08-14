import { useState, useEffect, useRef } from "react";
import { Navigate, useNavigate } from "react-router";
import userApi from "../../api/userApi";
import { IoMdClose } from "react-icons/io";

interface BookProps {
  book: {
    id: number;
    user: {
      userId: number;
    };
    nickName: string;
    avatarUrl: string | null;
    subject: string;
    content: string;
    hit: number;
    boardType: string;
    createdAt: string;
    updatedAt: string | null;
    summary: string | null;
    thumbNailUrl: string;
    hasParticipated: false;
    favorite: false;
    fileUrls: any[];
  };
}

function Book({ book }: BookProps) {
  const [join, setJoin] = useState(false);
  const [favorite, setFavorite] = useState<boolean>(book.favorite);
  const [isHovered, setIsHovered] = useState(false);
  const [summary, setSummary] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const [hasParticipated, setHasPaeticipated] = useState<boolean>(book.hasParticipated);
  const navigate = useNavigate();
  const fullHeart = "/assets/relay/fullHeart.png";
  const emptyHeart = "/assets/relay/emptyHeart.png";
  const bookId = book.id;
  const summaryRef = useRef<HTMLDivElement>(null);

  const goBookDetail = (id: number) => {
    navigate(`/relaybookdetail/${id}`);
  };

  const handleAISummary = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setShowSummary((prevState) => !prevState);
  };

  // 찜 목록 추가
  const handleAddFavorite = async () => {
    if (bookId) {
      try {
        const response = await userApi.favorite(bookId);
        if (response.status === 200) {
          setFavorite(true);
          console.log("찜 목록 추가 성공", response.data);
        }
      } catch (error) {
        console.error("찜 목록 추가 오류: ", error);
      }
    }
  };

  // 찜 목록 삭제
  const handleDeleteFavorite = async () => {
    if (bookId) {
      try {
        const response = await userApi.unfavorite(bookId);
        if (response.status === 200) {
          setFavorite(false);
          console.log("찜 목록 삭제 성공", response.data);
        }
      } catch (error) {
        console.error("찜 목록 삭제 오류: ", error);
      }
    }
  };

  // AI 요약하기 외부 클릭 시 모달 닫힘
  useEffect(() => {
    if (book.summary) {
      setSummary(book.summary);
    }

    function handleClickOutside(event: MouseEvent) {
      if (showSummary && summaryRef.current && !summaryRef.current.contains(event.target as Node) && !(event.target as HTMLElement).closest("button")) {
        setShowSummary(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSummary, book.summary]);

  return (
    <div className="relative">
      <div className="flex justify-end">
        {hasParticipated ? <span className="w-auto mx-1 px-3 py-1 rounded-t-lg text-xs font-bold text-zinc-900 bg-amber-300">참여</span> : <span className="w-auto mx-1 px-3 py-1 rounded-t-lg text-xs font-bold text-zinc-900 bg-zinc-300">미참여</span>}
      </div>

      <div className="relative">
        {favorite ? (
          <img onClick={handleDeleteFavorite} src="/assets/relay/fullHeart.png" className="w-10 absolute top-3 right-2 z-10 hover:cursor-pointer" alt="#" />
        ) : (
          <img
            onClick={handleAddFavorite}
            onMouseEnter={() => {
              setIsHovered(true);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
            }}
            src={isHovered ? fullHeart : emptyHeart}
            className="w-10 absolute top-3 right-2 z-10 hover:cursor-pointer"
            alt="#"
          />
        )}{" "}
        <img
          onClick={() => {
            goBookDetail(book.id);
          }}
          src={book.fileUrls[0]}
          className="border object-cover hover:cursor-pointer w-full h-[16rem] rounded-md"
          alt="#"
        />
      </div>

      <div className="pt-2">
        <span
          onClick={() => {
            goBookDetail(book.id);
          }}
          className="hover:cursor-pointer font-bold text-lg"
        >
          {book.subject}
        </span>
        <button
          type="button"
          onClick={handleAISummary}
          className="w-32 px-2 py-1 flex justify-between items-center rounded-3xl border border-solid border-zinc-300 font-bold text-zinc-800 mt-2 transition duration-200 ease-in-out hover:bg-yellow-100 "
        >
          <img src="/assets/relay/aiSummaryChatIcon.png" className="w-5" alt="#" />
          <p className="text-xs">AI 요약하기</p>
          <img src="/assets/arrow_right.png" className="w-2" alt="#" />
        </button>
      </div>

      {/* AI 요약 모달 */}
      {showSummary && (
        <div className="relative" ref={summaryRef}>
          {/* 말풍선 꼭지점 */}
          <div
            className="absolute -top-2 left-1/2 transform -translate-x-[4.5rem] 
                       w-0 h-0 
                       border-x-[12px] border-x-transparent 
                       border-b-[12px] border-b-[#eff1f1] 
                       z-50"
          ></div>

          <div
            className="absolute top-1 transform
                          z-50 bg-[#eff1f1] rounded-md w-72 p-4 
                          max-h-64 overflow-y-auto"
          >
            <div className="mb-3 flex items-center">
              <img className="w-5 mr-1" src="/assets/relay/aiSummaryChatIcon.png" alt="" />
              <h3 className="font-bold text-xs text-zinc-600">AI로 지금까지의 이야기를 요약했어요</h3>
            </div>
            <p className="text-[0.73rem] text-justify">{summary}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Book;
