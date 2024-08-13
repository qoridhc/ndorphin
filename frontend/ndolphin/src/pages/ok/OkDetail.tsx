import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import boardApi from "../../api/boardApi";
import commentApi from "../../api/commentApi";
import OkDetailModal from "../../components/ok/OkDetailModal";
import { FaArrowLeftLong, FaRegComment } from "react-icons/fa6";
import SettingsMenu from "../../components/if/CommentSettingMenu";
import { useNavigate } from "react-router";
import OkSettingMenu from "../../components/ok/OkSettingMenu";
import OkStartModal from "./OkStartModal";
import OkUpdateModal from "./OkUpdateModal";

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

interface Comment {
  commentId: number;
  user: {
    profileImage: string | null;
    nickName: string;
  };
  content: string;
  createAt: string;
}

const OkDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { boardId } = useParams();

  const profileImage = localStorage.getItem("profileImage");
  const userId = localStorage.getItem("userId");

  const [isUpdate, setIsUpdate] = useState(false);
  const [isCreateModal, setIsCreateModal] = useState(false);

  const [selectedImageList, setSelectedImageList] = useState<string[] | null>(null);
  const [selectedImageListIndex, setSelectedImageListIndex] = useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [commentContent, setCommentContent] = useState<string>("");

  const [okDetail, setOkDetail] = useState<BoardDetail | null>(null);

  useEffect(() => {
    getOkDetail();
  }, [boardId]);

  useEffect(() => {
    if (isUpdate) {
      setIsCreateModal(true);
    } else {
      setIsCreateModal(false);
    }
  }, [isUpdate]);

  const getOkDetail = async () => {
    try {
      if (boardId) {
        const response = await boardApi.read(boardId);
        if (response.status === 200) {
          setOkDetail(response.data.data);
        }
      }
    } catch (error) {
      console.error("boardApi read : ", error);
    }
  };

  const handleselectedImageList = (currentIndex: number) => {
    if (okDetail && okDetail.fileUrls) {
      setSelectedImageList(okDetail.fileUrls);
    }
    setSelectedImageListIndex(currentIndex);
  };

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const rows = event.target.value.split(/\r\n|\r|\n/).length;
    setRowCount(rows);
    const commentValue = event.target.value;
    setCommentContent(commentValue);
  };

  useEffect(() => {
    const targetTextarea = document.querySelector(`#target`) as HTMLTextAreaElement | null;
    if (targetTextarea) {
      targetTextarea.style.height = rowCount * 28 + "px";
    }
  }, [rowCount]);

  const renderImages = () => {
    if (!okDetail || !okDetail.fileUrls.length) return null;

    switch (okDetail && okDetail.fileUrls.length) {
      case 1:
        return <img className="w-full rounded-md object-cover cursor-pointer" src={okDetail.fileUrls[0]} alt="" onClick={() => handleselectedImageList(0)} />;

      case 2:
        return (
          <div className="grid grid-cols-2 gap-1">
            {okDetail.fileUrls.map((url, idx) => (
              <img className={`w-full h-72 object-cover ${idx === 0 ? "rounded-tl-md rounded-bl-md" : "rounded-tr-md rounded-br-md"} cursor-pointer`} src={url} alt="" key={idx} onClick={() => handleselectedImageList(idx)} />
            ))}
          </div>
        );

      case 3:
        return (
          <div className="grid grid-rows-2 grid-cols-2 gap-1">
            {okDetail.fileUrls.map((url, idx) => (
              <img
                className={`w-full h-${idx === 0 ? "full" : "36"} object-cover ${idx === 0 ? "row-span-2 rounded-tl-md rounded-bl-md" : idx === 1 ? "rounded-tr-md" : "rounded-br-md"} cursor-pointer`}
                src={url}
                alt=""
                key={idx}
                onClick={() => handleselectedImageList(idx)}
              />
            ))}
          </div>
        );

      case 4:
        return (
          <div className="grid grid-cols-2 gap-1">
            {okDetail.fileUrls.map((url, idx) => (
              <img
                className={`w-full h-36 object-cover ${idx === 0 ? "rounded-tl-md" : idx === 1 ? "rounded-tr-md" : idx === 2 ? "rounded-bl-md" : "rounded-br-md"} cursor-pointer`}
                src={url}
                alt=""
                key={idx}
                onClick={() => handleselectedImageList(idx)}
              />
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const handleCommentAdd = async () => {
    const formData = new FormData();

    formData.append(
      "request",
      new Blob(
        [
          JSON.stringify({
            content: commentContent,
          }),
        ],
        { type: "application/json" }
      )
    );

    try {
      if (boardId) {
        setCommentContent("");
        const response = await commentApi.create(boardId, formData);
        if (response.status === 200 && response.data) {
          getOkDetail();
        }
      }
    } catch (error) {
      console.error("괜찮아 댓글 작성 오류: ", error);
    }
  };

  return (
    <div className="px-44 py-5 grid grid-cols-[1fr_2fr_1fr] gap-5">
      {okDetail ? (
        <div className="col-start-2">
          <button className="py-4 flex" onClick={() => navigate("/oklist")}>
            <FaArrowLeftLong className="text-3xl" />
            <p className="px-3 text-xl font-bold">괜찮아 게시판</p>
          </button>
          <div className="border-t border-x">
            <div className="p-5 border-b flex">
              {okDetail.user.profileImage && <img className="w-9 h-9 mr-3 rounded-full" src={okDetail.user.profileImage} alt="" />}

              <div className="grid gap-3">
                <div className="grid grid-cols-[9fr_2fr]">
                  <div>
                    <p className="font-bold">{okDetail && okDetail.user.nickName}</p>
                    <p className="text-sm font-semibold text-[#565656]">{okDetail && okDetail.createdAt}</p>
                  </div>

                  {isUpdate === false && `${okDetail.user.userId}` === userId ? <OkSettingMenu boardId={okDetail.id} setIsUpdate={setIsUpdate} /> : <></>}
                </div>

                <p className="font-medium text-justify leading-snug">{okDetail && okDetail.content}</p>

                {renderImages()}

                <div className="flex items-center">
                  <FaRegComment />
                  {okDetail && okDetail.commentCnt === 0 ? <></> : <p className="px-1 text-[#565656] font-semibold">{okDetail && okDetail.commentCnt}</p>}
                </div>
              </div>
            </div>

            <div className="p-5 border-b">
              <div className="flex">
                <img className="w-11 h-11 mr-3 rounded-[50%]" src={profileImage || undefined} alt="" />
                <textarea className="w-full min-h-10 text-xl outline-none resize-none" placeholder="댓글을 작성해 주세요" id="target" onChange={(e) => handleTextareaChange(e)} value={commentContent} />
              </div>
              <div className="flex justify-end">
                <button onClick={handleCommentAdd} className="w-16 text-[#6C6C6C] font-semibold border-solid border-2 border-[#FFDE2F] rounded-md hover:text-white hover:bg-[#FFDE2F] duration-200">
                  등록
                </button>
              </div>
            </div>

            {okDetail.commentResponseDtos &&
              okDetail.commentResponseDtos.map((comment) => (
                <div className="p-5 border-b flex" key={comment.commentId}>
                  <img className="w-9 h-9 mr-3 rounded-[50%]" src={`${comment.user.profileImage}`} alt="" />

                  <div className="w-full grid gap-2">
                    <div className="grid grid-cols-[6fr_1fr]">
                      <div className="flex flex-col justify-around">
                        <p className="font-bold">{comment.user.nickName}</p>
                        <p className="text-xs text-[#565656]">3일 전</p>
                      </div>
                      {/* <SettingsMenu /> */}
                    </div>

                    <p className="text-[#565656] font-medium text-justify">{comment.content}</p>

                    <p className="text-sm text-[#565656] text-right">{comment.createAt}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <></>
      )}

      {isCreateModal && okDetail && <OkUpdateModal okDetail={okDetail} isUpdate={isUpdate} setIsCreateModal={setIsCreateModal} setIsUpdate={setIsUpdate} />}

      {okDetail && selectedImageList && <OkDetailModal content={okDetail} selectedImageList={selectedImageList} selectedImageListIndex={selectedImageListIndex} setSelectedImageList={setSelectedImageList} />}
    </div>
  );
};

export default OkDetail;
