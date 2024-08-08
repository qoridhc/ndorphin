import React, { useState, useEffect, MouseEvent } from "react";
import userApi from "../../api/userApi";

interface NSModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'profile' | 'survey';
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
    { id: 1, text: "창의력이\n좋다" },
    { id: 2, text: "새로운 경험\n중시" },
    { id: 3, text: "분위기\n중시" },
    { id: 4, text: "미래 중시" },
    { id: 5, text: "추상 예술\n선호" },
    { id: 6, text: "부분보다\n전체" },
    { id: 7, text: "상상을\n자주 함" },
    { id: 8, text: "SF 장르\n선호" },
    { id: 9, text: "분석 관심" },
    { id: 10, text: "변화 선호" },
    { id: 11, text: "지적 호기심\n강함" },
    { id: 12, text: "새로운 관점\n제시" },
    { id: 13, text: "창작 활동\n선호" },
    { id: 14, text: "10년 후\n상상" },
    { id: 15, text: "만약에가\n재밌음" },
    { id: 16, text: "이야기\n좋아함" },
  ];

  const handleItemClick = (id: number) => {
    setSelectedItems((prevSelectedItems) => (prevSelectedItems.includes(id) ? prevSelectedItems.filter((itemId) => itemId !== id) : [...prevSelectedItems, id]));
  };

  const handleSubmit = async () => {
    const nsValue = selectedItems.length >= 10 ? "N" : "S";

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
          <h2 className="text-lg font-semibold text-center flex-grow">N/S 선택 미니 설문조사</h2>
          {mode === 'profile' && (
            <button className=" absolute top-4 right-6 text-gray-500 hover:text-gray-700" onClick={onClose}>X</button>
          )}
        </div>
        <div className="p-6 text-center">
          {mode === 'survey' && (
            <p className="mb-4 font-semibold">거의 다 됐어요!</p>
          )}
          <div className="grid grid-cols-4 gap-2">
            {nsItems.map((item) => (
              <div className="relative w-full h-24 bg-blue-100 rounded-lg flex items-center justify-center cursor-pointer" key={item.id} style={{ whiteSpace: 'pre-wrap' }} onClick={() => handleItemClick(item.id)}>
                {selectedItems.includes(item.id) && <img className="absolute inset-0 w-full h-full" src="/assets/user/stamp.png" alt="도장" style={{ objectFit: "contain" }} />}
                <span className="relative z-10">{item.text}</span>
              </div>
            ))}
          </div>
          {mode === 'survey' && (
            <div className="mt-4 flex justify-center space-x-1">
              <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
              <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
            </div>
          )}
          {mode === 'survey' && (
            <div className="mt-6 flex justify-between">
              <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg text-sm" onClick={handleSkip}>
                건너뛰기
              </button>
              <button className="px-4 py-2 bg-yellow-400 text-white rounded-lg text-sm" onClick={handleSubmit}>
                완료
              </button>
            </div>
          )}
          {mode === 'profile' && (
            <button className="mt-4 px-4 py-2 bg-yellow-400 text-white rounded-lg text-sm" onClick={handleSubmit}>
              완료
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NSModal;
