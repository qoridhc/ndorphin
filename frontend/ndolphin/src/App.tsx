// import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Header from "./components/home/Header";
import RelayBookList from "./pages/relay/RelayBookList";
import RelayBookStart from "./components/relay/BookStartContainer";
import RelayBookDetail from "./pages/relay/RelayBookDetail";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/relaybooklist" element={<RelayBookList />}></Route>
          <Route path="/relaybookstart" element={<RelayBookStart />}></Route>
          <Route path="/relaybookdetail/:id" element={<RelayBookDetail />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// const RelayBookDetailWrapper: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const book = {};
//   return <RelayBookDetail book={book} />
// }

export default App;
