import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FollowList from "../../components/user/FollowList";
import RelayBookList from "../../components/user/RelayBookList";
import TopButton from "../../components/common/TopButton";
import OkList from "../../components/user/OkList";
import IfCardList from "../../components/user/IfCardList";
import ByeList from "../../components/user/ByeList";

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>(() => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get("tab") || "릴레이북";
  });
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollowModalOpen, setIsFollowModalOpen] = useState(false);
  const [activeFollowTab, setActiveFollowTab] = useState<string>("팔로워");

  // 탭 정보를 URL쿼리에 저장(뒤로가거나 새로고침해도 상태 유지 가능)
  useEffect(() => {
    navigate({ search: `?tab=${selectedTab}` }, { replace: true });
  }, [selectedTab, navigate]);

  const buttonClass = (tabName: string) => `relative px-4 py-2 ${selectedTab === tabName ? "text-black underline underline-offset-8 decoration-[#FFDE2F] decoration-4 duration-300" : "text-gray-400"}`;

  const handleClick = () => {
    setIsFollowing(!isFollowing);
  };

  const openFollowModal = (tab: string) => {
    setActiveFollowTab(tab);
    setIsFollowModalOpen(true);
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "릴레이북":
        return <RelayBookList />;
      case "만약에":
        return <IfCardList />;
      case "괜찮아":
        return <OkList />;
      case "작별인사":
        return <ByeList />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mt-12 gap-10 flex justify-center items-center">
        <img className="w-36 h-36 mr-6 bg-gray-200 rounded-full" src={profileImage || "assets/user/profile.png"} alt="Profile" />
        <div>
          <h2 className="text-xl font-bold flex items-center">
            행복한 구름
            <img className="ml-2 w-9 h-8" src="assets/user/nbadge.png" alt="nbadge" />
            {/* 팔로우 버튼 예시, 본인 일 땐 표시 안 함 */}
            <button
              className={`ms-10 text-xs w-auto h-auto p-2 rounded-lg border-none shadow-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 ${
                isFollowing ? "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-300" : "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300"
              }`}
              onClick={handleClick}>
              {isFollowing ? "팔로잉" : "팔로우"}
            </button>
          </h2>
          <div className="flex mt-2 items-center space-x-10">
            <div className="flex flex-col items-center">
              <button className="mr-4" onClick={() => openFollowModal("팔로워")}>
                137 followers
              </button>
              <div className="flex flex-col items-center mt-2">
                <p className="text-yellow-500 font-bold">N 포인트</p>
                <p className="font-bold">1340</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <button onClick={() => openFollowModal("팔로잉")}>26 followings</button>
              <div className="flex flex-col items-center mt-2">
                <p className="text-yellow-500 font-bold">N 지수</p>
                <p className="font-bold">상위 4%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white border-b space-x-4 flex justify-center sticky top-0">
        <button className={buttonClass("릴레이북")} onClick={() => setSelectedTab("릴레이북")}>
          릴레이북
        </button>
        <button className={buttonClass("만약에")} onClick={() => setSelectedTab("만약에")}>
          만약에
        </button>
        <button className={buttonClass("괜찮아")} onClick={() => setSelectedTab("괜찮아")}>
          괜찮아
        </button>
        <button className={buttonClass("작별인사")} onClick={() => setSelectedTab("작별인사")}>
          작별인사
        </button>
      </div>

      {/* 콘텐츠 공간 */}
      <div>{renderContent()}</div>

      <TopButton />
      <FollowList isOpen={isFollowModalOpen} onClose={() => setIsFollowModalOpen(false)} activeTab={activeFollowTab} setActiveTab={setActiveFollowTab} />
    </div>
  );
};

export default Profile;
