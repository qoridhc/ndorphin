import React, { useState } from "react";

const Header = () => {
  const menuList = [
    {
      id: 1,
      text: "릴레이북",
    },
    {
      id: 2,
      text: "만약에",
    },
    {
      id: 3,
      text: "괜찮아",
    },
    {
      id: 4,
      text: "작별인사",
    },
    {
      id: 5,
      text: "공지사항",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="w-full h-20 px-44 flex justify-between items-center shadow-[0_2px_5px_0_rgba(0,0,0,0.2)]">
        <div className="w-1/2 flex justify-between">
          <img className="w-48 h-12" src="/assets/logo.PNG" alt="" />
          <div className="w-2/3 flex justify-around items-center text-[#6C6C6C] font-semibold">
            {menuList.map((menu) => (
              <p className="hover:pb-3 hover:text-black hover:underline decoration-[#FFDE2F] decoration-4 underline-offset-8 duration-300" key={menu.id}>
                {menu.text}
              </p>
            ))}
          </div>
        </div>
        <button onClick={openModal} className="px-2 py-1 text-[#6C6C6C] font-semibold border-solid border-2 border-[#FFDE2F] rounded-md hover:text-white hover:bg-[#FFDE2F] duration-200">
          로그인
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center p-4 border-b">
              <div className="w-8"></div>
              <h2 className="text-lg font-semibold flex-grow text-center">로그인</h2>
              <button onClick={closeModal} className="w-8 text-gray-500 hover:text-gray-700 text-xl">
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
                  <button>구글 계정으로 로그인</button>
                </p>
                <p>
                  <button>네이버 계정으로 로그인</button>
                </p>
                <p>
                  <button>카카오 계정으로 로그인</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
