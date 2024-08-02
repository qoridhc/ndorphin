import { useState } from "react";
import axios from "axios";

function DalleTest() {
  const API_KEY = process.env.REACT_APP_OPEN_AI_APIKEY;
  const [imageUrl, setImageUrl] = useState("");

  const generateImage = () => {
    axios
      .post(
        "https://api.openai.com/v1/images/generations",
        {
          prompt: "책 표지를 만들어줘 제목을 상단에 크게 적어줘. 책 제목은 미용실에 가고 싶은 늑대, 글쓴이는 박예진",
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

  return (
    <div>
      <button onClick={generateImage}>이미지 생성</button>
      {imageUrl && <img src={imageUrl} alt="image" />}
    </div>
  );
}

export default DalleTest;