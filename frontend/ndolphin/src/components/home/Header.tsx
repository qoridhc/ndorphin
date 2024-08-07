import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "../user/LoginModal";
import UserInfoEditModal from "../user/UserInfoEditModal";
import NSModal from "../user/NSModal";
import TimeDifference from "../common/TimeDifference";
import userApi from "../../api/userApi";

const Header = () => {
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isUserInfoEditModalOpen, setIsUserInfoEditModalOpen] = useState(false);
  const [isNSModalOpen, setIsNSModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userNickName, setuserNickName] = useState<string | null>(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [showAlarmDropdown, setShowAlarmDropdown] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, profileImage: "/assets/profile/profile1.png", userName: "근데 말야에", text: " 님이 새로운 게시물을 등록했습니다", timestamp: new Date() },
    { id: 2, profileImage: "/assets/profile/profile2.png", userName: "꿈꾸는 여행자", text: " 님이 참여한 릴레이북이 완성되었습니다.", timestamp: new Date(Date.now() - 5 * 60 * 1000) },
    { id: 3, profileImage: "/assets/profile/profile3.png", userName: "꿈꾸는 여행자", text: " 님이 참여한 릴레이북이 완성되었습니다.", timestamp: new Date(Date.now() - 20 * 60 * 1000) },
    { id: 4, profileImage: "/assets/profile/profile4.png", userName: "꿈꾸는 여행자", text: " 님이 참여한 릴레이북이 완성되었습니다.", timestamp: new Date(Date.now() - 60 * 60 * 1000) },
    { id: 5, profileImage: "/assets/profile/profile5.png", userName: "꿈꾸는 여행자", text: " 님이 참여한 릴레이북이 완성되었습니다.", timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    { id: 6, profileImage: "/assets/profile/profile1.png", userName: "꿈꾸는 여행자", text: " 님이 참여한 릴레이북이 완성되었습니다.", timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    { id: 7, profileImage: "/assets/profile/profile2.png", userName: "삶은 계란", text: " 님이 참여한 릴레이북이 완성되었습니다.", timestamp: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    { id: 8, profileImage: "/assets/profile/profile3.png", userName: "근데 말야에", text: " 님이 참여한 릴레이북이 완성되었습니다.", timestamp: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) },
    { id: 9, profileImage: "/assets/profile/profile4.png", userName: "", text: "내가 시작한 릴레이북이 베스트에 선정되었습니다", timestamp: new Date(Date.now() - 600000000000) },
  ]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLoggedIn(true);
    }
    const storedProfileImage = localStorage.getItem("profileImage");
    const storedEmail = localStorage.getItem('email');
    const storedNickName = localStorage.getItem('nickName');

    setProfileImage(storedProfileImage);
    setUserEmail(storedEmail);
    setuserNickName(storedNickName);
  }, []);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  const openUserInfoEditModalOpen = () => setIsUserInfoEditModalOpen(true);
  const closeUserInfoEditModal = () => setIsUserInfoEditModalOpen(false);
  const closeNSModal = () => setIsNSModalOpen(false);

  const handleLoginSuccess = (userId: string, accessToken: string, refreshToken: string, isNewUser: boolean) => {
    localStorage.setItem("userId", userId);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    // 로그인 성공 시 유저 정보 조회하여 로컬 스토리지에 저장 로직 추가
    userApi.getUserInfo(userId)
      .then(res => {
        localStorage.setItem("email", res.data.data.email);
        localStorage.setItem("mbti", res.data.data.mbti);
        localStorage.setItem("nickName", res.data.data.nickName);
        localStorage.setItem("npoint", res.data.data.npoint.toString());
        localStorage.setItem("profileImage", res.data.data.profileImage);
      })
      .catch(err => {
        console.error('유저 정보 에러', err)
      })

    setIsLoggedIn(true);
    closeLoginModal();

    if (isNewUser) {
      setIsUserInfoEditModalOpen(true);
    }
  };

  const handleNext = () => {
    closeUserInfoEditModal();
    setIsNSModalOpen(true);
  };

  const handleFinish = () => {
    closeNSModal();
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    localStorage.clear()

    setIsLoggedIn(false);
    setProfileImage(null);
    setShowProfileDropdown(false);
    navigate("/");

  };

  const handleProfileDropdownClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setShowProfileDropdown(!showProfileDropdown);
    if (showAlarmDropdown) {
      setShowAlarmDropdown(false);
    }
  };

  const handleOutsideClick = (event: MouseEvent) => {
    setShowProfileDropdown(false);
    setShowAlarmDropdown(false);
  };

  const handleDropdownbuttonClick = (callback: () => void) => {
    callback();
    setShowProfileDropdown(false);
  };

  const handleAlarmDropdown = (event: React.MouseEvent) => {
    event.stopPropagation();
    setShowAlarmDropdown(!showAlarmDropdown);
    if (isNew) {
      setIsNew(false);
    }
    if (showProfileDropdown) {
      setShowProfileDropdown(false);
    }
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  useEffect(() => {
    if (showProfileDropdown || showAlarmDropdown) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showProfileDropdown, showAlarmDropdown]);

  const updateProfileImage = (newProfileImage: string | null) => {
    setProfileImage(newProfileImage);
    localStorage.setItem("profileImage", newProfileImage || "");
  };

  return (
    <>
      <div className="w-full h-20 px-44 relative z-50 shadow-[0_2px_5px_0_rgba(0,0,0,0.2)] flex justify-between items-center">
        <div className="flex items-center">
          <img
            className="w-48 h-12 cursor-pointer"
            src="/assets/logo.PNG"
            alt="Logo"
            onClick={() => {
              navigate("/");
            }}
          />

          <div className="px-2 flex items-center text-[#6C6C6C] font-semibold">
            <button
              className="px-3 hover:pb-3 hover:underline decoration-[#FFDE2F] decoration-4 underline-offset-8 duration-300 hover:text-black"
              onClick={() => {
                navigate("/relaybooklist");
              }}>
              릴레이북
            </button>
            <button
              className="px-3 hover:pb-3 hover:underline decoration-[#FFDE2F] decoration-4 underline-offset-8 duration-300 hover:text-black"
              onClick={() => {
                navigate("/iflist");
              }}>
              만약에
            </button>
            <button
              className="px-3 hover:pb-3 hover:underline decoration-[#FFDE2F] decoration-4 underline-offset-8 duration-300 hover:text-black"
              onClick={() => {
                navigate("/balancelist");
              }}>
              밸런스게임
            </button>
            <button
              className="px-3 hover:pb-3 hover:underline decoration-[#FFDE2F] decoration-4 underline-offset-8 duration-300 hover:text-black"
              onClick={() => {
                navigate("/oklist");
              }}>
              괜찮아
            </button>
            <button
              className="px-3 hover:pb-3 hover:underline decoration-[#FFDE2F] decoration-4 underline-offset-8 duration-300 hover:text-black"
              onClick={() => {
                navigate("/bye");
              }}>
              작별인사
            </button>
            <button
              className="px-3 hover:pb-3 hover:underline decoration-[#FFDE2F] decoration-4 underline-offset-8 duration-300 hover:text-black"
              onClick={() => {
                navigate("/notice");
              }}>
              공지사항
            </button>
          </div>
        </div>

        <div className="gap-10 flex items-center">
          {/* 알림 기능 */}
          <div className="relative">
            <div className="w-8 h-8 cursor-pointer" onClick={handleAlarmDropdown}>
              <img className="w-full h-full" src="/assets/user/alarm.png" alt="알람" />
              {isNew && <span className="w-2 h-2 absolute top-0 right-0 bg-red-500 rounded-full"></span>}
            </div>
            {showAlarmDropdown && (
              <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto hide-scrollbar bg-white rounded-lg shadow-lg z-50" onClick={(e) => e.stopPropagation()}>
                <div className="mb-1 py-1 sticky top-0 z-10 bg-white border-b border-black">
                  <div className="px-6 py-2 flex justify-between items-center">
                    <h3 className="font-semibold">알림</h3>
                    <button className="text-sm text-gray-500" onClick={clearNotifications}>
                      모두 지우기
                    </button>
                  </div>
                </div>
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div className="py-2 px-6" key={notification.id}>
                      <div className="mt-2 flex items-center">
                        <img className="w-10 h-10 mr-3 rounded-full" src={notification.profileImage} alt="프로필" />
                        <p className="text-sm">
                          <span className="font-bold">{notification.userName}</span>
                          {notification.text}
                          <span className="ms-4 text-gray-400">
                            <TimeDifference timestamp={notification.timestamp} />
                          </span>
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-4 flex flex-col items-center justify-center">
                    <img className="w-16 h-16 mb-2" src="/assets/user/no-notifications-icon.png" alt="알림 없음" />
                    <p className="text-gray-500">새로운 알림이 없습니다</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 로그인 버튼 및 프로필 사진(프로필, 계정 관리, 찜 목록, 로그아웃) */}
          {isLoggedIn ? (
            <div className="relative">
              <img className="w-10 h-10 rounded-full cursor-pointer" src={profileImage || "/assets/user/profile.png"} alt="Profile" onClick={handleProfileDropdownClick} />
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-72 py-1 bg-white rounded-lg shadow-lg z-50" onClick={(e) => e.stopPropagation()}>
                  <div className="p-4 flex items-center">
                    <img className="w-15 h-15 rounded-full" src={profileImage || "/assets/user/profile.png"} alt="Profile" />
                    <div className="ml-3">
                      <div className="font-semibold">{ userNickName }</div>
                      <div className="text-sm text-gray-500">{ userEmail }</div>
                    </div>
                  </div>
                  <hr />
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-200" onClick={() => handleDropdownbuttonClick(() => navigate("/profile"))}>
                    프로필
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-200" onClick={() => handleDropdownbuttonClick(openUserInfoEditModalOpen)}>
                    계정 관리
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-200" onClick={() => handleDropdownbuttonClick(() => navigate("/wishlist"))}>
                    찜 목록
                  </button>
                  <hr />
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-200" onClick={handleLogout}>
                    로그아웃
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="px-2 py-1 border-2 border-[#FFDE2F] text-[#6C6C6C] font-semibold rounded-md hover:bg-[#FFDE2F] hover:text-white duration-200" onClick={openLoginModal}>
              로그인
            </button>
          )}
        </div>
      </div>

      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} onLoginSuccess={handleLoginSuccess} />
      <UserInfoEditModal isOpen={isUserInfoEditModalOpen} onNext={handleNext} setProfileImage={updateProfileImage} />
      <NSModal isOpen={isNSModalOpen} onClose={handleFinish} />
    </>
  );
};

export default Header;
