import { useState, useEffect } from "react";
import boardApi from "../../api/boardApi";
import Book from "./Book";
import RelayPaging from "./RelayPaging";
import { tab } from "@testing-library/user-event/dist/tab";

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

  return (
    <div>
      {tabs === 0 ? (
        <>
          <div className="px-44 py-10 grid grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-20">{bookList.map((book) => book.done === false && <Book key={book.id} book={book} />)}</div>
          <RelayPaging setBookList={setBookList} tabs={tabs} searchKeyword={searchKeyword} searchFilter1={searchFilter1} searchFilter2={searchFilter2} isSearch={isSearch} setIsSearch={setIsSearch} />
        </>
      ) : (
        <>
          <div className="px-44 py-10 grid grid-cols-2 lg:grid-cols-4 gap-x-14 gap-y-20">{bookList.map((book) => book.done === true && <Book key={book.id} book={book} />)}</div>
          <RelayPaging setBookList={setBookList} tabs={tabs} searchKeyword={searchKeyword} searchFilter1={searchFilter1} searchFilter2={searchFilter2} isSearch={isSearch} setIsSearch={setIsSearch} />
        </>
      )}
    </div>
  );
};

export default BookList;