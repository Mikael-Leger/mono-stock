import '../app/globals.css';
import React from 'react';

function MyApp({ Component, pageProps }) {
  return (
    <div className="main">
      <div className="page-container">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
