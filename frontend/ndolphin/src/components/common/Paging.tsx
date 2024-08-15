import exp from "constants";
import '../../css/Paging.css'
import { useState, useEffect } from "react";
import Pagination from "react-js-pagination";

interface PagingProps {
  page: number;
  setPage: (page: number) => void;
  getBoardList: () => void;
  totalElements: number;
}


const Paging = ({ page, setPage, getBoardList, totalElements }: PagingProps) => {
  useEffect(() => {
    getBoardList();
  }, [page]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div className="mt-24 pb-20">
      <Pagination activePage={page} itemsCountPerPage={12} totalItemsCount={totalElements} pageRangeDisplayed={8} prevPageText={"‹"} nextPageText={"›"} onChange={handlePageChange} />
    </div>
  );
};

export default Paging