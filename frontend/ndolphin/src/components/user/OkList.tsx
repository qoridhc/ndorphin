import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaRegComment } from "react-icons/fa6";
import TimeDifference from "../common/TimeDifference";
import boardApi from "../../api/boardApi";
import OkContent from "../ok/OkContent";

const OkList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [myOKBoardList, setMyOKBoardList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    let page = 0;
    let hasMore = true;
    const newMyOkBoardList: any[] = [];
    const currentUserId = Number(location.pathname.split("/")[2]);

    const fetchBoards = async () => {
      while (hasMore) {
        try {
          const response = await boardApi.list("OK_BOARD", page);
          const responseData = response.data.data.content;

          if (responseData.length === 0) {
            hasMore = false;
          } else {
            const filteredList = responseData.filter((item: any) => item.user.userId === currentUserId);
            newMyOkBoardList.push(...filteredList);
            page++;
          }
        } catch (error) {
          console.error('프로필 괜찮아 불러오기 실패: ', error);
          hasMore = false;
        }
      }
      setMyOKBoardList(newMyOkBoardList);
      setIsLoading(false);
    };

    fetchBoards();
  }, [location.pathname]);

  const goToDetail = (boardId: number) => {
    navigate(`/okdetail/${boardId}`);
  };

  if (isLoading) {
    return <div className="mt-40 text-center text-3xl font-bold">로딩 중...</div>;
  }

  return (
    <div>
      {myOKBoardList.length === 0 ? (
        <div className="mt-40 text-center text-3xl font-bold">
          <img className="w-32 h-32 mx-auto mb-4" src="/assets/user/noContents.png" alt="#" />
          <span>등록된 게시물이 없습니다</span>
        </div>
      ) : (
        <div className="px-96 py-10">
          {myOKBoardList.map((item) => (
            <div onClick={() => goToDetail(item.id)}>
              <OkContent content={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OkList;
