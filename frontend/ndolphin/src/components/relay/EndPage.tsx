import { useState } from "react";

function EndPage() {
  const [endPage, setEndPage] = useState([5, 10, 20, 30]);
  const [selectedEndPage, setSelectedEndPage] = useState<number | null>(null);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedEndPage(Number(e.target.value));
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
