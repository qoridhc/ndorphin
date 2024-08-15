import React from "react";

const ListLoading = () => {
  return (
    <div className="grid grid-cols-[1fr_9fr] gap-4">
      <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
      <div className="grid gap-3">
        <div className="skeleton h-4 w-36"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-32 w-full"></div>
      </div>
    </div>
  );
};

export default ListLoading;
