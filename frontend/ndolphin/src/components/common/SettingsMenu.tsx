import React from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const SettingsMenu = () => {
  return (
    <ul className="menu menu-horizontal bg-base-200 rounded-box px-2 py-1">
      <li>
        <a className="px-2 py-1">
          <img src="/assets/updateIcon.png" alt="" />
        </a>
      </li>
      <li>
        <a className="px-2 py-1">
          <img src="/assets/deleteIcon.png" alt="" />
        </a>
      </li>
    </ul>
  );
};

export default SettingsMenu;
