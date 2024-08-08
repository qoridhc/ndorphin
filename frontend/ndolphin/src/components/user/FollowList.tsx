import React, { useState, useEffect, useCallback } from "react";
import FollowListItem from "./FollowListItem";
import { useInView } from "react-intersection-observer";

interface UserInfo {
  id: number;
  nickName: string;
  profileImage: string;
  isFollowing: boolean;
}

interface FollowProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  followingsList: UserInfo[];
  followersList: UserInfo[];
}

const FollowList: React.FC<FollowProps> = ({ isOpen, onClose, activeTab, setActiveTab, followingsList, followersList }) => {
  // const [items, setItems] = useState<JSX.Element[]>([]);
  // const [hasMore, setHasMore] = useState<boolean>(true);
  // const [loading, setLoading] = useState<boolean>(false);
  
  // const { ref: loadMoreRef, inView } = useInView({
  //   threshold: 1,
  //   triggerOnce: false
  // });

  // const fetchItems = useCallback(async () => {
  //   if (loading || !hasMore) return;
  //   setLoading(true);
  //   try {
  //     const newItems = Array.from({ length: 20 }, (_, i) => (
  //       <FollowListItem key={i} />
  //     ));
  //     setItems((prevItems) => [...prevItems, ...newItems]);
  //     //항목 최대 수
  //     if (items.length + newItems.length >= 80) {
  //       setHasMore(false);
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [loading, hasMore, items]);

  // useEffect(() => {
  //   fetchItems();
  // }, [fetchItems]);

  // useEffect(() => {
  //   if (inView) {
  //     fetchItems();
  //   }
  // }, [inView, fetchItems]);

  // 모달이 열린 상태에서 스크롤바 숨김
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const tabClass = (tabName: string) => `px-4 py-2 flex-1 text-center ${activeTab === tabName ? "text-black border-b-2 border-black" : "text-gray-400"}`;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>
      <div className="w-96 max-h-[80vh] bg-white rounded-lg shadow-lg flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex border-b">
          <button className={tabClass("팔로워")} onClick={() => setActiveTab("팔로워")}>
            팔로워
          </button>
          <button className={tabClass("팔로잉")} onClick={() => setActiveTab("팔로잉")}>
            팔로잉
          </button>
        </div>
        <div className="p-4 flex-grow overflow-y-auto hide-scrollbar">
          {activeTab === "팔로워" ? (
            followersList.length > 0 ? (
              followersList.map(follow => (
                <FollowListItem key={follow.id} follow={follow} onFollowToggle={(id) => {/* Handle follow toggle */ }} />
              ))
            ) : (
              <p>목록이 비어있습니다</p>
            )
          ) : (
            followingsList.length > 0 ? (
              followingsList.map(follow => (
                <FollowListItem key={follow.id} follow={follow} onFollowToggle={(id) => {/* Handle follow toggle */ }} />
              ))
            ) : (
              <p>목록이 비어있습니다</p>
            )
          )}
        </div>
        <button className="px-4 py-2 text-center text-gray-500 hover:text-gray-700 border-t" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default FollowList;
