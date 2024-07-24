import exp from "constants";
import './Paging.css'
import { useState } from "react";
import Pagination from "react-js-pagination";

const Paging: React.FC = () => {
  const [page, setPage] = useState<number>(1)

  const handlePageChange = (page: number) => {
    setPage(page)
  }

  return (
    <div className="p-10">
      <Pagination
        activePage={page}
        itemsCountPerPage={12}
        totalItemsCount={300}
        pageRangeDisplayed={8}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={handlePageChange}
      />
    </div>
  )
}

export default Paging