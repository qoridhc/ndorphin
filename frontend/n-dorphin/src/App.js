import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>hello world!</h1>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<A />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
