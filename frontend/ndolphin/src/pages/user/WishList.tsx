import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userApi from "../../api/userApi";

const WishList = () => {
  const navigate = useNavigate();
  const [WishList, setWishList] = useState<any[]>([]);
  const [likeStatus, setLikeStatus] = useState<{ [key: number]: boolean }>({});
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const fullHeart = "/assets/relay/fullheart.png";
  const emptyHeart = "/assets/relay/emptyheart.png";

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
  }, []);

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
        <div className="w-full border-b border-black flex flex-col items-center">
          <h1 className="my-12 text-center text-4xl font-semibold">내가 찜한 목록</h1>
        </div>
        {/* 찜 목록이 비어있을 때 */}
        {WishList.length === 0 ? (
          <div className="w-full mt-32 flex flex-col items-center justify-center">
            <img className="w-36 h-36" src="assets/user/emptyList.png" alt="Empty List" />
            <p className="mt-8 text-center text-3xl">목록이 비어있어요</p>
            <button className="mt-3 hover:underline text-center text-3xl text-gray-300" onClick={() => navigate("/relaybooklist")}>
              릴레이 북 바로가기
            </button>
          </div>
          ) : (
            <div className="px-40 py-10 grid grid-cols-1 xl:grid-cols-2 gap-96">
              {WishList.map((item) => (
                <div className="" key={item.id}>
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
                  </div>
                </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishList;
