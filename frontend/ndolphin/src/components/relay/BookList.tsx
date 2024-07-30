import Filter from "../common/Filter";
import Book from "./Book";
import Paging from "../common/Paging";

function BookList() {

  const bookList = [
    {
      id: 1,
      bookImgUrl: "profile5",
      user: "코에촉촉",
      title: "눈 앞에 공룡이 나타나면?",
    },
    {
      id: 2,
      bookImgUrl: "profile3",
      user: "코에촉촉",
      title: "눈 앞에 공룡이 나타났는데 도망은 못가고 잡아먹지도 않는다 숨을 것이냐 싸울 것이냐? 어떻게 할 것이냐",
    },
    {
      id: 3,
      bookImgUrl: "profile2",
      user: "코에촉촉",
      title: "눈 앞에 공룡이 나타나면?",
    },
    {
      id: 4,
      bookImgUrl: "profile4",
      user: "코에촉촉",
      title: "눈 앞에 공룡이 나타나면?",
    },
    {
      id: 5,
      bookImgUrl: "profile5",
      user: "코에촉촉",
      title: "눈 앞에 공룡이 나타나면?",
    },
    {
      id: 6,
      bookImgUrl: "profile3",
      user: "코에촉촉",
      title: "눈 앞에 공룡이 나타나면?",
    },
    {
      id: 7,
      bookImgUrl: "profile1",
      user: "코에촉촉",
      title: "눈 앞에 공룡이 나타나면?",
    },
    {
      id: 8,
      bookImgUrl: "profile2",
      user: "코에촉촉",
      title: "눈 앞에 공룡이 나타나면?",
    },
    {
      id: 9,
      bookImgUrl: "profile3",
      user: "코에촉촉",
      title: "눈 앞에 공룡이 나타나면?",
    },
    {
      id: 10,
      bookImgUrl: "profile4",
      user: "코에촉촉",
      title: "눈 앞에 공룡이 나타나면?",
    },
    {
      id: 11,
      bookImgUrl: "profile5",
      user: "코에촉촉",
      title: "눈 앞에 공룡이 나타나면?",
    },
    {
      id: 12,
      bookImgUrl: "profile2",
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
