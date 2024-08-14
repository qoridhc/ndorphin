import { useEffect, useState } from "react";

interface EndPageProps {
  setEndPageValue: (endPage: number) => void;
  currentEndPage: number | null;
  setCurrentEndPage: (endPage: number) => void;
}

function EndPage({ currentEndPage, setCurrentEndPage, setEndPageValue }: EndPageProps) {
  const [endPage, setEndPage] = useState([5, 10, 20, 30]);
  const [selectedEndPage, setSelectedEndPage] = useState<number | null>(null);

  useEffect(() => {
    setSelectedEndPage(currentEndPage);
    if (currentEndPage) {
      setEndPageValue(currentEndPage);
    }
  }, [currentEndPage]);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = Number(e.target.value);
    setSelectedEndPage(selectedValue);
    setEndPageValue(selectedValue);
    setCurrentEndPage(selectedValue);
  };

  return (
    <>
      {endPage.map((end) => (
        <div>
          <input type="radio" id={`${end}`} value={end} className="mr-2" checked={selectedEndPage === end} onChange={handleRadioChange}></input>
          <label htmlFor={`${end}`}>{end}장</label>
        </div>
      ))}
    </>
  );
}

export default EndPage;
