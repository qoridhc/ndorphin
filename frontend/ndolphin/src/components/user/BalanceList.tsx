import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import boardApi from "../../api/boardApi";

const BalanceList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [myBalanceBoardList, setMyBalanceBoardList] = useState<any[]>([]);
  
  useEffect(() => {
    boardApi.list("VOTE_BOARD")
      .then((response) => {
        const getBalanceBoardList = response.data.data.content;

        const currentUserId = Number(location.pathname.split("/")[2]);
        const filteredList = getBalanceBoardList.filter((item: any) => item.user.userId === currentUserId);
        setMyBalanceBoardList(filteredList);
      })
      .catch((error) => {
        console.error("밸런스 게시글 불러오기 실패: ", error);
      });
  }, []);

  const goToDetail = (boardId: number) => {
    navigate(`/ifdetail/${boardId}`);
  };

  return (
    <div>
      {myBalanceBoardList.length === 0 ? (
        <div className="mt-40 text-center text-3xl font-bold">목록이 비어있습니다</div>
      ) : (
        <div className="px-44 py-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
          {myBalanceBoardList.map((item) => (
            <div className="p-5 border-solid border-[#565656] border-[1px] rounded-lg grid gap-3 cursor-pointer duration-300 ease-out hover:-translate-y-3 hover:shadow-lg" onClick={() => goToDetail(item.id)} key={item.id}>
              <img className="aspect-[5/3] object-cover" src={`${item.fileUrls[0]}`} alt="" />

              <div className="grid gap-1">
                <div className="flex items-center">
                  <img className="w-5 h-5 mr-2 rounded-[50%]" src={`${item.user.profileImage}`} alt="" />
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <p className="text-sm font-medium">{item.user.nickName}</p>
                      {<img className="w-5 h-5 ml-1" src={`/assets/${item.user.mbti === "N" ? "nBadget.png" : "sBadget.png"}`} alt="badget" />}
                    </div>
                  </div>
                </div>

                <p className="text-xl font-semibold text-justify line-clamp-2">{item.subject}</p>
              </div>

              <div className="grid gap-1">
                <p className="text-sm text-[#565656] text-right">{item.totalVoteCnt === 0 ? "가장 먼저 참여해 보세요!" : item.totalVoteCnt + "명 참여"}</p>
                <button className="w-full py-2 text-md font-medium border-2 border-amber-300 rounded-md">참여하기</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BalanceList;
