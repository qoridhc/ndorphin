import React from "react";

const RelayListLoading = () => {
  return (
    <div className="grid gap-4">
      <div className="skeleton h-64 w-60"></div>
      <div className="grid gap-3">
        <div className="skeleton h-4 w-36"></div>
        <div className="skeleton h-4 w-28"></div>
      </div>
    </div>
  );
};

export default RelayListLoading;
