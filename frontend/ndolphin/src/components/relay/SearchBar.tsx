import "../../css/InputPlaceHolder.css"

function SearchBar() {
  return (
    <div className="flex justify-center">
      <input
        placeholder="검색어를 입력해 주세요"
        className="w-3/5 h-10 pl-10 text-left rounded-lg focus:outline-none"
      ></input>
    </div>
  );
}

export default SearchBar;
