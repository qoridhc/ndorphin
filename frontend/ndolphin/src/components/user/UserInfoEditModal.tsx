import React, { useEffect, useState, ChangeEvent, FocusEvent, KeyboardEvent } from "react";
import userApi from "../../api/userApi";

interface UserInfoEditModalProps {
  isOpen: boolean;
  onNext: () => void;
  setProfileImage: (image: string | null) => void;
}

const UserInfoEditModal: React.FC<UserInfoEditModalProps> = ({ isOpen, onNext, setProfileImage }) => {
  const [profileImage, localSetProfileImage] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [nicknamePlaceholder, setNicknamePlaceholder] = useState<string>("닉네임을 입력해 주세요(2~10글자)");
  const [nickname, setNickname] = useState<string>("");
  const [isNicknameValid, setIsNicknameValid] = useState<boolean | null>(null);
  const [nicknameMessage, setNicknameMessage] = useState<string>("");
  const [isNicknameChecked, setIsNicknameChecked] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (isOpen) {
      // 모달이 열린 상태에서 스크롤바 숨김
      document.body.style.overflow = "hidden";

      // localStorage에서 프로필 이미지 가져오기
      const storedProfileImage = localStorage.getItem("profileImage");
      if (storedProfileImage) {
        localSetProfileImage(storedProfileImage);
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

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const result = reader.result as string;
        localSetProfileImage(result);
        setProfileImage(result);

        const response = await fetch(result);
        const data = await response.blob();
        const ext = file.name.split(".").pop();
        const filename = file.name;
        const metadata = { type: `image/${ext}` };
        const newFile = new File([data], filename!, metadata);
        setFile(newFile);

        localStorage.setItem("profileImage", result);
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
    setNickname(event.target.value);
    setIsNicknameValid(null);
    setNicknameMessage("");
    setIsNicknameChecked(false);
  };

  const checkNinameDuplicate = async () => {
    const trimNickname = nickname.trim();
    if (trimNickname.length < 2 || trimNickname.length > 10) {
      setIsNicknameValid(false);
      setNicknameMessage("닉네임은 2~10글자여야 합니다");
      setIsNicknameChecked(false);
      return;
    }

    try {
      const response = await userApi.checkNickname(trimNickname);
      setIsNicknameValid(true);
      setNicknameMessage("사용 가능한 닉네임입니다");
      setIsNicknameChecked(true);
      localStorage.setItem("nickName", trimNickname);
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
    if (!isNicknameValid || !isNicknameChecked) {
      alert("닉네임을 다시 확인해 주세요");
      return;
    }

    console.log("함수 진입");

    try {
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("User ID not found");

      console.log("시도");

      const formData = new FormData();

      const requestBody = {
        email: localStorage.getItem("email"),
        profileImage: localStorage.getItem("profileImage"),
        nickName: nickname.trim(),
        mbti: localStorage.getItem("mbti"),
        role: "USER",
        npoint: localStorage.getItem("npoint"),
      };

      formData.append("request", new Blob([JSON.stringify(requestBody)], { type: "application/json" }));

      console.log("리퀘스트바디 추가");

      if (file) {
        formData.append("file", file);
      }

      console.log("요청 전");

      const response = await userApi.update(userId, formData);

      if (response.status === 200) {
        console.log("성공");
      }
      setProfileImage(profileImage);
      onNext();
    } catch (error) {
      console.log("회원정보 수정 오류: ", error);
      alert("회원정보 수정 중 오류가 발생했습니다.");
    }
  };

  const isNextButtonEnabled = isNicknameValid && isNicknameChecked;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-100 bg-white rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 border-b shadow-lg flex justify-between items-center">
          <div className="w-8"></div>
          <h2 className="text-lg font-semibold flex-grow text-center">프로필 이미지 및 닉네임 설정</h2>
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
              <label htmlFor="profile-image-input">
                <img className="cursor-pointer w-32 h-32 object-cover rounded-full" src={profileImage || "/assets/user/profile.png"} alt="기본이미지" />
                {isHovered && (
                  <div className="absolute inset-0 bg-gray-300 bg-opacity-50 flex justify-center items-center rounded-full">
                    <img src="/assets/user/upload_icon.png" alt="업로드 아이콘" className="w-8 h-8" />
                  </div>
                )}
              </label>
              <input className="hidden" id="profile-image-input" type="file" accept="image/*" onChange={handleImageChange} />
            </div>
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
            <div className="flex items-center">
              {isNicknameValid !== null && <span className={`ml-2 text-xs ${isNicknameValid ? "text-green-500" : "text-red-500"}`}>{nicknameMessage}</span>}
              <button className="border rounded-lg px-3 py-1 text-xs" onClick={checkNinameDuplicate}>
                중복확인
              </button>
            </div>
          </div>
          <div className="mt-4 flex justify-center space-x-2">
            <span className="bg-gray-400 w-2 h-2 rounded-full"></span>
            <span className="bg-gray-300 w-2 h-2 rounded-full"></span>
          </div>
          <button className={`mt-6 rounded-lg px-4 py-2 ${isNextButtonEnabled ? "bg-yellow-300 text-white cursor-pointer" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`} onClick={handleUserUpdate} disabled={!isNextButtonEnabled}>
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfoEditModal;
