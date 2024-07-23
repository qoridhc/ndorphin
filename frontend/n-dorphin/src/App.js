import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/common/Header";

function App() {
  return (
    <div>
      <Header></Header>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<A />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
