import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Login from '../components/Login';

export default function Layout() {
  return (
    <>
      <Header />
      {/* <Login /> */}
      <main>
        <div className="inner">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}
