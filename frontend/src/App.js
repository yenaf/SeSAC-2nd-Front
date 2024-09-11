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
import PostUpdatePage from './pages/PostUpdatePage';
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
import { UserProvider } from './hooks/useAuth';
import ProtectedRoute from './layout/routes/ProtectedRoute';
import NonLoginRoute from './layout/routes/NonLoginRoute';
import AdminRoute from './layout/routes/AdminRoute';
import SellerRoute from './layout/routes/SellerRoute';
import EditUserPage from './pages/EditUserPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import SellPostListPage from './pages/SellPostListPage';
import AddressPage from './pages/AddressPage';
import WishListPage from './pages/WishListPage';
import EditSellerPage from './pages/EditSellerPage';
import NotFound from './pages/NotFountdPage';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <UserProvider>
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
                {/* 상품 상세 페이지 */}
                <Route
                  path="/posts/page/:postId"
                  element={<PostDetailPage />}
                />
                {/* 회원가입 페이지 */}
                <Route
                  path="/user/register"
                  element={<NonLoginRoute element={RegisterPage} />}
                />

                {/* 장바구니 페이지 */}
                <Route
                  path="/cart"
                  element={<ProtectedRoute element={CartPage} />}
                />
                {/* 결제 페이지 */}
                <Route
                  path="/order"
                  element={<ProtectedRoute element={OrderPage} />}
                />
                {/* 결제 완료 페이지 */}
                <Route
                  path="/order/complete/:allOrderId"
                  element={<ProtectedRoute element={OrderCompletePage} />}
                />
                {/* 판매글 작성 페이지 */}
                <Route
                  path="/posts/create"
                  element={<SellerRoute element={PostCreatePage} />}
                />
                {/* 판매글 수정 페이지 */}
                <Route
                  path="/posts/edit/:postId"
                  element={<SellerRoute element={PostUpdatePage} />}
                />
                {/* 마이페이지 */}
                <Route
                  path="/mypage"
                  element={<ProtectedRoute element={MyPage} />}
                />
                {/* 개인정보 수정 페이지 */}
                <Route
                  path="/mypage/editUser"
                  element={<ProtectedRoute element={EditUserPage} />}
                />
                {/* 배송지 관리 페이지 */}
                <Route
                  path="/mypage/address"
                  element={<ProtectedRoute element={AddressPage} />}
                />
                {/* 판매자 등록 페이지 */}
                <Route
                  path="/sellers"
                  element={<ProtectedRoute element={SellersPage} />}
                />
                {/* 판매자정보 수정 페이지 */}
                <Route
                  path="/sellers/editSeller"
                  element={<ProtectedRoute element={EditSellerPage} />}
                />
                {/* 판매내역 리스트 페이지 */}
                <Route
                  path="/mypage/salehistory"
                  element={<ProtectedRoute element={SellListPage} />}
                  requiredRole="seller"
                />
                {/* 판매글목록 페이지 */}
                <Route
                  path="/mypage/postlist"
                  element={<ProtectedRoute element={SellPostListPage} />}
                  // requiredRole="seller"
                />
                {/* 찜 목록 */}
                <Route
                  path="/mypage/wishlist"
                  element={<ProtectedRoute element={WishListPage} />}
                />
                {/* 구매내역 리스트 페이지 */}
                <Route
                  path="/mypage/orderhistory"
                  element={<ProtectedRoute element={OrderHistoryPage} />}
                />
                {/* 관리자페이지 */}
                <Route path="/admin" element={<AdminRoute element={Admin} />}>
                  <Route
                    path="/admin"
                    element={<AdminRoute element={AdminPage} />}
                  />
                  {/* 전체 회원 관리 */}
                  <Route
                    path="/admin/allUser"
                    element={<AdminRoute element={AdminAlluserPage} />}
                  />
                  {/* 판매자 관리 */}
                  <Route
                    path="/admin/seller"
                    element={<AdminRoute element={AdminSellerPage} />}
                  />
                  {/* 판매자 신고글 관리 */}
                  <Route
                    path="/admin/complaint/:sellerId"
                    element={<AdminRoute element={AdminSellerComplaintPage} />}
                  />
                  {/* 블랙리스트 관리 */}
                  <Route
                    path="/admin/blacklist"
                    element={<AdminRoute element={AdminBlacklistPage} />}
                  />
                  {/* 거래내역 관리 */}
                  <Route
                    path="/admin/orderlogs"
                    element={<AdminRoute element={AdminOrderLogsPage} />}
                  />
                </Route>
              </Route>
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </Provider>
    </div>
  );
}

export default App;
