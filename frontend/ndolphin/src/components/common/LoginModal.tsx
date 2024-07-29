import React, { useEffect } from "react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleExternalLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    const provider = event.currentTarget.getAttribute('data-provider');
    if (provider) {
      // 여기에 외부 로그인 로직을 구현
      console.log(`${provider} 로그인 시도`);
      
      // 로그인 성공을 시뮬레이션
      setTimeout(() => {
        onLoginSuccess();
      }, 100);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
      <div className="w-96 bg-white rounded-lg shadow-lg" onClick={e => e.stopPropagation()}>
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
          <div className="space-y-4">
            <p>
              <button onClick={handleExternalLogin} data-provider="google">
                <img src="../../../assets/user/googleloginbtn.png" alt="구글로 로그인" />
              </button>
            </p>
            <p>
              <button>
                <img src="../../../assets/user/naverloginbtn.png" alt="네이버로 로그인" />
              </button>
            </p>
            <p>
              <button>
                <img src="../../../assets/user/kakaologinbtn.png" alt="카카오로 로그인" />
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
