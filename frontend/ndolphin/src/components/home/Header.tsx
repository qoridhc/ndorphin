import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoginModal from "../user/LoginModal";
import UserInfoEditModal from "../user/UserInfoEditModal";
import NSModal from "../user/NSModal";
import TimeDifference from "../common/TimeDifference";
import userApi from "../../api/userApi";

interface notification {
  notificationId: number;
  userId: number;
  content: string;
  createdAt: string;
  user: {
    userId: number;
    profileImage: string | null;
    nickName: string;
    mbti: string;
  };
  read: boolean;
}

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState<string>("");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isUserInfoEditModalOpen, setIsUserInfoEditModalOpen] = useState(false);
  const [isNSModalOpen, setIsNSModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userNickName, setuserNickName] = useState<string | null>(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isNew, setIsNew] = useState(() => {
    const storedIsNew = localStorage.getItem('isNew');
    return storedIsNew ? JSON.parse(storedIsNew) : false;
  });
  const [showAlarmDropdown, setShowAlarmDropdown] = useState(false);
  const [notifications, setNotifications] = useState<notification[]>([]);
  const [done, setDone] = useState([]);

  useEffect(() => {
    const storedMenu = sessionStorage.getItem("selectedMenu");
    if (storedMenu) {
      setSelectedMenu(storedMenu);
    }

    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLoggedIn(true);
    }
    const storedProfileImage = localStorage.getItem("profileImage");
    const storedEmail = localStorage.getItem("email");
    const storedNickName = localStorage.getItem("nickName");
    setUserEmail(storedEmail);
    setuserNickName(storedNickName);
    setProfileImage(storedProfileImage === 'null' ? "/assets/user/profile.png" : storedProfileImage);
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
    userApi
      .getUserInfo(userId)
      .then((res) => {
        localStorage.setItem("email", res.data.data.email);
        localStorage.setItem("mbti", res.data.data.mbti);
        localStorage.setItem("nickName", res.data.data.nickName);
        localStorage.setItem("npoint", res.data.data.npoint.toString());
        localStorage.setItem("profileImage", res.data.data.profileImage);

        setProfileImage(res.data.data.profileImage);
      })
      .then(() => {
        setIsLoggedIn(true);
        closeLoginModal();
      })
      .then(() => {
        if (isNewUser) {
          openUserInfoEditModalOpen();
        } else {
          window.location.href = window.location.href;
        }
      })
      .catch((err) => {
        console.error("유저 정보 에러", err);
      });
  };

  const handleNext = () => {
    closeUserInfoEditModal();
    setIsNSModalOpen(true);
  };

  const handleFinish = () => {
    closeNSModal();
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");

    window.location.href = window.location.href
  };

  const handleLogout = () => {
    localStorage.removeItem('nickName');
    localStorage.removeItem('userId');
    localStorage.removeItem('profileImage');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('npoint');
    localStorage.removeItem('email');
    localStorage.removeItem('isNew');
    localStorage.removeItem('mbti');

    setIsLoggedIn(false);
    setProfileImage(null);
    setShowProfileDropdown(false);
    
    window.location.href = "/";
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
      localStorage.setItem('isNew', JSON.stringify(false));
    }
    if (showProfileDropdown) {
      setShowProfileDropdown(false);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const checkNotifications = () => {
      if (userId) {
        userApi
          .checkNotifications(userId as string)
          .then((response) => {
            const responseNotificationsData = response.data.data.hasUnreadNotification;
            if (responseNotificationsData) {
              setIsNew(true);
              localStorage.setItem('isNew', JSON.stringify(true));
              userApi
                .readNotifications(userId as string)
                .then((response) => {
                  const notificationsData = response.data.data;
                  setNotifications(notificationsData);
                  localStorage.setItem("notifications", JSON.stringify(notificationsData));
                })
                .catch((error) => {
                  console.error('알림목록 불러오기 실패: ', error)
                })
            } else {
              userApi
                .readNotifications(userId as string)
                .then((response) => {
                  const notificationsData = response.data.data;
                  setNotifications(notificationsData);
                  localStorage.setItem("notifications", JSON.stringify(notificationsData));
                })
                .catch((error) => {
                  console.error("알림목록 불러오기 실패: ", error);
                });
            }
          })
          .catch((error) => {
            console.error("새로운 알림 체크 실패: ", error)
          })
      }
    }
    checkNotifications();
    const intervalId = setInterval(checkNotifications, 5000);
    return () => {
      clearInterval(intervalId);
    }
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const storedNotifications = localStorage.getItem('notifications');
      if (storedNotifications) {
        setNotifications(JSON.parse(storedNotifications));
      }
    }
  }, []);

  const clearNotifications = () => {
    const userId = localStorage.getItem('userId');
    userApi.deleteNotifications(userId as string)
    setNotifications([]);
    localStorage.removeItem("notifications");
  };

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
    sessionStorage.setItem("selectedMenu", menu); // 로컬 스토리지에 선택된 메뉴 저장
    window.location.href = `/${menu}`;
  };

  const handleHomeClick = () => {
    setSelectedMenu("home");
    localStorage.setItem("selectedMenu", "home");
    window.location.href = "/";
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
              handleHomeClick();
            }}
          />

          <div className="px-2 flex items-center text-[#6C6C6C] font-semibold">
            {["relaybooklist", "iflist", "balancelist", "oklist", "bye", "notice"].map((menu) => (
              <button
                key={menu}
                className={`px-3 hover:pb-3 decoration-[#FFDE2F] decoration-4 duration-300 underline-offset-8 ${selectedMenu === menu ? "underline text-black" : "hover:underline hover:text-black"}`}
                onClick={() => handleMenuClick(menu)}>
                {menu === "relaybooklist" && "릴레이북"}
                {menu === "iflist" && "만약에"}
                {menu === "balancelist" && "밸런스게임"}
                {menu === "oklist" && "괜찮아"}
                {menu === "bye" && "작별인사"}
                {menu === "notice" && "공지사항"}
              </button>
            ))}
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
                  [...notifications].reverse().map((notification) => (
                    <div className="py-2 px-6" key={notification.notificationId}>
                      <div className="mt-2 flex items-center">
                        <img className="w-10 h-10 mr-3 rounded-full cursor-pointer" src={notification.user.profileImage || "/assets/user/profile.png"} alt="프로필" />
                        <p className="text-sm">
                          <span className="font-bold cursor-pointer">{notification.user.nickName}</span>
                          {notification.content}
                          <span className="ms-4 text-gray-400 whitespace-nowrap">
                            <TimeDifference timestamp={new Date(notification.createdAt)} />
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
                    <img className="w-12 h-12 rounded-full" src={profileImage || "/assets/user/profile.png"} alt="Profile" />
                    <div className="ml-3">
                      <div className="font-semibold">{userNickName}</div>
                      <div className="text-sm text-gray-500">{userEmail}</div>
                    </div>
                  </div>
                  <hr />
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-200" onClick={() => handleDropdownbuttonClick(() => (window.location.href = `/profile/${localStorage.getItem("userId")}`))}>
                    프로필
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-200" onClick={() => handleDropdownbuttonClick(() => (window.location.href = "/wishlist"))}>
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
      <NSModal isOpen={isNSModalOpen} onClose={handleFinish} mode={"survey"} />
    </>
  );
};

export default Header;
