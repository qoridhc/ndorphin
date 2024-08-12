import React from "react";
import SwiperBalance from "./SwiperBalance";

const BestBalance = () => {
  return (
    <div className="px-44 py-14 grid grid-cols-3 gap-3">
      <SwiperBalance startIndex={0} delay={1500} />
      <SwiperBalance startIndex={1} delay={1500} />
      <SwiperBalance startIndex={2} delay={1500} />
    </div>
  );
};

export default BestBalance;
