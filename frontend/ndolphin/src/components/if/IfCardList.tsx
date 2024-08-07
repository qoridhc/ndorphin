import React, { useEffect, useState } from "react";
import Paging from "../common/Paging";
import boardApi from "../../api/boardApi";
import OpinionCard from "./OpinionCard";

interface If {
  avatarUrl: string | null;
  bestComment: string | null;
  commentCount: number;
  content: string;
  createdAt: string;
  hit: number;
  id: number;
  nickName: string;
  subject: string;
  badget: "N";
}

interface Props {
  searchKeyword: string;
  searchFilter1: string;
  searchFilter2: string;
  isSearch: boolean;
  setIsSearch: (state: boolean) => void;
}

const IfCardList = ({ searchKeyword, searchFilter1, searchFilter2, isSearch, setIsSearch }: Props) => {
  const [ifBoardList, setIfBoardList] = useState<If[] | null>(null);

  const getIfBoardList = async () => {
    try {
      const response = await boardApi.list("OPINION_BOARD");
      setIfBoardList(response.data.data);
    } catch (error) {
      console.error("boardApi list : ", error);
    }
  };

  const getSearchIfBoardList = async () => {
    try {
      const response = await boardApi.list("OPINION_BOARD", searchKeyword, searchFilter1, searchFilter2);
      setIfBoardList(response.data.data);
    } catch (error) {
      console.log("boardApi search : ", error);
    }
  };

  useEffect(() => {
    getIfBoardList();
  }, []);

  useEffect(() => {
    getSearchIfBoardList();
    setIsSearch(false);
  }, [isSearch, searchFilter2]);

  return (
    <div>
      {ifBoardList ? (
        <div className="px-44 py-10 grid grid-cols-4 gap-5">
          {ifBoardList.map((ifBoard) => (
            <OpinionCard key={ifBoard.id} ifBoard={ifBoard} />
          ))}
        </div>
      ) : (
        <></>
      )}

      <Paging />
    </div>
  );
};

export default IfCardList;
