import { Navigate, useNavigate } from "react-router";
import { useState } from "react";

interface BookPageDropDownProps {
  setPageUpdate: (type: boolean) => void;
}

const BookPageDropDown: React.FC<BookPageDropDownProps> = ({ setPageUpdate }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-end dropdown dropdown-end">
      <div className="rounded-3xl hover:bg-amber-100 hover:opacity-80" tabIndex={0}>
        <img className="w-7" src="/assets/relay/threeDots.png" alt="#" />
      </div>
      <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-32 p-2 m-3 shadow">
        <li
          onClick={() => {
            setPageUpdate(true);
          }}>
          <a className="px-2 py-1">
            <img className="ml-2" src="/assets/updateIcon.png" alt="" />
            <span className="text-center text-md">수정</span>
          </a>
        </li>
        <li>
          <a className="px-2 py-1">
            <img className="ml-2" src="/assets/deleteIcon.png" alt="" />
            <span className="text-center text-md">삭제</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default BookPageDropDown;
