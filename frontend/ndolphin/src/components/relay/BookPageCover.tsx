import React, { useRef, useState, useCallback, ForwardedRef } from "react";

const BookPageCover = React.forwardRef<HTMLDivElement>((props, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <div className="cover" ref={ref} data-density="hard">
      <div className="h-full flex flex-col items-center justify-around">
        <img src="/assets/relayStartSample.png" width="300px" alt="#"></img>
        <h2>책 표지</h2>
      </div>
    </div>
  );
});

export default BookPageCover;
