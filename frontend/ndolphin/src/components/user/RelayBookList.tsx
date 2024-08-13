import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import boardApi from "../../api/boardApi";
import userApi from "../../api/userApi";

const RelayBookList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [myRelayBoardList, setMyRelayBoardList] = useState<any[]>([]);
  const [showSummary, setShowSummary] = useState<number | null>(null);
  const [summary, setSummary] = useState("");
  const [likeStatus, setLikeStatus] = useState<{ [key: number]: boolean }>({});
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const fullHeart = "/assets/relay/fullheart.png";
  const emptyHeart = "/assets/relay/emptyheart.png";
  
  useEffect(() => {
    boardApi.list("RELAY_BOARD")
      .then((response) => {
        const getRelayBoardList = response.data.data.content;
        
        const currentUserId = Number(location.pathname.split("/")[2]);
        const filteredList = getRelayBoardList.filter((item: any) => item.user.userId === currentUserId);
        setMyRelayBoardList(filteredList);
      })
      .catch((error) => {
        console.error('릴레이북 게시글 불러오기 실패: ', error)
      })
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    userApi.getFavorites(userId as string)
      .then((response) => {
        const favoriteBoardIs = response.data.data.boardDtos.map((item: any) => item.id);
        setLikeStatus((prevStatus) => {
          const newStatus: { [key: number]: boolean } = {};
          myRelayBoardList.forEach((board) => {
            newStatus[board.id] = favoriteBoardIs.includes(board.id);
          });
          return newStatus;
        });
      })
      .catch((error) => {
        console.error('좋아요 상태 불러오기 실패: ', error);
      })
  }, [myRelayBoardList]);

  const handleAISummary = async (id: number) => {
    if (showSummary === id) {
      setShowSummary(null);
    } else {
      let page = 0;
      let hasMore = true;
      const allContent: string[] = [];

      while (hasMore) {
        try {
          const response = await boardApi.list("RELAY_BOARD", page);
          if (response && response.data.data.content.length > 0) {
            allContent.push(...response.data.data.content);
            page++;
          } else {
            hasMore = false;
          }
        } catch (error) {
          console.error("AI 요약 찾기 중 리스트 불러오기 실패: ", error);
          hasMore = false;
        }
      }
      
      allContent.map((item: any) => {
        if (item.id === id) {
          setSummary(item.summary);
        }
      })
      setShowSummary(id);
    }
  };

  const handleLikeToggle = (id: number) => {
    const userId = localStorage.getItem('userId');
    
    if (!likeStatus[id]) {
      userApi
        .addFavorites(userId as string, String(id))
        .then(() =>
          setLikeStatus((prevStatus) => ({
            ...prevStatus,
            [id]: true,
          }))
        )
        .catch((err) => {
          console.error("즐겨찾기 추가 실패: ", err);
        });
    } else {
      userApi.deleteFavorites(userId as string, String(id))
        .then(() => 
          setLikeStatus((prevStatus) => ({
            ...prevStatus,
            [id]: false,
          }))
        )
        .catch((err) => {
          console.error("즐겨찾기 삭제 실패: ", err);
        })
    }
  };

  const goToDetail = (boardId: number) => {
    navigate(`/relaybookdetail/${boardId}`);
  };

  return (
    <div>
      {myRelayBoardList.length === 0 ? (
        <div className="mt-40 text-center text-3xl font-bold">
          <img className="w-32 h-32 mx-auto mb-4" src="/assets/user/noContents.png" alt="#" />
          <span>등록된 게시물이 없습니다</span>
        </div>
      ) : (
        <div className="px-40 py-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
          {myRelayBoardList.map((item) => (
            <div className="relative" key={item.id}>
              <div className="pt-2">
                <div className="relative">
                  <img
                    className="w-10 absolute top-3 right-2 z-10 hover:cursor-pointer"
                    src={likeStatus[item.id] ? fullHeart : isHovered === item.id ? fullHeart : emptyHeart}
                    alt="#"
                    onClick={() => handleLikeToggle(item.id)}
                    onMouseEnter={() => setIsHovered(item.id)}
                    onMouseLeave={() => setIsHovered(null)}
                  />
                  <img className="hover:cursor-pointer w-full h-[20rem] rounded-md" src={item.fileUrls[0]} alt="#" onClick={() => goToDetail(item.id)} />
                </div>
                <span onClick={() => goToDetail(item.id)} className="hover:cursor-pointer font-bold text-lg">
                  {item.subject}
                </span>
                <button onClick={() => handleAISummary(item.id)} className="w-32 px-2 py-1 flex justify-between items-center rounded-3xl border-2 border-solid border-zinc-300 font-bold text-zinc-800 mt-2">
                  <img src="/assets/aiSummaryButton.png" className="w-5" alt="#" />
                  <p className="text-xs">AI 요약하기</p>
                  <img src="/assets/arrow_right.png" className="w-2" alt="#" />
                </button>
              </div>

              {/* AI 요약 모달 */}
              {showSummary === item.id && (
                <div className="relative">
                  {/* 말풍선 꼭지점 */}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-[4.5rem] w-0 h-0  border-x-[12px] border-x-transparent border-b-[12px] border-b-[#eff1f1] z-50"></div>

                  <div className="absolute top-1 transform z-50 bg-[#eff1f1] rounded-md w-72 p-4 max-h-64 overflow-y-auto">
                    <div className="mb-3 flex items-center">
                      <img className="w-5 mr-1" src="/assets/relay/aiSummaryChatIcon.png" alt="" />
                      <h3 className="font-bold text-xs text-zinc-600">AI로 지금까지의 이야기를 요약했어요</h3>
                    </div>
                    <p className="text-[0.73rem] text-justify">{summary}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RelayBookList;
