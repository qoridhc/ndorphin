import "../../css/Notes.css";
import BookContent from "../../components/relay/BookContent";
import BookImage from "../../components/relay/BookImage";

function RelayBookStart() {
  return (
    <div className="mt-6 px-48 flex flex-col items-center">
      <div className="relative z-0">
        <img src="/assets/bookBackGround.png" alt="#" />
      </div>
      <div className="mt-6 absolute z-10">
        <div className="w-full flex justify-end m-3">
          <button className="w-16 mx-60 text-[#6C6C6C] font-semibold border-solid border-2 border-[#FFDE2F] rounded-md hover:text-white hover:bg-[#FFDE2F] duration-200">등록</button>
        </div>
        <div className="flex justify-center">
          <div className="w-4/5 grid grid-cols-2">
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
      </div>
    </div>
  );
}

export default RelayBookStart;
