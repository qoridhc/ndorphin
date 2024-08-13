import React, { useState, useEffect, useRef } from "react";
import { FaRegComment } from "react-icons/fa";
import OkDetailModal from "./OkDetailModal";
import { useNavigate } from "react-router";

interface Props {
  content: {
    id: number;
    user: {
      nickName: string;
      mbti: string;
      profileImage: string | null;
    };
    createdAt: string;
    content: string;
    fileUrls: string[];
    commentCnt: number;
  };
}

const OkContent = ({ content }: Props) => {
  const navigate = useNavigate();
  const [selectedImageList, setSelectedImageList] = useState<string[] | null>(null);
  const [selectedImageListIndex, setSelectedImageListIndex] = useState(0);

  const handleselectedImageList = (event: React.MouseEvent, currentIndex: number) => {
    event.stopPropagation();
    setSelectedImageList(content.fileUrls);
    setSelectedImageListIndex(currentIndex);
  };

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
        return <img className="w-full rounded-md object-cover cursor-pointer" src={content.fileUrls[0]} alt="" onClick={(event) => handleselectedImageList(event, 0)} />;

      case 2:
        return (
          <div className="grid grid-cols-2 gap-1">
            {content.fileUrls.map((imgUrl, idx) => (
              <img className={`w-full h-72 object-cover ${idx === 0 ? "rounded-tl-md rounded-bl-md" : "rounded-tr-md rounded-br-md"} cursor-pointer`} src={imgUrl} alt="" key={idx} onClick={(event) => handleselectedImageList(event, idx)} />
            ))}
          </div>
        );

      case 3:
        return (
          <div className="grid grid-rows-2 grid-cols-2 gap-1">
            <img className="w-full h-full object-cover row-span-2 rounded-tl-md rounded-bl-md cursor-pointer" src={content.fileUrls[0]} alt="" onClick={(event) => handleselectedImageList(event, 0)} />
            <img className="w-full h-36 object-cover rounded-tr-md cursor-pointer" src={content.fileUrls[1]} alt="" onClick={(event) => handleselectedImageList(event, 1)} />
            <img className="w-full h-36 object-cover rounded-br-md cursor-pointer" src={content.fileUrls[2]} alt="" onClick={(event) => handleselectedImageList(event, 2)} />
          </div>
        );

      case 4:
        return (
          <div className="grid grid-cols-2 gap-1">
            {content.fileUrls.map((imgUrl, idx) => (
              <img
                className={`w-full h-36 object-cover ${idx === 0 ? "rounded-tl-md" : idx === 1 ? "rounded-tr-md" : idx === 2 ? "rounded-bl-md" : "rounded-br-md"} cursor-pointer`}
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

  return (
    <div onClick={() => goToDetail(content.id)}>
      <div className="p-5 border-t border-x grid grid-cols-[1fr_9fr]">
        <div className="">
          <img className="w-9 h-9 rounded-[50%]" src={`${content.user.profileImage}`} alt="" />
        </div>

        <div className="grid gap-3">
          <div>
            <div className="flex items-center">
              <p className="font-bold">{content.user.nickName}</p>
              {<img className="w-5 h-5 ml-1" src={`/assets/${content.user.mbti === "N" ? "nBadget.png" : "sBadget.png"}`} alt="badget" />}
            </div>
            <p className="text-sm font-semibold text-[#565656]">{content.createdAt}</p>
          </div>

          <p className="font-medium text-justify leading-snug">{content.content}</p>

          {renderImages()}

          <div className="flex items-center">
            <FaRegComment />
            {content.commentCnt === 0 ? <></> : <p className="px-1 text-[#565656] font-semibold">{content.commentCnt}</p>}
          </div>
        </div>
      </div>

      {/* {selectedImageList && <OkDetailModal content={content} selectedImageList={selectedImageList} selectedImageListIndex={selectedImageListIndex} setSelectedImageList={setSelectedImageList} />} */}
    </div>
  );
};

export default OkContent;
