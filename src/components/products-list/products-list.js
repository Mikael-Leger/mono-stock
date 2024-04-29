import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';
import ProductItem from "../product-item/product-item";

import "./products-list.scss";
import Button from "../button/button";
import Popup from "../popup/popup";

export default function ProductsList() {
  const [productsList, setProductsList] = useState([]);
  const router = useRouter();
  const popupRef = useRef();
  
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
    router.push("/products/" + newId);
  }

  const deleteProduct = (event, id) => {
    event.preventDefault();
    popupRef.current.openPopup(id);
    event.stopPropagation();
  }

  const onDelete = (newProductsList) => {
    setProductsList(newProductsList);
  }

  return (
    <div className="products-list">
      <div className="products-list-add">
        <Button value="ADD" onClick={addProduct} bgColor="primary" size="medium" />
      </div>
      <div className="products-list-container">
        { showProductsList() }
      </div>
      <Popup onDelete={onDelete} ref={popupRef} />
    </div>
  );
}
