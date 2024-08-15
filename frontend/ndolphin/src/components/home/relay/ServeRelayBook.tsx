import React from "react";
import { useNavigate } from "react-router";

interface Props {
  currentIndex: number;
  visibleBooks: Relay[];
  bookListLength: number;
}

interface Relay {
  id: number;
  hit: number;
  content: string;
  subject: string;
  fileUrls: string[] | null;
  reactionCount: number;
  summary: string;
  user: {
    nickName: string;
    profileImage: string;
    mbti: string;
    userId: number;
  };
}

const ServeRelayBook = ({ currentIndex, visibleBooks, bookListLength }: Props) => {
  const navigate = useNavigate();

  const goToDetail = (boardId: number) => {
    navigate(`/relaybookdetail/${boardId}`);
  };

  return (
    <div className="grid grid-cols-2 gap-x-5">
      {visibleBooks &&
        visibleBooks.map((book, index) => (
          <div key={book.id} className="flex flex-col justify-center">
            <img className="w-full bg-white border aspect-1 object-cover cursor-pointer" src={book.fileUrls ? book.fileUrls[0] : undefined} onClick={() => goToDetail(book.id)} alt="" />
            <div className="pt-1 flex font-semibold">
              <p className="pr-1 text-[#565656]">{((currentIndex + index) % bookListLength) + 1}</p>
              <p className="text-[#565656] line-clamp-1 hover:underline underline-[#565656] underline-offset-2 cursor-pointer" onClick={() => goToDetail(book.id)}>
                {book.subject}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ServeRelayBook;
