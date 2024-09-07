import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Layout from './layout/Layout';
import MainPage from './pages/MainPage';
import AboutPage from './pages/AboutPage';
import PostsListPage from './pages/PostsListPage';
import PostCreatePage from './pages/PostCreatePage';
import SearchPage from './pages/SearchPage';
import PostDetailPage from './pages/PostDetailPage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import OrderCompletePage from './pages/OrderCompletePage';
import RegisterPage from './pages/RegisterPage';
import MyPage from './pages/MyPage';
import Admin from './layout/Admin';
import AdminPage from './pages/adminPages/AdminPage';
import AdminAlluserPage from './pages/adminPages/AdminAlluserPage';
import AdminSellerPage from './pages/adminPages/AdminSellerPage';
import AdminSellerComplaintPage from './pages/adminPages/AdminSellerComplaintPage';
import AdminBlacklistPage from './pages/adminPages/AdminBlacklistPage';
import AdminOrderLogsPage from './pages/adminPages/AdminOrderLogsPage';
import store from './store';
import SellersPage from './pages/SellersPage';
import SellListPage from './pages/SellListPage';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* 메인페이지 */}
              <Route index element={<MainPage />} />
              {/* 소개페이지 */}
              <Route path="/about" element={<AboutPage />} />
              {/* 상품 목록 페이지 */}
              <Route
                path="/posts/list/:page/:categoryId"
                element={<PostsListPage />}
              />
              {/* 검색 결과 페이지 */}
              <Route path="/posts/list/:page" element={<SearchPage />} />
              {/* 판매글 작성 페이지 */}
              <Route path="/posts/create" element={<PostCreatePage />} />
              {/* 상품 상세 페이지 */}
              <Route path="/posts/page/:postId" element={<PostDetailPage />} />
              {/* 장바구니 페이지 */}
              <Route path="/cart" element={<CartPage />} />
              {/* 결제 페이지 */}
              <Route path="/order" element={<OrderPage />} />
              {/* 결제 완료 페이지 */}
              <Route
                path="/order/complete/:allOrderId"
                element={<OrderCompletePage />}
              />
              {/* 회원가입 페이지 */}
              <Route path="/user/register" element={<RegisterPage />} />
              {/* 마이페이지 */}
              <Route path="/mypage" element={<MyPage />} />
              {/* 판매자 등록 페이지 */}
              <Route path="/sellers" element={<SellersPage />} />
              {/* 판매내역 리스트 페이지 */}
              <Route path="/mypage/salehistory" element={<SellListPage />} />
              {/* 관리자페이지 */}
              <Route path="/admin" element={<Admin />}>
                <Route path="/admin" element={<AdminPage />} />
                {/* 전체 회원 관리 */}
                <Route path="/admin/allUser" element={<AdminAlluserPage />} />
                {/* 판매자 관리 */}
                <Route path="/admin/seller" element={<AdminSellerPage />} />
                {/* 판매자 신고글 관리 */}
                <Route
                  path="/admin/complaint/:sellerId"
                  element={<AdminSellerComplaintPage />}
                />
                {/* 블랙리스트 관리 */}
                <Route
                  path="/admin/blacklist"
                  element={<AdminBlacklistPage />}
                />
                {/* 거래내역 관리 */}
                <Route
                  path="/admin/orderlogs"
                  element={<AdminOrderLogsPage />}
                />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
