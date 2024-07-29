import React from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const MeatballsMenu = () => {
  return (
    <ul className="menu menu-horizontal p-0 bg-[#E8E9EA] rounded-lg">
      <li>
        <details>
          <summary className="px-4 py-1">설정</summary>
          <ul className="p-2 bg-base-100 rounded-t-none relative z-10 ">
            <li>
              <a>수정</a>
            </li>
            <li>
              <a>삭제</a>
            </li>
          </ul>
        </details>
      </li>
    </ul>
  );
};

export default MeatballsMenu;
