import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ByeList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  if (isLoading) {
    return <div className="mt-40 text-center text-3xl font-bold">로딩 중...</div>;
  }

  return (
    <div></div>
  );
};

export default ByeList;
