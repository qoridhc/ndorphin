import React, { useState, useEffect, useRef } from "react";
import { FaRegComment } from "react-icons/fa";
import OkDetailModal from "./OkDetailModal";
import { useNavigate } from "react-router";
import OkSettingMenu from "./OkSettingMenu";
import TimeDifference from "../common/TimeDifference";

interface Comment {
  commentId: number;
  user: {
    profileImage: string | null;
    nickName: string;
    userId: number;
  };
  content: string;
  createdAt: string;
}

interface BoardDetail {
  id: number;
  user: {
    userId: number;
    nickName: string;
    mbti: string;
    profileImage: string | null;
  };
  createdAt: string;
  content: string;
  fileNames: string[];
  fileUrls: string[];
  commentCnt: number;
  commentResponseDtos: Comment[];
}

interface Props {
  content: BoardDetail;
}

const OkContent = ({ content }: Props) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");

  const [selectedImageList, setSelectedImageList] = useState<string[] | null>(null);
  const [selectedImageListIndex, setSelectedImageListIndex] = useState(0);

  const [isUpdate, setIsUpdate] = useState(false);

  const handleselectedImageList = (event: React.MouseEvent, currentIndex: number) => {
    event.stopPropagation();
    setSelectedImageList(content.fileUrls);
    setSelectedImageListIndex(currentIndex);
  };

  useEffect(() => {
    setUserId(`${localStorage.getItem("userId")}`);
    console.log(content);
  }, []);

  const goToDetail = (id: number) => {
    if (!selectedImageList) {
      navigate(`/okdetail/${id}`);
    }
  };

  const renderImages = () => {
    if (!content.fileUrls || content.fileUrls.length === 0) {
      return null; // imgList가 없는 경우 null을 반환하여 렌더링을 방지
    }

    switch (content.fileUrls.length) {
      case 1:
        return <img className="w-full aspect-2 border rounded-md object-cover cursor-pointer" src={content.fileUrls[0]} alt="" onClick={(event) => handleselectedImageList(event, 0)} />;

      case 2:
        return (
          <div className="grid grid-cols-2 gap-1">
            {content.fileUrls.map((imgUrl, idx) => (
              <img
                className={`w-full h-72 aspect-2 border object-cover ${idx === 0 ? "rounded-tl-md rounded-bl-md" : "rounded-tr-md rounded-br-md"} cursor-pointer`}
                src={imgUrl}
                alt=""
                key={idx}
                onClick={(event) => handleselectedImageList(event, idx)}
              />
            ))}
          </div>
        );

      case 3:
        return (
          <div className="grid grid-rows-2 grid-cols-2 gap-1">
            <img className="w-full h-full aspect-2 border object-cover row-span-2 rounded-tl-md rounded-bl-md cursor-pointer" src={content.fileUrls[0]} alt="" onClick={(event) => handleselectedImageList(event, 0)} />
            <img className="w-full h-36 aspect-2 border object-cover rounded-tr-md cursor-pointer" src={content.fileUrls[1]} alt="" onClick={(event) => handleselectedImageList(event, 1)} />
            <img className="w-full h-36 aspect-2 border object-cover rounded-br-md cursor-pointer" src={content.fileUrls[2]} alt="" onClick={(event) => handleselectedImageList(event, 2)} />
          </div>
        );

      case 4:
        return (
          <div className="grid grid-cols-2 gap-1">
            {content.fileUrls.map((imgUrl, idx) => (
              <img
                className={`w-full h-36 aspect-2 border object-cover ${idx === 0 ? "rounded-tl-md" : idx === 1 ? "rounded-tr-md" : idx === 2 ? "rounded-bl-md" : "rounded-br-md"} cursor-pointer`}
                src={imgUrl}
                alt=""
                key={idx}
                onClick={(event) => handleselectedImageList(event, idx)}
              />
            ))}
          </div>
        );
      default:
        return null; // 필요한 경우 4개 이상의 이미지를 처리하는 로직 추가 가능
    }
  };

  const handleUserClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    navigate(`/profile/${content.user.userId}`);
  };

  return (
    <div className="" onClick={() => goToDetail(content.id)}>
      <div className="p-5 border-t border-x grid grid-cols-[1fr_9fr] transition-colors duration-300 hover:bg-gray-100 cursor-pointer">
        <div className="">
          <img onClick={handleUserClick} className="w-9 h-9 rounded-[50%] cursor-pointer hover:brightness-90 transition duration-200 ease-in-out" src={`${content.user.profileImage}`} alt="" />
        </div>

        <div className="grid gap-3">
          <div className="grid grid-cols-[9fr_2fr]">
            <div>
              <div className="flex items-center">
                <p className="font-bold">{content.user.nickName}</p>
                {<img className="w-5 h-5 ml-1" src={`/assets/${content.user.mbti === null ? "noBadget.png" : content.user.mbti === "N" ? "nBadget.png" : "sBadget.png"}`} alt="badget" />}
              </div>
              {/* <p className="text-sm font-semibold text-[#565656]">{content.createdAt}</p> */}
              <TimeDifference timestamp={new Date(content.createdAt)} />
            </div>
          </div>

          <p className="font-medium text-justify leading-snug">{content.content}</p>

          {renderImages()}

          <div className="flex items-center">
            <FaRegComment />
            {content.commentCnt === 0 ? <></> : <p className="px-1 text-[#565656] font-semibold">{content.commentCnt}</p>}
          </div>
        </div>
      </div>

      {selectedImageList && <OkDetailModal content={content} selectedImageList={selectedImageList} selectedImageListIndex={selectedImageListIndex} setSelectedImageList={setSelectedImageList} />}
    </div>
  );
};

export default OkContent;
