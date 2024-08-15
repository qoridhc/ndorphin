import React, { useEffect, useState, useRef, useCallback } from "react";
import boardApi from "../../api/boardApi";
import MiniSearchBar from "../../components/ok/MiniSearchBar";
import OkContent from "../../components/ok/OkContent";
import OkStartModal from "./OkStartModal";
import ListLoading from "../../components/common/ListLoading";

const OkList = () => {
  const [isCreateModal, setIsCreateModal] = useState(false);
  const [OkList, setOkList] = useState<any[]>([]);
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

  const getOkList = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await boardApi.oklist("OK_BOARD", page - 1);
      const newList = response.data.data.content;

      if (newList.length === 0) {
        setHasMore(false);
      } else {
        setOkList((prevList) => [...prevList, ...newList]);
      }
    } catch (error) {
      console.error("괜찮아 목록 조회 오류 발생", error);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    getOkList();
  }, [getOkList]);

  return (
    <div>
      <div className="flex flex-col justify-center">
        <div className="w-full px-44 py-6 flex-col items-center">
          <div className="py-5 flex items-end">
            <p className="text-2xl font-bold">괜찮아</p>
            <p className="pl-3 text-md">‘만약에~’로 시작된 걱정으로 고민하는 사람들이 위로받는 공간</p>
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
            {OkList.map((content, index) => (
              <div key={content.id} ref={index === OkList.length - 1 ? lastElementRef : null}>
                <OkContent content={content} />
              </div>
            ))}
          </div>

          <div className="">
            <MiniSearchBar />

            <button
              className="w-full my-3 px-7 py-2 shadow-md rounded-2xl font-bold bg-amber-300 text-black"
              onClick={() => {
                setIsCreateModal(true);
              }}>
              고민 작성하기
            </button>
          </div>
        </div>
      </div>

      {isCreateModal && <OkStartModal setIsCreateModal={setIsCreateModal} />}

      {!hasMore && <p className="pb-5 text-center font-semibold">모든 괜찮아를 조회했습니다.</p>}
    </div>
  );
};

export default OkList;
