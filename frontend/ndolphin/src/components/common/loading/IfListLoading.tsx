import React from "react";

const IfListLoading = () => {
  return (
    <div className="grid gap-4">
      <div className="grid gap-3">
        <div className="skeleton h-9 w-9 shrink-0 rounded-full"></div>
        <div className="skeleton h-4 w-36"></div>
        <div className="skeleton h-4 w-28"></div>
      </div>
      <div className="skeleton h-32 w-full"></div>
    </div>
  );
};

export default IfListLoading;
