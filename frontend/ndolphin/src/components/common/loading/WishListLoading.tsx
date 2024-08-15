import React from "react";

const WishListLoading = () => {
  return (
    <div className="flex gap-10 gap-y-4 my-4">
      <div className="skeleton h-80 w-60"></div>
      <div className="gap-y-3">
        <div className="skeleton h-8 w-60"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton mt-40 h-20 w-full"></div>
      </div>
    </div>
  );
};

export default WishListLoading;
