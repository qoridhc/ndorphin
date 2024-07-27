import React from "react";

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

  return (
    <div className="w-full h-20 px-48 flex justify-between items-center shadow-[0_2px_5px_0_rgba(0,0,0,0.2)]">
      <div className="w-1/2 flex justify-between">
        <img className="w-48 h-12" src="assets/logo.PNG" alt="" />
        <div className="w-2/3 flex justify-around items-center text-[#6C6C6C] font-semibold">
          {menuList.map((menu) => (
            <p className="hover:pb-3 hover:text-black hover:underline decoration-[#FFDE2F] decoration-4 underline-offset-8 duration-300" key={menu.id}>
              {menu.text}
            </p>
          ))}
        </div>
      </div>
      <button className="px-2 py-1 text-[#6C6C6C] font-semibold border-solid border-2 border-[#FFDE2F] rounded-md hover:text-white hover:bg-[#FFDE2F] duration-200">로그인</button>
    </div>
  );
};

export default Header;
