import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import boardApi from "../../api/boardApi";
import userApi from "../../api/userApi";
import Lottie from "lottie-react";
import noSearch from "../../lottie/noSearch.json";
import RelayListLoading from "../common/loading/RelayListLoading";

const RelayBookList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [myRelayBoardList, setMyRelayBoardList] = useState<any[]>([]);
  const [showSummary, setShowSummary] = useState<number | null>(null);
  const [summary, setSummary] = useState("");
  const [likeStatus, setLikeStatus] = useState<{ [key: number]: boolean }>({});
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const fullHeart = "/assets/relay/fullHeart.png";
  const emptyHeart = "/assets/relay/emptyHeart.png";

  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    let page = 0;
    let hasMore = true;
    const newMyRelayBoardList: any[] = [];
    const currentUserId = Number(location.pathname.split("/")[2]);

    const fetchBoards = async () => {
      while (hasMore) {
        try {
          const response = await boardApi.list("RELAY_BOARD", page);
          const responseData = response.data.data.content;

          if (responseData.length !== 0) {
            const filteredList = responseData.filter((item: any) => item.user.userId === currentUserId);
            newMyRelayBoardList.push(...filteredList);
            page++;
          } else {
            hasMore = false;
          }
        } catch (error) {
          console.error('프로필 릴레이 불러오기 실패: ', error);
          hasMore = false;
        }
      }

      setMyRelayBoardList(newMyRelayBoardList);
      setIsLoading(false);
    };

    fetchBoards();
  }, [location.pathname]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (myRelayBoardList) {
      userApi
        .getFavorites(userId as string)
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
          console.error("좋아요 상태 불러오기 실패: ", error);
      });
    }
  }, [myRelayBoardList]);

  const handleAISummary = async (id: number) => {
    if (showSummary === id) {
      setShowSummary(null);
    } else {
      myRelayBoardList.map((item: any) => {
        if (item.id === id) {
          setSummary(item.summary);
        }
      });
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
      {isLoading ? (
        <div className="px-40 py-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
          {Array.from({ length: 12 }).map((_, index) => (
            <RelayListLoading key={index} />
          ))}
        </div>
      ) : myRelayBoardList.length === 0 ? (
        <div className="mt-5 text-center text-3xl font-bold flex flex-col items-center">
          <Lottie className="w-1/4 mb-1 object-cover" animationData={noSearch} />
          <span>등록된 게시물이 없습니다</span>
        </div>
      ) : (
        <div className="px-40 py-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
          {myRelayBoardList.map((item) => (
            <div className="relative" key={item.id}>
              <div className="pt-2">
                <div className="relative">
                  <img
                    className="w-10 absolute top-3 right-2 z-10 hover:cursor-pointer object-cover"
                    src={likeStatus[item.id] ? fullHeart : isHovered === item.id ? fullHeart : emptyHeart}
                    alt="#"
                    onClick={() => handleLikeToggle(item.id)}
                    onMouseEnter={() => setIsHovered(item.id)}
                    onMouseLeave={() => setIsHovered(null)}
                  />
                  <img className="hover:cursor-pointer w-full h-[20rem] rounded-md object-cover" src={item.fileUrls[0]} alt="#" onClick={() => goToDetail(item.id)} />
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
