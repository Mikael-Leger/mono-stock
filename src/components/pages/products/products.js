import { useContext, useEffect, useRef, useState } from "react";
import { FaArrowsRotate } from "react-icons/fa6";
import ProductItem from "../../common/product-item/product-item";
import Button from "../../common/button/button";
import Popup from "../../common/popup/popup";
import PageContext from "@/contexts/page-context";

import "./products.scss";
import translations from "@/translations/translations";
import { safeLocalStorage } from "@/services/safeLocalStorage";
import LanguageContext from "@/contexts/lang-context";

export default function ProductsList() {
  const contextPage = useContext(PageContext);
  const contextLanguage = useContext(LanguageContext);
  const [productsList, setProductsList] = useState([]);
  const [translationsByLang, setTranslationsByLang] = useState({});
  const popupDeleteRef = useRef();
  const popupRefillRef = useRef();

  useEffect(() => {
    setTranslationsByLang(translations[contextLanguage.getLanguage()]);
  }, [contextLanguage]);

  useEffect(() => {
    const productsByTag = getProductsByTag();
    setProductsList(productsByTag);
  }, []);

  const getProductsByTag = () => {
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    if (storedProducts) {
      return storedProducts.filter(product => product.tag === contextPage.currentTag);
    }
  }

  const showProductsList = () => {
    return productsList.map(product => <ProductItem product={product} key={product.id} deleteProduct={deleteProduct} />);
  }

  const addProduct = () => {
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    let newId = "0001";
    if (storedProducts.length > 0) {
      storedProducts.sort((a, b) => a.id - b.id);
      const lastId = parseInt(storedProducts[storedProducts.length - 1].id);
      newId = (lastId + 1).toString().padStart(4, '0');
      
    }
    const newProduct = { id: newId };
    contextPage.updatePage("product", newProduct);
  }

  const deleteProduct = (event, id) => {
    event.preventDefault();
    popupDeleteRef.current.openPopup(id);
    event.stopPropagation();
  }

  const onDelete = (id) => {
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    const productFoundIndex = storedProducts.findIndex(product => product.id === id);
    const newProductsList = storedProducts;
    newProductsList.splice(productFoundIndex, 1);
    const newProductsListString = JSON.stringify(newProductsList);
    localStorage.setItem("products", newProductsListString);
    setProductsList(newProductsList);
  }

  const refillProducts = (event) => {
    event.preventDefault();
    popupRefillRef.current.openPopup();
    event.stopPropagation();
  }

  const confirmSubmit = () => {
    const productsByTag = getProductsByTag();
    const newProductsList = productsByTag;
    newProductsList.forEach(product => {
      if (product.refill) {
        product.refill = false;
        product.quantity = Math.max((product.quantity || 0) - product.amount, 0);
      }
    });
    const newproductsListString = JSON.stringify(newProductsList);
    localStorage.setItem("products", newproductsListString);
    setProductsList(productsByTag);
  }

  return (
    <div className="products">
      <div className="products-add">
        <Button value={translationsByLang.add} onClick={addProduct} bgColor="primary" size="medium" />
      </div>
      <div className="products-container">
        { showProductsList() }
      </div>
      <div className="products-refill">
        <Button value={translationsByLang.refill} onClick={refillProducts}  bgColor="success" size="medium" icon={<FaArrowsRotate className="icon-small"/>} />
      </div>
      <Popup
        title={translationsByLang.deleteProductMessage}
        onLeftOption={onDelete}
        confirm
        ref={popupDeleteRef} />
      <Popup
        title={translationsByLang.refillMessage}
        onLeftOption={confirmSubmit}
        confirm
        ref={popupRefillRef} />
    </div>
  );
}
