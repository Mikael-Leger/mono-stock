import React, { useEffect } from 'react';
import BackButton from '@/components/back-button/back-button';
import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';

import "../app/globals.scss";
import "./app.scss";
import PageSelector from '@/components/page-selector/page-selector';

function MyApp({ Component, pageProps }) {
  useEffect(() =>  {
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    if (!storedProducts) {
      localStorage.setItem("products", "[]");
    }
  }, [])

  return (
    <div className="main">
      <PageSelector />
    </div>
  );
}

export default MyApp;
