// import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Header from "./components/home/Header";
import Home from "./pages/Home";
import RelayBookList from "./pages/relay/RelayBookList";
import RelayBookStart from "./pages/relay/RelayBookStart";
import RelayBookDetail from "./pages/relay/RelayBookDetail";
import IfList from "./pages/if/IfList";
import IfStart from "./pages/if/IfStart";
import IfDetail from "./pages/if/IfDetail";
import Profile from "./pages/user/Profile";
import OkList from "./pages/ok/OkList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/relaybooklist" element={<RelayBookList />}></Route>
          <Route path="/relaybookstart" element={<RelayBookStart />}></Route>
          <Route path="/relaybookdetail/:id" element={<RelayBookDetail />}></Route>
          <Route path="/iflist" element={<IfList />}></Route>
          <Route path="/ifstart" element={<IfStart />}></Route>
          <Route path="/ifdetail/:id" element={<IfDetail />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/oklist" element={<OkList />}></Route>
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
