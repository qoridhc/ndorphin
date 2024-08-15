import React, { useEffect, useState } from "react";
import Filter from "../common/Filter";
import Paging from "../common/Paging";
import BalanceCard from "./BalanceCard";
import boardApi from "../../api/boardApi";
import IfListLoading from "../common/loading/IfListLoading";
import Lottie from "lottie-react";
import noSearch from "../../lottie/noSearch.json";

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

interface Props {
  searchKeyword: string;
  searchFilter1: string;
  searchFilter2: string;
  isSearch: boolean;
  setIsSearch: (state: boolean) => void;
}

const BalanceCardList = ({ searchKeyword, searchFilter1, searchFilter2, isSearch, setIsSearch }: Props) => {
  const [balanceBoardList, setBalanceBoardList] = useState<Balance[] | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const getBalanceBoardList = async () => {
    setIsLoading(true);
    try {
      const response = await boardApi.list("VOTE_BOARD", page - 1);
      setBalanceBoardList(response.data.data.content);

      const totalElements = response.data.data.totalElements;
      setTotalElements(totalElements);
    } catch (error) {
      console.error("boardApi list : ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSearchBalanceBoardList = async () => {
    setIsLoading(true);
    try {
      const response = await boardApi.search("VOTE_BOARD", searchKeyword, searchFilter1, searchFilter2, page - 1, false);
      setBalanceBoardList(response.data.data.content);

      const totalElements = response.data.data.totalElements;
      setTotalElements(totalElements);
    } catch (error) {
      console.log("boardApi search : ", error);
    } finally {
      setIsLoading(false);
      setIsSearch(false);
    }
  };

  useEffect(() => {
    if (searchKeyword || searchFilter2 === "popularity") {
      getSearchBalanceBoardList();
    } else {
      getBalanceBoardList();
    }
  }, [isSearch, searchFilter2, page]);

  return (
    <div>
      {isLoading ? (
        <div className="px-44 py-10 grid grid-cols-3 gap-x-5 gap-y-10">
          {Array.from({ length: 12 }).map((_, index) => (
            <IfListLoading key={index} />
          ))}
        </div>
      ) : balanceBoardList ? (
        balanceBoardList.length === 0 ? (
          <div className="flex flex-col items-center">
            <Lottie className="w-1/4" animationData={noSearch} />
            <p className="py-5 text-center font-semibold">검색 결과가 없습니다</p>
          </div>
        ) : (
          <div className="px-44 py-10 grid grid-cols-3 gap-5">
            {balanceBoardList.map((balance) => (
              <BalanceCard key={balance.id} balance={balance} />
            ))}
          </div>
        )
      ) : (
        <></>
      )}

      {balanceBoardList?.length === 0 ? <></> : <Paging page={page} setPage={setPage} getBoardList={getBalanceBoardList} totalElements={totalElements} />}
    </div>
  );
};

export default BalanceCardList;
