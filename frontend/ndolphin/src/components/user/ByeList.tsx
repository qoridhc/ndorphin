import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import boardApi from "../../api/boardApi";
import TimeDifference from "../common/TimeDifference";

const ByeList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [myByeBoardList, setMyByeBoardList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClicked, setIsClicked] = useState(false);

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

  const handleButtonClick = () => {
    // 버튼 클릭 시 반응 수 증가 또는 감소
    // 버튼 클릭 시의 반응
  }
  
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
        <div className="px-96 py-10">
          {myByeBoardList.map((item) => (
            <div className="p-5 border border-b-0" key={item.id}>
              <img className="w-8 h-8" src={item.user.profileImage} alt="#" />
              <div>
                <p className="font-bold">{item.user.nickName}</p>
                <TimeDifference timestamp={new Date(item.createdAt)} />
              </div>
              {item.user.mbti === 'S' ? (
                <img className="w-14" src="/assets/bye/nToS.png" alt="#" />
              ) : (
                <img className="w-14" src="/assets/bye/sToN.png" alt="#" />
              )}
              <div>{item.content}</div>
              <div>
                <button className="border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-white font-bold" onClick={handleButtonClick}>환영해요<span>{item.reactionTypeCounts.WELCOME}</span></button>
                <button className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white font-bold" onClick={handleButtonClick}>잘 가요<span>{item.reactionTypeCounts.GOODBYE || 0}</span></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ByeList;
