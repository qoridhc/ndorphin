import React, { useEffect, useState, useRef, useCallback } from "react";
import boardApi from "../../api/boardApi";
import MiniSearchBar from "../../components/ok/MiniSearchBar";
import ByeContent from "./ByeContent";
import ByeStartModal from "./ByeStartModal";
import ListLoading from "../../components/common/loading/ListLoading";

interface ByeList {}

const ByeList = () => {
  const userMbti = localStorage.getItem("mbti");
  const [isCreateModal, setIsCreateModal] = useState(false);
  const [byeList, setByeList] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  const getByeList = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await boardApi.oklist("BYE_BOARD", page - 1);
      if (response.status === 200) {
        const newList = response.data.data.content;
        if (newList.length === 0) {
          setHasMore(false);
        } else {
          console.log(newList);
          setByeList((prevList) => [...prevList, ...newList]);
        }
      }
    } catch (error) {
      console.error("작별 목록 조회 오류 발생", error);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  const updateContent = useCallback(
    async (id: number) => {
      try {
        const response = await boardApi.oklist("BYE_BOARD", 0); // 특정 id로 필터링하여 요청을 만듦
        if (response.status === 200) {
          const updatedContent = response.data.data.content.find((item: any) => item.id === id);
          setByeList((prevList) => prevList.map((item) => (item.id === id ? updatedContent : item)));
        }
      } catch (error) {
        console.error("작별 목록 업데이트 오류 발생", error);
      }
    },
    [setByeList]
  );

  useEffect(() => {
    getByeList();
  }, [getByeList]);

  const handleCreateButtonClick = () => {
    if (userMbti === "null") {
      alert("변경된 MBTI 정보가 없습니다. 프로필에서 N / S 설문조사를 진행해주세요.");
    } else {
      setIsCreateModal(true);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center">
        <div className="w-full px-44 py-6 flex-col items-center">
          <div className="py-5 flex items-end">
            <p className="text-2xl font-bold">작별인사</p>
            <p className="pl-3 text-md">N ↔ S가 바뀐 사람들이 인사하는 곳</p>
          </div>
          <hr className="w-full" />
        </div>
      </div>

      <div className="px-44">
        <div className="py-5 grid grid-cols-[1fr_2fr_1fr] gap-5">
          <div className="border-b col-start-2">
            {isLoading && (
              <div className="grid gap-10">
                <ListLoading />
                <ListLoading />
                <ListLoading />
              </div>
            )}
            {byeList.map((content, index) => {
              if (!content) return null; // content가 undefined일 경우 null 반환
              return (
                <div key={content.id} ref={index === byeList.length - 1 ? lastElementRef : null}>
                  <ByeContent content={content} key={index} getByeList={getByeList} updateContent={updateContent} />
                </div>
              );
            })}
          </div>

          <div className="">
            <button className={`w-full my-3 px-7 py-2 shadow-md rounded-2xl font-bold bg-amber-300 text-black ${userMbti === "null" ? "opacity-50" : ""}`} onClick={handleCreateButtonClick}>
              작성하기
            </button>
          </div>
        </div>
      </div>

      {isCreateModal && <ByeStartModal setIsCreateModal={setIsCreateModal} />}

      {!hasMore && <p className="pb-5 text-center font-semibold">모든 작별인사를 조회했습니다.</p>}
    </div>
  );
};

export default ByeList;
