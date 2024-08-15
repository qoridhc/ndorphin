import React from "react";

const BalanceListLoading = () => {
  return (
    <div className="grid gap-4">
      <div className="skeleton h-40 w-60"></div>
      <div className="grid gap-3 gap-y-5">
        <div className="flex gap-2">
          <div className="skeleton w-4 h-4 rounded-full"></div>
          <div className="skeleton h-4 w-36"></div>
        </div>
        <div className="skeleton h-8 w-60"></div>
      </div>
    </div>
  );
};

export default BalanceListLoading;
