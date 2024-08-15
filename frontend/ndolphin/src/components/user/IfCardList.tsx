import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import boardApi from "../../api/boardApi";
import TimeDifference from "../common/TimeDifference";
import Lottie from "lottie-react";
import noSearch from "../../lottie/noSearch.json";
import IfListLoading from "../common/loading/IfListLoading";

const IfCardList: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [myIfBoardList, setMyIfBoardList] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    let page = 0;
    let hasMore = true;
    const newMyIfBoardList: any[] = [];
    const currentUserId = Number(location.pathname.split("/")[2]);

    const fetchBoards = async () => {
      while (hasMore) {
        try {
          const response = await boardApi.list("OPINION_BOARD", page);
          const responseData = response.data.data.content;

          if (responseData.length !== 0) {
            const filteredList = responseData.filter((item: any) => item.user.userId === currentUserId);
            newMyIfBoardList.push(...filteredList);
            page++;
          } else {
            hasMore = false;
          }
        } catch (error) {
          console.error('프로필 만약에 불러오기 실패: ', error);
          hasMore = false;
        }
      }

      setMyIfBoardList(newMyIfBoardList);
      setIsLoading(false);
    };

    fetchBoards();
  }, [location.pathname]);

  const goToDetail = (boardId: number) => {
    navigate(`/ifdetail/${boardId}`);
  };

  return (
    <div>
      {isLoading ? (
        <div className="px-40 py-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
          {Array.from({ length: 12 }).map((_, index) => (
            <IfListLoading key={index} />
          ))}
        </div>
      ) : myIfBoardList.length === 0 ? (
        <div className="mt-5 text-center text-3xl font-bold">
          <div className="mt-5 text-center text-3xl font-bold flex flex-col items-center">
            <Lottie className="w-1/4 mb-1 object-cover" animationData={noSearch} />
            <span>등록된 게시물이 없습니다</span>
          </div>
        </div>
      ) : (
        <div className="px-44 py-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
          {myIfBoardList.map((item) => (
            <div
              className="h-72 p-5 border-solid border-[#565656] border-[1px] rounded-lg grid grid-rows-[1fr_1fr_3fr] gap-3 cursor-pointer duration-300 ease-out hover:-translate-y-3 hover:shadow-lg"
              key={item.id}
              onClick={() => goToDetail(item.id)}>
              <div className="flex justify-between">
                <div className="flex items-center">
                  <img className="w-9 h-9 mr-3 border rounded-[50%] object-cover" src={item.user.profileImage === null ? "/assets/user/defaultProfile.png" : item.user.profileImage} alt="#" />
                  <div>
                    <div className="w-40 flex justify-between items-center">
                      <div className="flex items-center">
                        <p className="font-bold">{item.user.nickName}</p>
                        {<img className="w-5 h-5 ml-1 object-cover" src={`/assets/${item.user.mbti === null ? "noBadget.png" : item.user.mbti === "N" ? "nBadget.png" : "sBadget.png"}`} alt="badget" />}
                      </div>
                    </div>
                    <div>
                      <TimeDifference timestamp={new Date(item.createdAt)} />
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-justify line-clamp-2">{item.subject}</p>

              <div className="flex flex-col justify-end">
                {item.commentCount === 0 ? <></> : <p className="py-3 text-sm font-semibold text-[#565656] text-right">{item.commentCount}명 참여</p>}
                <div className={`h-10 px-2 border-solid border-[1px] border-[#565656] rounded-md flex items-center`}>
                  {item.commentCount === 0 ? <></> : <img src="/assets/if/hotCommentIcon.png" alt="" />}
                  <p className={`text-xs font-semibold text-[#565656] line-clamp-1`}>{item.commentCount === 0 ? "가장 먼저 댓글을 달아보세요!" : item.bestComment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IfCardList;
