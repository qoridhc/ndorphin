import React, { useRef, useState, useCallback, ForwardedRef } from "react";
import UserInfo from "./UserInfo";
import RelayBookPageUpdate from "./BookPageCRUD/RelayBookPageUpdate";

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

const BookDetailPage = React.forwardRef<HTMLDivElement, BookDetailPageProps>(({ number, children, page, totalPage }, ref: ForwardedRef<HTMLDivElement>) => {
  const [pageUpdate, setPageUpdate] = useState(false);

  return (
    <div className="page" ref={ref}>
      {pageUpdate ? <RelayBookPageUpdate setPageUpdate={setPageUpdate} /> : <>{number === totalPage + 1 ? null : <UserInfo user={page.user} userId={page.userId} setPageUpdate={setPageUpdate} />}</>}
      {!pageUpdate && <div className="h-full">{children}</div>}
      {pageUpdate || number === totalPage + 1 ? null : <div className="page-footer">{number}</div>}
    </div>
  );
});


export default BookDetailPage;
