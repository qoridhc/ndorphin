import { useState } from "react";

interface Props {
  setSearchFilter2: (filter2: string) => void;
}

function Filter({ setSearchFilter2 }: Props) {
  const [tabs, setTabs] = useState("recent");
  const textStyle = "font-bold";

  const handleTabs = (tab: string) => {
    setTabs(tab);
    setSearchFilter2(tab);
  };

  return (
    <div className="flex items-center justify-start">
      <div className="flex items-center mr-3 w-28 justify-between">
        <div>
          <button
            className={`${tabs === "popularity" ? textStyle : "text-gray-400"}`}
            onClick={() => {
              handleTabs("popularity");
            }}>
            인기순
          </button>
        </div>
        <div>|</div>
        <div>
          <button
            className={`${tabs === "recent" ? textStyle : "text-gray-400"}`}
            onClick={() => {
              handleTabs("recent");
            }}>
            최신순
          </button>
        </div>
      </div>
    </div>
  );
}

export default Filter;
