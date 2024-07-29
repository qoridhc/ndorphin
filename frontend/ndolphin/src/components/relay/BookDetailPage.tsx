import React, { useRef, useState, useCallback, ForwardedRef } from "react";
import UserInfo from "./UserInfo";

interface BookDetailPageProps {
  number?: number;
  children?: React.ReactNode;
  page: {
    id: number;
    userId: number;
    user: string;
    content: string;
    pageImage: string;
  };
  totalPage: number;
}

const BookDetailPage = React.forwardRef<HTMLDivElement, BookDetailPageProps>((props, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <div className="page" ref={ref}>
      {props.number == props.totalPage + 1 ? <></> : <UserInfo user={props.page.user} userId={props.page.userId} />}
      <div className="h-full">{props.children}</div>
      {props.number == props.totalPage + 1 ? <></> : <div className="page-footer">{props.number}</div>}
    </div>
  );
});

export default BookDetailPage;
