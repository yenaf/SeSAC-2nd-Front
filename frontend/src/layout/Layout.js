import React from 'react'
import { Link, Outlet, useNavigate } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <>
        <Header />
        <main>
          <div className='inner'>
            <Outlet />
          </div>
        </main>
        <Footer />
    </>
  )
}