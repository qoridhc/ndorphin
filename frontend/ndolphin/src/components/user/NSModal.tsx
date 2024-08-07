import React, { useState, useEffect } from "react";
import userApi from "../../api/userApi";

interface NSModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NSItem {
  id: number;
  text: string;
}

const NSModal: React.FC<NSModalProps> = ({ isOpen, onClose }) => {
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
    { id: 1, text: "창의력이 좋다" },
    { id: 2, text: "새로운 경험 중시" },
    { id: 3, text: "분위기 중시" },
    { id: 4, text: "미래 중시" },
    { id: 5, text: "추상 예술 선호" },
    { id: 6, text: "부분보다 전체" },
    { id: 7, text: "상상을 자주 함" },
    { id: 8, text: "SF 장르 선호" },
    { id: 9, text: "분석 관심" },
    { id: 10, text: "변화 선호" },
    { id: 11, text: "지적 호기심 강함" },
    { id: 12, text: "새로운 관점 제시" },
    { id: 13, text: "창작 활동 선호" },
    { id: 14, text: "10년 후 상상" },
    { id: 15, text: "만약에가 재밌음" },
    { id: 16, text: "이야기 좋아함" },
  ];

  const handleItemClick = (id: number) => {
    setSelectedItems((prevSelectedItems) => (prevSelectedItems.includes(id) ? prevSelectedItems.filter((itemId) => itemId !== id) : [...prevSelectedItems, id]));
  };

  const handleSubmit = async () => {
    const nsValue = selectedItems.length >= 10 ? "N" : "S";
    localStorage.setItem("nsValue", nsValue);

    if (userId) {
      try {
        const formData = new FormData();
        formData.append("mbti", nsValue);

        await userApi.update(userId, formData);
        onClose();
      } catch (error) {
        console.error("NS 값 전송 오류 : ", error);
        alert("설문 전송 중 오류가 발생했습니다");
      }
    }
  };

  const handleSkip = () => {
    localStorage.setItem("nsValue", "");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="w-11/12 max-w-md bg-white rounded-lg shadow-lg">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold text-center flex-grow">N/S 선택 미니 설문조사</h2>
        </div>
        <div className="p-6 text-center">
          <p className="mb-4 font-semibold">거의 다 됐어요!</p>
          <div className="grid grid-cols-4 gap-2">
            {nsItems.map((item) => (
              <div className="relative w-full h-24 bg-blue-100 rounded-lg flex items-center justify-center cursor-pointer" key={item.id} onClick={() => handleItemClick(item.id)}>
                {selectedItems.includes(item.id) && <img className="absolute inset-0 w-full h-full" src="/assets/user/stamp.png" alt="도장" style={{ objectFit: "contain" }} />}
                <span className="relative z-10">{item.text}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center space-x-1">
            <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
            <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
          </div>
          <div className="mt-6 flex justify-between">
            <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg text-sm" onClick={handleSkip}>
              건너뛰기
            </button>
            <button className="px-4 py-2 bg-yellow-400 text-white rounded-lg text-sm" onClick={handleSubmit}>
              완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NSModal;
