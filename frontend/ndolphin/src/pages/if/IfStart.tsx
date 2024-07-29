import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import InsertionImage from "../../components/common/InsertionImage";

const IfStart = () => {
  const [inputType, setInputType] = useState("투표");
  const [voteCategoryList, setVoteCategoryList] = useState([
    { id: 1, text: "" },
    { id: 2, text: "" },
  ]);
  const boxClass = "p-5 mb-3 border border-[#9E9E9E]";
  const inputClass = "w-full px-3 py-1 text-left border border-[#9E9E9E] rounded-sm outline-none";
  const titleClass = "text-lg font-bold";
  const hrClass = "h-[1px] mt-1 mb-4 bg-[#9E9E9E]";

  const addVoteCategoryList = () => {
    let newId = voteCategoryList.length + 1;
    setVoteCategoryList([...voteCategoryList, { id: newId, text: "" }]);
  };

  const deleteVoteCategoryList = (deleteId: number) => {
    let tempList = voteCategoryList.filter((category) => category.id !== deleteId);
    tempList = tempList.map((item, index) => ({ ...item, id: index + 1 }));
    setVoteCategoryList(tempList);
  };

  const updateVoteCategoryList = (newText: string, id: number) => {
    let tempList = voteCategoryList.map((category) => (category.id === id ? { ...category, text: newText } : category));
    setVoteCategoryList(tempList);
  };
  console.log(voteCategoryList);

  return (
    <div className="px-[30%]">
      <div className="py-8 flex">
        <FaArrowLeftLong className="text-3xl" />
        <button className="px-3 text-xl font-bold">만약에 게시판</button>
      </div>

      <div className={`${boxClass}`}>
        <div>
          <p className={`${titleClass}`}>제목</p>
          <hr className={`${hrClass}`} />
          <input className={`${inputClass}`} type="text " />
        </div>

        <div>
          <p className={`${titleClass}`}>만약에</p>
          <hr className={`${hrClass}`} />
          <textarea className={`${inputClass}`} />
        </div>
      </div>

      <div className={`${boxClass}`}>
        <p className={`${titleClass}`}>이미지</p>
        <hr className={`${hrClass}`} />
        <InsertionImage />
      </div>

      <div className={`${boxClass}`}>
        <p className={`${titleClass}`}>종류</p>
        <hr className={`${hrClass}`} />
        <div className="flex justify-end">
          <div>
            <input type="radio" name="input_type" id="vote" value={"투표"} onChange={(e) => setInputType(e.target.value)} checked={inputType === "투표"} />
            <label htmlFor="vote">투표</label>
          </div>
          <div>
            <input type="radio" name="input_type" id="opinion" value={"의견"} onChange={(e) => setInputType(e.target.value)} checked={inputType === "의견"} />
            <label htmlFor="opinion">의견</label>
          </div>
        </div>

        {inputType === "투표" ? (
          <div className="grid grid-cols-1 gap-2">
            {voteCategoryList.map((category) => (
              <div key={category.id}>
                <input className={`${inputClass}`} type="text" value={category.text} placeholder="항목" onChange={(e) => updateVoteCategoryList(e.target.value, category.id)} />
                {category.id <= 2 ? (
                  <></>
                ) : (
                  <button onClick={() => deleteVoteCategoryList(category.id)}>
                    <RiDeleteBin6Line />
                  </button>
                )}
              </div>
            ))}
            {voteCategoryList.length < 4 ? (
              <button onClick={() => addVoteCategoryList()}>
                <FaPlus />
              </button>
            ) : (
              <></>
            )}
          </div>
        ) : (
          "의견입니다"
        )}
      </div>
    </div>
  );
};

export default IfStart;
