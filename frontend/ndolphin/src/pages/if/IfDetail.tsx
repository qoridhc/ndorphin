import React, { ChangeEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router";
import CommentSettingsMenu from "../../components/if/CommentSettingMenu";
import OpinionCard from "../../components/if/OpinionCard";
import boardApi from "../../api/boardApi";
import commentApi from "../../api/commentApi";
import BoardSettingMenu from "../../components/common/BoardSettingMenu";
import InsertionImage from "../../components/common/InsertionImage";
import BookCoverAiPromptModal from "../../components/relay/AiImagePromptModal";

interface IfBoard {
  commentCount: number;
  commentResponseDtos: {
    commentId: number;
    content: string;
    createdAt: string | null;
    likeCnt: number;
    likedByUser: boolean;
    nickName: string;
    user: { userId: number; nickName: string; profileImage: string; mbti: string | null };
  }[];
  content: string;
  fileNames: string[];
  fileUrls: string[];
  createdAt: string;
  updatedAt: string | null;
  hasParticipated: boolean;
  hit: number;
  id: number;
  subject: string;
  user: {
    mbti: string | null;
    nickName: string;
    profileImage: string | null;
    userId: number;
  };
  sideBoardDtos: If[];
}

interface If {
  id: number;
  user: {
    userId: number;
    profileImage: string | null;
    mbti: string | null;
    nickName: string;
  };
  content: string;
  subject: string;
  fileNames: string[];
  fileUrls: string[];
  hit: number;
  createdAt: string;
  updatedAt: string | null;
  avatarUrl: string | null;
  bestComment: string | null;
  commentCount: number;
}

const IfDetail = () => {
  const [dalleUrl, setDalleUrl] = useState<string | null>(null);

  const navigate = useNavigate();
  const params = useParams();
  const [userId, setUserId] = useState("");

  const [ifBoardData, setIfBoardData] = useState<IfBoard | null>(null);
  const [recommendationList, setRecommendationList] = useState<If[] | null>(null);

  const [isCommentUpdate, setIsCommentUpdate] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);

  const [textCount, setTextCount] = useState(0);
  const [updateCommentCount, setUpdateCommentCount] = useState(0);
  const [boardSubjectTextCount, setBoardSubjectTextCount] = useState(0);
  const [boardContentTextCount, setBoardContentTextCount] = useState(0);

  const [updateComment, setUpdateComment] = useState("");
  const [updateBoardSubject, setUpdateBoardSubject] = useState("");
  const [updateBoardContent, setUpdateBoardContent] = useState("");

  const [image, setImage] = useState<string | null>(null);
  const [aiImage, setAiImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const updateCommentTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const updateBoardSubjectRef = useRef<HTMLInputElement>(null);
  const updateBoardContentRef = useRef<HTMLTextAreaElement>(null);

  const isFormValid = updateBoardSubject && updateBoardContent && (image || aiImage);

  useEffect(() => {
    setUserId(`${localStorage.getItem("userId")}`);
  }, []);

  useEffect(() => {
    if (updateBoardSubjectRef.current && updateBoardContentRef.current) {
      updateBoardSubjectRef.current.focus();
      setBoardSubjectTextCount(updateBoardSubjectRef.current.value.length);
      setBoardContentTextCount(updateBoardContentRef.current.value.length);
    }
  }, [isUpdate]);

  useEffect(() => {
    if (updateCommentTextareaRef.current) {
      const textarea = updateCommentTextareaRef.current;
      textarea.focus();
      // 커서를 텍스트의 끝으로 이동
      textarea.selectionStart = textarea.value.length;
      textarea.selectionEnd = textarea.value.length;

      setUpdateCommentCount(textarea.value.length);
    }
  }, [isCommentUpdate]);

  useEffect(() => {
    if (params.boardId !== undefined) {
      readBoardData(params.boardId);
    }
    setIsUpdate(false);
  }, [params.boardId]);

  // 데이터 조회
  const readBoardData = async (boardId: string) => {
    try {
      const response = await boardApi.read(boardId);
      if (response.status === 200) {
        setIfBoardData(response.data.data);
        setRecommendationList(response.data.data.sideBoardDtos);
        setUpdateBoardSubject(response.data.data.subject);
        setUpdateBoardContent(response.data.data.content);
        setImage(response.data.data.fileUrls[0]);

        setBoardSubjectTextCount(updateBoardSubject.length);
        setBoardContentTextCount(updateBoardContent.length);
      }
    } catch (error) {
      console.error("ifApi read : ", error);
    }
  };

  // 의견 생성
  const handleCreateCommentTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const textLength = event.target.value.length;
    setTextCount(textLength);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  };

  // 의견 생성 textarea 관리
  const handleCreateComment = async () => {
    if (params.boardId !== undefined && textareaRef.current) {
      const formData = new FormData();

      formData.append(
        "request",
        new Blob(
          [
            JSON.stringify({
              content: textareaRef.current.value,
            }),
          ],
          { type: "application/json" }
        )
      );

      try {
        const response = await commentApi.create(params.boardId, formData);
        if (response.status === 200) {
          readBoardData(params.boardId);
          textareaRef.current.value = "";
        }
      } catch (error) {
        console.log("commentApi create : ", error);
      }
    }
  };

  // 게시글 본문, 의견 textarea 관리
  const handleTextareaChange = (
    setText: React.Dispatch<React.SetStateAction<string>>,
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    setTextCount: React.Dispatch<React.SetStateAction<number>>,
    ref: React.RefObject<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setText(event.target.value);

    const textLength = event.target.value.length;
    setTextCount(textLength);

    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  };

  // 의견 수정
  const handleUpdateComment = async (commentId: number) => {
    const formData = new FormData();

    if (params.boardId !== undefined && updateCommentTextareaRef.current) {
      formData.append("content", updateCommentTextareaRef.current.value);

      try {
        const response = await commentApi.update(params.boardId, commentId, formData);
        if (response.status === 200) {
          readBoardData(params.boardId);
          setIsCommentUpdate(0);
        }
      } catch (error) {
        console.log("commentApi update : ", error);
      }
    }
  };

  // 게시글 제목 input 관리
  const handleUpdateBoardSubjectTextareaChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUpdateBoardSubject(event.target.value);

    const textLength = event.target.value.length;
    setBoardSubjectTextCount(textLength);

    if (updateBoardSubjectRef.current) {
      updateBoardSubjectRef.current.style.height = "auto";
      updateBoardSubjectRef.current.style.height = updateBoardSubjectRef.current.scrollHeight + "px";
    }
  };

  // 게시글 수정
  const handleUpdateIfBoard = async () => {
    const formData = new FormData();

    formData.append(
      "request",
      JSON.stringify({
        subject: updateBoardSubject,
        content: updateBoardContent,
        boardType: "OPINION_BOARD",
      })
    );

    if (file && ifBoardData?.fileNames) {
      formData.append("deleteFiles", JSON.stringify(ifBoardData.fileNames));
    }

    if (file) {
      formData.append("files", file);
    }

    try {
      if (params.boardId !== undefined) {
        const response = await boardApi.update(formData, params.boardId);
        if (response.status === 200) {
          readBoardData(params.boardId);
          setIsUpdate(false);
        }
      }
    } catch (error) {
      console.log("boardApi update : ", error);
    }
  };

  // AI 이미지
  const handleAiImage = () => {
    setIsModalOpen(true);
  };

  const confirmAiImage = (image: string) => {
    setIsModalOpen(false);
    setImage(image);
  };

  const cancelAiImage = () => {
    setIsModalOpen(false);
  };

  // 좋아요
  const handleCreateLiked = async (commentId: number) => {
    try {
      if (params.boardId !== undefined) {
        const response = await commentApi.createLike(params.boardId, commentId);
        if (response.status === 200) {
          readBoardData(params.boardId);
        }
      }
    } catch (error) {
      console.log("commentApi createLike : ", error);
    }
  };

  const handleDeleteLiked = async (commentId: number) => {
    try {
      if (params.boardId !== undefined) {
        const response = await commentApi.deleteLike(params.boardId, commentId);
        if (response.status === 200) {
          readBoardData(params.boardId);
        }
      }
    } catch (error) {
      console.log("commentApi deleteLike : ", error);
    }
  };

  const handleUserClick = (userId: number) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <>
      {ifBoardData && recommendationList ? (
        <div className="px-44 py-5">
          <button className="py-4 flex" onClick={() => navigate("/iflist")}>
            <FaArrowLeftLong className="text-3xl" />
            <p className="px-3 text-xl font-bold">만약에 목록</p>
          </button>

          <div className="grid grid-cols-[4fr_2fr] gap-20">
            <div>
              <div className="grid gap-3">
                <div className="flex justify-between">
                  <div className="flex">
                    <img
                      onClick={() => {
                        handleUserClick(ifBoardData.user.userId);
                      }}
                      className="w-9 h-9 mr-3 border rounded-[50%] cursor-pointer hover:brightness-90 transition duration-200 ease-in-out"
                      src={`${ifBoardData.user.profileImage === null ? "/assets/user/defaultProfile.png" : ifBoardData.user.profileImage}`}
                      alt=""
                    />
                    <div>
                      <div className="w-40 flex justify-between items-center">
                        <div className="flex items-center">
                          <p className="font-bold">{ifBoardData.user.nickName}</p>
                          {<img className="w-5 h-5 ml-1" src={`/assets/${ifBoardData.user.mbti === "N" ? "nBadget.png" : "sBadget.png"}`} alt="badget" />}
                        </div>
                      </div>
                      <p className="text-xs text-left">{ifBoardData.createdAt}</p>
                    </div>
                  </div>

                  {isUpdate === false && `${ifBoardData.user.userId}` === userId ? <BoardSettingMenu totalCount={ifBoardData.commentCount} boardType="if" boardId={ifBoardData.id} setIsUpdate={setIsUpdate} /> : <></>}

                  {isUpdate && `${ifBoardData.user.userId}` === userId ? (
                    <div>
                      <div className="tooltip-top">
                        <button
                          className={`px-5 py-1 mr-1 rounded-md text-sm text-[#565656] font-bold border-2 border-amber-300 duration-300 ${
                            isFormValid ? "text-[#6C6C6C] border-[#FFDE2F] hover:text-white hover:bg-[#FFDE2F]" : "text-[#c2c2c2] cursor-not-allowed border-zinc-100"
                          }`}
                          disabled={!isFormValid} // 모든 값이 있을 때만 버튼 활성화
                          onClick={() => handleUpdateIfBoard()}
                        >
                          수정
                        </button>
                        {!isFormValid && (
                          <span className="tooltiptext">
                            모든 칸을 필수로<br></br> 입력해주세요.
                          </span>
                        )}
                      </div>
                      <button className="px-5 py-1 rounded-md text-sm text-[#565656] font-bold border-2 border-gray-300 duration-300" onClick={() => setIsUpdate(false)}>
                        취소
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>

                {isUpdate && `${ifBoardData.user.userId}` === userId ? (
                  <>
                    <input
                      className="p-1 text-left border border-[#9E9E9E] rounded-sm outline-none"
                      type="text"
                      placeholder="제목을 입력하세요"
                      value={updateBoardSubject}
                      ref={updateBoardSubjectRef}
                      onChange={(e) => handleUpdateBoardSubjectTextareaChange(e)}
                    />
                    <hr className="h-[1px] bg-[#9E9E9E]" />
                    <textarea
                      className="p-1 border border-[#9E9E9E] rounded-sm outline-none resize-none"
                      placeholder="내용을 입력하세요"
                      value={updateBoardContent}
                      ref={updateBoardContentRef}
                      onChange={(e) => handleTextareaChange(setUpdateBoardContent, e, setBoardContentTextCount, updateBoardContentRef)}
                    />
                  </>
                ) : (
                  <>
                    <p className="text-xl font-bold">{ifBoardData.subject}</p>
                    <hr className="h-[1px] bg-[#9E9E9E]" />
                    <p className="text-[#565656] font-semibold">{ifBoardData.content}</p>
                  </>
                )}
              </div>

              {isUpdate && `${ifBoardData.user.userId}` === userId ? (
                <div className="py-5">
                  <div className="flex justify-center">{image ? <img className="max-w-full max-h-[400px] object-cover" src={image} alt="" /> : <></>}</div>
                  <InsertionImage handleAiImage={handleAiImage} setImage={setImage} setFile={setFile} />
                </div>
              ) : (
                <div className="py-5 flex justify-center">
                  <img className="max-w-full max-h-[400px] object-cover" src={`${ifBoardData.fileUrls[0]}`} alt="" />
                </div>
              )}

              <div className="pt-3 grid gap-2">
                <div className="flex justify-end items-center">
                  <img src="/assets/if/hotCommentIcon.png" alt="" />
                  <p className="text-sm text-[#4B91F9] font-semibold text-right">의견 {ifBoardData.commentCount}개</p>
                </div>

                <div>
                  <div className="p-5 border-y">
                    {ifBoardData.user.userId === parseInt(userId) || ifBoardData.hasParticipated ? (
                      <div role="alert" className="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info h-6 w-6 shrink-0">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <p className="text-sm font-medium">{ifBoardData.user.userId === parseInt(userId) ? "작성자는 의견을 달 수 없습니다." : "이미 의견이 제출되었습니다."}</p>
                      </div>
                    ) : (
                      <>
                        <div className="flex">
                          <img className="w-11 h-11 mr-3 border rounded-[50%]" src={`${localStorage.getItem("profileImage")}`} alt="" />
                          <textarea className="w-full min-h-10 text-xl outline-none resize-none" placeholder="의견을 작성해 주세요" id="target" ref={textareaRef} onChange={(e) => handleCreateCommentTextareaChange(e)} />
                        </div>
                        <div className="flex justify-end">
                          <button className={`px-7 py-1 shadow-md rounded-3xl font-bold bg-amber-300 text-white ${textCount === 0 ? "opacity-50" : ""}`} disabled={textCount === 0} onClick={() => handleCreateComment()}>
                            등록
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                  {ifBoardData.commentResponseDtos.map((comment) => (
                    <div className="p-5 border-b flex" key={comment.commentId}>
                      <img
                        onClick={() => {
                          handleUserClick(comment.user.userId);
                        }}
                        className="w-9 h-9 mr-3 border rounded-[50%] cursor-pointer hover:brightness-90 transition duration-200 ease-in-out"
                        src={`${comment.user.profileImage}`}
                        alt=""
                      />

                      <div className="w-full grid gap-2">
                        <div className="grid grid-cols-[6fr_1fr]">
                          <div className="flex flex-col justify-around">
                            <div className="flex items-center">
                              <p className="font-bold">{comment.user.nickName}</p>
                              {<img className="w-5 h-5 ml-1" src={`/assets/${comment.user.mbti === "N" ? "nBadget.png" : "sBadget.png"}`} alt="badget" />}
                            </div>
                            <p className="text-xs text-[#565656]">{comment.createdAt}</p>
                          </div>
                          {userId && parseInt(userId) === comment.user.userId ? (
                            <CommentSettingsMenu boardId={params.boardId} commentId={comment.commentId} commentContent={comment.content} setUpdateComment={setUpdateComment} setIsCommentUpdate={setIsCommentUpdate} readBoardData={readBoardData} />
                          ) : (
                            <></>
                          )}
                        </div>

                        {isCommentUpdate !== comment.commentId ? (
                          <>
                            <p className="text-[#565656] font-medium text-justify">{comment.content}</p>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                {comment.likedByUser ? (
                                  <button onClick={() => handleDeleteLiked(comment.commentId)}>
                                    <img className="w-4 py-1" src="/assets/like/likeCheckedIcon.png" alt="" />
                                  </button>
                                ) : (
                                  <button onClick={() => handleCreateLiked(comment.commentId)}>
                                    <img className="w-4 py-1" src="/assets/like/likeIcon.png" alt="" />{" "}
                                  </button>
                                )}

                                <p className={`px-1 text-sm text-[#565656] font-semibold ${comment.likeCnt === 0 ? "hidden" : ""}`}>{comment.likeCnt}</p>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="">
                            <textarea
                              className="w-full min-h-10 p-1 border border-[#9E9E9E] rounded-sm outline-none resize-none"
                              placeholder="의견을 작성해 주세요"
                              value={updateComment}
                              id="target"
                              ref={updateCommentTextareaRef}
                              onChange={(e) => handleTextareaChange(setUpdateComment, e, setUpdateCommentCount, updateCommentTextareaRef)}
                            />
                            <div className="flex justify-end">
                              <button
                                className={`px-5 py-1 mr-1 rounded-md text-sm text-[#565656] font-bold border-2 border-amber-300 duration-300 ${updateCommentCount === 0 ? "opacity-50" : "hover:bg-amber-300"}`}
                                disabled={updateCommentCount === 0}
                                onClick={() => handleUpdateComment(comment.commentId)}
                              >
                                수정
                              </button>
                              <button className="px-5 py-1 rounded-md text-sm text-[#565656] font-bold border-2 border-gray-300 duration-300 hover:bg-gray-300" onClick={() => setIsCommentUpdate(0)}>
                                취소
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              {recommendationList.map((opinion) => (
                <div className="pb-5">
                  <OpinionCard key={opinion.id} ifBoard={opinion} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <BookCoverAiPromptModal setFile={setFile} isOpen={isModalOpen} onClose={cancelAiImage} onConfirm={confirmAiImage} image={aiImage} setImage={setAiImage} coverImage={"/assets/relay/bookCoverDefault.png"} />
    </>
  );
};

export default IfDetail;
