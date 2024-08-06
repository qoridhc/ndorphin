import { Fragment } from "react/jsx-runtime";
import BookDetailPage from "../../components/relay/BookDetailPage";

interface RelayBookProps {
  pages: any[];
  bookId: string | undefined;
  handleAiImage: any;
  image: string | null;
  setImage: any;
}

const RelayBook = ({ pages, bookId, handleAiImage, image, setImage }: RelayBookProps) => {
  return (
    <>
      {pages.length > 0 && pages.map((page, index) => (
        <BookDetailPage key={page.commentId} bookId={bookId} number={index + 1} page={page} totalPage={pages.length} handleAiImage={handleAiImage} image={image} setImage={setImage}>
          <div className="py-3">
            {(index + 1) % 2 == 1 ? (
              <div className="p-2 grid grid-rows-[6.8fr_3.2fr]">
                {/* 홀수쪽일 경우 그림, 글 순서 */}
                <div className="w-full h-72 flex justify-center">{page.contentFileUrl && <img className="w-[78%] object-cover" src={page.contentFileUrl} alt="" />}</div>
                <p className="h-full mx-10 relaybookpagenotes text-sm text-justify">{page.content}</p>
              </div>
            ) : (
              <div className="p-2 grid grid-rows-[3.2fr_6.8fr]">
                {/* 짝수쪽일 경우 글, 그림 순서 */}
                <p className="h-full mx-10 relaybookpagenotes text-sm text-justify">{page.content}</p>
                <div className="w-full h-72 flex justify-center">{page.contentFileUrl && <img className="w-[78%] object-cover" src={page.contentFileUrl} alt="" />}</div>
              </div>
            )}
          </div>
        </BookDetailPage>
      ))}
    </>
  );
};

export default RelayBook;
