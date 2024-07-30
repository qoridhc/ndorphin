import { useState } from "react";
import { Navigate, useNavigate } from "react-router";

interface BookProps {
  book: {
    id: number;
    bookImgUrl: string;
    user: string;
    title: string;
  };
}

function Book({ book }: BookProps) {
  const [join, setJoin] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const fullHeart = "/assets/relay/fullheart.png";
  const emptyHeart = "/assets/relay/emptyheart.png";

  const goBookDetail = (id: number) => {
    navigate(`/relaybookdetail/${id}`);
  };

  return (
    <div>
      <div className="flex justify-end">
        {join ? <span className="w-auto mx-1 px-3 py-1 rounded-t-lg text-xs font-bold text-zinc-900 bg-amber-300">참여</span> : <span className="w-auto mx-1 px-3 py-1 rounded-t-lg text-xs font-bold text-zinc-900 bg-zinc-300">미참여</span>}
      </div>

      <div className="relative">
        {isLike ? (
          <img
            onClick={() => {
              setIsLike(false);
            }}
            src="/assets/relay/fullheart.png"
            className="w-9 absolute top-4 right-3 z-10 hover:cursor-pointer"
            alt="#"
          />
        ) : (
          <img
            onClick={() => {
              setIsLike(true);
            }}
            onMouseEnter={() => {
              setIsHovered(true);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
            }}
            src={isHovered ? fullHeart : emptyHeart}
            className="w-9 absolute top-4 right-3 z-10 hover:cursor-pointer"
            alt="#"
          />
        )}{" "}
        <img
          onClick={() => {
            goBookDetail(book.id);
          }}
          src={book.bookImgUrl}
          className="hover:cursor-pointer w-full h-[20rem] rounded-md"
          alt="#"
        />
      </div>

      <div className="pt-2">
        <span
          onClick={() => {
            goBookDetail(book.id);
          }}
          className="hover:cursor-pointer font-bold text-lg">
          {book.title}
        </span>
        <button className="w-32 px-2 py-1 flex justify-between items-center rounded-3xl border-2 border-solid border-zinc-300 font-bold text-zinc-800 mt-2">
          <img src="/assets/aiSummaryButton.png" className="w-5" alt="#" />
          <p className="text-xs">AI 요약하기</p>
          <img src="/assets/arrow_right.png" className="w-2" alt="#" />
        </button>
      </div>
    </div>
  );
}

export default Book;
