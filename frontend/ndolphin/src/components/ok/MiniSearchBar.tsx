import React from "react";

interface Props {
  setSearchKeyword: (keyword: string) => void;
  setIsSearch: (state: boolean) => void;
  setIsEmpty: (state: boolean) => void;
}

const MiniSearchBar = ({ setSearchKeyword, setIsSearch, setIsEmpty }: Props) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsSearch(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchKeyword(value);

    // 입력 값이 없을 때 isEmpty를 true로 설정
    if (value === "") {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  };

  return (
    // <div className="flex items-center">
    //   <img className="w-5 h-5" src="/assets/searchIcon.png" alt="" />
    //   <input className="w-full p-2 text-left shadow-sm outline-[#9E9E9E]" type="text" placeholder="검색어를 입력하세요" />
    // </div>
    <label className="h-10 m-0 input input-bordered flex items-center gap-2 after:">
      <input type="text" className="grow text-left" placeholder="검색어를 입력하세요" onChange={handleChange} onKeyDown={handleKeyDown} autoComplete="off" />
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
        <path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd" />
      </svg>
    </label>
  );
};

export default MiniSearchBar;
