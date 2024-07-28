import "../../css/Text.css";
import { useState } from "react";
import { useNavigate } from "react-router";

function AddPage() {
  const [pageAdd, setPageAdd] = useState(false);
  const navigate = useNavigate();
  const handleNavigate = () => {
    window.open("http://localhost:3000/relaybookaddpage/1");
  }

  return (
    <>
      {pageAdd === false ? (
        <div className="h-[90%] flex flex-col justify-center items-center gap-2">
          <div className="flex flex-col items-center gap-6">
            <button
              onClick={() => {
                navigate("/relaybookaddpage/1");
              }}
              className="w-[30%]"
            >
              <img src="/assets/addPageButton.png" alt="#" />
            </button>
            <p className="text-outline text-2xl font-bold drop-shadow-md text-[#F4D325]">버튼을 눌러 페이지 추가</p>
          </div>
          <p className="font-bold text-zinc-600">N돌핀이 넘치는 다음 이야기를 이어주세요</p>
        </div>
      ) : (
        <div>
        </div>
      )}
    </>
  );
}

export default AddPage;
