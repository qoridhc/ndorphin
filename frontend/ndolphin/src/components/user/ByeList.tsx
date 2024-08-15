import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import boardApi from "../../api/boardApi";
import TimeDifference from "../common/TimeDifference";

interface BoardItem {
  id: string;
  user: {
    userId: number;
    nickName: string;
    profileImage: string;
    mbti: string;
  };
  content: string;
  createdAt: string;
  reactionTypeCounts: {
    WELCOME: number;
    GOODBYE: number;
  };
}

interface Reactions {
  [key: string]: string | null;
}

const ByeList: React.FC = () => {
  const location = useLocation();
  const [myByeBoardList, setMyByeBoardList] = useState<BoardItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reactions, setReactions] = useState<Reactions>({});

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    boardApi
      .list("BYE_BOARD")
      .then((response) => {
        const getByeBoardList = response.data.data.content as BoardItem[];
        const currentUserId = Number(location.pathname.split("/")[2]);
        const filteredList = getByeBoardList.filter((item) => item.user.userId === currentUserId);
        setMyByeBoardList(filteredList);

        const initialReactions: Reactions = {};
        filteredList.forEach((item) => {
          initialReactions[item.id] = null;
        });
        setReactions(initialReactions);
      })
      .catch((error) => {
        console.error("작별인사 게시글 불러오기 실패: ", error);
        setError("게시글을 불러오는 데 실패했습니다. 다시 시도해 주세요.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [location.pathname]);

  const handleReaction = (postId: string, reactionType: string) => {
    const currentReaction = reactions[postId];
    let newReaction = reactionType;

    if (currentReaction === reactionType) {
      newReaction = ""; // 같은 리액션을 다시 클릭하면 취소
    }

    console.log(`Sending reaction update for postId: ${postId}, newReaction: ${newReaction}`);

    boardApi
      .reactionUpdate(postId, newReaction)
      .then((response) => {
        console.log(`Reaction update response: ${response.data}`);
        setReactions((prev) => ({ ...prev, [postId]: newReaction }));
        updateReactionCount(postId, currentReaction, newReaction);
      })
      .catch((error) => {
        console.error("리액션 업데이트 실패:", error);
      });
  };

  const updateReactionCount = (postId: string, oldReaction: string | null, newReaction: string | null) => {
    setMyByeBoardList((prevList) =>
      prevList.map((item) => {
        if (item.id === postId) {
          const counts = { ...item.reactionTypeCounts };
          if (oldReaction) counts[oldReaction as keyof typeof counts] = Math.max((counts[oldReaction as keyof typeof counts] || 0) - 1, 0);
          if (newReaction) counts[newReaction as keyof typeof counts] = (counts[newReaction as keyof typeof counts] || 0) + 1;
          return { ...item, reactionTypeCounts: counts };
        }
        return item;
      })
    );
  };

  if (isLoading) {
    return <div className="mt-40 text-center text-3xl font-bold">로딩 중...</div>;
  }

  if (error) {
    return <div className="mt-40 text-center text-3xl font-bold text-red-500">{error}</div>;
  }

  return (
    <div>
  {/* //     {myByeBoardList.length === 0 ? (
  //       <div className="mt-40 text-center text-3xl font-bold">
  //         <img className="w-32 h-32 mx-auto mb-4" src="/assets/user/noContents.png" alt="게시물 없음" />
  //         <span>등록된 게시물이 없습니다</span>
  //       </div>
  //     ) : (
  //       <div className="px-96">
  //         {myByeBoardList.map((item) => (
  //           <div className="p-5 border border-t-0 relative mb-8" key={item.id}>
  //             <div className="flex">
  //               <img className="w-8 h-8 mt-1 rounded-full" src={item.user.profileImage} alt={item.user.nickName} />
  //               <div className="mx-4">
  //                 <div className="mb-4">
  //                   <p className="font-bold">{item.user.nickName}</p>
  //                   <div className="text-sm text-gray-500">
  //                     <TimeDifference timestamp={new Date(item.createdAt)} />
  //                   </div>
  //                 </div>
  //                 {item.user.mbti === "S" ? <img className="w-14" src="/assets/bye/nToS.png" alt="MBTI S" /> : <img className="w-14" src="/assets/bye/sToN.png" alt="MBTI N" />}
  //                 <div className="mt-5 mb-10">{item.content}</div>
  //               </div>
  //             </div>
  //             <div className="absolute bottom-0 right-0 mr-2 mb-3 flex space-x-2">
  //               <button
  //                 className={`rounded-3xl px-3 py-1 border border-2 border-pink-400 hover:bg-pink-400 hover:text-white font-bold ${reactions[item.id] === "WELCOME" ? "text-white bg-pink-400" : "text-pink-400"}`}
  //                 onClick={() => handleReaction(item.id, "WELCOME")}>
  //                 환영해요 <span>{item.reactionTypeCounts.WELCOME || 0}</span>
  //               </button>
  //               <button
  //                 className={`rounded-3xl px-3 py-1 border border-2 border-blue-400 hover:bg-blue-400 hover:text-white font-bold ${reactions[item.id] === "GOODBYE" ? "text-white bg-blue-400" : "text-blue-400"}`}
  //                 onClick={() => handleReaction(item.id, "GOODBYE")}>
  //                 잘 가요 <span>{item.reactionTypeCounts.GOODBYE || 0}</span>
  //               </button>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     )} */}
    </div>
  );
};

export default ByeList;
