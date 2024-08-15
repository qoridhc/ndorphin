import { useState, useEffect } from "react";
import boardApi from "../../api/boardApi";
import Book from "./Book";
import RelayPaging from "./RelayPaging";
import { tab } from "@testing-library/user-event/dist/tab";
import IfListLoading from "../common/loading/IfListLoading";
import Lottie from "lottie-react";
import noSearch from "../../lottie/noSearch.json";

interface BookListProps {
  tabs: number;
  bookList: any[];
  setBookList: (bookList: any[]) => void;
  searchKeyword: string;
  searchFilter1: string;
  searchFilter2: string;
  isSearch: boolean;
  setIsSearch: (state: boolean) => void;
}

const BookList = ({ tabs, bookList, setBookList, searchKeyword, searchFilter1, searchFilter2, isSearch, setIsSearch }: BookListProps) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      {tabs === 0 ? (
        <>
          {isLoading ? (
            <div className="px-44 py-10 grid grid-cols-4 gap-x-5 gap-y-10">
              {Array.from({ length: 12 }).map((_, index) => (
                <IfListLoading key={index} />
              ))}
            </div>
          ) : bookList.length === 0 ? (
            <div className="flex flex-col items-center">
              <Lottie className="w-1/4" animationData={noSearch} />
              <p className="py-5 text-center font-semibold">검색 결과가 없습니다</p>
            </div>
          ) : (
            <div className="px-44 py-10 grid grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-20">{bookList.map((book) => book.done === false && <Book key={book.id} book={book} />)}</div>
          )}
          <RelayPaging setIsLoading={setIsLoading} setBookList={setBookList} tabs={tabs} searchKeyword={searchKeyword} searchFilter1={searchFilter1} searchFilter2={searchFilter2} isSearch={isSearch} setIsSearch={setIsSearch} />
        </>
      ) : (
        <>
          {isLoading ? (
            <div className="px-44 py-10 grid grid-cols-4 gap-x-5 gap-y-10">
              {Array.from({ length: 12 }).map((_, index) => (
                <IfListLoading key={index} />
              ))}
            </div>
          ) : bookList.length === 0 ? (
            <div className="flex flex-col items-center">
              <Lottie className="w-1/4" animationData={noSearch} />
              <p className="py-5 text-center font-semibold">검색 결과가 없습니다</p>
            </div>
          ) : (
            <div className="px-44 py-10 grid grid-cols-2 lg:grid-cols-4 gap-x-14 gap-y-20">{bookList.map((book) => book.done === true && <Book key={book.id} book={book} />)}</div>
          )}
          <RelayPaging setIsLoading={setIsLoading} setBookList={setBookList} tabs={tabs} searchKeyword={searchKeyword} searchFilter1={searchFilter1} searchFilter2={searchFilter2} isSearch={isSearch} setIsSearch={setIsSearch} />
        </>
      )}
    </div>
  );
};

export default BookList;
