import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/home/Header";

function App() {
  return (
    <div>
      <Header></Header>
      <BrowserRouter>
        <Routes></Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
