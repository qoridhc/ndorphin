import exp from "constants";
import "../../css/Paging.css";
import { useState, useEffect } from "react";
import boardApi from "../../api/boardApi";
import Pagination from "react-js-pagination";

interface RelayPagingProps {
}

interface Book {
  done: boolean;
}

const RelayPaging = ({ }: RelayPagingProps) => {
  const [bookListDone, setBookListDone] = useState<any[] | null>(null);
  const [bookListUnderdone, setBookListUnderdone] = useState<any[] | null>(null);
  const [page, setPage] = useState<number>(1);

  
  
  useEffect(() => {
    const getRelayBoardList = async () => {
      try {
        const response = await boardApi.list("RELAY_BOARD");
        const bookList = response.data.data.content;
        const filteredBookListDone = bookList.filter((book: Book) => book.done === true);
        const filteredBookListUnderdone = bookList.filter((book: Book) => book.done === false);

        setBookListDone(filteredBookListDone);
        setBookListUnderdone(filteredBookListUnderdone);
      } catch (error) {
        console.error("릴레이북 목록 조회 오류 발생", error);
      }

      getRelayBoardList();
    };
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
