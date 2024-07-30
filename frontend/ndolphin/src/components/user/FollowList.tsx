import React from "react";
import FollowListItem from "./FollowListItem";

interface FollowProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const FollowList: React.FC<FollowProps> = ({ isOpen, onClose, activeTab, setActiveTab }) => {
  if (!isOpen) return null;

  const tabClass = (tabName: string) => `px-4 py-2 flex-1 text-center ${activeTab === tabName ? "text-black border-b-2 border-black" : "text-gray-400"}`;

  return (
    // 무한스크롤 넣어야 함(스크롤 바 없애기)
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div className="w-96 max-h-[80vh] bg-white rounded-lg shadow-lg flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex border-b">
          <button className={tabClass("팔로워")} onClick={() => setActiveTab("팔로워")}>
            팔로워
          </button>
          <button className={tabClass("팔로잉")} onClick={() => setActiveTab("팔로잉")}>
            팔로잉
          </button>
        </div>
        <div className="p-4 flex-grow overflow-y-auto">
          {activeTab === "팔로워" ? (
            <div>
              <FollowListItem />
              <FollowListItem />
              <FollowListItem />
              <FollowListItem />
              <FollowListItem />
              <FollowListItem />
              <FollowListItem />
              <FollowListItem />
              <FollowListItem />
              <FollowListItem />
            </div>
          ) : (
            <div>팔로잉 목록</div>
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
