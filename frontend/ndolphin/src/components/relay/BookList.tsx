import Filter from "../common/Filter";
import Book from "./Book";
import Paging from "../common/Paging";

function BookList() {
  return (
    <div className="grid grid-rows-[5%_80%_15%]">
      <Filter />
      <div className="px-24 grid grid-cols-4 gap-y-20">
        <Book />
        <Book />
        <Book />
        <Book />
        <Book />
        <Book />
        <Book />
        <Book />
        <Book />
        <Book />
        <Book />
        <Book />
      </div>
      <Paging />
    </div>
  );
}

export default BookList;
