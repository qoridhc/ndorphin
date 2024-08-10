import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import boardApi from "../../api/boardApi";
import BookList from "../../components/relay/BookList";
import SearchBar from "../../components/relay/SearchBar";
import Filter from "../../components/common/Filter";

function Relaybooklist() {
  const navigate = useNavigate();
  const [tabs, setTabs] = useState<number>(0);
  const [hasParticipated, setHasPaeticipated] = useState<boolean>(false);
  const [bookList, setbookList] = useState<any[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchFilter1, setSearchFilter1] = useState("");
  const [searchFilter2, setSearchFilter2] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const underline = "underline underline-offset-[10px] decoration-4 decoration-yellow-300";

  // useEffect -> 렌더링이 다 되고나서 실행 (html부터 다 그려준 뒤 실행)
  useEffect(() => {
    const getRelayList = async () => {
      try {
        const response = await boardApi.list("RELAY_BOARD");
        if (response.status === 200) {
          const bookList = response.data.data.content;
          console.log("릴레이북 목록 불러오기 성공", response.data);
          setbookList(bookList);
        }
      } catch (error) {
        console.log("릴레이북 목록 불러오기 오류: ", error);
      }
    };

    getRelayList();
  }, []); // 디펜던시 작성 시 변수가 변할 때만 실행됨
  // 빈 배열로 적으면 mount 시에만 실행됨 (1회만)

  return (
    <div>
      <div className="flex flex-col justify-center">
        <div className="w-full px-44 py-6 flex-col items-center">
          <div className="py-5 flex items-end">
            <p className="text-2xl font-bold">릴레이북</p>
            <p className="pl-3 text-md">‘만약에~’를 이어 하나의 이야기로 만들어요</p>
          </div>
          <hr className="w-full" />

          <div className="py-6 pb-10 flex flex-col">
            <SearchBar setSearchKeyword={setSearchKeyword} setSearchFilter1={setSearchFilter1} setIsSearch={setIsSearch} />
          </div>
          <div className="w-full flex justify-end items-center">
            <div className="flex justify-center mr-[16rem]">
              <button
                className={`px-10 py-3 pb-5 font-semibold ${tabs === 0 ? underline : "text-[#6C6C6C]"} z-20`}
                onClick={() => {
                  setTabs(0);
                }}>
                진행 중
              </button>
              <button
                className={`px-10 py-3 pb-5 font-semibold ${tabs === 1 ? underline : "text-[#6C6C6C]"} z-20`}
                onClick={() => {
                  setTabs(1);
                }}>
                완료
              </button>
            </div>
            <div className="">
              <button
                className="px-7 py-1 shadow-md rounded-xl font-bold bg-amber-300 text-white"
                onClick={() => {
                  navigate("/relaybookstart");
                }}>
                이야기 시작하기
              </button>
            </div>
          </div>
          <Filter setSearchFilter2={setSearchFilter2} />
        </div>
      </div>

      <BookList tabs={tabs} setBookList={setbookList} bookList={bookList} searchKeyword={searchKeyword} searchFilter1={searchFilter1} searchFilter2={searchFilter2} isSearch={isSearch} setIsSearch={setIsSearch} />
    </div>
  );
}

export default Relaybooklist;
