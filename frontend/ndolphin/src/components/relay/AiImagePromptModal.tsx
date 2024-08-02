import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { useState } from "react";

interface BookCoverAiPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (image: string) => void;
  setImage: any;
  image: any;
  coverImage: any;
}

const BookCoverAiPromptModal: React.FC<BookCoverAiPromptModalProps> = ({ isOpen, onClose, onConfirm, setImage, image, coverImage }) => {
  const API_KEY = process.env.REACT_APP_OPEN_AI_APIKEY;
  const [imageUrl, setImageUrl] = useState("");
  const [inputPrompt, setInputPrompt] = useState("")

  const generateImage = () => {
    axios
      .post(
        "https://api.openai.com/v1/images/generations",
        {
          prompt: `${inputPrompt}`,
          n: 1,
          model: "dall-e-3",
          size: "1024x1024",
          // quality: "HD"
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res: any) => {
        const imageUrl = res.data.data[0].url;
        console.log(imageUrl);
        setImageUrl(imageUrl);
      })
      .catch((err: any) => {
        console.error("Error:", err);
      });
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      {/* 모달 */}
      <div className="w-2/5 flex flex-col items-center bg-white p-5 rounded-3xl shadow-lg">
        {/* 닫기 버튼 */}
        <div className="w-full flex justify-end">
          <button onClick={onClose}>
            <IoMdClose className="text-2xl" />
          </button>
        </div>

        <div className="w-full h-96 flex flex-col justify-around items-center">
          <div className="flex flex-col justify-around">
            <h2 className="flex justify-center text-md font-bold mb-4">AI로 이미지를 만들어 추가해보세요</h2>
            <img src={imageUrl || coverImage} alt="coverImage" className="w-[22rem] h-60 border rounded-md" />
          </div>

          <div className="relative w-full flex justify-center">
            <input
              onChange={(e) => {
                setInputPrompt((e.target as HTMLInputElement).value);
              }}
              className="w-[95%] py-3 px-4 text-left text-sm border border-zinc-400 rounded-3xl bg-zinc-100 outline-none"
              type="text"
              placeholder="만들고 싶은 이미지를 설명해 주세요"
              value={inputPrompt}></input>
            <img
              onClick={() => {
                generateImage();
                setInputPrompt("");
              }}
              className="absolute top-[0.45rem] right-8 w-8 hover:cursor-pointer"
              src="/assets/aiImageCreate.png"
              alt=""
            />
          </div>

          <hr className="w-full" />
        </div>
        <div className="mt-4">
          <button
            onClick={() => {
              onConfirm(imageUrl);
            }}
            className="bg-amber-400 text-white px-10 py-2 rounded-xl mr-2">
            <p className="font-bold">저장</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCoverAiPromptModal;
