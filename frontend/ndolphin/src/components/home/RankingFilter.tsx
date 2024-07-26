import React, { useState } from "react";

interface Props {
  updateRankingType: (type: string) => void;
}

const RankingFilter = (props: Props) => {
  const [filterList, setFilterList] = useState([
    {
      id: 1,
      type: "일간",
      isSelected: true,
    },
    {
      id: 2,
      type: "주간",
      isSelected: false,
    },
    {
      id: 3,
      type: "월간",
      isSelected: false,
    },
  ]);

  const changeFilterState = (id: number) => {
    let copied = [...filterList];
    copied.forEach((item) => {
      if (item.id === id) {
        item.isSelected = true;
      } else {
        item.isSelected = false;
      }
    });
    setFilterList(copied);
    props.updateRankingType(filterList[id - 1].type);
  };

  return (
    <div className="w-36 flex justify-around text-sm font-semibold">
      {filterList.map((filter) => (
        <div className="flex flex-col items-center justify-end" key={filter.id}>
          {filter.isSelected ? <div className="w-1.5 h-1.5 mb-0.5 ml-0.5 bg-[#C7AB14] rounded-[50%]"></div> : ``}
          <button className={filter.isSelected ? "text-[#333333]" : "text-[#9E9E9E]"} onClick={() => changeFilterState(filter.id)}>
            {filter.type}
          </button>
        </div>
      ))}
    </div>
  );
};

export default RankingFilter;
