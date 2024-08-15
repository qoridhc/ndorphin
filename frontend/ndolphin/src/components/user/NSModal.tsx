import React, { useState, useEffect, MouseEvent } from "react";
import userApi from "../../api/userApi";
import { IoMdClose } from "react-icons/io";

interface NSModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "profile" | "survey";
}

interface NSItem {
  id: number;
  text: string;
}

const NSModal: React.FC<NSModalProps> = ({ isOpen, onClose, mode }) => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setSelectedItems([]);

      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        setUserId(storedUserId);
      }
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const nsItems: NSItem[] = [
    { id: 1, text: "내가 게임\n캐릭터가\n된다면?" },
    { id: 2, text: "공룡이 내 눈\n앞에 있다면?" },
    { id: 3, text: "갑자기\n싸우는 상상" },
    { id: 4, text: "갑자기\n투명인간이\n된다면?" },
    { id: 5, text: "엄청난\n초능력을\n가진다면?" },
    { id: 6, text: "내가 대머리가\n되는 상상" },
    { id: 7, text: "비행기가\n갑자기 추락하면\n어떡하지?" },
    { id: 8, text: "무인도에\n갇힌다면?" },
    { id: 9, text: "좀비가 생기면\n어떻게\n생존할까?" },
    { id: 10, text: "다른 사람이랑\n몸이 바뀐다면?" },
    { id: 11, text: "풍선들고\n날아간다면?" },
    { id: 12, text: "샤워하다가\n귀신이 나타나면 어떡하지?" },
    { id: 13, text: "동물이랑 대화할 수 있으면?" },
    { id: 14, text: "길 가다가\n범죄자를\n잡는 나" },
    { id: 15, text: "내가 연예인이\n된다면?" },
    { id: 16, text: "내가\n거인/소인이\n된다면?" },
  ];

  const handleItemClick = (id: number) => {
    setSelectedItems((prevSelectedItems) => (prevSelectedItems.includes(id) ? prevSelectedItems.filter((itemId) => itemId !== id) : [...prevSelectedItems, id]));
  };

  const handleSubmit = async () => {
    const nsValue = selectedItems.length >= 6 ? "N" : "S";

    if (userId) {
      const formData = new FormData();
      const requestBody = {
        mbti: nsValue,
      };
      formData.append("request", new Blob([JSON.stringify(requestBody)], { type: "application/json" }));

      try {
        const response = await userApi.update(userId, formData);
        if (response.status === 200) {
          localStorage.setItem("mbti", nsValue);
          onClose();
        }
      } catch (error) {
        console.error("NS 값 전송 오류 : ", error);
      }
    }
  };

  const handleSkip = () => {
    localStorage.setItem("nsValue", "");
    onClose();
  };

  const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={onClose}>
      <div className="w-11/12 max-w-md bg-white rounded-lg shadow-lg" onClick={handleModalClick}>
        <div className="p-4 border-b flex justify-between items-center relative">
          <h2 className="text-lg font-semibold text-center flex-grow">N/S 선택</h2>
          {mode === "profile" && <IoMdClose className="absolute right-5 object-cover" onClick={onClose} />}
        </div>
        <div className="p-6 text-center">
          {mode === "survey" ? (
            <p className="mb-4 font-semibold">
              거의 다 됐어요!
              <br />
              해당되거나 흥미 가는 것을 골라주세요!
            </p>
          ) : (
            <p className="mb-4 font-semibold">해본 적이 있는 만약에를 골라주세요!</p>
          )}
          <div className="grid grid-cols-4 gap-2">
            {nsItems.map((item) => (
              <div className="relative w-full h-24 border border-[#9E9E9E] rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100" key={item.id} style={{ whiteSpace: "pre-wrap" }} onClick={() => handleItemClick(item.id)}>
                {selectedItems.includes(item.id) && <img className="absolute inset-0 w-full h-full" src="/assets/favicon.png" alt="선택" style={{ objectFit: "contain" }} />}
                <span className="relative z-10 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
          {mode === "survey" && (
            <div className="mt-4 flex justify-center space-x-1">
              <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
              <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
            </div>
          )}
          {mode === "survey" && (
            <div className="mt-6 flex justify-between">
              <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg text-sm" onClick={handleSkip}>
                건너뛰기
              </button>
              <button className="px-4 py-2 bg-yellow-400 text-white rounded-lg text-sm hover:bg-yellow-500" onClick={handleSubmit}>
                완료
              </button>
            </div>
          )}
          {mode === "profile" && (
            <button className="mt-4 px-4 py-2 bg-yellow-400 text-white rounded-lg text-sm hover:bg-yellow-500" onClick={handleSubmit}>
              완료
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NSModal;
