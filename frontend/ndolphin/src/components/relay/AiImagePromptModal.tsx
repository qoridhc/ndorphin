import { IoMdClose } from "react-icons/io";
import { IoImageOutline } from "react-icons/io5";
import axios from "axios";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import dalleLoading from "../../lottie/dalleLoading.json";

interface BookCoverAiPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (image: string) => void;
  setFile: (file: File | null) => void;
  setImage: any;
  image: any;
  coverImage: any;
}

const BookCoverAiPromptModal: React.FC<BookCoverAiPromptModalProps> = ({ isOpen, onClose, onConfirm, setFile, coverImage }) => {
  const API_KEY = process.env.REACT_APP_OPEN_AI_APIKEY;
  const [imageUrl, setImageUrl] = useState("");
  const [inputPrompt, setInputPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const loadingTextList = ["열심히 만드는 중이에요!", "조금만 더 기다려 주세요!", "거의 다 됐어요!"];

  const generateImage = () => {
    setIsLoading(true);

    axios
      .post(
        "https://api.openai.com/v1/images/generations",
        {
          prompt: `${inputPrompt}`,
          n: 1,
          model: "dall-e-3",
          size: "1024x1024",
          response_format: "b64_json",
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res: any) => {
        const json = res.data.data[0].b64_json;
        const base64Data = json;

        // base64 문자열에서 데이터를 추출합니다.
        const byteString = atob(base64Data);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }

        // Blob 객체를 생성합니다.
        const blob = new Blob([ab], { type: "image/jpeg" });

        // Blob 객체를 파일로 변환합니다.
        const dallefile = new File([blob], "image.jpg", { type: "image/jpeg" });

        if (dallefile) {
          setFile(dallefile);
          const reader = new FileReader();
          reader.onloadend = () => {
            const result = reader.result as string;
            setImageUrl(result);
          };
          reader.readAsDataURL(dallefile);
        }
      })
      .catch((err: any) => {
        console.error("Error:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (isLoading) {
      setInterval(() => setLoadingTextIndex((prev) => (prev + 1) % 3), 5000);
    }
  }, [isLoading]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      {/* 모달 */}
      <div className="w-2/5 flex flex-col items-center bg-white p-5 rounded-3xl shadow-lg">
        {/* 닫기 버튼 */}
        <div className="w-full flex justify-end">
          <button
            onClick={() => {
              onClose();
              setInputPrompt("");
              setImageUrl("");
            }}>
            <IoMdClose className="text-2xl" />
          </button>
        </div>

        <div className="w-full h-[450px] flex flex-col justify-around items-center">
          <h2 className="flex justify-center text-lg font-bold">AI로 이미지를 만들어 추가해보세요</h2>
          {imageUrl ? (
            <img src={imageUrl} alt="coverImage" className="h-3/5 border rounded-md" />
          ) : isLoading ? (
            <div className="h-3/5 border border-[#9E9E9E] rounded-md aspect-2 flex flex-col justify-center items-center">
              <p className="text-lg text-center font-semibold">{loadingTextList[loadingTextIndex]}</p>
              <Lottie className="w-36" animationData={dalleLoading} />
            </div>
          ) : (
            <div className="h-3/5 text-[#9E9E9E] aspect-2 border border-[#9E9E9E] rounded-md flex flex-col justify-center items-center">
              <IoImageOutline className="text-7xl" />
              <p className="mt-5 text-lg font-medium">이미지를 첨부해 주세요</p>
            </div>
          )}

          <div className="relative w-full flex py-3 text-left text-sm border border-zinc-400 rounded-3xl bg-zinc-100">
            <input
              disabled={isLoading}
              onChange={(e) => {
                setInputPrompt((e.target as HTMLInputElement).value);
              }}
              className={`mx-6 w-[80%] bg-zinc-100 outline-none text-left ${isLoading ? "opacity-50" : ""}`}
              type="text"
              placeholder="만들고 싶은 이미지를 설명해 주세요"
              value={inputPrompt}></input>
            <button
              disabled={isLoading}
              onClick={() => {
                generateImage();
                setInputPrompt("");
                setImageUrl("");
              }}>
              <img className={`absolute top-[0.45rem] right-6 w-8 ${isLoading ? "opacity-50" : ""}`} src="/assets/aiImageCreate.png" alt="" />
            </button>
          </div>
          <hr className="w-full" />
          <div className="">
            <button
              disabled={isLoading}
              onClick={() => {
                onConfirm(imageUrl);
              }}
              className={`bg-amber-400 text-white px-10 py-2 rounded-xl ${isLoading ? "opacity-50" : ""}`}>
              <p className="font-bold">저장</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCoverAiPromptModal;
