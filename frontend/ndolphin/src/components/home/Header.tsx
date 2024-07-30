import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "../user/LoginModal";
import UserInfoEditModal from "../user/UserInfoEditModal";
import NSModal from "../user/NSModal";

const Header = () => {
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isUserInfoEditModalOpen, setIsUserInfoEditModalOpen] = useState(false);
  const [isNSModalOpen, setIsNSModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  const openUserInfoEditModalOpen = () => setIsUserInfoEditModalOpen(true);
  const closeUserInfoEditModal = () => setIsUserInfoEditModalOpen(false);
  const closeNSModal = () => setIsNSModalOpen(false);

  const handleLoginSuccess = () => {
    closeLoginModal();
    setIsUserInfoEditModalOpen(true);
  };

  const handleNext = () => {
    closeUserInfoEditModal();
    setIsNSModalOpen(true);
  };

  const handleFinish = () => {
    closeNSModal();
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowProfileDropdown(false);
    navigate("/");
  };

  const handleProfileDropdownClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    setShowProfileDropdown(false);
  };

  const handleDropdownbuttonClick = (callback: () => void) => {
    callback();
    setShowProfileDropdown(false);
  };

  useEffect(() => {
    if (showProfileDropdown) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showProfileDropdown]);

  return (
    <>
      <div className="w-full h-20 px-44 relative shadow-[0_2px_5px_0_rgba(0,0,0,0.2)] flex justify-between items-center">
        <div className="w-1/2 flex justify-between">
          <img
            className="w-48 h-12 cursor-pointer"
            src="/assets/logo.PNG"
            alt="Logo"
            onClick={() => {
              navigate("/");
            }}
          />
          <div className="w-2/3 text-[#6C6C6C] font-semibold flex justify-around items-center">
            <button
              className="hover:pb-3 hover:underline decoration-[#FFDE2F] decoration-4 underline-offset-8 duration-300 hover:text-black"
              onClick={() => {
                navigate("/relaybooklist");
              }}>
              릴레이북
            </button>
            <button
              className="hover:pb-3 hover:underline decoration-[#FFDE2F] decoration-4 underline-offset-8 duration-300 hover:text-black"
              onClick={() => {
                navigate("/iflist");
              }}>
              만약에
            </button>
            <button
              className="hover:pb-3 hover:underline decoration-[#FFDE2F] decoration-4 underline-offset-8 duration-300 hover:text-black"
              onClick={() => {
                navigate("/ok");
              }}>
              괜찮아
            </button>
            <button
              className="hover:pb-3 hover:underline decoration-[#FFDE2F] decoration-4 underline-offset-8 duration-300 hover:text-black"
              onClick={() => {
                navigate("/bye");
              }}>
              작별인사
            </button>
            <button
              className="hover:pb-3 hover:underline decoration-[#FFDE2F] decoration-4 underline-offset-8 duration-300 hover:text-black"
              onClick={() => {
                navigate("/notice");
              }}>
              공지사항
            </button>
          </div>
        </div>
        {isLoggedIn ? (
          <div className="relative">
            <img className="w-10 h-10 rounded-full cursor-pointer" src={profileImage || "/assets/user/profile.png"} alt="Profile" onClick={handleProfileDropdownClick} />
            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-72 py-1 bg-white rounded-lg shadow-lg z-50" onClick={(e) => e.stopPropagation()}>
                <div className="p-4 flex items-center">
                  <img className="w-15 h-15 rounded-full" src={profileImage || "assets/user/profile.png"} alt="Profile" />
                  <div className="ml-3">
                    <div className="font-semibold">닉네임</div>
                    <div className="text-sm text-gray-500">test@test.com</div>
                  </div>
                </div>
                <hr />
                <button className="w-full text-left px-4 py-2 hover:bg-gray-200" onClick={() => handleDropdownbuttonClick(() => navigate("/profile"))}>프로필</button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-200" onClick={() => handleDropdownbuttonClick(openUserInfoEditModalOpen)}>계정 관리</button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-200" onClick={() => handleDropdownbuttonClick(() => navigate("/wishlist"))}>찜 목록</button>
                <hr />
                <button className="w-full text-left px-4 py-2 hover:bg-gray-200" onClick={handleLogout}>로그아웃</button>
              </div>
            )}
          </div>
        ) : (
          <button className="px-2 py-1 border-2 border-[#FFDE2F] text-[#6C6C6C] font-semibold rounded-md hover:bg-[#FFDE2F] hover:text-white duration-200" onClick={openLoginModal}>
            로그인
          </button>
        )}
      </div>

      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} onLoginSuccess={handleLoginSuccess} />
      <UserInfoEditModal isOpen={isUserInfoEditModalOpen} onNext={handleNext} setProfileImage={setProfileImage} />
      <NSModal isOpen={isNSModalOpen} onClose={handleFinish} />
    </>
  );
};

export default Header;
