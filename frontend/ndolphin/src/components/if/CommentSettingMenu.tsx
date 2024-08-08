import React from "react";
import { BsThreeDots } from "react-icons/bs";
import commentApi from "../../api/commentApi";

interface Props {
  boardId: string | undefined;
  commentId: number;
  commentContent: string;
  setIsCommentUpdate: (commentId: number) => void;
  setUpdateComment: (comment: string) => void;
  readBoardData: (boardId: string) => void;
}

const CommentSettingsMenu = ({ boardId, commentId, commentContent, setIsCommentUpdate, setUpdateComment, readBoardData }: Props) => {
  const handleCommentDelete = async () => {
    if (boardId !== undefined) {
      try {
        await commentApi.delete(boardId, commentId);
        readBoardData(boardId);
      } catch (error) {
        console.log("commentApi delete : ", error);
      }
    }
  };

  const handleCommentUpdate = async () => {
    setIsCommentUpdate(commentId);
    setUpdateComment(commentContent);
  };

  return (
    <div className="w-full flex justify-end dropdown dropdown-end">
      <div className="w-7 h-7 rounded-md hover:bg-amber-100 hover:opacity-80 flex justify-center items-center" tabIndex={0}>
        <BsThreeDots className="text-xl" />
      </div>
      <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-32 p-2 m-3 shadow">
        <li onClick={() => handleCommentUpdate()}>
          <a className="px-2 py-1">
            <img className="ml-2" src="/assets/updateIcon.png" alt="" />
            <span className="text-center text-md">수정</span>
          </a>
        </li>
        <li onClick={() => handleCommentDelete()}>
          <a className="px-2 py-1">
            <img className="ml-2" src="/assets/deleteIcon.png" alt="" />
            <span className="text-center text-md">삭제</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default CommentSettingsMenu;
