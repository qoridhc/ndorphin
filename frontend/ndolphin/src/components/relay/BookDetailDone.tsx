import { useState } from "react";

const BookDetailDone = () => {
  const [imogeList, setImogeList] = useState<number[]>([10, 15, 8, 3]);
  const [clicked, setClicked] = useState([false, false, false, false]);
  const user = "새촉";
  const [userImoge, setUserImoge] = useState<{ [key: string]: number }>({});
  const [imogeUserList, setImogeUserList] = useState([
    {
      user: "코에촉촉",
      imogeId: 1,
    },
    {
      user: "나랑드사이다",
      imogeId: 2,
    },
    {
      user: "주문걸어아센디오",
      imogeId: 0,
    },
  ]);

  const clickImoge = (user: string, id: number): void => {
    let copy = [...imogeList];
    let imogeUserListCopy = [...imogeUserList];
    let clickedCopy = [...clicked];
    const userExists = imogeUserList.find((imogeUser) => imogeUser.user === user);
    if (userExists != undefined) {
      const imogeId = userExists.imogeId;
      const userIndex = imogeUserList.findIndex((imogeUser) => imogeUser.user === user);
      if (id === imogeId) {
        copy[id] -= 1;
        imogeUserListCopy.splice(userIndex, 1);
        clickedCopy[id] = false;
      } else if (id != imogeId) {
        copy[imogeId] -= 1;
        copy[id] += 1;
        clickedCopy[imogeId] = false;
        clickedCopy[id] = true;
        imogeUserListCopy[userIndex] = { ...imogeUserListCopy[userIndex], imogeId: id };
      }
    } else {
      copy[id] += 1;
      clickedCopy[id] = true;
      imogeUserListCopy.push({ user: user, imogeId: id });
    }
    setClicked(clickedCopy);
    setImogeUserList(imogeUserListCopy);
    setImogeList(copy);
  };

  return (
    <div className="h-full grid grid-rows-2">
      <div className="flex justify-center items-center">
        <p className="text-outline text-2xl font-bold drop-shadow-md text-zinc-600">이야기가 끝났습니다</p>
      </div>

      <div className="flex flex-col justify-end">
        <div className="flex justify-center">
          <hr className="border-zinc-300 w-[90%]" />
        </div>
        <div className="flex pl-6 pt-3 pb-8">
          <p className="font-bold">이 이야기를 추천합니다</p>
        </div>
        <div className="pb-8 flex justify-around">
          <div className="flex flex-col items-center">
            <button onClick={() => clickImoge(user, 0)} className="w-10 pb-2">
              <img className="" src="/assets/relay/funImoge.png" alt="재밌어요" />
            </button>
            {clicked[0] ? (
              <div className="w-full flex flex-col">
                <p className="text-xs text-blue-600">재밌어요</p>
                <span className="text-blue-600">{imogeList[0]}</span>
              </div>
            ) : (
              <div className="w-full flex flex-col">
                <span className="text-xs text-zinc-500">재밌어요</span>
                <span>{imogeList[0]}</span>
              </div>
            )}
          </div>
          <div className="flex flex-col items-center">
            <button onClick={() => clickImoge(user, 1)} className="w-10 pb-2">
              <img src="/assets/relay/thinkingImoge.png" alt="생각하게돼요" />
            </button>
            {clicked[1] ? (
              <div className="w-full flex flex-col">
                <p className="text-xs text-blue-600">생각하게 돼요</p>
                <span className="text-blue-600">{imogeList[1]}</span>
              </div>
            ) : (
              <div className="w-full flex flex-col">
                <span className="text-xs text-zinc-500">생각하게 돼요</span>
                <span>{imogeList[1]}</span>
              </div>
            )}
          </div>
          <div className="flex flex-col items-center">
            <button onClick={() => clickImoge(user, 2)} className="w-10 pb-2">
              <img src="/assets/relay/wowImoge.png" alt="놀라워요" />
            </button>
            {clicked[2] ? (
              <div className="w-full flex flex-col">
                <p className="text-xs text-blue-600">놀라워요</p>
                <span className="text-blue-600">{imogeList[2]}</span>
              </div>
            ) : (
              <div className="w-full flex flex-col">
                <span className="text-xs text-zinc-500">놀라워요</span>
                <span>{imogeList[2]}</span>
              </div>
            )}
          </div>
          <div className="flex flex-col items-center">
            <button onClick={() => clickImoge(user, 3)} className="w-10 pb-2">
              <img src="/assets/relay/sadImoge.png" alt="슬퍼요" />
            </button>
            {clicked[3] ? (
              <div className="w-full flex flex-col">
                <p className="text-xs text-blue-600">슬퍼요</p>
                <span className="text-blue-600">{imogeList[3]}</span>
              </div>
            ) : (
              <div className="w-full flex flex-col">
                <span className="text-xs text-zinc-500">슬퍼요</span>
                <span>{imogeList[3]}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailDone;