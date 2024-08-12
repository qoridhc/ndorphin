import React, { useEffect, useState, ChangeEvent, FocusEvent, KeyboardEvent } from "react";
import userApi from "../../api/userApi";
import { IoMdClose, IoMdCloseCircleOutline, IoMdCloseCircle } from "react-icons/io";
import { userInfo } from "os";
import { error } from "console";

interface UserInfoEditModalProps {
  isOpen: boolean;
  onNext: () => void;
  setProfileImage: (image: string | null) => void;
  onClose?: () => void;
}

const UserInfoEditModal: React.FC<UserInfoEditModalProps> = ({ isOpen, onNext, setProfileImage, onClose }) => {
  const [profileImage, localSetProfileImage] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [nicknamePlaceholder, setNicknamePlaceholder] = useState<string>("닉네임을 입력해 주세요(2~10글자)");
  const [nickname, setNickname] = useState<string>("");
  const [isNicknameValid, setIsNicknameValid] = useState<boolean | null>(null);
  const [nicknameMessage, setNicknameMessage] = useState<string>("");
  const [isNicknameChecked, setIsNicknameChecked] = useState<boolean>(false);
  const [isImageChecked, setIsImageChecked] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>();
  const [image, setImage] = useState<string | null>(null);
  const [isCloseHovered, setIsCloseHovered] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // 모달이 열린 상태에서 스크롤바 숨김
      document.body.style.overflow = "hidden";

      // localStorage에서 프로필 이미지 가져오기
      const storedProfileImage = localStorage.getItem("profileImage");
      if (storedProfileImage === "null") {
        localSetProfileImage("/assets/user/profile.png");
        setImage(null);
      } else {
        localSetProfileImage(storedProfileImage);
        setImage(storedProfileImage);
      }
      const storedNickname = localStorage.getItem("nickname");
      if (storedNickname) {
        setNickname(storedNickname);
        setIsNicknameChecked(true);
        setIsNicknameValid(true);
        setNicknameMessage("사용 가능한 닉네임입니다");
      }
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImage(null);
        localSetProfileImage(result);

        if (onClose) {
          setIsImageChecked(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    setNicknamePlaceholder("");
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      setNicknamePlaceholder("닉네임을 입력해 주세요(2~10글자)");
    }
  };

  const handleNicknameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length <= 10) {
      setNickname(value);
      setIsNicknameValid(null);
      setNicknameMessage("");
      setIsNicknameChecked(false);
    }
  };

  const checkNinameDuplicate = async () => {
    const trimNickname = nickname.trim();
    if (trimNickname.length < 2 || trimNickname.length > 10) {
      setIsNicknameValid(false);
      setNicknameMessage("닉네임은 2~10글자여야 합니다");
      setIsNicknameChecked(false);
      return;
    }

    if (trimNickname.includes(" ")) {
      setIsNicknameValid(false);
      setNicknameMessage("닉네임 사이의 공백은 허용되지 않습니다");
      setIsNicknameChecked(false);
      return;
    }

    try {
      const response = await userApi.checkNickname(trimNickname);
      setIsNicknameValid(true);
      setNicknameMessage("사용 가능한 닉네임입니다");
      setIsNicknameChecked(true);
    } catch (error) {
      console.error("닉네임 중복 확인 오류: ", error);
      setIsNicknameValid(false);
      setNicknameMessage("이미 사용 중인 닉네임입니다");
      setIsNicknameChecked(false);
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      checkNinameDuplicate();
    }
  };

  const handleUserUpdate = async () => {
    if (!isImageChecked && (!isNicknameValid || !isNicknameChecked)) {
      alert("닉네임을 다시 확인해 주세요");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) throw new Error("User ID not found");

    const formData = new FormData();

    const trimNickname = nickname.trim();
    if (trimNickname) {
      const requestBody = {
        nickName: trimNickname,
      };
      formData.append("request", new Blob([JSON.stringify(requestBody)], { type: "application/json" }));
    } else {
      const requestBody = {
        nickName: localStorage.getItem("nickName"),
      };
      formData.append("request", new Blob([JSON.stringify(requestBody)], { type: "application/json" }));
    }

    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await userApi.update(userId, formData);
      if (response.status === 200) {
        userApi
          .getUserInfo(userId)
          .then((response) => {
            if (response.data.code == "SU") {
              const userInfo = response.data.data;
              localStorage.setItem("nickName", userInfo.nickName);
              localStorage.setItem("profileImage", userInfo.profileImage);
              setProfileImage(userInfo.profileImage);
            }
          })
          .then(() => {
            setTimeout(() => {
              window.location.reload();
            }, 50);
          })
          .catch((error) => {
            console.error("Failed to fetch user info: ", error);
          });

        if (onClose) {
          onClose();
        } else {
          onNext();
        }
      }
    } catch (error) {
      console.log("회원정보 수정 오류: ", error);
      alert("회원정보 수정 중 오류가 발생했습니다.");
    }
  };

  const deleteProfileImage = () => {
    const userId = localStorage.getItem("userId");
    userApi
      .deleteProfileImage(userId as string)
      .then(() => {
        setImage(null);
        setProfileImage("/assets/user/profile.png");
        localSetProfileImage("/assets/user/profile.png");
        localStorage.setItem("profile", "null");
      })
      .then(() => {
        userApi
          .getUserInfo(userId as string)
          .then((res) => {
            localStorage.setItem("nickName", res.data.data.nickName);
            localStorage.setItem("profileImage", res.data.data.profileImage);
            setProfileImage(res.data.data.profileImage);
          })
          .catch((error) => {
            console.error('이미지 삭제 시 유저 정보 불러오기 실패: ', error)
          })
      .then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 50);
      })
      })
      .catch((error) => {
        console.error("프로필 이미지 삭제 오류: ", error);
      });
  };

  const deleteUser = () => {
    const userId = localStorage.getItem('userId');
    userApi.deleteUser(userId as string)
  };

  const isNextButtonEnabled = isImageChecked || (isNicknameValid && isNicknameChecked);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
      <div className="w-100 bg-white rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 border-b shadow-lg flex justify-between items-center relative">
          <h2 className="text-lg font-semibold flex-grow text-center">프로필 이미지 및 닉네임 설정</h2>
          {onClose && <IoMdClose className="absolute right-5" onClick={onClose} />}
        </div>
        <div className="p-6 text-center">
          <p className="mb-4 font-semibold">
            <span className="inline-block">
              <span className="relative">
                <span className="underline decoration-yellow-300 decoration-4">N돌핀</span>
                에서 사용할 프로필 사진과 닉네임을 설정해 주세요!
              </span>
            </span>
          </p>
          <div className="flex flex-col items-center space-y-2">
            <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              <label htmlFor="image-input">
                <img className="cursor-pointer w-32 h-32 object-cover rounded-full" src={profileImage || "/assets/user/profile.png"} alt="기본이미지" />
                {isHovered && (
                  <div className="absolute inset-0 bg-gray-300 bg-opacity-50 flex justify-center items-center rounded-full">
                    <img src="/assets/user/upload_icon.png" alt="업로드 아이콘" className="w-8 h-8" />
                  </div>
                )}
              </label>
              <input className="hidden" id="image-input" type="file" accept="image/*" onChange={handleImageChange} />
            </div>

            {onClose && image && (
              <div className="py-1 text-red-200 hover:text-red-400 cursor-pointer" onClick={deleteProfileImage}>프로필 이미지 삭제</div>
            )}

            <input
              className="w-72 border-b rounded-lg text-center text-sm focus:outline-none"
              type="text"
              placeholder={nicknamePlaceholder}
              value={nickname}
              onChange={handleNicknameChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyPress={handleKeyPress}
            />
            <div>
              <p>{isNicknameValid !== null && <span className={`text-xs ${isNicknameValid ? "text-green-500" : "text-red-500"}`}>{nicknameMessage}</span>}</p>
              <button className="border rounded-lg mt-2 px-3 py-1 text-xs" onClick={checkNinameDuplicate}>
                중복확인
              </button>
            </div>
          </div>
          <div className="relative">
            {!onClose && (
              <div className="mt-4 flex justify-center space-x-2">
                <span className="bg-gray-400 w-2 h-2 rounded-full"></span>
                <span className="bg-gray-300 w-2 h-2 rounded-full"></span>
              </div>
            )}
            {onClose && (
              <div className="flex justify-center gap-4">
                <button className="mt-6 rounded-lg px-4 py-2 border border-gray-300 hover:bg-gray-300 hover:text-white" onClick={onClose}>
                  취소
                </button>
                <button className={`mt-6 rounded-lg px-4 py-2 ${isNextButtonEnabled ? "bg-yellow-300 text-white cursor-pointer" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`} onClick={handleUserUpdate} disabled={!isNextButtonEnabled}>
                  완료
                </button>
              </div>
            )}
            {onClose && (
              <button className="absolute bottom-1 left-1 underline text-red-300 hover:text-red-500" onClick={deleteUser}>
                회원탈퇴
              </button>
            )}
            {!onClose && (
              <button className={`mt-6 rounded-lg px-4 py-2 ${isNextButtonEnabled ? "bg-yellow-300 text-white cursor-pointer" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`} onClick={handleUserUpdate} disabled={!isNextButtonEnabled}>
                다음
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoEditModal;
