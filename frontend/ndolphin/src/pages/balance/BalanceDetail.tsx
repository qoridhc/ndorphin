import React, { useEffect, useState, useRef } from "react";
import { FaArrowLeftLong, FaRegCircleCheck } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router";
import BalanceCard from "../../components/balance/BalanceCard";
import boardApi from "../../api/boardApi";
import voteApi from "../../api/voteApi";

interface BalanceBoard {
  voteInfos: {
    voteContent: string;
    voteContentId: number;
    voteCount: number;
  }[];
  totalVotes: number;
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

const BalanceDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const voteColors = ["[#E4AE3A]", "[#4298B4]", "[#88619A]", "[#33A474]"];

  const [balanceBoardData, setBalanceBoardData] = useState<BalanceBoard | null>(null);
  const [recommendationList, setRecommendationList] = useState<Balance[] | null>(null);
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]); // Progress bar 참조 배열

  const [maxVote, setMaxVote] = useState<number | null>(null);

  useEffect(() => {
    if (params.boardId !== undefined) {
      readBoardData(params.boardId);
      getRecommendationList();
    }
  }, [params.boardId]);

  // 데이터 조회
  const readBoardData = async (boardId: string) => {
    try {
      const response = await boardApi.read(boardId);
      if (response.status === 200) {
        setBalanceBoardData(response.data.data);

        // 애니메이션을 설정할 때 setTimeout을 사용하여 렌더링이 완료된 후 애니메이션 시작
        setTimeout(() => {
          animateProgress(response.data.data.voteInfos, response.data.data.totalVotes);
        }, 100);
      }
    } catch (error) {
      console.error("boardApi read : ", error);
    }
  };

  const getRecommendationList = async () => {
    try {
      const response = await boardApi.list("VOTE_BOARD");
      if (response.status === 200) {
        setRecommendationList(response.data.data.content);
      }
    } catch (error) {
      console.error("boardApi list : ", error);
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

  const handleVoteUpdate = async (voteContentId: number) => {};

  const handleVoteDelete = async () => {
    if (params.boardId !== undefined && balanceBoardData?.userVoteId) {
      try {
        const response = await voteApi.delete(params.boardId, balanceBoardData?.userVoteId);
        if (response.status === 200) {
          readBoardData(params.boardId); // 새로고침
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
                <div className="flex items-center">
                  <img className="w-9 h-9 mr-3 rounded-[50%]" src={`${balanceBoardData.user.profileImage}`} alt="" />
                  <div>
                    <div className="w-40 flex justify-between items-center">
                      <div className="flex items-center">
                        <p className="font-bold">{balanceBoardData.user.nickName}</p>
                        {<img className="w-5 h-5 ml-1" src={`/assets/${balanceBoardData.user.mbti === null ? "noBadget.png" : balanceBoardData.user.mbti === "N" ? "nBadget.png" : "sBadget.png"}`} alt="badget" />}
                      </div>
                    </div>
                    <div className="">
                      <p className="text-xs text-left">{balanceBoardData.createdAt}</p>
                    </div>
                  </div>
                </div>

                <p className="text-xl font-bold">Q : {balanceBoardData.subject}</p>
                <hr className="h-[1px] bg-[#9E9E9E]" />
                <p className="text-[#565656] font-semibold">{balanceBoardData.content}</p>
              </div>

              <div className="pt-3 grid gap-2">
                <div className="flex justify-end items-center">
                  <img src="/assets/if/hotCommentIcon.png" alt="" />
                  <p className="text-sm text-[#F07676] font-semibold text-right">투표수 {balanceBoardData.totalVotes}회</p>
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
                        <div className="h-full w-full absolute bg-gray-200 rounded-lg overflow-hidden">
                          <div
                            className="h-full opacity-75 transition-none"
                            ref={(el) => (progressRefs.current[index] = el)} // Progress bar 참조 설정
                          ></div>
                        </div>

                        <div className={`px-5 relative z-10 flex items-center ${vote.voteCount === maxVote ? "font-bold" : "text-[#565656] font-medium"}`}>
                          <p className="w-14 text-left">{((vote.voteCount / balanceBoardData.totalVotes) * 100).toFixed(0)}%</p>
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
                <img className="w-3/4 object-cover" src={`${balanceBoardData.fileUrls[0]}`} alt="" />
              </div>
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
    </>
  );
};

export default BalanceDetail;
