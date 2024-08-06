// import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Header from "./components/home/Header";
import Home from "./pages/Home";
import RelayBookList from "./pages/relay/RelayBookList";
import RelayBookStart from "./pages/relay/RelayBookStart";
import RelayBookUpdate from "./pages/relay/RelayBookUpdate";
import RelayBookDetail from "./pages/relay/RelayBookDetail";
import IfList from "./pages/if/IfList";
import IfStart from "./pages/if/IfStart";
import IfDetail from "./pages/if/IfDetail";
import Profile from "./pages/user/Profile";
import OkList from "./pages/ok/OkList";
import OkDetail from "./pages/ok/OkDetail";
import ByeList from "./pages/bye/ByeList";
import WishList from "./pages/user/WishList";
import DalleTest from "./pages/DalleTest";
import BalanceList from "./pages/balance/BalanceList";
import BalanceDetail from "./pages/balance/BalanceDetail";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/relaybooklist" element={<RelayBookList />}></Route>
          <Route path="/relaybookstart" element={<RelayBookStart />}></Route>
          <Route path="/relaybookupdate/:id" element={<RelayBookUpdate />}></Route>
          <Route path="/relaybookdetail/:bookId" element={<RelayBookDetail />}></Route>
          <Route path="/iflist" element={<IfList />}></Route>
          <Route path="/ifstart" element={<IfStart />}></Route>
          <Route path="/ifdetail/:boardId" element={<IfDetail />}></Route>
          <Route path="/balancelist" element={<BalanceList />}></Route>
          <Route path="/balancedetail/:id" element={<BalanceDetail />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/oklist" element={<OkList />}></Route>
          <Route path="/okdetail/:id" element={<OkDetail />}></Route>
          <Route path="/bye" element={<ByeList />}></Route>
          <Route path="/wishlist" element={<WishList />}></Route>
          <Route path="/dalle" element={<DalleTest />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
