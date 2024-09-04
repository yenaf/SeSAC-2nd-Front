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
import AdminPage from './pages/AdminPage';
import store from './store';
import SellersPage from './pages/SellersPage';

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
                path="/posts/list/:page/:limit/:categoryId"
                element={<PostsListPage />}
              />
              {/* 검색 결과 페이지 */}
              <Route
                path="/posts/list/:page/:limit?postTitle=:keyword"
                element={<SearchPage />}
              />
              {/* 판매글 작성 페이지 */}
              <Route path="/posts/create" element={<PostCreatePage />} />
              {/* 상품 상세 페이지 */}
              <Route path="/posts/:postId" element={<PostDetailPage />} />
              {/* 장바구니 페이지 */}
              <Route path="/cart/:userId" element={<CartPage />} />
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
              {/* 관리자페이지 */}
              <Route path="/admin" element={<AdminPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
