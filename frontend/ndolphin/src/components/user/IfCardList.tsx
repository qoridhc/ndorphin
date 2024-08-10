import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import boardApi from "../../api/boardApi";

const IfCardList: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [myOpinionBoardList, setMyOpinionBoardList] = useState<any[]>([]);


  useEffect(() => {
    boardApi.list("OPINION_BOARD")
      .then((response) => {
        const getOpinionBoardList = response.data.data.content;

        const currentUserId = Number(location.pathname.split("/")[2]);
        const filteredList = getOpinionBoardList.filter((item: any) => item.user.userId === currentUserId);
        setMyOpinionBoardList(filteredList);
      })
      .catch((error) => {
        console.error("만약에 게시글 불러오기 실패: ", error);
      });
  }, []);

  const goToDetail = (boardId: number) => {
    navigate(`/ifdetail/${boardId}`);
  };

  return (
    <div>
      {myOpinionBoardList.length === 0 ? (
        <div className="mt-40 text-center text-3xl font-bold">목록이 비어있습니다</div>
      ) : (
        <div className="px-44 py-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
          {myOpinionBoardList.map((item) => (
            <div
              className="h-72 p-5 border-solid border-[#565656] border-[1px] rounded-lg grid grid-rows-[1fr_1fr_3fr] gap-3 cursor-pointer duration-300 ease-out hover:-translate-y-3 hover:shadow-lg"
              key={item.id}
              onClick={() => goToDetail(item.id)}>
              <div className="flex justify-between">
                <div className="flex items-center">
                  <img className="w-9 h-9 mr-3 border rounded-[50%]" src={item.user.profileImage === null ? "/assets/user/defaultProfile.png" : item.user.profileImage} alt="" />
                  <div>
                    <div className="w-40 flex justify-between items-center">
                      <div className="flex items-center">
                        <p className="font-bold">{item.user.nickName}</p>
                        {<img className="w-5 h-5 ml-1" src={`/assets/${item.user.mbti === null ? "noBadget.png" : item.user.mbti === "N" ? "nBadget.png" : "sBadget.png"}`} alt="badget" />}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-left">{item.createdAt}</p>
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
