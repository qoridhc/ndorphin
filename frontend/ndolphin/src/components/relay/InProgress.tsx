import Filter from "../common/Filter"
import Book from "./Book"

function InProgress() {
  return (
    <div>
      <Filter />
      <div className="flex justify-center"> 
        <Book />
        <Book />
        <Book />
        <Book />
      </div>
      <div className="flex justify-center"> 
        <Book />
        <Book />
        <Book />
        <Book />
      </div>
      <div className="flex justify-center"> 
        <Book />
        <Book />
        <Book />
        <Book />
      </div>
    </div>
  )
}

export default InProgress;