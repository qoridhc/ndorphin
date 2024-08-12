import exp from "constants";
import "../../css/Paging.css";
import { useState, useEffect } from "react";
import boardApi from "../../api/boardApi";
import Pagination from "react-js-pagination";

interface RelayPagingProps {
  setBookList: (bookList: any[]) => void;
  tabs: number;
  searchKeyword: string;
  searchFilter1: string;
  searchFilter2: string;
  isSearch: boolean;
  setIsSearch: (isSearch: boolean) => void;
}

interface Book {
  done: boolean;
}

const RelayPaging = ({ setBookList, tabs, searchKeyword, searchFilter1, searchFilter2, isSearch, setIsSearch }: RelayPagingProps) => {
  const [page, setPage] = useState<number>(1);

  const getRelayBoardList = async () => {
    if (tabs === 0) {
      try {
        const response = await boardApi.relaylist("RELAY_BOARD", false, page - 1);
        const bookList = response.data.data.content;
        setBookList(bookList);
        console.log("릴레이북 진행 중 목록 조회 성공", bookList);
      } catch (error) {
        console.error("릴레이북 목록 진행 중 조회 오류 발생", error);
      }
    } else {
      try {
        const response = await boardApi.relaylist("RELAY_BOARD", true, page - 1);
        const bookList = response.data.data.content;
        setBookList(bookList);
        console.log("릴레이북 완료 목록 조회 성공", bookList);
      } catch (error) {
        console.error("릴레이북 목록 완료 조회 오류 발생", error);
      }
    }
  };

  useEffect(() => {
    getRelayBoardList();
  }, [page, tabs]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const getSearchRelayBoardList = async () => {
    try {
      const response = await boardApi.search("RELAY_BOARD", searchKeyword, searchFilter1, searchFilter2);
      setBookList(response.data.data.content);
    } catch (error) {
      console.log("boardApi search : ", error);
    }
  };

  useEffect(() => {
    if (searchKeyword || searchFilter2 === "popularity") {
      getSearchRelayBoardList();
      setIsSearch(false);
    } else {
      getRelayBoardList();
    }
  }, [isSearch, searchFilter2]);

  return (
    <div className="mt-24 pb-20">
      <Pagination activePage={page} itemsCountPerPage={12} totalItemsCount={300} pageRangeDisplayed={8} prevPageText={"‹"} nextPageText={"›"} onChange={handlePageChange} />
    </div>
  );
};

export default RelayPaging;
