import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import boardApi from "../../api/boardApi";

const RelayBookList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [myRelayBoardList, setMyRelayBoardList] = useState<any[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [summary, setSummary] = useState("");
  const [isLike, setIsLike] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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

  const handleAISummary = () => {
    if (showSummary) {
      setShowSummary(false);
    } else {
      // AI 요약 호출 로직을 여기에 추가합니다.
      // 예를 들어, AI 요약 API를 호출하고 결과를 setSummary로 설정할 수 있습니다.
      setSummary(
        "이것은 AI가 생성한 요약 예시입니다. 이것은은 AI가 생성한 요약 예시입니다. 이것은 AI가 생니다. 이것은 AI가 생성한 요약 예시입니다. 이것은 AI가 생성한 요약 예시입니다. 이것은니다. 이것은 AI가 생성한 요약 예시입니다. 이것은 AI가 생성한 요약 예시입니다. 이것은니다. 이것은 AI가 생성한 요약 예시입니다. 이것은 AI가 생성한 요약 예시입니다. 이것은다."
      );
      setShowSummary(true);
    }
  };

  const goToDetail = (boardId: number) => {
    navigate(`/relaybookdetail/${boardId}`);
    console.log(boardId)
  };

  return (
    <div>
      {myRelayBoardList.length === 0 ? (
        <div className="mt-40 text-center text-3xl font-bold">목록이 비어있습니다</div>
      ) : (
        <div className="px-40 py-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
          {myRelayBoardList.map((item) => (
            <div className="relative">
              <div className="pt-2">
                <div className="relative">
                  {/* {isLike ? (
                    <img className="w-10 absolute top-3 right-2 z-10 hover:cursor-pointer" onClick={() => setIsLike(false)} src="/assets/relay/fullheart.png" alt="#" />
                  ) : (
                    <img
                      className="w-10 absolute top-3 right-2 z-10 hover:cursor-pointer"
                      onClick={() => setIsLike(true)}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      src={isHovered ? fullHeart : emptyHeart}
                      alt="#"
                    />
                  )}{" "} */}
                  <img className="hover:cursor-pointer w-full h-[20rem] rounded-md" src={item.fileUrls[0]} alt="#" onClick={() => goToDetail(item.id)} />
                </div>
                <span onClick={() => goToDetail(item.id)} className="hover:cursor-pointer font-bold text-lg">
                  {item.subject}
                </span>
                <button onClick={handleAISummary} className="w-32 px-2 py-1 flex justify-between items-center rounded-3xl border-2 border-solid border-zinc-300 font-bold text-zinc-800 mt-2">
                  <img src="/assets/aiSummaryButton.png" className="w-5" alt="#" />
                  <p className="text-xs">AI 요약하기</p>
                  <img src="/assets/arrow_right.png" className="w-2" alt="#" />
                </button>
              </div>

              {/* AI 요약 모달 */}
              {showSummary && (
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
