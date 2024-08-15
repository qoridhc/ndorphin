import { Navigate, useNavigate } from "react-router";
import { useState, useEffect } from "react";

interface RelayBookDropDownProps {
  firstPage: {
    id: number;
    user: {};
    subject: string;
    content: string;
    hit: number;
    boardType: string;
    createdAt: string;
    updatedAt: string;
    contentFileUrl: string;
    hasParticipated: boolean;
    maxPage: number;
    commentResponseDtos: any[];
    reactionTypeCounts: {};
    userReactionId: null;
    userReactionType: string;
  }[];
  bookId: any;
  handleDelete: () => void;
}

const RelayBookDropDown: React.FC<RelayBookDropDownProps> = ({ firstPage, handleDelete, bookId }) => {
  const navigate = useNavigate();
  const [currentBookId, setCurrentBookId] = useState(0);
  const [pagesCount, setPagesCount] = useState(firstPage && firstPage.length > 0 && firstPage[0].commentResponseDtos ? firstPage[0].commentResponseDtos.length : 0);  
  return (
    <>
      <div className="w-full flex justify-end dropdown dropdown-end">
        <div className="rounded-3xl hover:bg-amber-100 hover:opacity-80" tabIndex={0}>
          <img className="w-7" src="/assets/relay/threeDots.png" alt="#" />
        </div>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-32 p-2 m-3 shadow">
          <li
            onClick={() => {
              pagesCount === 0 ? navigate(`/relaybookupdate/${bookId}`, { state: { firstPage } }) : alert("뒤에 이어진 페이지가 없을 경우에만 수정이 가능합니다.");
            }}
          >
            <button className={`px-2 py-1 ${pagesCount !== 0 && "opacity-50"}`}>
              <img className="ml-2 w-5" src="/assets/updateIcon.png" alt="" />
              <span className="text-center text-md">수정</span>
            </button>
          </li>
          <li
            onClick={() => {
              handleDelete();
            }}
          >
            <a className="px-2 py-1">
              <img className="ml-2 w-5" src="/assets/deleteIcon.png" alt="" />
              <span className="text-center text-md">삭제</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default RelayBookDropDown;
