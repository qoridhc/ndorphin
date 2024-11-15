import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router";
import commentApi from "../../api/commentApi";
import boardApi from "../../api/boardApi";
import { FaRegComment } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import SettingsMenu from "../if/CommentSettingMenu";
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
  selectedImageList: string[] | null;
  selectedImageListIndex: number;
  setSelectedImageList: (image: string[] | null) => void;
}

const OkDetailModal = ({ content, selectedImageList, selectedImageListIndex, setSelectedImageList }: Props) => {
  const navigate = useNavigate();
  const [commentContent, setCommentContent] = useState<string>("");
  const [currentSlideIndex, setCurrentSlideIndex] = useState(selectedImageListIndex);
  const boardId = String(content.id);
  const [rowCount, setRowCount] = useState(0);
  const [okDetail, setOkDetail] = useState<BoardDetail | null>(null);
  const profileImage = localStorage.getItem("profileImage");

  useEffect(() => {
    // 페이지 스크롤 비활성화
    document.body.style.overflow = "hidden";
    getOkDetail();

    // 모달이 닫힐 때 페이지 스크롤 복원
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const getOkDetail = async () => {
    try {
      if (boardId) {
        const response = await boardApi.read(boardId);
        const newList = response.data.data;
        setOkDetail(newList);
        console.log("괜찮아 게시판 상세 페이지", newList);
      }
    } catch (error) {
      console.error("괜찮아 상세 조회 오류 발생", error);
    }
  };

  const handleClose = () => {
    setSelectedImageList(null);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev === 0 && selectedImageList ? selectedImageList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (selectedImageList ? (prev + 1) % selectedImageList.length : prev));
  };

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    // const text = event.target.value.length;
    // setTextCount(text);
    const rows = event.target.value.split(/\r\n|\r|\n/).length;
    setRowCount(rows);
    const commentValue = event.target.value;
    setCommentContent(commentValue);
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

  const handleUserClick = (userId: number) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <>
      {selectedImageList && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
          <div className="w-full h-full relative grid grid-cols-[3fr_1fr]">
            <button className="p-1 absolute top-2 left-2 z-50 text-white bg-black rounded-full" onClick={handleClose}>
              <IoMdClose className="text-2xl" />
            </button>

            <div className="px-5 relative flex justify-between items-center">
              <button className="p-1" onClick={handlePrev} disabled={currentSlideIndex === 0}>
                <SlArrowLeft className={currentSlideIndex === 0 ? `text-3xl text-white opacity-0` : `text-3xl text-white`} />
              </button>

              <div className="p-5 ">
                <img className="min-w-96 max-h-[30rem]" src={selectedImageList[currentSlideIndex]} alt="" />
              </div>

              <button className="p-1" onClick={handleNext} disabled={currentSlideIndex === selectedImageList.length - 1}>
                <SlArrowRight className={currentSlideIndex === selectedImageList.length - 1 ? `text-3xl text-white opacity-0` : `text-3xl text-white`} />
              </button>
            </div>

            <div className="bg-white overflow-y-auto hide-scrollbar">
              <div className="p-3 border-b grid gap-2">
                <div className="grid grid-cols-[1fr_5fr]">
                  <img
                    onClick={() => {
                      okDetail?.user.userId && handleUserClick(okDetail.user.userId);
                    }}
                    className="w-11 h-11 rounded-[50%] cursor-pointer hover:brightness-90 transition duration-200 ease-in-out"
                    src={`${okDetail?.user.profileImage}`}
                    alt=""
                  />{" "}
                  <div className="flex flex-col justify-around">
                    <p className="font-bold">{okDetail?.user.nickName}</p>
                    {okDetail && <TimeDifference timestamp={new Date(okDetail.createdAt)} />}
                  </div>
                </div>

                <p className="font-semibold text-[#565656] text-justify leading-snug">{okDetail?.content}</p>
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <FaRegComment />
                    {okDetail?.commentCnt === 0 ? <></> : <p className="px-1 text-sdm text-[#565656]">{okDetail?.commentCnt}</p>}
                  </div>
                </div>
              </div>

              <div className="p-3 border-b">
                <div className="grid grid-cols-[1fr_6fr]">
                  <img className="w-9 h-9 border rounded-[50%]" src={`${profileImage === "null" ? "/assets/user/defaultProfile.png" : profileImage}`} alt="" />
                  <textarea onChange={(e) => handleTextareaChange(e)} className="w-full p-1 text-lg text-left outline-none resize-none" placeholder="댓글을 작성해 주세요" value={commentContent} />
                </div>
                <div className="flex justify-end">
                  <button onClick={handleCommentAdd} className="w-16 text-[#6C6C6C] font-semibold border-solid border-2 border-[#FFDE2F] rounded-md hover:text-white hover:bg-[#FFDE2F] duration-200">
                    등록
                  </button>
                </div>
              </div>

              {okDetail?.commentResponseDtos.map((comment) => (
                <div className="p-3 border-b grid grid-cols-[1fr_6fr]" key={comment.commentId}>
                  <img
                    onClick={() => {
                      handleUserClick(comment.user.userId);
                    }}
                    className="w-9 h-9 border rounded-[50%] cursor-pointer hover:brightness-90 transition duration-200 ease-in-out"
                    src={`${comment.user.profileImage ? comment.user.profileImage : "/assets/user/defaultProfile.png"}`}
                    alt=""
                  />

                  <div className="w-full grid gap-2">
                    <div className="grid grid-cols-[6fr_1fr]">
                      <div className="flex flex-col justify-around">
                        <p className="text-sm font-semibold">{comment.user.nickName}</p>
                        <TimeDifference timestamp={new Date(comment.createdAt)} />
                      </div>
                      {/* <SettingsMenu /> */}
                    </div>

                    <p className="text-[#565656] font-medium text-justify">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OkDetailModal;
