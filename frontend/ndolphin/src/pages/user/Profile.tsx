import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FollowList from "../../components/user/FollowList";
import RelayBookList from "../../components/user/RelayBookList";
import TopButton from "../../components/common/TopButton";
import OkList from "../../components/user/OkList";
import IfCardList from "../../components/user/IfCardList";
import ByeList from "../../components/user/ByeList";
import BalanceList from "../../components/user/BalanceList";
import UserInfoEditModal from "../../components/user/UserInfoEditModal";
import NSModal from "../../components/user/NSModal";
import userApi from "../../api/userApi";
import { error } from "console";

interface Follow {
  followId: number;
  followingId: number;
  followerId: number;
  createdAt: string;
}

interface UserInfo {
  id: number;
  nickName: string;
  profileImage: string;
  isFollowing: boolean;
}

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>(() => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get("tab") || "릴레이북";
  });
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollowModalOpen, setIsFollowModalOpen] = useState(false);
  const [activeFollowTab, setActiveFollowTab] = useState<string>("팔로워");

  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [nickName, setNickName] = useState<string | null>(null);
  const [mbti, setMbti] = useState<string | null>(null);
  const [npoint, setNpoint] = useState<number | null>(null);
  const [rank, setRank] = useState<number>(100);

  const [isUserInfoEditModalOpen, setIsUserInfoEditModalOpen] = useState(false);
  const [isNSModalOpen, setIsNSModalOpen] = useState(false);

  const [followings, setFollowings] = useState<number>(0);
  const [followers, setFollowers] = useState<number>(0);
  const [followingsList, setFollowingsList] = useState<UserInfo[]>([]);
  const [followersList, setFollowersList] = useState<UserInfo[]>([]);
  const [myFollow, setMyFollow] = useState(false);

  const userId = String(localStorage.getItem('userId'))

  useEffect(() => {
    const profileUserId = String(location.pathname.split('/')[2]);
    if (profileUserId === userId) {
      setIsOwnProfile(true);
      userApi.getUserInfo(profileUserId)
      .then(response => {
        if (response.data.code == 'SU') {
            const userInfo = response.data.data;
            setNickName(userInfo.nickName);
            setMbti(userInfo.mbti);
            setNpoint(userInfo.npoint);
            const getProfileImage = userInfo.profileImage
            if (getProfileImage) {
              setProfileImage(userInfo.profileImage);
            } else {
              setProfileImage("/assets/user/profile.png");
            }

            localStorage.setItem('nickName', userInfo.nickName);
            localStorage.setItem('mbti', userInfo.mbti);
            localStorage.setItem('npoint', userInfo.npoint.toString());
            localStorage.setItem("profileImage", getProfileImage);
          }
        })
        .catch(error => {
          console.error('Failed to fetch user info: ', error);
        });
    } else {
      setIsOwnProfile(false);
      userApi.getUserInfo(profileUserId)
        .then(response => {
          if (response.data.code == 'SU') {
            const userInfo = response.data.data;
            setNickName(userInfo.nickName);
            setMbti(userInfo.mbti);
            setNpoint(userInfo.npoint);
            const getProfileImage = userInfo.profileImage;
            if (getProfileImage) {
              setProfileImage(getProfileImage);
            } else {
              setProfileImage("/assets/user/profile.png");
            }
          }
        })
        .then(async () => {
          try {
            const followingList = await userApi.getFollowing(userId)
            const isFollowing = followingList.data.data.some((follow: any) => String(follow.followingId) === profileUserId);
            setMyFollow(isFollowing);
          } catch (error) {
            console.error('팔로잉 정보 조회 실패: ', error)
          }
        })
        .catch(error => {
          console.error('Failed to fetch user info: ', error);
          return new Promise<void>(resolve => {
            alert('유저 정보가 없습니다');
            resolve();
          }).then(() => {
            window.history.go(-1);
          })
        });
    }
  }, [location.pathname, userId]);

  // 팔로우 정보 받아오기
  useEffect(() => {
    const getfollowList = async (userId: string) => {
      const profileUserId = Number(location.pathname.split("/")[2]);
      try {
        const followingList = await userApi.getFollowing(userId);
        const followerList = await userApi.getFollower(profileUserId.toString());
        if (followingList.data.code === 'SU' && followerList.data.code === 'SU') {

          const followingListData = followingList.data.data as Follow[];
          const followerListData = followerList.data.data as Follow[];

          const fetchUserFollowingInfos = async (list: Follow[]): Promise<UserInfo[]> => {
            return Promise.all(
              list.map(async (item) => {
                const userFollowingResponse = await userApi.getUserInfo(String(item.followingId));
                const userFollowingResponseProfileImage = userFollowingResponse.data.data.profileImage;
                const isFollowing = followingList.data.data.some((follow: any) => follow.followingId === item.followingId);

                if (userFollowingResponseProfileImage) {
                  return {
                    id: item.followingId,
                    nickName: userFollowingResponse.data.data.nickName,
                    profileImage: userFollowingResponse.data.data.profileImage,
                    isFollowing,
                  };
                } else {
                  return {
                    id: item.followingId,
                    nickName: userFollowingResponse.data.data.nickName,
                    profileImage: "/assets/user/profile.png",
                    isFollowing,
                  };
                };
              })
            );
          };
          const fetchUserFollowerInfos = async (list: Follow[]): Promise<UserInfo[]> => {
            return Promise.all(
              list.map(async (item) => {
                const userFollowerResponse = await userApi.getUserInfo(String(item.followerId));
                const userFollowerResponseProfileImage = userFollowerResponse.data.data.profileImage;
                const isFollowing = followingList.data.data.some((follow: any) => follow.followingId === userFollowerResponse.data.data.userId);

                if (userFollowerResponseProfileImage) {
                  return {
                    id: item.followerId,
                    nickName: userFollowerResponse.data.data.nickName,
                    profileImage: userFollowerResponse.data.data.profileImage,
                    isFollowing,
                  };
                } else {
                  return {
                    id: item.followerId,
                    nickName: userFollowerResponse.data.data.nickName,
                    profileImage: "/assets/user/profile.png",
                    isFollowing,
                  };
                };
              })
            );
          };

          const followingsInfos = await fetchUserFollowingInfos(followingListData);
          const followersInfos = await fetchUserFollowerInfos(followerListData);

          setFollowings(followingList.data.data.length);
          setFollowers(followerList.data.data.length);
          setFollowingsList(followingsInfos);
          setFollowersList(followersInfos);

          const isFollow = followingList.data.data.some((follow: any) => follow.followingId === profileUserId);
          setIsFollowing(isFollow);
        }
      } catch (error) {
        console.error("팔로우 리스트 받기 실패: ", error);
      }
    };

    const profileUserId = location.pathname.split('/')[2];
    getfollowList(profileUserId as string);
  }, []);

  // 탭 정보를 URL쿼리에 저장(뒤로가거나 새로고침해도 상태 유지 가능)
  useEffect(() => {
    navigate({ search: `?tab=${selectedTab}` }, { replace: true });
  }, [selectedTab, navigate]);

  // N 지수
  useEffect(() => {
    const profileUserId = String(location.pathname.split("/")[2]);

    userApi.getNpointPercent(profileUserId as string)
      .then((res) => {
        const nPercent = res.data.data.userNPercent;
        setRank(nPercent)
      }).catch((err) => {
      console.error('N지수 불러오기 실패: ', err)
    })
  })

  const buttonClass = (tabName: string) => `relative px-4 py-2 ${selectedTab === tabName ? "text-black underline underline-offset-8 decoration-[#FFDE2F] decoration-4 duration-300" : "text-gray-400"}`;

  const handleClick = async () => {
    const followingId = location.pathname.split("/")[2];
    
    if (myFollow) {
      // 언팔로우 요청
      try {
        await userApi.unFollow(userId, followingId);
        setMyFollow(!myFollow);
      } catch (error) {
        console.error('언팔로우 에러: ', error)
      }
    } else {
      // 팔로우 요청
      try {
        await userApi
          .follow(userId, followingId)
          .then(() => {
            setMyFollow(!myFollow);
          })
          .then(() => {
            const writerId = Number(userId)
            userApi
              .getUserInfo(userId)
              .then((response) => {
                const responseUserData = response.data.data.nickName;
                const content = `${responseUserData}님이 회원님을 팔로우하기 시작했습니다`
                userApi
                  .postNotifications(followingId, content, writerId)
                  .then(() => {
                    console.log("알림 보내기 성공");
                  })
                  .catch((error) => {
                    console.error("알림 보내기 실패: ", error);
                  });
              })
              .catch((error) => {
              console.error('팔로우 알림 중 유저 정보 받아오기 실패: ', error)
            })
          })
          .catch((error) => {
            console.error('알림 실패: ', error)
          })
      } catch (error) {
        console.error('팔로우 에러: ', error)
      }
    }
    window.location.href = window.location.href;
  };

  const openFollowModal = (tab: string) => {
    setActiveFollowTab(tab);
    setIsFollowModalOpen(true);
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "릴레이북":
        return <RelayBookList />;
      case "만약에":
        return <IfCardList />;
      case "밸런스게임":
        return <BalanceList />;
      case "괜찮아":
        return <OkList />;
      case "작별인사":
        return <ByeList />;
      default:
        return null;
    }
  };

  const renderMbti = () => {
    if (!mbti) {
      return undefined;
    }
    if (mbti === 'N') {
      return "/assets/user/nbadge.png";
    } else if (mbti === 'S') {
      return "/assets/user/sbadge.png";
    }
    return undefined;
  };

  const handleEditProfileClick = () => {
    setIsUserInfoEditModalOpen(true);
  };

  const handleNSModalClick = () => {
    setIsNSModalOpen(true);
  };

  const closeUserInfoEditModal = () => {
    setIsUserInfoEditModalOpen(false);
  };

  const closeNSModal = () => {
    setIsNSModalOpen(false);
    window.location.href = window.location.href;
  };

  const handleFollowToggle = async (followUserId: number) => {
    try {
      const followingList = await userApi.getFollowing(userId)
      const isFollowing = followingList.data.data.some((follow: any) => String(follow.followingId) === String(followUserId));
      if (isFollowing) {
        await userApi.unFollow(userId, followUserId.toString());
      } else {
        await userApi.follow(userId, followUserId.toString());
      }
  
      // 상태 업데이트
      setIsFollowing(!isFollowing);
  
      // FollowList 모달의 리스트도 업데이트
      const updatedFollowingsList = followingsList.map((item) => 
        item.id === followUserId ? { ...item, isFollowing: !item.isFollowing } : item
      );
      const updatedFollowersList = followersList.map((item) => 
        item.id === followUserId ? { ...item, isFollowing: !item.isFollowing } : item
      );
      
      setFollowingsList(updatedFollowingsList);
      setFollowersList(updatedFollowersList);
  
    } catch (error) {
      console.error('팔로우 상태 변경 에러: ', error);
    }
  };

  return (
    <div className="container mx-auto px-4 hide-scrollbar">
      <div className="mt-12 gap-10 flex justify-center items-center">
        {/* 타입 단언하였지만 오류 나면 바꿀 예정(api로 가져올 때 null이면 에러날 듯) */}
        <img className="w-36 h-36 mr-6 border rounded-full" src={profileImage as string} alt="Profile" />
        <div>
          <h2 className="text-xl font-bold flex items-center">
            {nickName}
            {mbti && <img className="ml-2 w-8 h-8" src={renderMbti()} alt="badge" />}
            {/* 팔로우 버튼, 본인 일 땐 프로필 수정 버튼과 N/S 설문조사 버튼 */}
            {!isOwnProfile && (
              <button
                className={`ms-10 text-xs w-auto h-auto p-2 rounded-lg border-none shadow-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 ${
                  myFollow ? "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-300" : "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300"
                }`}
                onClick={handleClick}>
                {myFollow ? "팔로잉" : "팔로우"}
              </button>
            )}

            {isOwnProfile && (
              <div className="flex space-x-4 ms-10">
                <button
                  className="text-xs w-auto h-auto p-2 rounded-lg border-none shadow-md transition duration-200 ease-in-out bg-gray-300 text-[#565656] hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-300"
                  onClick={handleEditProfileClick}>
                  프로필 수정
                </button>
                <button
                  className="text-xs w-auto h-auto p-2 rounded-lg border-none shadow-md transition duration-200 ease-in-out bg-yellow-200 text-[#565656] hover:bg-yellow-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-300"
                  onClick={handleNSModalClick}>
                  N/S 설문조사
                </button>
              </div>
            )}
          </h2>
          <div className="flex mt-2 items-center space-x-10">
            <div className="flex flex-col items-center">
              <button onClick={() => openFollowModal("팔로워")}>{followers} followers</button>
              <div className="flex flex-col items-center mt-2">
                <p className="text-yellow-500 font-bold">N 포인트</p>
                <p className="font-bold">{npoint}</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <button onClick={() => openFollowModal("팔로잉")}>{followings} followings</button>
              <div className="flex flex-col items-center mt-2">
                <p className="text-yellow-500 font-bold">N 지수</p>
                <p className="font-bold">상위 {rank}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white border-b space-x-4 flex justify-center sticky top-0">
        <button
          className={buttonClass("릴레이북")}
          onClick={() => {
            setSelectedTab("릴레이북");
            window.scrollTo(0, 0);
          }}>
          릴레이북
        </button>
        <button
          className={buttonClass("만약에")}
          onClick={() => {
            setSelectedTab("만약에");
            window.scrollTo(0, 0);
          }}>
          만약에
        </button>
        <button
          className={buttonClass("밸런스게임")}
          onClick={() => {
            setSelectedTab("밸런스게임");
            window.scrollTo(0, 0);
          }}>
          밸런스게임
        </button>
        <button
          className={buttonClass("괜찮아")}
          onClick={() => {
            setSelectedTab("괜찮아");
            window.scrollTo(0, 0);
          }}>
          괜찮아
        </button>
        <button
          className={buttonClass("작별인사")}
          onClick={() => {
            setSelectedTab("작별인사");
            window.scrollTo(0, 0);
          }}>
          작별인사
        </button>
      </div>

      {/* 콘텐츠 공간 */}
      <div className="">{renderContent()}</div>

      <TopButton />
      <FollowList
        isOpen={isFollowModalOpen}
        onClose={() => setIsFollowModalOpen(false)}
        activeTab={activeFollowTab}
        setActiveTab={setActiveFollowTab}
        followingsList={followingsList}
        followersList={followersList}
        onFollowToggle={handleFollowToggle}
      />
      {isUserInfoEditModalOpen && <UserInfoEditModal isOpen={isUserInfoEditModalOpen} onNext={() => closeUserInfoEditModal()} setProfileImage={setProfileImage} onClose={closeUserInfoEditModal} />}
      {isNSModalOpen && <NSModal isOpen={isNSModalOpen} onClose={closeNSModal} mode={"profile"} />}
    </div>
  );
};

export default Profile;
