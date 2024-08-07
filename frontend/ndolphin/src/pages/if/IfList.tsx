import React, { useState } from "react";
import { useNavigate } from "react-router";
import SearchBar from "../../components/relay/SearchBar";
import IfCardList from "../../components/if/IfCardList";
import Filter from "../../components/common/Filter";

const IfList = () => {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchFilter1, setSearchFilter1] = useState("");
  const [searchFilter2, setSearchFilter2] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  return (
    <div>
      <div className="flex flex-col justify-center">
        <div className="w-full px-44 py-6 flex-col items-center">
          <div className="py-5 flex items-end">
            <p className="text-xl font-bold">만약에</p>
            <p className="pl-3 text-xs">‘만약에~’를 공유하고 의견을 남겨요</p>
          </div>
          <div className="py-6 pb-10 flex flex-col justify-around">
            <SearchBar setSearchKeyword={setSearchKeyword} setSearchFilter1={setSearchFilter1} setIsSearch={setIsSearch} />
          </div>
          <hr className="w-full" />
        </div>
      </div>

      <div>
        <div className="px-44 text-right flex justify-between items-center">
          <Filter setSearchFilter2={setSearchFilter2} />
          <button
            className="px-7 py-1 shadow-md rounded-xl font-bold bg-amber-300 text-white"
            onClick={() => {
              navigate("/ifstart");
            }}>
            만약에 등록
          </button>
        </div>

        <IfCardList searchKeyword={searchKeyword} searchFilter1={searchFilter1} searchFilter2={searchFilter2} isSearch={isSearch} setIsSearch={setIsSearch} />
      </div>
    </div>
  );
};

export default IfList;
