import React, { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import OkDetailModal from "./OkDetailModal";
import { useNavigate } from "react-router";

interface Props {
  content: {
    id: number;
    profileImgUrl: string;
    user: string;
    date: string;
    content: string;
    imgList: {
      id: number;
      imgUrl: string;
    }[];
    joinCount: number;
  };
}

const OkContent = ({ content }: Props) => {
  const navigate = useNavigate();
  const [selectedImageList, setSelectedImageList] = useState<{ id: number; imgUrl: string }[] | null>(null);
  const [selectedImageListIndex, setSelectedImageListIndex] = useState(0);

  const handleselectedImageList = (currentIndex: number) => {
    setSelectedImageList(content.imgList);
    setSelectedImageListIndex(currentIndex);
  };

  const goToDetail = (id: number) => {
    navigate(`/okdetail/${id}`);
  };

  const renderImages = () => {
    switch (content.imgList.length) {
      case 1:
        return <img className="w-full rounded-md object-cover cursor-pointer" src={`${content.imgList[0].imgUrl}`} alt="" onClick={() => handleselectedImageList(0)} />;

      case 2:
        return (
          <div className="grid grid-cols-2 gap-1">
            {content.imgList.map((img, idx) => (
              <img className={`w-full h-72 object-cover ${idx === 0 ? "rounded-tl-md rounded-bl-md" : "rounded-tr-md rounded-br-md"} cursor-pointer`} src={`${img.imgUrl}`} alt="" key={img.id} onClick={() => handleselectedImageList(idx)} />
            ))}
          </div>
        );

      case 3:
        return (
          <div className="grid grid-rows-2 grid-cols-2 gap-1">
            <img className="w-full h-full object-cover row-span-2 rounded-tl-md rounded-bl-md cursor-pointer" src={`${content.imgList[0].imgUrl}`} alt="" onClick={() => handleselectedImageList(0)} />
            <img className="w-full h-36 object-cover rounded-tr-md cursor-pointer" src={`${content.imgList[1].imgUrl}`} alt="" onClick={() => handleselectedImageList(1)} />
            <img className="w-full h-36 object-cover rounded-br-md cursor-pointer" src={`${content.imgList[2].imgUrl}`} alt="" onClick={() => handleselectedImageList(2)} />
          </div>
        );

      case 4:
        return (
          <div className="grid grid-cols-2 gap-1">
            {content.imgList.map((img, idx) => (
              <img
                className={`w-full h-36 object-cover ${idx === 0 ? "rounded-tl-md" : idx === 1 ? "rounded-tr-md" : idx === 2 ? "rounded-bl-md" : "rounded-br-md"} cursor-pointer`}
                src={`${img.imgUrl}`}
                alt=""
                key={img.id}
                onClick={() => handleselectedImageList(idx)}
              />
            ))}
          </div>
        );
    }
  };

  return (
    <div onClick={() => goToDetail(content.id)}>
      <div className="p-5 border-t border-x grid grid-cols-[1fr_9fr]">
        <div className="">
          <img className="w-9 h-9 rounded-[50%]" src={`${content.profileImgUrl}`} alt="" />
        </div>

        <div className="grid gap-3">
          <div>
            <p className="font-bold">{content.user}</p>
            <p className="text-sm font-semibold text-[#565656]">{content.date}</p>
          </div>

          <p className="font-medium text-justify leading-snug">{content.content}</p>

          {renderImages()}

          <div className="flex items-center">
            <FaRegComment />
            {content.joinCount === 0 ? <></> : <p className="px-1 text-[#565656] font-semibold">{content.joinCount}</p>}
          </div>
        </div>
      </div>

      {selectedImageList && <OkDetailModal content={content} selectedImageList={selectedImageList} selectedImageListIndex={selectedImageListIndex} setSelectedImageList={setSelectedImageList} />}
    </div>
  );
};

export default OkContent;
