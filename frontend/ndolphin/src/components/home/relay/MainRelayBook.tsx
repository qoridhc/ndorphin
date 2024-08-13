import React, { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../../../css/home/MainRelayBook.css";
import rankingApi from "../../../api/rankingApi";

interface Props {
  mainIndex: number;
  rankingType: string;
}

interface Relay {
  id: number;
  hit: number;
  content: string;
  subject: string;
  fileUrls: string;
  reactionCount: number;
  user: {
    nickName: string;
    profileImage: string;
    mbti: string;
    userId: number;
  };
}

const MainRelayBook = ({ mainIndex, rankingType }: Props) => {
  const [relayBoardList, setRelayBoardList] = useState<Relay[] | null>(null);

  useEffect(() => {
    getRelayBoardList();
  }, [rankingType]);

  const getRelayBoardList = async () => {
    try {
      let period = "";
      switch (rankingType) {
        case "일간":
          period = "daily";
          break;
        case "주간":
          period = "weekly";
          break;
        case "월간":
          period = "monthly";
          break;
      }
      const response = await rankingApi.relaylist(period);
      setRelayBoardList(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("rankingApi relaylist : ", error);
    }
  };

  return (
    <TransitionGroup>
      <CSSTransition key={mainIndex} timeout={300} classNames="fade">
        {relayBoardList ? (
          <div className="w-[40%] absolute grid grid-cols-2">
            <img className="w-[90%] rounded-xl shadow-[5px_5px_5px_5px_rgba(150,150,150,0.3)]" src={relayBoardList[mainIndex].fileUrls[0]} alt="" />
            <div className="grid grid-rows-[auto_auto_auto_auto_auto]">
              <div className="flex items-end">
                <p className="text-6xl font-bold">{mainIndex + 1}</p>
                <p className="text-xl font-semibold">{relayBoardList[mainIndex].subject}</p>
              </div>
              <div className="flex items-center">
                <img className="w-10 h-10 rounded-[50%]" src={`${relayBoardList[mainIndex].user.profileImage}`} alt="" />
                <p className="pl-4 font-semibold">{relayBoardList[mainIndex].user.nickName}</p>
              </div>
              <p className="text-justify">{relayBoardList[mainIndex].content}</p>
              <hr className="h-[2px] bg-[#9E9E9E]" />
              <div>
                <div className="flex">
                  <p className="font-semibold text-[#333333]">조회수</p>
                  <p className="pl-2 text-[#565656]">{relayBoardList[mainIndex].hit} 회</p>
                </div>
                <div className="flex">
                  <p className="font-semibold text-[#333333]">공감수</p>
                  <p className="pl-2 text-[#565656]">{relayBoardList[mainIndex].reactionCount} 개</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </CSSTransition>
    </TransitionGroup>
  );
};

export default MainRelayBook;
