// import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/home/Header";
import Relaybooklist from "./pages/relay/RelayBookList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/relaybooklist" element={<Relaybooklist />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
