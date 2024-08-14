import React from "react";

interface Props {
  currentIndex: number;
  visibleBooks: Relay[];
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

const ServeRelayBook = ({ currentIndex, visibleBooks }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-x-5">
      {visibleBooks &&
        visibleBooks.map((book, index) => (
          <div key={book.id} className="flex flex-col justify-center">
            <img className="w-full bg-white border aspect-1 object-cover" src={book.fileUrls ? book.fileUrls[0] : undefined} alt="" />
            <div className="pt-1 flex font-semibold">
              <p className="pr-1">{currentIndex + index + 1}</p>
              <p className="line-clamp-1">{book.subject}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ServeRelayBook;
