// import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/home/Header";
import RelayBookList from "./pages/relay/RelayBookList";
import RelayBookStart from "./pages/relay/RelayBookStart";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/relaybooklist" element={<RelayBookList />}></Route>
          <Route path="/relaybookstart" element={<RelayBookStart />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
