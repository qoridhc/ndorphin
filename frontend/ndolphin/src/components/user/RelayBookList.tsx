import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopButton from "../common/TopButton";

interface BookList {
  id: number;
  bookImgUrl: string;
  title: string;
  isLike: boolean;
}

const RelayBookList = () => {
  const navigate = useNavigate();
  const [isLike, setIsLike] = useState(true);

  const initialBooks: BookList[] = [];
  for (let i = 0; i < 20; i++) {
    initialBooks.push({
      id: i,
      bookImgUrl: "assets/cover.jpg",
      title: "제목",
      isLike: isLike,
    });
  }

  const [books, setBooks] = useState<BookList[]>(initialBooks);

  return (
    <div>
      <div className="px-44 py-10 grid grid-cols-4 gap-x-14 gap-y-20">
        {books.map((book) => (
          <div onClick={() => navigate(`/relaybookdetail/${book.id}`)}>
            <img src={book.bookImgUrl} alt="표지" />
            <p className="pt-4 text-2xl font-bold">{book.title}</p>
            <button className="w-32 px-2 py-1 flex justify-between items-center rounded-3xl border-2 border-solid border-zinc-300 font-bold text-zinc-800 mt-2">
              <img src="/assets/aiSummaryButton.png" className="w-5" alt="#" />
              <p className="text-xs">AI 요약하기</p>
              <img src="/assets/arrow_right.png" className="w-2" alt="#" />
            </button>
          </div>
        ))}
      </div>
      <TopButton />
    </div>
  );
}

export default RelayBookList;