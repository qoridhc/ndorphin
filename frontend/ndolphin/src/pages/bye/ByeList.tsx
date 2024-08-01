import React, { useState } from "react";
import MiniSearchBar from "../../components/ok/MiniSearchBar";
import ByeContent from "./ByeContent";
import OkStartModal from "../ok/OkStartModal";

const ByeList = () => {
  const [isCreateModal, setIsCreateModal] = useState(false);

  // switch가 0일 경우 N->S, 1일 경우 S->N
  const byeContentList = [
    {
      id: 1,
      switch: 0,
      profileImgUrl: "/assets/profile/profile3.png",
      user: "근데 말약에",
      date: "2024-07-30 01:22",
      content: "매일 5번 만약에 외치던 N입니다 요즘 만약에가 줄어서 검사해보니 아니나다를까 S 나왔네요 N으로 다시 돌아오는 날에는 기념으로 동화책 하나 쓰겠습니다 남은 N들아! 만약에 화이팅 ㅎㅎ (이젠 만약에 재미없..ㅓ)",
      greetingCount: 10,
      goodByeCount: 12,
    },
    {
      id: 2,
      switch: 1,
      profileImgUrl: "/assets/profile/profile2.png",
      user: "만약핑인데",
      date: "2024-07-29 01:22",
      content: "동화책이 재밌어서 읽으러 종종왔는데 만약에 보다보니 N으로 바꼈나봐요 ㅋㅋㅋㅋ 어제도 만약에로 토론하다 왔는데 이제 여기서 다 풀고 가겠습니다 선배님들, 만약에 많이 올려주세요 기대할게요",
      greetingCount: 8,
      goodByeCount: 9,
    },
    {
      id: 3,
      switch: 1,
      profileImgUrl: "/assets/profile/profile5.png",
      user: "코에촉촉",
      date: "2024-06-29 01:22",
      content: "옆에서 매일 만약에 만약에 하면서 저를 괴롭히던 친구가 있는데 저도 모르게 스며들었나봐요.... 제가 만약에를 하게 되는 날이 오다니 믿을 수가 없네요.. 저 사실 걔 좋아하는 걸까요? 요즘들어 혼란스러워요 아무튼 재밌게 즐겨볼게요",
      greetingCount: 2,
      goodByeCount: 1,
    },
    {
      id: 4,
      switch: 0,
      profileImgUrl: "/assets/profile/profile3.png",
      user: "별이 빛나는 밤",
      date: "2024-07-30 14:00",
      content: "취업하고나서 바쁜 회사 일에 신경쓰다보니 만약에 못한 지도 오래 됐네요. 학생 때는 만약에 참 많이도 했었는데, 역시 현실이라는 건 어쩔 수 없나봅니다. 그동안 즐거웠어요. 오랜만에 보니 추억이네요.",
      greetingCount: 15,
      goodByeCount: 19,
    },
    {
      id: 5,
      switch: 1,
      profileImgUrl: "/assets/profile/profile1.png",
      user: "제로만먹음",
      date: "2024-07-30 14:00",
      content: "요즘 인터넷 너무 많이 해서 그런가 갑자기 상상력 늘어남;; ㅋㅋㅋ 친구들은 귀찮다고 안 받아줘서 걍 여기서 놀아야겠음",
      greetingCount: 6,
      goodByeCount: 3,
    },
  ];

  return (
    <div>
      <div className="w-full py-10 bg-yellow-100 flex flex-col justify-around items-center">
        <p className="py-2 text-center text-3xl font-bold">작별인사 게시판</p>
        <p className="py-2 text-center">N ↔ S가 바뀐 사람들이 인사하는 곳</p>
      </div>

      <div className="px-44">
        <div className="py-5 grid grid-cols-[1fr_2fr_1fr] gap-5">
          <div className="col-start-2">
            {byeContentList.map((content, index) => (
              <ByeContent content={content} key={index} />
            ))}
          </div>

          <div className="">
            <button
              className="w-full my-3 px-7 py-2 shadow-md rounded-2xl font-bold bg-amber-300 text-black"
              onClick={() => {
                setIsCreateModal(true);
              }}
            >
              작성하기
            </button>
          </div>
        </div>
      </div>

      {isCreateModal && <OkStartModal setIsCreateModal={setIsCreateModal} />}
    </div>
  );
};

export default ByeList;
