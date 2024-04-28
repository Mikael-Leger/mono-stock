import Link from 'next/link';
import '../app/globals.css';
import React from 'react';

function MyApp({ Component, pageProps }) {
  return (
    <div className="main">
      {/* <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/products">Products</Link>
        </li>
        <li>
          <Link href="/products/0001">0001</Link>
        </li>
      </ul> */}
      <div className="page-container">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
