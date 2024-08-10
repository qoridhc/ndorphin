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
  // const bookList = [
  //   {
  //     id: 1,
  //     bookImgUrl: "https://image.yes24.com/Goods/72214794/L",
  //     user: "코에촉촉",
  //     title: "눈 앞에 공룡이 나타나면?",
  //   },
  //   {
  //     id: 2,
  //     bookImgUrl: "https://image.yes24.com/goods/33350436/L",
  //     user: "코에촉촉",
  //     title: "책 제목2",
  //   },
  //   {
  //     id: 3,
  //     bookImgUrl: "https://image.yes24.com/goods/36916976/L",
  //     user: "코에촉촉",
  //     title: "책 제목3",
  //   },
  //   {
  //     id: 4,
  //     bookImgUrl: "https://image.yes24.com/goods/96352123/L",
  //     user: "코에촉촉",
  //     title: "책 제목4",
  //   },
  //   {
  //     id: 5,
  //     bookImgUrl: "https://image.yes24.com/goods/36917053/L",
  //     user: "코에촉촉",
  //     title: "눈 앞에 공룡이 나타나면?",
  //   },
  //   {
  //     id: 6,
  //     bookImgUrl: "https://image.yes24.com/goods/45370178/L",
  //     user: "코에촉촉",
  //     title: "눈 앞에 공룡이 나타나면?",
  //   },
  //   {
  //     id: 7,
  //     bookImgUrl: "https://image.yes24.com/goods/45370179/L",
  //     user: "코에촉촉",
  //     title: "눈 앞에 공룡이 나타나면?",
  //   },
  //   {
  //     id: 8,
  //     bookImgUrl: "https://image.yes24.com/goods/101477745/L",
  //     user: "코에촉촉",
  //     title: "눈 앞에 공룡이 나타나면?",
  //   },
  //   {
  //     id: 9,
  //     bookImgUrl: "https://image.yes24.com/goods/101477743/L",
  //     user: "코에촉촉",
  //     title: "눈 앞에 공룡이 나타나면?",
  //   },
  //   {
  //     id: 10,
  //     bookImgUrl: "https://image.yes24.com/goods/34151542/L",
  //     user: "코에촉촉",
  //     title: "눈 앞에 공룡이 나타나면?",
  //   },
  //   {
  //     id: 11,
  //     bookImgUrl: "https://image.yes24.com/goods/34151542/L",
  //     user: "코에촉촉",
  //     title: "눈 앞에 공룡이 나타나면?",
  //   },
  //   {
  //     id: 12,
  //     bookImgUrl: "https://image.yes24.com/goods/34151542/L",
  //     user: "코에촉촉",
  //     title: "눈 앞에 공룡이 나타나면?",
  //   },
  // ];

  const getRelayBoardList = async () => {
    try {
      const response = await boardApi.list("RELAY_BOARD");
      bookList = response.data.data.content;

      setBookList(bookList);

    } catch (error) {
      console.error("boardApi list : ", error);
    }
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
    <div>
      {tabs === 0 ? (
        <>
          <div className="px-44 py-10 grid grid-cols-2 lg:grid-cols-4 gap-x-14 gap-y-20">{bookList.map((book) => book.done === false && <Book key={book.id} book={book} />)}</div>
          <RelayPaging />
        </>
      ) : (
        <>
          <div className="px-44 py-10 grid grid-cols-2 lg:grid-cols-4 gap-x-14 gap-y-20">{bookList.map((book) => book.done === true && <Book key={book.id} book={book} />)}</div>
          <RelayPaging/>
        </>
      )}
    </div>
  );
};

export default BookList;
