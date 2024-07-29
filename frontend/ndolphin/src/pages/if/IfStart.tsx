import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import InsertionImage from "../../components/common/InsertionImage";
import { useNavigate } from "react-router";

const IfStart = () => {
  const navigate = useNavigate();
  const [inputType, setInputType] = useState("투표");
  const [voteCategoryList, setVoteCategoryList] = useState([
    { id: 1, text: "" },
    { id: 2, text: "" },
  ]);
  const boxClass = "mb-3 border border-[#9E9E9E]";
  const boxContentClass = "p-5";
  const inputClass = "w-full p-1 text-left border border-[#9E9E9E] rounded-sm outline-none";
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
    <div className="px-[30%] py-5">
      <button className="py-4 flex" onClick={() => navigate("/iflist")}>
        <FaArrowLeftLong className="text-3xl" />
        <p className="px-3 text-xl font-bold">만약에 게시판</p>
      </button>

      <div className={`${boxClass}`}>
        <div className={`${boxContentClass}`}>
          <p className={`${titleClass}`}>제목</p>
          <hr className={`${hrClass}`} />
          <input className={`${inputClass}`} type="text " />
        </div>

        <div className={`${boxContentClass}`}>
          <p className={`${titleClass}`}>만약에</p>
          <hr className={`${hrClass}`} />
          <textarea className={`h-40 ${inputClass}`} />
        </div>
      </div>

      <div className={`${boxClass}`}>
        <div className={`${boxContentClass}`}>
          <p className={`${titleClass}`}>이미지</p>
          <hr className={`${hrClass}`} />
          <InsertionImage />
        </div>
      </div>

      <div className={`${boxClass}`}>
        <div className={`${boxContentClass}`}>
          <p className={`${titleClass}`}>종류</p>
          <hr className={`${hrClass}`} />
          <div className="pb-1 grid grid-cols-[90%_10%]">
            <div className="flex justify-end">
              <div className="px-3">
                <input className="mx-2" type="radio" name="input_type" id="vote" value={"투표"} onChange={(e) => setInputType(e.target.value)} checked={inputType === "투표"} />
                <label htmlFor="vote">투표</label>
              </div>
              <div>
                <input className="mx-2" type="radio" name="input_type" id="opinion" value={"의견"} onChange={(e) => setInputType(e.target.value)} checked={inputType === "의견"} />
                <label htmlFor="opinion">의견</label>
              </div>
            </div>
          </div>

          {inputType === "투표" ? (
            <div className="grid grid-cols-1 gap-2">
              {voteCategoryList.map((category) => (
                <div className="grid grid-cols-[90%_10%]" key={category.id}>
                  <input className={`${inputClass}`} type="text" value={category.text} placeholder="항목" onChange={(e) => updateVoteCategoryList(e.target.value, category.id)} />
                  {category.id <= 2 ? (
                    <button className="flex justify-center items-center" onClick={() => alert("기본 항목은 삭제할 수 없습니다.")}>
                      <RiDeleteBin6Line className="text-xl opacity-20" />
                    </button>
                  ) : (
                    <button className="flex justify-center items-center" onClick={() => deleteVoteCategoryList(category.id)}>
                      <RiDeleteBin6Line className="text-xl" />
                    </button>
                  )}
                </div>
              ))}
              {voteCategoryList.length < 4 ? (
                <div className="grid grid-cols-[90%_10%]">
                  <button className="p-1 text-xl border border-[#9E9E9E] rounded-sm flex justify-center" onClick={() => addVoteCategoryList()}>
                    <FaPlus />
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          ) : (
            "의견입니다"
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button className="w-16 text-[#6C6C6C] font-semibold border-solid border-2 border-[#FFDE2F] rounded-md hover:text-white hover:bg-[#FFDE2F] duration-200">등록</button>
      </div>
    </div>
  );
};

export default IfStart;
