import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Login from '../components/Login';
import ScrollBtn from '../components/ScrollBtn';
import GoToContent from '../components/GoToContent';

export default function Layout() {
  return (
    <>
      <Header />
      {/* <Login /> */}
      <main>
        <GoToContent />
        <div className="inner">
          <ScrollBtn />
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}
