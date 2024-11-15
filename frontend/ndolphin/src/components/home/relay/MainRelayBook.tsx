import React from "react";
import { useNavigate } from "react-router";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../../../css/home/MainRelayBook.css";
import Lottie from "lottie-react";
import detailLoading from "../../../lottie/detailLoading.json";

interface Props {
  mainIndex: number;
  relay: Relay | null; // relay는 null일 수 있으므로 null 허용
}

interface Relay {
  id: number;
  hit: number;
  content: string;
  subject: string;
  fileUrls: string[] | null;
  reactionCount: number;
  summary: string;
  user: {
    nickName: string;
    profileImage: string;
    mbti: string;
    userId: number;
  };
}

const MainRelayBook = ({ mainIndex, relay }: Props) => {
  const navigate = useNavigate();

  if (!relay || !relay.fileUrls || relay.fileUrls.length === 0) {
    return (
      <div className="col-span-2 flex justify-center">
        <Lottie className="w-36" animationData={detailLoading} />
      </div>
    ); // 로딩 애니메이션을 표시합니다
  }

  const handleUserClick = () => {
    navigate(`/profile/${relay.user.userId}`);
  };

  const goToDetail = (boardId: number) => {
    navigate(`/relaybookdetail/${boardId}`);
  };

  return (
    <div className="relative">
      <TransitionGroup>
        <CSSTransition key={mainIndex} timeout={300} classNames="fade">
          <div className="w-full absolute grid grid-cols-[4fr_3fr] gap-10">
            <img className="w-full bg-white border aspect-1 object-cover shadow-[5px_5px_5px_5px_rgba(150,150,150,0.3)] cursor-pointer" onClick={() => goToDetail(relay.id)} src={relay.fileUrls[0]} alt={relay.subject} />
            <div className="flex flex-col justify-center">
              <div className="mb-4">
                <p className="text-4xl font-bold mb-2">{mainIndex + 1}위 </p>
                <p className="text-xl font-semibold break-keep hover:underline underline-offset-4 cursor-pointer" onClick={() => goToDetail(relay.id)}>
                  {relay.subject}
                </p>
              </div>

              <div className="flex items-center mb-4">
                <img
                  onClick={handleUserClick}
                  className="w-10 h-10 border rounded-full mr-4 cursor-pointer hover:brightness-90 transition duration-200 ease-in-out"
                  src={relay.user.profileImage || "/assets/user/defaultProfile.png"}
                  alt="User profile"
                />
                <p className="font-semibold text-[#565656]">{relay.user.nickName}</p>
                <img className="w-5 h-5 ml-1" src={`/assets/${relay.user.mbti ? (relay.user.mbti === "N" ? "nBadget.png" : "sBadget.png") : "noBadget.png"}`} alt="Badge" />
              </div>

              <p className="mb-4 text-justify line-clamp-3 leading-5">{relay.summary}</p>

              <div className="flex justify-between">
                <div className="flex items-center">
                  <p className="font-semibold text-gray-800">조회수</p>
                  <p className="ml-2 text-gray-600">{relay.hit} 회</p>
                </div>
                <div className="flex items-center">
                  <p className="font-semibold text-gray-800">공감수</p>
                  <p className="ml-2 text-gray-600">{relay.reactionCount} 개</p>
                </div>
              </div>
            </div>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default MainRelayBook;
