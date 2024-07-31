import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookList from "../../components/relay/BookList";

interface BookList {
  id: number;
  bookImgUrl: string;
  title: string;
  isFinished: boolean;
  isLike: boolean;
  isHovered: boolean;
  userProfileImg: string;
  userName: string;
  summary: string;
}

const WishList = () => {
  const navigate = useNavigate();
  const [isLike, setIsLike] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const fullHeart = "/assets/relay/fullheart.png";
  const emptyHeart = "/assets/relay/emptyheart.png";

  const initialBooks: BookList[] = [];
  for (let i = 0; i < 5; i++) {
    initialBooks.push({
      id: i,
      bookImgUrl: "assets/cover.jpg",
      title: "제목",
      isFinished: isFinished,
      isLike: isLike,
      isHovered: isHovered,
      userProfileImg: "assets/profile/profile1.png",
      userName: "최초 작성자",
      summary:
        "일본 최고의 베스트셀러 작가 히가시노 게이고의 최신 장편소설『당신이 누군가를 죽였다』가 북다에서 출간되었다. 작품은 장르문학계의 거장인 작가가 101번째 작품을 맞아 추리소설의 원점으로 돌아가 ‘황금시대 미스터리’의 매력을 유감없이 발휘한 걸작으로 평단과 독자의 호평을 받고 있다. 1986년 발표된 『졸업』을 시작으로 장장 38년째 이어진 히가시노 게이고 미스터리의 정수인 〈가가 형사 시리즈〉 열두 번째 작품이기도 한 신작은, 2023년 출간 즉시 일본 서점 미스터리 판매 전체 1위를 석권하며 세월이 지나도 변치 않는 시리즈의 인기를 증명했다. 『당신이 누군가를 죽였다』는 호화 별장지에 여름 휴가를 온 다섯 가족의 파티로 시작한다. 하지만 그날 밤, 다섯 명이 살해당하고 한 명이 다치는 사건이 벌어지고, 살아남은 사람들은 참극의 진상을 밝히기 위해 검증회를 연다. 그 자리에 장기 휴가 중이던 형사 ‘가가 교이치로’가 참석하고, 그는 사람들이 저마다 감추고 있던 비밀을 파헤치기 시작한다.",
    });
  }

  const [books, setBooks] = useState<BookList[]>(initialBooks);

  const handleLikeClick = (id: number, event: React.MouseEvent<HTMLImageElement>) => {
    event.stopPropagation();
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, isLike: !book.isLike } : book
      )
    );
  };

  const handleMouseEnter = (id: number) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, isHovered: true } : book
      )
    );
  };

  const handleMouseLeave = (id: number) => {
    setBooks((prevBooks) => prevBooks.map((book) => (book.id === id ? { ...book, isHovered: false } : book)));
  };

  return (
    <div className="container mx-auto flex flex-col items-center">
      <div className="w-full border-b border-black flex flex-col items-center">
        <h1 className="my-12 text-center text-4xl font-semibold">내가 찜한 목록</h1>
      </div>
      {/* 찜 목록이 비어있을 때 */}
      <div className="w-full mt-32 flex flex-col items-center justify-center">
        <img className="w-36 h-36" src="assets/user/emptyList.png" alt="Empty List" />
        <p className="mt-8 text-center text-3xl">목록이 비어있어요</p>
        <button className="mt-3 hover:underline text-center text-3xl text-gray-300" onClick={() => navigate("/relaybooklist")}>
          릴레이 북 바로가기
        </button>
      </div>
      <div className="m-5"></div>
      {/* 찜 목록이 있을 때 */}
      {books.map((book) => (
        <div className="w-2/3 px-8 py-8 border-b border-black gap-16 flex" key={book.id} onClick={() => navigate(`/relaybookdetail/${book.id}`)}>
          <img className="w-60 h-72" src={book.bookImgUrl} alt="책 표지" />
          <div>
            <div className="py-2 flex justify-between items-center">
              <div className="gap-4 flex items-center">
                <p className="text-3xl font-semibold">{book.title}</p>
                {book.isFinished ? <p className="text-gray-400 text-sm">완성</p> : <p className="text-gray-400 text-sm">미완성</p>}
              </div>
              <img className="w-12 h-12 hover:cursor-pointer" src={book.isLike ? fullHeart : emptyHeart} alt="#" onClick={(event) => handleLikeClick(book.id, event)} onMouseEnter={() => handleMouseEnter(book.id)} onMouseLeave={() => handleMouseLeave(book.id)} />
            </div>
            <div className="mt-4 mb-20 gap-4 flex items-center">
              <img className="w-6 h-6 rounded-full" src={book.userProfileImg} alt="유저 프로필" />
              <p className="text-base">{book.userName}</p>
            </div>
            <p className="line-clamp-3 text-xl">{book.summary}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WishList;
