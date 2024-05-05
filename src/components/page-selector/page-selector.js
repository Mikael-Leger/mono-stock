import React, { useState } from "react";

import BackButton from "../common/back-button/back-button";
import Footer from "../layouts/footer/footer";
import Header from "../layouts/header/header";
import Home from "@/components/pages/home/home";
import ProductsList from "../pages/products/products";
import Data from "@/components/pages/data/data";
import Product from "../pages/product/product";
import PageContext from '../../contexts/page-context';
import MenuProducts from "../common/menu-products/menu-products";
import Tags from "../pages/tags/tags";

import "./page-selector.scss";

export default function PageSelector() {
  const [contextPage, setContextPage] = useState({
    page: 'home',
    item: null,
    lastPages: ["home"],
    currentTag: null,
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
    updateTag: (newTag) => {
      setContextPage(prevState => {
        return {
          ...prevState,
          currentTag: newTag,
        }
      })
    }
  });

  const pageToComponent = (name) => {
    switch (name) {
      case "menu-products":
        return <MenuProducts />
      case "products":
        return <ProductsList />
      case "product":
        return <Product />
      case "tags":
        return <Tags />
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
