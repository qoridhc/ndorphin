// import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/home/Header";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          {/* <Route path="/example" element={<Example />}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
