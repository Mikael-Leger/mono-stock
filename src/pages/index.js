import React, { useEffect } from 'react';
import PageSelector from '@/components/page-selector/page-selector';
import "../app/globals.scss";
import "./index.scss";

function MyApp() {
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
