import React, { useEffect, useState } from "react";
import Filter from "../common/Filter";
import Paging from "../common/Paging";
import BalanceCard from "./BalanceCard";
import boardApi from "../../api/boardApi";

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

const BalanceCardList = () => {
  const [balanceBoardList, setBalanceBoardList] = useState<Balance[] | null>(null);

  const getBalanceBoardList = async () => {
    try {
      const response = await boardApi.list("VOTE_BOARD");
      setBalanceBoardList(response.data.data.content);
    } catch (error) {
      console.error("boardApi list : ", error);
    }
  };

  useEffect(() => {
    getBalanceBoardList();
  }, []);

  return (
    <div>
      {balanceBoardList ? (
        <div className="px-44 py-10 grid grid-cols-3 gap-5">
          {balanceBoardList.map((balance) => (
            <BalanceCard key={balance.id} balance={balance} />
          ))}
        </div>
      ) : (
        <></>
      )}

      <Paging />
    </div>
  );
};

export default BalanceCardList;
