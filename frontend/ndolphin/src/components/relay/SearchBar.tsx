import "../../css/InputPlaceHolder.css"

function SearchBar() {
  return (
    <div className="flex justify-center">
      <select className="pl-3 rounded-l-lg focus:outline-none" id="search">
        <option value="작성자">작성자</option>
        <option value="제목">제목</option>
        <option value="본문">본문</option>
      </select>
      <input id="search" placeholder="검색어를 입력해 주세요" className="w-3/5 h-10 pl-10 text-left rounded-r-lg focus:outline-none"></input>
    </div>
  );
}

export default SearchBar;
