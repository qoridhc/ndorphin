import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaRegComment } from "react-icons/fa6";

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

  const renderImages = () => {
    // if (!okDetail || !okDetail.fileUrls.length) return null;

    // switch (okDetail && okDetail.fileUrls.length) {
    //   case 1:
    //     return <img className="w-full rounded-md object-cover cursor-pointer" src={okDetail.fileUrls[0]} alt="" onClick={() => handleselectedImageList(0)} />;

    //   case 2:
    //     return (
    //       <div className="grid grid-cols-2 gap-1">
    //         {okDetail.fileUrls.map((url, idx) => (
    //           <img className={`w-full h-72 object-cover ${idx === 0 ? "rounded-tl-md rounded-bl-md" : "rounded-tr-md rounded-br-md"} cursor-pointer`} src={url} alt="" key={idx} onClick={() => handleselectedImageList(idx)} />
    //         ))}
    //       </div>
    //     );

    //   case 3:
    //     return (
    //       <div className="grid grid-rows-2 grid-cols-2 gap-1">
    //         {okDetail.fileUrls.map((url, idx) => (
    //           <img
    //             className={`w-full h-${idx === 0 ? "full" : "36"} object-cover ${idx === 0 ? "row-span-2 rounded-tl-md rounded-bl-md" : idx === 1 ? "rounded-tr-md" : "rounded-br-md"} cursor-pointer`}
    //             src={url}
    //             alt=""
    //             key={idx}
    //             onClick={() => handleselectedImageList(idx)}
    //           />
    //         ))}
    //       </div>
    //     );

    //   case 4:
    //     return (
    //       <div className="grid grid-cols-2 gap-1">
    //         {okDetail.fileUrls.map((url, idx) => (
    //           <img
    //             className={`w-full h-36 object-cover ${idx === 0 ? "rounded-tl-md" : idx === 1 ? "rounded-tr-md" : idx === 2 ? "rounded-bl-md" : "rounded-br-md"} cursor-pointer`}
    //             src={url}
    //             alt=""
    //             key={idx}
    //             onClick={() => handleselectedImageList(idx)}
    //           />
    //         ))}
    //       </div>
    //     );

    //   default:
    //     return null;
    // }
  };

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
            <div onClick={() => goToDetail(item.id)}>
              <div className="p-5 border-t border-x grid grid-cols-[1fr_9fr]">
                <div className="">
                  <img className="w-9 h-9 rounded-[50%]" src={`${item.user.profileImage}`} alt="" />
                </div>

                <div className="grid gap-3">
                  <div>
                    <div className="flex items-center">
                    <p className="font-bold">{item.user.nickName}</p>
                    {item.user.mbti === 'N' && (
                      <img className="w-5 h-5 ml-1" src="/assets/nBadget.png" alt="badget" />
                    )}
                    {item.user.mbti === 'S' && (
                      <img className="w-5 h-5 ml-1" src="/assets/sBadget.png" alt="badget" />
                    )}
                    {item.user.mbti === null && (
                      <img className="w-5 h-5 ml-1" src="/assets/noBadget.png" alt="badget" />
                    )}
                    </div>
                    <p className="text-sm font-semibold text-[#565656]">{item.createdAt}</p>
                  </div>

                  <p className="font-medium text-justify leading-snug">{item.content}</p>

                  {/* {renderImages()} */}

                  <div className="flex items-center">
                    <FaRegComment />
                    {item.commentCnt === 0 ? <></> : <p className="px-1 text-[#565656] font-semibold">{item.commentCnt}</p>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OkList;
