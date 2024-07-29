import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "../common/LoginModal";
import UserInfoEditModal from "../common/UserInfoEditModal";
import NSModal from "../common/NSModal";

const Header = () => {
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isUserInfoEditModalOpen, setIsUserInfoEditModalOpen] = useState(false);
  const [isNSModalOpen, setIsNSModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);
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

  return (
    <>
      <div className="w-full h-20 px-44 shadow-[0_2px_5px_0_rgba(0,0,0,0.2)] flex justify-between items-center">
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
        <button className="px-2 py-1 border-2 border-[#FFDE2F] text-[#6C6C6C] font-semibold rounded-md hover:bg-[#FFDE2F] hover:text-white duration-200" onClick={openLoginModal}>
          로그인
        </button>
      </div>

      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} onLoginSuccess={handleLoginSuccess} />
      <UserInfoEditModal isOpen={isUserInfoEditModalOpen} onNext={handleNext} />
      <NSModal isOpen={isNSModalOpen} onClose={closeNSModal} />
    </>
  );
};

export default Header;
