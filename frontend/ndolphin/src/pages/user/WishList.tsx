import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userApi from "../../api/userApi";

const WishList = () => {
  const navigate = useNavigate();
  const [WishList, setWishList] = useState<any[]>([]);
  const [likeStatus, setLikeStatus] = useState<{ [key: number]: boolean }>({});
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const fullHeart = "/assets/relay/fullHeart.png";
  const emptyHeart = "/assets/relay/emptyHeart.png";

  const userId = localStorage.getItem('userId')

  useEffect(() => {
    userApi.getFavorites(userId as string)
      .then((res) => {
        const getWishList = res.data.data.boardDtos;
        setWishList(getWishList);
      })
      .catch((err) => {
        console.error('찜 목록 불러오기 실패: ', err)
      })
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    userApi
      .getFavorites(userId as string)
      .then((response) => {
        const favoriteBoardIs = response.data.data.boardDtos.map((item: any) => item.id);
        setLikeStatus((prevStatus) => {
          const newStatus: { [key: number]: boolean } = {};
          WishList.forEach((board) => {
            newStatus[board.id] = favoriteBoardIs.includes(board.id);
          });
          return newStatus;
        });
      })
      .catch((error) => {
        console.error("좋아요 상태 불러오기 실패: ", error);
      });
  }, [WishList]);

  const handleLikeToggle = (id: number) => {
    const userId = localStorage.getItem("userId");

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
      userApi
        .deleteFavorites(userId as string, String(id))
        .then(() =>
          setLikeStatus((prevStatus) => ({
            ...prevStatus,
            [id]: false,
          }))
        )
        .catch((err) => {
          console.error("즐겨찾기 삭제 실패: ", err);
        });
    }
  };

  const goToDetail = (boardId: number) => {
    navigate(`/relaybookdetail/${boardId}`);
  };

  return (
    <div>
      <div className="container mx-auto flex flex-col items-center">
        <div className="w-full mb-4 border-b border-black flex flex-col items-center">
          <h1 className="my-12 text-center text-4xl font-semibold">내가 찜한 목록</h1>
        </div>
        {/* 찜 목록이 비어있을 때 */}
        {WishList.length === 0 ? (
          <div className="w-full mt-32 flex flex-col items-center justify-center">
            <img className="w-36 h-36" src="/assets/user/emptyList.png" alt="Empty List" />
            <p className="mt-8 text-center text-3xl">목록이 비어있어요</p>
            <button className="mt-3 hover:underline text-center text-3xl text-gray-300" onClick={() => navigate("/relaybooklist")}>
              릴레이 북 바로가기
            </button>
          </div>
        ) : (
          <div className="w-full px-40 py-10">
            {WishList.map((item) => (
              <div className="" key={item.id}>
                <div className="pt-2 relative">
                  <div className="relative flex" onClick={() => goToDetail(item.id)}>
                    <img className="hover:cursor-pointer w-[16rem] h-[20rem] rounded-md" src={item.fileUrls[0]} alt="#" />
                    <div>
                      <div className="ms-10 flex gap-4 items-center">
                        <span className="hover:cursor-pointer font-bold 2xl:text-3xl xl:text-2xl md:text-xl text-lg">{item.subject}</span>
                        {item.done ? <span className="text-gray-400 text-sm xl:text-base">완성</span> : <span className="text-gray-400 text-sm xl:text-base">미완성</span>}
                      </div>
                      <div className="">
                        <img
                          className="w-10 z-10 hover:cursor-pointer absolute top-0 right-3"
                          src={likeStatus[item.id] ? fullHeart : isHovered === item.id ? fullHeart : emptyHeart}
                          alt="#"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLikeToggle(item.id);
                          }}
                          onMouseEnter={() => setIsHovered(item.id)}
                          onMouseLeave={() => setIsHovered(null)}
                        />
                      </div>
                      <div className="ms-10 mt-4 flex items-center gap-4">
                        <img className="w-6 h-6 lg:w-8 lg:h-8 xl:w-9 xl:h-9 rounded-full" src={item.user.profileImage} alt="최초 작성자" />
                        <span className="text-xs lg:text-base xl:text-lg">{item.user.nickName}</span>
                        {item.user.mbti === "N" && <img className="w-4 h-4 lg:w-6 lg:h-6 xl:w-7 xl:h-7" src="/assets/nBadget.png" alt="badge" />}
                        {item.user.mbti === "S" && <img className="w-4 h-4 lg:w-6 lg:h-6 xl:w-7 xl:h-7" src="/assets/sBadget.png" alt="badge" />}
                        {item.user.mbti === null && <img className="w-4 h-4 lg:w-6 lg:h-6 xl:w-7 xl:h-7" src="/assets/noBadget.png" alt="badge" />}
                      </div>
                      <div className="ms-10 mt-40 text-wrap max-w-[300px] sm:max-w-[400px] md:max-w[450px] xl:max-w-[600px] 2xl:max-w-[900px] text-xs lg:text-base xl:text-lg" style={{ wordWrap: "break-word", overflowWrap: "break-word", whiteSpace: "pre-wrap" }}>
                        {item.summary}
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="border-t-1 border-black my-4" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishList;
