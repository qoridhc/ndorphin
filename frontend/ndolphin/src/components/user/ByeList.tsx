import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import boardApi from "../../api/boardApi";
import ByeContent from "../../pages/bye/ByeContent";

interface BoardItem {
  content: {
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
  };
  getByeList: () => void;
  updateContent: (id: number) => void;
}

const ByeList: React.FC = () => {
  const location = useLocation();
  const [myByeBoardList, setMyByeBoardList] = useState<BoardItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

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
          const responseData = response.data.data;

          if (responseData.length === 0) {
            hasMore = false;
          } else {
            const filteredList = responseData.filter((item: any) => item.content.user.userId === currentUserId);
            newMyByeBoardList.push(...filteredList);
            page++;
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

  if (isLoading) {
    return <div className="mt-40 text-center text-3xl font-bold">로딩 중...</div>;
  }

  return (
    <div>
      {myByeBoardList.length === 0 ? (
        <div className="mt-40 text-center text-3xl font-bold">
          <img className="w-32 h-32 mx-auto mb-4" src="/assets/user/noContents.png" alt="게시물 없음" />
          <span>등록된 게시물이 없습니다</span>
        </div>
      ) : (
        <div className="px-96">
            {myByeBoardList.map((item) => (
            item && item.content && item.content.user && item.content.user.profileImage !== undefined ? (
              <ByeContent content={item.content} key={item.content.id} />
            ) : '왜'
          ))}
        </div>
      )}
    </div>
  );
};

export default ByeList;
