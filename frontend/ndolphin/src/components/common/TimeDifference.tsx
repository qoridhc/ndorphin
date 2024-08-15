import React from "react";

interface TimeDifferenceProps {
  timestamp: Date;
}

const TimeDifference: React.FC<TimeDifferenceProps> = ({ timestamp }) => {
  const getTimeDifference = (timestamp: Date): string => {
    const now = new Date();
    const diffInSeconds = (now.getTime() - timestamp.getTime()) / 1000;
    const diffInDays = Math.floor(diffInSeconds / 86400);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInSeconds < 60) return "방금 전";
    if (diffInSeconds < 600) return `${Math.floor(diffInSeconds / 60)}분 전`;
    if (diffInSeconds < 3600) return `${Math.ceil(diffInSeconds / 60)}분 전`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}시간 전`;
    if (diffInDays < 31) return `${diffInDays}일 전`;
    if (diffInDays < 365) return `${diffInMonths}개월 전`;
    if (diffInYears > 1) return `${diffInYears}년 전`;

    return "1년 전";
  };

  return <span className="text-xs">{getTimeDifference(timestamp)}</span>;
};

export default TimeDifference;
