import "../../css/Notes.css";
import BookContent from "../../components/relay/BookContent";
import BookImage from "../../components/relay/BookImage";

function RelayBookStart() {
  return (
    <div className="px-48 flex flex-col items-center">
      <div className="w-full flex justify-end m-3">
        <button className="w-16 mx-16 btn btn-sm btn-warning">등록</button>
      </div>
      <div className="w-full grid grid-cols-2">
        <div className="flex flex-col items-center justify-center">
          <hr className="w-4/5 border-zinc-950" />
          <BookContent />
        </div>
        <div className="flex flex-col items-center">
          <hr className="flex justify-center w-4/5 border-zinc-950" />
          <div className="flex justify-center">
            <BookImage />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RelayBookStart;
