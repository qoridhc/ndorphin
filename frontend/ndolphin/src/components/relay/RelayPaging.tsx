import exp from "constants";
import "../../css/Paging.css";
import { useState, useEffect } from "react";
import boardApi from "../../api/boardApi";
import Pagination from "react-js-pagination";

interface RelayPagingProps {
  setIsLoading: (state: boolean) => void;
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

const RelayPaging = ({ setIsLoading, setBookList, tabs, searchKeyword, searchFilter1, searchFilter2, isSearch, setIsSearch }: RelayPagingProps) => {
  const [page, setPage] = useState<number>(1);
  const [totalElements, setTotalElements] = useState<number>(0);

  const getRelayBoardList = async () => {
    setIsLoading(true);
    if (tabs === 0) {
      try {
        const response = await boardApi.relaylist("RELAY_BOARD", false, page - 1);
        const bookList = response.data.data.content;
        setBookList(bookList);

        const totalElements = response.data.data.totalElements;
        setTotalElements(totalElements);
        console.log("릴레이북 진행 중 목록 조회 성공", bookList);
      } catch (error) {
        console.error("릴레이북 목록 진행 중 조회 오류 발생", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        const response = await boardApi.relaylist("RELAY_BOARD", true, page - 1);
        const bookList = response.data.data.content;
        setBookList(bookList);

        const totalElements = response.data.data.totalElements;
        setTotalElements(totalElements);
        console.log("릴레이북 완료 목록 조회 성공", bookList);
      } catch (error) {
        console.error("릴레이북 목록 완료 조회 오류 발생", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // useEffect(() => {
  //   getRelayBoardList();
  // }, [page, tabs]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const getSearchRelayBoardList = async () => {
    setIsLoading(true);
    if (tabs === 0) {
      try {
        const response = await boardApi.search("RELAY_BOARD", searchKeyword, searchFilter1, searchFilter2, page - 1, false);
        setBookList(response.data.data.content);

        const totalElements = response.data.data.totalElements;
        setTotalElements(totalElements);
      } catch (error) {
        console.log("boardApi search : ", error);
      } finally {
        setIsLoading(false);
        setIsSearch(false);
      }
    } else {
      try {
        const response = await boardApi.search("RELAY_BOARD", searchKeyword, searchFilter1, searchFilter2, page - 1, true);
        setBookList(response.data.data.content);

        const totalElements = response.data.data.totalElements;
        setTotalElements(totalElements);
      } catch (error) {
        console.log("boardApi search : ", error);
      } finally {
        setIsLoading(false);
        setIsSearch(false);
      }
    }
  };

  useEffect(() => {
    if (searchKeyword || searchFilter2 === "popularity") {
      getSearchRelayBoardList();
    } else {
      getRelayBoardList();
    }
  }, [isSearch, searchFilter2, page, tabs]);

  return (
    <div className="mt-24 pb-20">
      <Pagination activePage={page} itemsCountPerPage={12} totalItemsCount={totalElements} pageRangeDisplayed={8} prevPageText={"‹"} nextPageText={"›"} onChange={handlePageChange} />
    </div>
  );
};

export default RelayPaging;
