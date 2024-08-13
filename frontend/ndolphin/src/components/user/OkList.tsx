import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OkList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <div className="mt-40 text-center text-3xl font-bold">로딩 중...</div>;
  }

  return (
    <div className="px-96">
      {/* {okContentList.map((content, index) => (
        <OkContent content={content} key={index} />
      ))} */}
    </div>
  );
};

export default OkList;
