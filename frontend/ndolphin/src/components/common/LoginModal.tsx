import React, { useEffect } from "react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
      <div className="w-96 bg-white rounded-lg shadow-lg" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b flex justify-between items-center">
          <div className="w-8"></div>
          <h2 className="text-lg font-semibold flex-grow text-center">로그인</h2>
          <button onClick={onClose} className="w-8 text-gray-500 hover:text-gray-700 text-xl">
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
              <button>
                <img src="../../../assets/user/web_light_sq_SU@2x.png" alt="구글로 로그인" />
              </button>
            </p>
            <p>
              <button>
                <img src="../../../assets/user/btnG_official.png" alt="네이버로 로그인" />
              </button>
            </p>
            <p>
              <button>
                <img src="../../../assets/user/kakao_login_medium_narrow.png" alt="카카오로 로그인" />
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
