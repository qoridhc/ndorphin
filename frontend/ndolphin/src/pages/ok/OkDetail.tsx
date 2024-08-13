import React, { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router";
import boardApi from "../../api/boardApi";
import commentApi from "../../api/commentApi";
import OkDetailModal from "../../components/ok/OkDetailModal";
import { FaArrowLeftLong, FaRegComment } from "react-icons/fa6";
import SettingsMenu from "../../components/if/CommentSettingMenu";
import { useNavigate } from "react-router";

interface BoardDetail {
  id: number;
  user: {
    nickName: string;
    mbti: string;
    profileImage: string | null;
  };
  createdAt: string;
  content: string;
  fileUrls: string[];
  commentCnt: number;
  commentResponseDtos: Comment[];
}

interface Comment {
  commentId: number;
  user: {
    profileImage: string | null;
    nickName: string;
  };
  content: string;
  createAt: string;
}

const OkDetail = () => {
  const navigate = useNavigate();
  const { boardId } = useParams();
  const [selectedImageList, setSelectedImageList] = useState<string[] | null>(null);
  const [selectedImageListIndex, setSelectedImageListIndex] = useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [okDetail, setOkDetail] = useState<BoardDetail | null>(null);
  const [commentContent, setCommentContent] = useState<string>("");

  const getOkDetail = async () => {
    try {
      if (boardId) {
        const response = await boardApi.read(boardId);
        const newList = response.data.data;
        setOkDetail(newList);
        console.log("괜찮아 게시판 상세 페이지", newList);
      }
    } catch (error) {
      console.error("괜찮아 상세 조회 오류 발생", error);
    }
  };

  useEffect(() => {
    getOkDetail();
  }, [boardId]);

  const okContentList = [
    {
      id: 1,
      profileImgUrl: "/assets/profile/profile3.png",
      user: "상상의 나무꾼",
      date: "2024-07-30 01:22",
      content: "5일 전에 사랑니 뺐는데 왜 안아프죠..? 만약에 갑자기 내일 죽을정도로 아프진 않겠죠?? 드라이소켓이라는 병도 있던데 ㅜㅜ 아직 아프진 않는데.. 하도 안아파서 만약에 아프면 엄청 아플거 같은데..",
      imgList: [
        {
          id: 1,
          imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3AwHJ2UrkzSv6PqPhCBZGRR8RrpQNCuDAxg&s",
        },
      ],
      joinCount: 12,
      commentData: [
        {
          id: 1,
          profileImgUrl: "/assets/profile/profile1.png",
          user: "상상의 나무꾼",
          content: "이참에 티라노 사우르스랑 싸워고 평생 안주감 어때 이참에 영웅놀이 해보자 진심 어때",
          date: "2024-07-29 21:02",
        },
        {
          id: 2,
          profileImgUrl: "/assets/profile/profile2.png",
          user: "만약핑인데",
          content: "허허허..... 하루만 더 생각좀.. 생각이 많아지는 만약에 잘썼다",
          date: "2024-07-29 21:02",
        },
        {
          id: 3,
          profileImgUrl: "/assets/profile/profile3.png",
          user: "별이 빛나는 밤",
          content: "혹시 무기 있음? 있으면 내가 영웅할게",
          date: "2024-07-29 21:02",
        },
      ],
    },
    {
      id: 2,
      profileImgUrl: "/assets/profile/profile2.png",
      user: "삶은계란",
      date: "2024-07-29 01:22",
      content: "어제 계란을 삶았는데 냉장고에 안넣었거든요 오늘 먹어도 되나요?? 만약에 배탈나면 어떡해요 ㅠ 요즘 날 더워서 조심해야되는데 만약에 배탈나서 맹장터지고!!",
      imgList: [
        {
          id: 1,
          imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1DZxbcaol1q-N-iA_jJkk95PssTlYXMobyA&s",
        },
        {
          id: 2,
          imgUrl: "https://img.freepik.com/premium-photo/burnt-hard-boiled-eggs-pot-eggs-burned-by-boiling-until-water-dries_45264-78.jpg",
        },
        {
          id: 3,
          imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQXLssi3iB0pd0cNqThGw-X1bg8WMPOaKCaQ&s",
        },
        {
          id: 4,
          imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYCPaPeFrnWYu9EYHBBDKcdOORiGhvosNZBg&s",
        },
      ],
      joinCount: 0,
      commentData: [
        {
          id: 1,
          profileImgUrl: "/assets/profile/profile1.png",
          user: "상상의 나무꾼",
          content: "이참에 티라노 사우르스랑 싸워고 평생 안주감 어때 이참에 영웅놀이 해보자 진심 어때",
          date: "2024-07-29 21:02",
        },
        {
          id: 2,
          profileImgUrl: "/assets/profile/profile2.png",
          user: "만약핑인데",
          content: "허허허..... 하루만 더 생각좀.. 생각이 많아지는 만약에 잘썼다",
          date: "2024-07-29 21:02",
        },
        {
          id: 3,
          profileImgUrl: "/assets/profile/profile3.png",
          user: "별이 빛나는 밤",
          content: "혹시 무기 있음? 있으면 내가 영웅할게",
          date: "2024-07-29 21:02",
        },
      ],
    },
    {
      id: 3,
      profileImgUrl: "/assets/profile/profile5.png",
      user: "근데 말약에",
      date: "2024-06-29 01:22",
      content: "오늘 일어났는데 다래끼 났어요 다래끼 너무 커지면 어떻게 돼요 ㅠㅠㅠ 수술해요?? 만약에 다래끼 안빠지면 어떡하지 ㅠ 저 내일 초등학교 졸업사진 찍어요",
      imgList: [
        {
          id: 1,
          imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUzn7lDyMA6kHGqAVj_Gd3p59vnhMwuvXb-g&s",
        },
        {
          id: 2,
          imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGa_e2SL0_u_Hb_SKanee1SDVSpUog7rdQMg&s",
        },
      ],
      joinCount: 5,
      commentData: [
        {
          id: 1,
          profileImgUrl: "/assets/profile/profile1.png",
          user: "상상의 나무꾼",
          content: "이참에 티라노 사우르스랑 싸워고 평생 안주감 어때 이참에 영웅놀이 해보자 진심 어때",
          date: "2024-07-29 21:02",
        },
        {
          id: 2,
          profileImgUrl: "/assets/profile/profile2.png",
          user: "만약핑인데",
          content: "허허허..... 하루만 더 생각좀.. 생각이 많아지는 만약에 잘썼다",
          date: "2024-07-29 21:02",
        },
        {
          id: 3,
          profileImgUrl: "/assets/profile/profile3.png",
          user: "별이 빛나는 밤",
          content: "혹시 무기 있음? 있으면 내가 영웅할게",
          date: "2024-07-29 21:02",
        },
      ],
    },
    {
      id: 4,
      profileImgUrl: "/assets/profile/profile2.png",
      user: "만약핑인데",
      date: "2024-07-30 14:00",
      content: "제가 어제 청소를 한다고 냉동실 문을 열었는데 오늘 출근할 때 냉동실 문을 닫았는지 기억이 안나요2박동안 집에 안들어 갈 예정인데 냉동실 문 열려있으면 어떡하죠 안에 있는 거 다 녹고 전기세도 만만치 않죠 ..o..",
      imgList: [
        {
          id: 1,
          imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRH6Fk1AXjnDQT9WZgqO_VPigAdxSQst7qvQ&s",
        },
        {
          id: 2,
          imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAxWBeSt1k9cOrUcNEvuOaBD2RMiLtmRX98g&s",
        },
        {
          id: 3,
          imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRH6Fk1AXjnDQT9WZgqO_VPigAdxSQst7qvQ&s",
        },
      ],
      joinCount: 3,
      commentData: [
        {
          id: 1,
          profileImgUrl: "/assets/profile/profile1.png",
          user: "상상의 나무꾼",
          content: "이참에 티라노 사우르스랑 싸워고 평생 안주감 어때 이참에 영웅놀이 해보자 진심 어때",
          date: "2024-07-29 21:02",
        },
        {
          id: 2,
          profileImgUrl: "/assets/profile/profile2.png",
          user: "만약핑인데",
          content: "허허허..... 하루만 더 생각좀.. 생각이 많아지는 만약에 잘썼다",
          date: "2024-07-29 21:02",
        },
        {
          id: 3,
          profileImgUrl: "/assets/profile/profile3.png",
          user: "별이 빛나는 밤",
          content: "혹시 무기 있음? 있으면 내가 영웅할게",
          date: "2024-07-29 21:02",
        },
      ],
    },
  ];

  const handleselectedImageList = (currentIndex: number) => {
    if (okDetail && okDetail.fileUrls) {
      setSelectedImageList(okDetail.fileUrls);
    }
    setSelectedImageListIndex(currentIndex);
  };

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    // const text = event.target.value.length;
    // setTextCount(text);
    const rows = event.target.value.split(/\r\n|\r|\n/).length;
    setRowCount(rows);
    const commentValue = event.target.value;
    setCommentContent(commentValue)
  };

  useEffect(() => {
    const targetTextarea = document.querySelector(`#target`) as HTMLTextAreaElement | null;
    if (targetTextarea) {
      targetTextarea.style.height = rowCount * 28 + "px";
    }
  }, [rowCount]);

  const renderImages = () => {
    if (!okDetail || !okDetail.fileUrls.length) return null;

    switch (okDetail && okDetail.fileUrls.length) {
      case 1:
        return <img className="w-full rounded-md object-cover cursor-pointer" src={okDetail.fileUrls[0]} alt="" onClick={() => handleselectedImageList(0)} />;

      case 2:
        return (
          <div className="grid grid-cols-2 gap-1">
            {okDetail.fileUrls.map((url, idx) => (
              <img className={`w-full h-72 object-cover ${idx === 0 ? "rounded-tl-md rounded-bl-md" : "rounded-tr-md rounded-br-md"} cursor-pointer`} src={url} alt="" key={idx} onClick={() => handleselectedImageList(idx)} />
            ))}
          </div>
        );

      case 3:
        return (
          <div className="grid grid-rows-2 grid-cols-2 gap-1">
            {okDetail.fileUrls.map((url, idx) => (
              <img
                className={`w-full h-${idx === 0 ? "full" : "36"} object-cover ${idx === 0 ? "row-span-2 rounded-tl-md rounded-bl-md" : idx === 1 ? "rounded-tr-md" : "rounded-br-md"} cursor-pointer`}
                src={url}
                alt=""
                key={idx}
                onClick={() => handleselectedImageList(idx)}
              />
            ))}
          </div>
        );

      case 4:
        return (
          <div className="grid grid-cols-2 gap-1">
            {okDetail.fileUrls.map((url, idx) => (
              <img
                className={`w-full h-36 object-cover ${idx === 0 ? "rounded-tl-md" : idx === 1 ? "rounded-tr-md" : idx === 2 ? "rounded-bl-md" : "rounded-br-md"} cursor-pointer`}
                src={url}
                alt=""
                key={idx}
                onClick={() => handleselectedImageList(idx)}
              />
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const handleCommentAdd = async () => {
    const formData = new FormData();

    formData.append(
      "request",
      new Blob(
        [
          JSON.stringify({
            content: commentContent,
          }),
        ],
        { type: "application/json" }
      )
    );

    try {
      if (boardId) {
        const response = await commentApi.create(boardId, formData);
        if (response.status === 200 && response.data) {
          console.log("괜찮아 댓글 작성 성공");
          window.location.reload();
        }
      }
    } catch (error) {
      console.error("괜찮아 댓글 작성 오류: ", error);
    }
  };

  return (
    <div className="px-44 py-5 grid grid-cols-[1fr_2fr_1fr] gap-5">
      <div className="col-start-2">
        <button className="py-4 flex" onClick={() => navigate("/oklist")}>
          <FaArrowLeftLong className="text-3xl" />
          <p className="px-3 text-xl font-bold">괜찮아 게시판</p>
        </button>
        <div className="border-t border-x">
          <div className="p-5 border-b flex">
            {okDetail && okDetail.user.profileImage && <img className="w-9 h-9 mr-3 rounded-full" src={okDetail.user.profileImage} alt="" />}

            <div className="grid gap-3">
              <div>
                <p className="font-bold">{okDetail && okDetail.user.nickName}</p>
                <p className="text-sm font-semibold text-[#565656]">{okDetail && okDetail.createdAt}</p>
              </div>

              <p className="font-medium text-justify leading-snug">{okDetail && okDetail.content}</p>

              {renderImages()}

              <div className="flex items-center">
                <FaRegComment />
                {okDetail && okDetail.commentCnt === 0 ? <></> : <p className="px-1 text-[#565656] font-semibold">{okDetail && okDetail.commentCnt}</p>}
              </div>
            </div>
          </div>

          <div className="p-5 border-b">
            <div className="flex">
              {/* <img className="w-11 h-11 mr-3 rounded-[50%]" src={`${userData.profileImgUrl}`} alt="" /> */}
              <textarea className="w-full min-h-10 text-xl outline-none resize-none" placeholder="댓글을 작성해 주세요" id="target" onChange={(e) => handleTextareaChange(e)} />
            </div>
            <div className="flex justify-end">
              <button onClick={handleCommentAdd} className="w-16 text-[#6C6C6C] font-semibold border-solid border-2 border-[#FFDE2F] rounded-md hover:text-white hover:bg-[#FFDE2F] duration-200">
                등록
              </button>
            </div>
          </div>

          {okDetail &&
            okDetail.commentResponseDtos &&
            okDetail.commentResponseDtos.map((comment) => (
              <div className="p-5 border-b flex" key={comment.commentId}>
                <img className="w-9 h-9 mr-3 rounded-[50%]" src={`${comment.user.profileImage}`} alt="" />

                <div className="w-full grid gap-2">
                  <div className="grid grid-cols-[6fr_1fr]">
                    <div className="flex flex-col justify-around">
                      <p className="font-bold">{comment.user.nickName}</p>
                      <p className="text-xs text-[#565656]">3일 전</p>
                    </div>
                    {/* <SettingsMenu /> */}
                  </div>

                  <p className="text-[#565656] font-medium text-justify">{comment.content}</p>

                  <p className="text-sm text-[#565656] text-right">{comment.createAt}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* {selectedImageList && <OkDetailModal content={okContentList[1]} selectedImageList={selectedImageList} selectedImageListIndex={selectedImageListIndex} setSelectedImageList={setSelectedImageList} />} */}
    </div>
  );
};

export default OkDetail;
