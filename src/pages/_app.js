import React from 'react';
import BackButton from '@/components/back-button/back-button';
import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';

import "../app/globals.scss";
import "./app.scss";

function MyApp({ Component, pageProps }) {
  return (
    <div className="main">
      <div className="page">
        <Header />
        <BackButton />
        <div className="page-container">
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default MyApp;
