import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import boardApi from "../../api/boardApi";
import ByeContent from "../../pages/bye/ByeContent";
import Lottie from "lottie-react";
import noSearch from "../../lottie/noSearch.json";
import ListLoading from "../common/loading/ListLoading";

interface BoardItem {
  id: number;
  user: {
    nickName: string;
    mbti: string;
    profileImage: string | null;
    userId: number;
  };
  createdAt: string;
  content: string;
  userReactionId: string | null;
  userReactionType: string;
  reactionTypeCounts: {
    WELCOME: number;
    GOODBYE: number;
  };
}

const ByeList: React.FC = () => {
  const location = useLocation();
  const [myByeBoardList, setMyByeBoardList] = useState<BoardItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    let page = 0;
    let hasMore = true;
    const newMyByeBoardList: any[] = [];
    const currentUserId = Number(location.pathname.split("/")[2]);

    const fetchBoards = async () => {
      while (hasMore) {
        try {
          const response = await boardApi.list("BYE_BOARD", page);
          const responseData = response.data.data.content;

          if (responseData.id) {
            const filteredList = responseData.filter((item: any) => item.user.userId === currentUserId);
            newMyByeBoardList.push(...filteredList);
            page++;
          } else {
            hasMore = false;
          }
        } catch (error) {
          console.error('프로필 작별인사 불러오기 실패: ', error);
          hasMore = false;
        }
      }
      setMyByeBoardList(newMyByeBoardList);
      setIsLoading(false);
    };

    fetchBoards();
  }, [location.pathname]);

  return (
    <div>
      {isLoading ? (
        <div className="px-96 py-10">
          {Array.from({ length: 12 }).map((_, index) => (
            <ListLoading key={index} />
          ))}
        </div>
      ) : myByeBoardList.length === 0 ? (
        <div className="mt-5 text-center text-3xl font-bold flex flex-col items-center">
          <Lottie className="w-1/4 mb-1 object-cover" animationData={noSearch} />
          <span>등록된 게시물이 없습니다</span>
        </div>
      ) : (
        <div className="px-96 py-10">
          {myByeBoardList.map((item) => (
            <div key={item.id}>
              <ByeContent content={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ByeList;
