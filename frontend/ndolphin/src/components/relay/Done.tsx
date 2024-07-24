import Filter from "../common/Filter";
import Book from "./Book";
import Paging from "../../components/common/Paging";

function Done() {
  return (
    <div>
      <Filter />
      <div className="flex justify-center">
        <Book />
        <Book />
        <Book />
        <Book />
      </div>
      <div className="flex justify-center">
        <Book />
        <Book />
        <Book />
        <Book />
      </div>
      <div className="flex justify-center">
        <Book />
        <Book />
        <Book />
        <Book />
      </div>
      <Paging />
    </div>
  );
}

export default Done;
