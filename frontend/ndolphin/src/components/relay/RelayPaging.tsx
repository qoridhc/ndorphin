import exp from "constants";
import "../../css/Paging.css";
import { useState, useEffect } from "react";
import boardApi from "../../api/boardApi";
import Pagination from "react-js-pagination";

interface RelayPagingProps {
  setBookList: (bookList: any[]) => void;
  tabs: number;
}

interface Book {
  done: boolean;
}

const RelayPaging = ({ setBookList, tabs }: RelayPagingProps) => {
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const getRelayBoardList = async () => {
      if (tabs === 0) {
        try {
          const response = await boardApi.relaylist("RELAY_BOARD", false, page - 1);
          const bookList = response.data.data.content;
          setBookList(bookList);
        } catch (error) {
          console.error("릴레이북 목록 진행 중 조회 오류 발생", error);
        }
      } else {
        try {
          const response = await boardApi.relaylist("RELAY_BOARD", true, page - 1);
          const bookList = response.data.data.content;
          setBookList(bookList);
        } catch (error) {
          console.error("릴레이북 목록 완료 조회 오류 발생", error);
        }
      }
    };
    getRelayBoardList();
  }, [page]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div className="mt-24 pb-20">
      <Pagination activePage={page} itemsCountPerPage={12} totalItemsCount={300} pageRangeDisplayed={8} prevPageText={"‹"} nextPageText={"›"} onChange={handlePageChange} />
    </div>
  );
};

export default RelayPaging;
