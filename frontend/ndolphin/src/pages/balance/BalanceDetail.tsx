import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useLocation, useNavigate, useParams } from "react-router";
import SettingMenu from "../../components/if/CommentSettingMenu";
import BalanceCard from "../../components/balance/BalanceCard";
import boardApi from "../../api/boardApi";

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

  useEffect(() => {
    if (params.boardId !== undefined) {
      readBoardData(params.boardId);
      getRecommendationList();
    }
    // setIsUpdate(false);
  }, [params.boardId]);

  // 데이터 조회
  const readBoardData = async (boardId: string) => {
    try {
      const response = await boardApi.read(boardId);
      if (response.status === 200) {
        setBalanceBoardData(response.data.data);
        // setUpdateBoardSubject(response.data.data.subject);
        // setUpdateBoardContent(response.data.data.content);
        // setImage(response.data.data.fileUrls[0]);

        // setBoardSubjectTextCount(updateBoardSubject.length);
        // setBoardContentTextCount(updateBoardContent.length);
      }
    } catch (error) {
      console.error("ifApi read : ", error);
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
                {balanceBoardData.voteInfos.map((vote, index) => (
                  <button
                    className={`border-solid border-2 rounded-[30px] flex justify-center items-center transition-colors duration-150 ease-in-out 
                      ${index === 0 ? "border-[#E4AE3A] hover:bg-[#E4AE3A] hover:opacity-75" : ""}
                      ${index === 1 ? "border-[#4298B4] hover:bg-[#4298B4] hover:opacity-75" : ""}
                      ${index === 2 ? "border-[#88619A] hover:bg-[#88619A] hover:opacity-75" : ""}
                      ${index === 3 ? "border-[#33A474] hover:bg-[#33A474] hover:opacity-75" : ""}
                    `}
                    key={vote.voteContentId}>
                    <p className="w-full px-5 py-2 font-semibold text-[#565656] hover:text-white">{vote.voteContent}</p>
                  </button>
                ))}
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
