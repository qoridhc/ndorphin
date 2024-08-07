import { useState } from "react";

interface Props {
  setSearchFilter2: (filter1: string) => void;
}

function Filter({ setSearchFilter2 }: Props) {
  const [tabs, setTabs] = useState("");
  const textStyle = "font-bold";

  const handleTabs = (tab: string) => {
    setTabs(tab);
    setSearchFilter2(tab);
  };

  return (
    <div className="flex">
      <div className="flex w-28 justify-between">
        <div className="">
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
