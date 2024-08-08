import React, { useEffect, useState } from "react";
import userApi from "../../api/userApi";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (userId: string, accessToken: string, refreshToken: string, isNewUser: boolean) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [loginWindow, setLoginWindow] = useState<Window | null>(null);

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

  useEffect(() => {
    if (loginWindow) {
      const checkRedirect = setInterval(() => {
        try {
          const redirectedUrl = loginWindow.location.href;
          if (redirectedUrl.includes("amazonaws.com") || redirectedUrl.includes("localhost")) {
            clearInterval(checkRedirect);
            const urlParams = new URLSearchParams(redirectedUrl.split("?")[1]);
            const userId = urlParams.get("userId");
            const accessToken = urlParams.get("accessToken");
            const refreshToken = urlParams.get("refreshToken");
            const isNewUser = urlParams.get("isNewUser") === "true";

            if (userId && accessToken && refreshToken) {
              onLoginSuccess(userId, accessToken, refreshToken, isNewUser);
              loginWindow.close();
              setLoginWindow(null);
            }
          }
        } catch (error) {
          console.log('에러???', error);
        }
      }, 50);

      return () => clearInterval(checkRedirect);
    }
  }, [loginWindow, onLoginSuccess]);

  if (!isOpen) return null;

  const handleExternalLogin = (loginType: string) => {
    // 로컬 테스트와 배포 모두 가능
    const nowURL = window.location.href;
    if (nowURL.includes('localhost')) {
      userApi.getUserInfo('4')
        .then(response => {
          if (response.data.code == 'SU') {
            const userInfo = response.data.data;
            localStorage.setItem("userId", userInfo.userId.toString());
            localStorage.setItem('nickName', userInfo.nickName);
            localStorage.setItem('mbti', userInfo.mbti);
            localStorage.setItem('npoint', userInfo.npoint.toString());
            localStorage.setItem('profileImage', userInfo.profileImage);
            localStorage.setItem("accessToken", process.env.REACT_APP_ACCESS_TOKEN as string);
            localStorage.setItem("email", userInfo.email);
  
            window.location.href = window.location.href
          }
        })
        .catch(error => {
          console.error('Failed to fetch user info: ', error);
        });
    } else {
      const newWindow = userApi.login(loginType);
      setLoginWindow(newWindow);
    }

    }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
      <div className="w-96 bg-white rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 border-b shadow-lg flex justify-between items-center">
          <div className="w-8"></div>
          <h2 className="text-lg font-semibold flex-grow text-center">로그인</h2>
          <button className="w-8 text-gray-500 hover:text-gray-700 text-xl" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="p-6">
          <p className="text-center mb-6">
            <span className="inline-block font-bold">
              <span className="relative">
                <span className="underline decoration-yellow-300 decoration-4">N돌핀</span>
              </span>
              에서 여러분의 만약에를 공유해 주세요!
            </span>
          </p>
          <div className="space-y-1">
            <button className="w-72 px-4 py-1 ms-5 bg-white border border-gray-300 rounded-md flex items-center hover:bg-gray-200" onClick={() => handleExternalLogin("google")}>
              <img className="w-8 h-8" src="/assets/user/googleLoginButton.png" alt="구글로 로그인" />
              <span className="flex-grow text-center text-sm font-semibold">구글 계정으로 로그인</span>
            </button>
            <button className="w-72 px-4 py-1 ms-5 bg-[#03C75A] border border-[#03C75A] rounded-md flex items-center text-white" onClick={() => handleExternalLogin("naver")}>
              <img className="w-8 h-8" src="/assets/user/naverLoginButton.png" alt="네이버로 로그인" />
              <span className="flex-grow text-center text-sm font-semibold">네이버로 로그인</span>
            </button>
            <button className="w-72 ps-5 px-4 py-2 ms-5 bg-[#FFEB00] border border-[#FFEB00] rounded-md flex items-center" onClick={() => handleExternalLogin("kakao")}>
              <img className="w-6 h-6" src="/assets/user/kakaoLoginButton.png" alt="카카오로 로그인" />
              <span className="flex-grow text-center text-sm font-semibold">카카오 로그인</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
