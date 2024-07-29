import { useState } from "react";

function Filter() {
  const [tabs, setTabs] = useState(0);
  const textStyle = "font-bold";

  return (
    <div className="flex px-44">
      <div className="w-56 flex justify-between">
        <div>
          <input type="checkbox" id="my" className="mr-2"></input>
          <label htmlFor="my">내 글 보기</label>
        </div>
        <p className="">|</p>
        <div>
          <button
            className={`${tabs === 0 ? textStyle : "text-gray-400"}`}
            onClick={() => {
              setTabs(0);
            }}>
            인기순
          </button>
        </div>
        <div>
          <button
            className={`${tabs === 1 ? textStyle : "text-gray-400"}`}
            onClick={() => {
              setTabs(1);
            }}>
            최신순
          </button>
        </div>
      </div>
    </div>
  );
}

export default Filter;
