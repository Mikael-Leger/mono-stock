import React, { useState } from "react";
import BackButton from "../back-button/back-button";
import Footer from "../footer/footer";
import Header from "../header/header";
import Home from "@/pages";
import ProductsList from "../products-list/products-list";
import Data from "@/pages/data";
import Product from "../product/product";
import PageContext from '../../contexts/page-context';

export default function PageSelector() {
  const [contextPage, setContextPage] = useState({
    page: 'home',
    item: null,
    lastPages: ["home"],
    updatePage: (newPage, item = null) => {
      setContextPage(prevState => {
        const { lastPages } = prevState;
        if (lastPages.includes(newPage)) {
          lastPages.pop();
        } else {
          lastPages.push(newPage);
        }
        return {
          ...prevState,
          lastPages,
          page: newPage,
          item,
        }
      });
    },
  });

  const pageToComponent = (name) => {
    switch (name) {
      case "products":
        return <ProductsList />
      case "product":
        return <Product />
      case "data":
        return <Data />
      default:
        return <Home />
    }
  }

  return (
    <div className="page">
      <PageContext.Provider value={contextPage}>
        <Header />
        <BackButton />
        <div className="page-container">
            { pageToComponent(contextPage.page) }
        </div>
        <Footer />
      </PageContext.Provider>
    </div>
  );
}
