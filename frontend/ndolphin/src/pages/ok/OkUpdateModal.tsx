import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import boardApi from "../../api/boardApi";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import userApi from "../../api/userApi";
import { useParams } from "react-router";

interface Props {
  okDetail: BoardDetail;
  isUpdate: boolean;
  setIsCreateModal: (state: boolean) => void;
  setIsUpdate: (state: boolean) => void;
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

interface Comment {
  commentId: number;
  user: {
    profileImage: string | null;
    nickName: string;
  };
  content: string;
  createAt: string;
}

const OkUpdateModal = ({ okDetail, isUpdate, setIsCreateModal, setIsUpdate }: Props) => {
  const params = useParams();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imageList, setImageList] = useState<string[]>([]);
  const [fileList, setFileList] = useState<File[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [textCount, setTextCount] = useState(0);
  const [slideState, setSlideState] = useState(0); // 0 : 앞, 1 : 뒤
  const [currentSlideList, setCurrentSlideList] = useState<string[]>([]);
  const [content, setContent] = useState("");

  const [boardContentTextCount, setBoardContentTextCount] = useState(0);

  const [updateBoardContent, setUpdateBoardContent] = useState("");

  // const [file, setFile] = useState<File | null>(null);

  const updateBoardContentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setProfileImage(localStorage.getItem("profileImage"));

    setUpdateBoardContent(okDetail.content);
    if (okDetail.fileUrls) {
      setImageList(okDetail.fileUrls);

      // 업데이트된 이미지 리스트를 바탕으로 currentSlideList 설정
      if (okDetail.fileUrls.length > 2) {
        setSlideState(0);
        setCurrentSlideList(okDetail.fileUrls.slice(0, 2));
      } else {
        setCurrentSlideList(okDetail.fileUrls);
      }
    }
  }, []);

  useEffect(() => {
    if (updateBoardContentRef.current) {
      updateBoardContentRef.current.focus();
      setBoardContentTextCount(updateBoardContentRef.current.value.length);
    }
  }, [isUpdate]);

  useEffect(() => {
    const targetTextarea = document.querySelector(`#target`) as HTMLTextAreaElement | null;
    if (targetTextarea) {
      targetTextarea.style.height = rowCount * 28 + "px";
    }
  }, [rowCount]);

  // 게시글 본문 textarea 관리
  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (setUpdateBoardContent && setBoardContentTextCount) {
      setUpdateBoardContent(event.target.value);

      const textLength = event.target.value.length;
      setBoardContentTextCount(textLength);

      if (updateBoardContentRef.current) {
        updateBoardContentRef.current.style.height = "auto";
        updateBoardContentRef.current.style.height = updateBoardContentRef.current.scrollHeight + "px";
      }
    }

    const text = event.target.value.length;
    setTextCount(text);
    const rows = event.target.value.split(/\r\n|\r|\n/).length;
    setRowCount(rows);
    const content = event.target.value;
    setContent(content);
  };

  const handleClose = () => {
    setIsCreateModal(false);
    if (setIsUpdate) {
      setIsUpdate(false);
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImageList: string[] = [];
      const newFileList: File[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          newImageList.push(result);
          newFileList.push(file);
          if (newImageList.length === files.length) {
            setImageList((prev) => {
              const updatedList = [...prev, ...newImageList].slice(0, 4);
              if (updatedList.length > 2) {
                setSlideState(1);
                setCurrentSlideList(updatedList.slice(2, 4));
              } else {
                setSlideState(0);
                setCurrentSlideList(updatedList.slice(0, 2));
              }
              return updatedList;
            });

            setFileList((prev) => [...prev, ...newFileList].slice(0, 4));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handlePrev = () => {
    setSlideState(0);
    setCurrentSlideList(imageList.slice(0, 2));
  };

  const handleNext = () => {
    setSlideState(1);
    setCurrentSlideList(imageList.slice(2, 4));
  };

  const deleteImage = (currentIndex: number) => {
    const actualIndex = slideState === 0 ? currentIndex : currentIndex + 2;
    setImageList((prev) => {
      const newImageList = prev.filter((_, i) => i !== actualIndex);
      if (newImageList.length > 2) {
        setCurrentSlideList(newImageList.slice(slideState === 0 ? 0 : 2, slideState === 0 ? 2 : 4));
      } else {
        setSlideState(0);
        setCurrentSlideList(newImageList);
      }
      return newImageList;
    });

    setFileList((prev) => prev.filter((_, i) => i !== actualIndex));
  };

  // 게시글 수정
  const handleUpdateOkBoard = async () => {
    const formData = new FormData();

    formData.append(
      "request",
      JSON.stringify({
        content: content,
        boardType: "OK_BOARD",
      })
    );

    const urlToFileNameMap: { [url: string]: string } = {};
    okDetail.fileUrls.forEach((url, index) => {
      urlToFileNameMap[url] = okDetail.fileNames[index];
    });

    const deletedFiles = okDetail.fileUrls.filter((fileUrl) => !imageList.includes(fileUrl)).map((deletedUrl) => urlToFileNameMap[deletedUrl]);

    formData.append("deleteFiles", JSON.stringify(deletedFiles));

    if (fileList) {
      fileList.map((file) => formData.append("files", file));
    }

    try {
      if (params.boardId !== undefined) {
        const response = await boardApi.update(formData, params.boardId);
        if (response.status === 200 && response.data) {
          console.log("괜찮아 작성 성공");
          setIsUpdate(false);
          window.location.reload();
        }
      }
    } catch (error) {
      console.error("괜찮아 작성 실패: ", error);
    }
  };

  // 괜찮아 등록 시 팔로워들에게 알림 전송
  const postAlarm = async () => {
    const userId = localStorage.getItem("userId");
    const userNickName = localStorage.getItem("nickName");
    const response = await userApi.getFollower(userId as string);
    const content = `${userNickName} 님이 새로운 괜찮아를 등록했습니다`;
    response.data.data.forEach((item: any) => {
      userApi.postNotifications(item.followerId, content, Number(userId));
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-[40%] max-h-[90%] p-5 bg-white rounded-2xl grid gap-3">
        <button onClick={handleClose}>
          <IoMdClose className="text-2xl" />
        </button>

        <div className="grid grid-cols-[1fr_8fr]">
          <img className="w-11 h-11 rounded-[50%]" src={`${profileImage}`} alt="" />
          <div className="max-h-[450px] grid gap-3 overflow-y-auto">
            <textarea
              className="w-full min-h-28 text-xl font-medium outline-none resize-none"
              placeholder="당신의 고민은?"
              value={updateBoardContent}
              name=""
              id="target"
              ref={updateBoardContentRef}
              onChange={(e) => handleTextareaChange(e)}></textarea>

            <div className="grid grid-cols-2 gap-2 relative">
              {imageList.length <= 2 || slideState === 0 ? (
                <></>
              ) : (
                <button className="absolute top-1/2 left-1 translate-y-[-50%] z-50" onClick={handlePrev}>
                  <SlArrowLeft className="text-4xl p-2 text-white bg-black rounded-[50%] opacity-85" />
                </button>
              )}

              {currentSlideList.map((image, index) => (
                <div className="relative">
                  <img key={index} className="w-full h-72 rounded-md object-cover" src={image} alt="" />
                  <button className="absolute top-1 right-1 z-50" onClick={() => deleteImage(index)}>
                    <RiDeleteBinLine className="p-1 text-3xl bg-white rounded-[50%] opacity-85" />
                  </button>
                </div>
              ))}

              {imageList.length <= 2 || slideState === 1 ? (
                <></>
              ) : (
                <button className="absolute top-1/2 right-1 translate-y-[-50%] z-50" onClick={handleNext}>
                  <SlArrowRight className="p-2 text-4xl text-white bg-black rounded-[50%] opacity-70" />
                </button>
              )}
            </div>
          </div>
        </div>

        <hr />

        <div className="px-3 flex justify-between">
          <div className="flex flex-col items-center justify-center">
            <label htmlFor="image-input">
              <div className={`w-32 px-5 py-1 flex justify-around items-center rounded-3xl border border-solid border-zinc-300 font-bold text-zinc-800 cursor-pointer ${imageList.length === 4 ? "opacity-50 cursor-default" : ""}`}>
                <img src="/assets/addImageIcon.png" className="w-5" alt="#"></img>
                <p className="text-xs">사진 첨부</p>
              </div>
            </label>
            <input className="hidden" id="image-input" type="file" accept="image/*" onChange={(e) => handleImageChange(e)} disabled={imageList.length === 4} multiple />
          </div>

          <button
            onClick={() => {
              postAlarm();
              handleUpdateOkBoard();
            }}
            className={`px-7 py-1 shadow-md rounded-3xl font-bold bg-amber-300 text-white ${textCount === 0 ? "opacity-50" : ""}`}
            disabled={textCount === 0}>
            완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default OkUpdateModal;
