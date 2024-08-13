import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import boardApi from "../../api/boardApi";

const OkList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [myOKBoardList, setMyOKBoardList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    boardApi.list("OK_BOARD")
      .then((response) => {
        const getOKBoardList = response.data.data.content;
        const currentUserId = Number(location.pathname.split("/")[2]);
        const filteredList = getOKBoardList.filter((item: any) => item.user.userId === currentUserId);
        setMyOKBoardList(filteredList);
      })
      .catch((error) => {
        console.error("괜찮아 게시글 불러오기 실패: ", error);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, []);

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
            <div className="border border-b-0" key={item.id} onClick={() => goToDetail(item.id)}>
              {/* <div onClick={() => goToDetail(content.id)}>
                <div className="p-5 border-t border-x grid grid-cols-[1fr_9fr]">
                  <div className="">
                    <img className="w-9 h-9 rounded-[50%]" src={`${content.user.profileImage}`} alt="" />
                  </div>

                  <div className="grid gap-3">
                    <div>
                      <div className="flex items-center">
                        <p className="font-bold">{content.user.nickName}</p>
                        {<img className="w-5 h-5 ml-1" src={`/assets/${content.user.mbti === "N" ? "nBadget.png" : "sBadget.png"}`} alt="badget" />}
                      </div>
                      <p className="text-sm font-semibold text-[#565656]">{content.createdAt}</p>
                    </div>

                    <p className="font-medium text-justify leading-snug">{content.content}</p>

                    {renderImages()}

                    <div className="flex items-center">
                      <FaRegComment />
                      {content.commentCnt === 0 ? <></> : <p className="px-1 text-[#565656] font-semibold">{content.commentCnt}</p>}
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="w-auto h-auto">
                <img className="w-10 h-10 rounded-full" src={item.user.profileImage} alt="#" />
                <div></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OkList;
