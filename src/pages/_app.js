import Link from 'next/link';
import '../app/globals.css';
import React from 'react';
import BackButton from '@/components/back-button/back-button';

function MyApp({ Component, pageProps }) {
  return (
    <div className="main">
      <BackButton />
      <div className="page-container">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
