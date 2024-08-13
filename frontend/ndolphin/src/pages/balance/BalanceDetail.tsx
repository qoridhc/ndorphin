import React, { useEffect, useState, useRef, ChangeEvent } from "react";
import { FaArrowLeftLong, FaPlus, FaRegCircleCheck } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router";
import BalanceCard from "../../components/balance/BalanceCard";
import boardApi from "../../api/boardApi";
import voteApi from "../../api/voteApi";
import BoardSettingMenu from "../../components/common/BoardSettingMenu";
import InsertionImage from "../../components/common/InsertionImage";
import BookCoverAiPromptModal from "../../components/relay/AiImagePromptModal";
import { RiDeleteBin6Line } from "react-icons/ri";

interface BalanceBoard {
  voteInfos: Vote[];
  totalVoteCnt: number;
  content: string;
  fileNames: string[];
  fileUrls: string[];
  createdAt: string;
  updatedAt: string | null;
  userVoteContentId: number | null;
  userVoteId: number | null;
  hit: number;
  id: number;
  subject: string;
  user: {
    mbti: string | null;
    nickName: string;
    profileImage: string | null;
    userId: number;
  };
  sideBoardDtos: Balance[];
}

interface Balance {
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
  voteContents: string[];
  totalVoteCnt: number;
}

interface Vote {
  voteContent: string;
  voteContentId: number;
  voteCount: number;
}

const BalanceDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [userId, setUserId] = useState("");
  const voteColors = ["[#E4AE3A]", "[#4298B4]", "[#88619A]", "[#33A474]"];
  const [voteCategoryList, setVoteCategoryList] = useState<string[] | null>(null);

  const inputClass = "w-full p-1 text-left border border-[#9E9E9E] rounded-sm outline-none";

  const [balanceBoardData, setBalanceBoardData] = useState<BalanceBoard | null>(null);
  const [recommendationList, setRecommendationList] = useState<Balance[] | null>(null);
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]); // Progress bar 참조 배열
  const [maxVote, setMaxVote] = useState<number | null>(null);

  const [isUpdate, setIsUpdate] = useState(false);

  const [boardSubjectTextCount, setBoardSubjectTextCount] = useState(0);
  const [boardContentTextCount, setBoardContentTextCount] = useState(0);

  const [updateBoardSubject, setUpdateBoardSubject] = useState("");
  const [updateBoardContent, setUpdateBoardContent] = useState("");

  const [image, setImage] = useState<string | null>(null);
  const [aiImage, setAiImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateBoardSubjectRef = useRef<HTMLInputElement>(null);
  const updateBoardContentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setUserId(`${localStorage.getItem("userId")}`);
  }, []);

  useEffect(() => {
    if (updateBoardSubjectRef.current && updateBoardContentRef.current) {
      updateBoardSubjectRef.current.focus();
      setBoardSubjectTextCount(updateBoardSubjectRef.current.value.length);
      setBoardContentTextCount(updateBoardContentRef.current.value.length);

      if (updateBoardContentRef.current) {
        updateBoardContentRef.current.style.height = "auto";
        updateBoardContentRef.current.style.height = updateBoardContentRef.current.scrollHeight + "px";
      }
    }
  }, [isUpdate]);

  useEffect(() => {
    if (params.boardId !== undefined) {
      readBoardData(params.boardId);
    }
  }, [params.boardId]);

  useEffect(() => {
    if (balanceBoardData) {
      const maxVoteValue = Math.max(...balanceBoardData.voteInfos.map((vote) => vote.voteCount));
      setMaxVote(maxVoteValue);
    }
  }, [balanceBoardData]);

  useEffect(() => {
    if (balanceBoardData && maxVote !== null) {
      animateProgress(balanceBoardData.voteInfos, balanceBoardData.totalVoteCnt);
    }
  }, [balanceBoardData, maxVote, isUpdate]);

  // 투표 항목 리스트 관리
  const addVoteCategoryList = () => {
    if (voteCategoryList) {
      setVoteCategoryList([...voteCategoryList, ""]);
    }
  };

  const deleteVoteCategoryList = (deleteId: number) => {
    if (voteCategoryList) {
      let tempList = voteCategoryList.filter((category, index) => index !== deleteId);
      tempList = tempList.map((item) => item);
      setVoteCategoryList(tempList);
    }
  };

  const updateVoteCategoryList = (newText: string, updateId: number) => {
    if (voteCategoryList) {
      let tempList = voteCategoryList.map((category, index) => (index === updateId ? newText : category));
      setVoteCategoryList(tempList);
    }
  };

  // 데이터 조회
  const readBoardData = async (boardId: string) => {
    try {
      const response = await boardApi.read(boardId);
      if (response.status === 200) {
        console.log(response.data.data);
        setBalanceBoardData(response.data.data);
        setRecommendationList(response.data.data.sideBoardDtos);
        setUpdateBoardSubject(response.data.data.subject);
        setUpdateBoardContent(response.data.data.content);
        setImage(response.data.data.fileUrls[0]);

        let tempList = response.data.data.voteInfos.map((vote: Vote) => vote.voteContent);

        setVoteCategoryList(tempList);

        setBoardSubjectTextCount(updateBoardSubject.length);
        setBoardContentTextCount(updateBoardContent.length);
      }
    } catch (error) {
      console.error("boardApi read : ", error);
    }
  };

  // 투표
  const handleVoteCreate = async (voteContentId: number) => {
    if (params.boardId !== undefined) {
      const data = {
        voteContentId: voteContentId,
      };

      try {
        const response = await voteApi.create(params.boardId, data);
        if (response.status === 200) {
          readBoardData(params.boardId); // 새로고침
        }
      } catch (error) {
        console.log("voteApi create : ", error);
      }
    }
  };

  const handleVoteUpdate = async (voteContentId: number) => {
    if (params.boardId !== undefined && balanceBoardData?.userVoteId) {
      const data = {
        voteContentId: voteContentId,
      };

      try {
        const response = await voteApi.update(params.boardId, balanceBoardData?.userVoteId, data);
        if (response.status === 200) {
          readBoardData(params.boardId);
        }
      } catch (error) {
        console.log("voteApi update : ", error);
      }
    }
  };

  const handleVoteDelete = async () => {
    if (params.boardId !== undefined && balanceBoardData?.userVoteId) {
      try {
        const response = await voteApi.delete(params.boardId, balanceBoardData?.userVoteId);
        if (response.status === 200) {
          readBoardData(params.boardId);
        }
      } catch (error) {
        console.log("voteApi delete : ", error);
      }
    }
  };

  // Progress 바 애니메이션
  const animateProgress = (voteInfos: BalanceBoard["voteInfos"], totalVotes: number) => {
    // 가장 많은 투표수를 가진 항목을 찾기
    setMaxVote(Math.max(...voteInfos.map((vote) => vote.voteCount)));

    const updateProgressBar = (bar: HTMLDivElement, targetPercentage: number) => {
      let currentPercentage = 0;

      const animate = () => {
        currentPercentage += 1;
        bar.style.width = `${currentPercentage}%`;

        if (currentPercentage < targetPercentage) {
          requestAnimationFrame(animate);
        }
      };

      animate();
    };

    voteInfos.forEach((vote, index) => {
      const targetPercentage = (vote.voteCount / totalVotes) * 100;
      console.log(index, " ", targetPercentage);

      const bar = progressRefs.current[index];
      if (bar) {
        bar.style.visibility = "visible";
        bar.style.width = "0%";
        bar.style.transition = "none";

        // 가장 많은 투표수를 가진 항목에 노란색, 나머지는 회색 배경 적용
        bar.style.backgroundColor = vote.voteCount === maxVote ? "#fcd34d" : "#B8B8B8";

        // 애니메이션 시작
        updateProgressBar(bar, targetPercentage);
      }
    });
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

  // 게시글 본문 textarea 관리
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

  // 게시글 수정
  const handleUpdateBalanceBoard = async () => {
    const formData = new FormData();

    formData.append(
      "request",
      JSON.stringify({
        subject: updateBoardSubject,
        content: updateBoardContent,
        boardType: "VOTE_BOARD",
        voteContents: voteCategoryList,
      })
    );

    if (file && balanceBoardData?.fileNames) {
      formData.append("deleteFiles", JSON.stringify(balanceBoardData.fileNames));
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

  return (
    <>
      {balanceBoardData && recommendationList ? (
        <div className="px-44 py-5">
          <button className="py-4 flex" onClick={() => navigate("/balancelist")}>
            <FaArrowLeftLong className="text-3xl" />
            <p className="px-3 text-xl font-bold">밸런스게임 목록</p>
          </button>

          <div className="grid grid-cols-[4fr_2fr] gap-20">
            <div>
              <div className="grid gap-3">
                <div className="flex justify-between">
                  <div className="flex">
                    <img className="w-9 h-9 mr-3 rounded-[50%]" src={`${balanceBoardData.user.profileImage}`} alt="" />
                    <div>
                      <div className="w-40 flex justify-between items-center">
                        <div className="flex items-center">
                          <p className="font-bold">{balanceBoardData.user.nickName}</p>
                          {<img className="w-5 h-5 ml-1" src={`/assets/${balanceBoardData.user.mbti === null ? "noBadget.png" : balanceBoardData.user.mbti === "N" ? "nBadget.png" : "sBadget.png"}`} alt="badget" />}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-left">{balanceBoardData.createdAt}</p>
                      </div>
                    </div>
                  </div>

                  {isUpdate === false && `${balanceBoardData.user.userId}` === userId ? <BoardSettingMenu totalCount={balanceBoardData.totalVoteCnt} boardType="balance" boardId={balanceBoardData.id} setIsUpdate={setIsUpdate} /> : <></>}

                  {isUpdate && `${balanceBoardData.user.userId}` === userId ? (
                    <div>
                      <button
                        className={`px-5 py-1 mr-1 rounded-md text-sm text-[#565656] font-bold border-2 border-amber-300 duration-300 ${boardSubjectTextCount === 0 || boardContentTextCount === 0 ? "opacity-50" : "hover:bg-amber-300"}`}
                        disabled={boardSubjectTextCount === 0 || boardContentTextCount === 0}
                        onClick={() => handleUpdateBalanceBoard()}>
                        수정
                      </button>
                      <button className="px-5 py-1 rounded-md text-sm text-[#565656] font-bold border-2 border-gray-300 duration-300" onClick={() => setIsUpdate(false)}>
                        취소
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>

                {isUpdate && `${balanceBoardData.user.userId}` === userId ? (
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
                      className="p-1 border border-[#9E9E9E] rounded-sm outline-none resize-none overflow-hidden"
                      placeholder="내용을 입력하세요"
                      value={updateBoardContent}
                      ref={updateBoardContentRef}
                      onChange={(e) => handleTextareaChange(setUpdateBoardContent, e, setBoardContentTextCount, updateBoardContentRef)}
                    />
                  </>
                ) : (
                  <>
                    <p className="text-xl font-bold">Q : {balanceBoardData.subject}</p>
                    <hr className="h-[1px] bg-[#9E9E9E]" />
                    <p className="text-[#565656] font-semibold">{balanceBoardData.content}</p>
                  </>
                )}
              </div>

              {isUpdate && `${balanceBoardData.user.userId}` === userId ? (
                <>
                  <div className="py-5">
                    <div className="flex justify-center">{image ? <img className="max-w-full max-h-[400px] object-cover" src={image} alt="" /> : <></>}</div>
                    <InsertionImage handleAiImage={handleAiImage} setImage={setImage} setFile={setFile} />
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {voteCategoryList &&
                      voteCategoryList.map((category, index) => (
                        <div className="grid grid-cols-[90%_10%]" key={index}>
                          <input className={`${inputClass}`} type="text" value={category} placeholder={`항목 ${index + 1}`} onChange={(e) => updateVoteCategoryList(e.target.value, index)} />
                          {index <= 1 ? (
                            <button className="flex justify-center items-center" onClick={() => alert("기본 항목은 삭제할 수 없습니다.")}>
                              <RiDeleteBin6Line className="text-xl opacity-20" />
                            </button>
                          ) : (
                            <button className="flex justify-center items-center" onClick={() => deleteVoteCategoryList(index)}>
                              <RiDeleteBin6Line className="text-xl" />
                            </button>
                          )}
                        </div>
                      ))}
                    {voteCategoryList && voteCategoryList.length < 4 ? (
                      <div className="grid grid-cols-[90%_10%]">
                        <button className="p-1 text-xl border border-[#9E9E9E] rounded-sm flex justify-center" onClick={() => addVoteCategoryList()}>
                          <FaPlus />
                        </button>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="pt-3 grid gap-2">
                    <div className="flex justify-end items-center">
                      <img src="/assets/if/hotCommentIcon.png" alt="" />
                      <p className="text-sm text-[#F07676] font-semibold text-right">투표수 {balanceBoardData.totalVoteCnt}회</p>
                    </div>
                    {balanceBoardData.userVoteContentId ? (
                      <>
                        {balanceBoardData.voteInfos.map((vote, index) => (
                          <button
                            className={`h-12 relative flex justify-between items-center`}
                            key={vote.voteContentId}
                            onClick={() => {
                              balanceBoardData.userVoteContentId === vote.voteContentId ? handleVoteDelete() : handleVoteUpdate(vote.voteContentId);
                            }}>
                            <div className="h-full w-full absolute bg-gray-100 rounded-lg overflow-hidden">
                              <div className="h-full opacity-75 transition-none" ref={(el) => (progressRefs.current[index] = el)}></div>
                            </div>

                            <div className={`px-5 relative z-10 flex items-center ${vote.voteCount === maxVote ? "font-bold" : "text-[#565656] font-medium"}`}>
                              <p className="w-14 text-left">{((vote.voteCount / balanceBoardData.totalVoteCnt) * 100).toFixed(0)}%</p>
                              <p>{vote.voteContent}</p>
                              {balanceBoardData.userVoteContentId === vote.voteContentId ? <FaRegCircleCheck className="mx-2" /> : <></>}
                            </div>
                          </button>
                        ))}
                      </>
                    ) : (
                      <>
                        {balanceBoardData.voteInfos.map((vote, index) => (
                          <button
                            className={`h-12 border-solid border-2 rounded-[30px] flex justify-center items-center transition-colors duration-150 ease-in-out hover:bg-opacity-15 border-${voteColors[index]} hover:bg-${voteColors[index]}`}
                            key={vote.voteContentId}
                            onClick={() => handleVoteCreate(vote.voteContentId)}>
                            <p className={`w-full px-5 py-2 font-bold text-${voteColors[index]}`}>{vote.voteContent}</p>
                          </button>
                        ))}
                      </>
                    )}
                  </div>
                  <div className="py-5 flex justify-center">
                    <img className="max-w-full max-h-[400px] object-cover" src={`${balanceBoardData.fileUrls[0]}`} alt="" />
                  </div>
                </>
              )}

              {/* <div className="py-5 flex justify-center">
                <img className="w-3/4 object-cover" src={`${balanceBoardData.fileUrls[0]}`} alt="" />
              </div> */}
            </div>

            <div className="grid grid-rows-3 gap-5">
              {recommendationList.map((balance) => (
                <BalanceCard key={balance.id} balance={balance} />
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

export default BalanceDetail;
