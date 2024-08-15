import React from "react";
import { useNavigate } from "react-router";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../../../css/home/MainRelayBook.css";

interface Props {
  mainIndex: number;
  relay: Relay;
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

  if (!relay || !relay.fileUrls) {
    return <div>Loading...</div>; // 또는 적절한 대체 UI
  }

  const handleUserClick = () => {
    navigate(`/profile/${relay.user.userId}`);
  };

  return (
    <div className="relative">
      <TransitionGroup>
        <CSSTransition key={mainIndex} timeout={300} classNames="fade">
          <div className="w-full absolute grid grid-cols-[4fr_3fr] gap-10">
            <img className="w-full bg-white border aspect-1 object-cover shadow-[5px_5px_5px_5px_rgba(150,150,150,0.3)]" src={relay.fileUrls ? relay.fileUrls[0] : undefined} alt="" />
            <div className="flex flex-col justify-center">
              <div className="mb-4">
                <p className="text-4xl font-bold mb-2">{mainIndex + 1}위 </p>
                <p className="text-xl font-semibold break-keep">{relay.subject}</p>
              </div>

              <div className="flex items-center mb-4">
                <img onClick={handleUserClick} className="w-10 h-10 rounded-full mr-4 cursor-pointer hover:brightness-90 transition duration-200 ease-in-out" src={`${relay.user.profileImage}`} alt="" />
                <p className="font-semibold text-[#565656]">{relay.user.nickName}</p>
              </div>

              <p className="mb-4 text-justify line-clamp-3">{relay.summary}</p>

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
