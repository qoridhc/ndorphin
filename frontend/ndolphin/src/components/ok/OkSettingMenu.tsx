import React from "react";
import { BsThreeDots } from "react-icons/bs";
import commentApi from "../../api/commentApi";
import boardApi from "../../api/boardApi";
import { useNavigate } from "react-router";

interface Props {
  boardId: number;
  setIsUpdate: (state: boolean) => void;
}

const OkSettingMenu = ({ boardId, setIsUpdate }: Props) => {
  const navigate = useNavigate();

  const handleBoardDelete = async () => {
    try {
      const response = await boardApi.delete(`${boardId}`);
      if (response.status === 200) {
        navigate("/oklist");
      }
    } catch (error) {
      console.log("boardApi delete : ", error);
    }
  };

  return (
    <div className="w-full flex justify-end dropdown dropdown-end">
      <div className="w-7 h-7 rounded-md hover:bg-amber-100 hover:opacity-80 flex justify-center items-center" tabIndex={0}>
        <BsThreeDots className="text-xl" />
      </div>
      <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-32 p-2 m-3 shadow">
        <li onClick={() => setIsUpdate(true)}>
          <a className="px-2 py-1">
            <img className="w-5 h-5 ml-2" src="/assets/updateIcon.png" alt="" />
            <span className="text-center text-md">수정</span>
          </a>
        </li>
        <li onClick={() => handleBoardDelete()}>
          <a className="px-2 py-1">
            <img className="w-5 h-5 ml-2" src="/assets/deleteIcon.png" alt="" />
            <span className="text-center text-md">삭제</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default OkSettingMenu;
