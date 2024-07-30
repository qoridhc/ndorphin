import Filter from "../common/Filter";
import Book from "./Book";
import Paging from "../common/Paging";

function BookList() {

  const bookList = [
    {
      id: 1,
      bookImgUrl: "https://image.yes24.com/Goods/72214794/L",
      user: "코에촉촉",
      title: "눈 앞에 공룡이 나타나면?",
    },
    {
      id: 2,
      bookImgUrl: "https://image.yes24.com/goods/33350436/L",
      user: "코에촉촉",
      title: "책 제목2",
    },
    {
      id: 3,
      bookImgUrl: "https://image.yes24.com/goods/36916976/L",
      user: "코에촉촉",
      title: "책 제목3",
    },
    {
      id: 4,
      bookImgUrl: "https://image.yes24.com/goods/96352123/L",
      user: "코에촉촉",
      title: "책 제목4",
    },
    {
      id: 5,
      bookImgUrl: "https://image.yes24.com/goods/36917053/L",
      user: "코에촉촉",
      title: "눈 앞에 공룡이 나타나면?",
    },
    {
      id: 6,
      bookImgUrl: "https://image.yes24.com/goods/45370178/L",
      user: "코에촉촉",
      title: "눈 앞에 공룡이 나타나면?",
    },
    {
      id: 7,
      bookImgUrl: "https://image.yes24.com/goods/45370179/L",
      user: "코에촉촉",
      title: "눈 앞에 공룡이 나타나면?",
    },
    {
      id: 8,
      bookImgUrl: "https://image.yes24.com/goods/101477745/L",
      user: "코에촉촉",
      title: "눈 앞에 공룡이 나타나면?",
    },
    {
      id: 9,
      bookImgUrl: "https://image.yes24.com/goods/101477743/L",
      user: "코에촉촉",
      title: "눈 앞에 공룡이 나타나면?",
    },
    {
      id: 10,
      bookImgUrl: "https://image.yes24.com/goods/34151542/L",
      user: "코에촉촉",
      title: "눈 앞에 공룡이 나타나면?",
    },
    {
      id: 11,
      bookImgUrl: "https://image.yes24.com/goods/34151542/L",
      user: "코에촉촉",
      title: "눈 앞에 공룡이 나타나면?",
    },
    {
      id: 12,
      bookImgUrl: "https://image.yes24.com/goods/34151542/L",
      user: "코에촉촉",
      title: "눈 앞에 공룡이 나타나면?",
    },
  ];

  return (
    <div>
      <Filter />
      <div className="px-44 py-10 grid grid-cols-4 gap-x-14 gap-y-20">
        {
          bookList.map((book) => (
            <Book key={book.id} book={book} />
          ))
        }
      </div>
      <Paging />
    </div>
  );
}

export default BookList;
