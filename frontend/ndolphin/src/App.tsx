import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, useParams, useNavigate } from "react-router-dom";
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
import BalanceStart from "./pages/balance/BalanceStart";

const useAuth = () => {
  const auth = localStorage.getItem('accessToken');
  return !!auth;
};

const ProtectedRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
  const isAuthenticated = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      window.alert("로그인 후 이용 가능합니다");
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  return isAuthenticated ? element : null;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/relaybooklist" element={<ProtectedRoute element={<RelayBookList />} />} />
          <Route path="/relaybookstart" element={<ProtectedRoute element={<RelayBookStart />} />} />
          <Route path="/relaybookupdate/:bookId" element={<ProtectedRoute element={<RelayBookUpdate />} />} />
          <Route path="/relaybookdetail/:bookId" element={<ProtectedRoute element={<RelayBookDetail />} />} />
          <Route path="/iflist" element={<ProtectedRoute element={<IfList />} />} />
          <Route path="/ifstart" element={<ProtectedRoute element={<IfStart />} />} />
          <Route path="/ifdetail/:boardId" element={<ProtectedRoute element={<IfDetail />} />} />
          <Route path="/balancelist" element={<ProtectedRoute element={<BalanceList />} />} />
          <Route path="/balancestart" element={<ProtectedRoute element={<BalanceStart />} />} />
          <Route path="/balancedetail/:boardId" element={<ProtectedRoute element={<BalanceDetail />} />} />
          <Route path="/profile/:userId" element={<ProtectedRoute element={<Profile />} />} />
          <Route path="/oklist" element={<ProtectedRoute element={<OkList />} />} />
          <Route path="/okdetail/:boardId" element={<ProtectedRoute element={<OkDetail />} />} />
          <Route path="/bye" element={<ProtectedRoute element={<ByeList />} />} />
          <Route path="/wishlist" element={<ProtectedRoute element={<WishList />} />} />
          <Route path="/dalle" element={<ProtectedRoute element={<DalleTest />} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
