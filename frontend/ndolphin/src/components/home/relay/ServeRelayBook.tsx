import React, { useEffect, useState } from "react";
import rankingApi from "../../../api/rankingApi";

interface Props {
  currentIndex: number;
  rankingType: string;
}

interface Relay {
  id: number;
  hit: number;
  content: string;
  subject: string;
  fileUrls: string;
  reactionCount: number;
  user: {
    nickName: string;
    profileImage: string;
    mbti: string;
    userId: number;
  };
}

const ServeRelayBook = ({ currentIndex, rankingType }: Props) => {
  const [relayBoardList, setRelayBoardList] = useState<Relay[] | null>(null);
  const [visibleBooks, setVisibleBook] = useState<Relay[] | null>(null);

  useEffect(() => {
    getRelayBoardList();
    if (relayBoardList) {
      setVisibleBook(relayBoardList.concat(relayBoardList).slice(currentIndex, currentIndex + 3));
    }
  }, [rankingType, relayBoardList]);

  const getRelayBoardList = async () => {
    try {
      let period = "";
      switch (rankingType) {
        case "일간":
          period = "daily";
          break;
        case "주간":
          period = "weekly";
          break;
        case "월간":
          period = "monthly";
          break;
      }
      const response = await rankingApi.relaylist(period);
      setRelayBoardList(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("rankingApi relaylist : ", error);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-x-2 ">
      {visibleBooks &&
        visibleBooks.map((book, index) => (
          <div key={book.id}>
            <img className="rounded-xl" src={book.fileUrls[0]} alt="" />
            <div className="pt-1 flex font-semibold">
              <p className="pr-1">{currentIndex + index + 1}</p>
              <p>{book.subject}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ServeRelayBook;
