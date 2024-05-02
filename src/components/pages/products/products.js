import { useContext, useEffect, useRef, useState } from "react";
import ProductItem from "../../common/product-item/product-item";
import Button from "../../common/button/button";
import Popup from "../../common/popup/popup";
import PageContext from "@/contexts/page-context";

import "./products.scss";
import { FaCheck } from "react-icons/fa";

export default function ProductsList() {
  const [productsList, setProductsList] = useState([]);
  const popupDeleteRef = useRef();
  const popupRefillRef = useRef();
  const contextPage = useContext(PageContext);
  
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    if (storedProducts) {
      setProductsList(storedProducts);
    }
  }, []);

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
    const newproductsListString = JSON.stringify(newProductsList);
    localStorage.setItem("products", newproductsListString);
    setProductsList(newProductsList);
  }

  const refillProducts = (event) => {
    event.preventDefault();
    popupRefillRef.current.openPopup();
    event.stopPropagation();
  }

  const confirmSubmit = () => {
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    const newProductsList = storedProducts;
    newProductsList.forEach(product => {
      if (product.refill) {
        product.refill = false;
        product.quantity = Math.max((product.quantity || 0) - product.amount, 0);
      }
    });
    const newproductsListString = JSON.stringify(newProductsList);
    localStorage.setItem("products", newproductsListString);
    setProductsList(newProductsList);
  }

  return (
    <div className="products">
      <div className="products-add">
        <Button value="ADD" onClick={addProduct} bgColor="primary" size="medium" />
      </div>
      <div className="products-container">
        { showProductsList() }
      </div>
      <div className="products-refill">
        <Button value="REFILL" onClick={refillProducts}  bgColor="success" size="medium" icon={<FaCheck className="icon-small"/>} />
      </div>
      <Popup title="Delete this product?" onLeftOption={onDelete} confirm ref={popupDeleteRef} />
      <Popup title="Submit the refill?" onLeftOption={confirmSubmit} confirm ref={popupRefillRef} />
    </div>
  );
}
