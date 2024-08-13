import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import boardApi from "../../api/boardApi";

const ByeList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [myByeBoardList, setMyByeBoardList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    boardApi.list("BYE_BOARD")
      .then((response) => {
        const getByeBoardList = response.data.data.content;
        const currentUserId = Number(location.pathname.split("/")[2]);
        const filteredList = getByeBoardList.filter((item: any) => item.user.userId === currentUserId);
        setMyByeBoardList(filteredList);
      })
      .catch((error) => {
        console.error("작별인사 게시글 불러오기 실패: ", error);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, []);

  const goToDetail = (boardId: number) => {
    navigate(`/byedetail/${boardId}`);
  };
  
  if (isLoading) {
    return <div className="mt-40 text-center text-3xl font-bold">로딩 중...</div>;
  }

  return (
    <div>
      {myByeBoardList.length === 0 ? (
        <div className="mt-40 text-center text-3xl font-bold">
          <img className="w-32 h-32 mx-auto mb-4" src="/assets/user/noContents.png" alt="#" />
          <span>등록된 게시물이 없습니다</span>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ByeList;
