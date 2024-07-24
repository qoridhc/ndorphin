function Book() {
  return (
    <div className="m-10">
      <div className="w-full flex justify-end">
        <p className="mx-1 px-3 py-1 rounded-t-lg text-xs font-bold text-zinc-900 bg-amber-300">참여</p>
      </div>
      <img src="/assets/heart.png" className="w-9 absolute z-10 mt-3 ml-40" alt="#" />
      <img src="/assets/cover.jpg" className="w-52 h-72 rounded-md relative z-0"></img>
      <p className="py-2 font-bold text-lg">혼자서 본 영화</p>
      <button className="w-32 px-2 py-1 flex justify-between items-center rounded-3xl border-2 border-solid border-zinc-300 font-bold text-zinc-800">
        <img src="/assets/aiSummaryButton.png" className="w-5" alt="#"></img>
        <p className="text-xs">AI 요약하기</p>
        <img src="/assets/arrow_right.png" className="w-2" alt="#" />
      </button>
    </div>
  );
}

export default Book;
