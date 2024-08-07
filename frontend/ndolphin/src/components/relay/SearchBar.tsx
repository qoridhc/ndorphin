import "../../css/InputPlaceHolder.css";

function SearchBar() {
  return (
    <div className="flex justify-center">
      <div className="relative h-12">
        <select className="h-full pl-8 rounded-l-3xl border-l-2 border-y-2 border-amber-400 bg-transparent focus:outline-none" id="search">
          <option value="전체">전체</option>
          <option value="작성자">작성자</option>
          <option value="제목">제목</option>
          <option value="본문">본문</option>
        </select>
        <span className="h-3 absolute left-[6.8rem] top-[0.7rem] text-zinc-300">ㅣ</span>
        <img className="absolute left-[8.6rem] top-[1rem] w-4 h-4" src="/assets/searchIcon.png" alt="searchIcon" />
      </div>
      <div className="w-[50%] h-12 pl-10 flex items-center border-y-2 border-r-2 rounded-r-3xl border-amber-400">
        <input id="search" placeholder="검색어를 입력해 주세요" className="w-full pl-8 text-left bg-transparent focus:outline-none"></input>
      </div>
    </div>
  );
}

export default SearchBar;
