import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';
import ProductItem from "../product-item/product-item";

import "./products-list.scss";
import Button from "../button/button";

export default function ProductsList() {
  const [productsList, setProductsList] = useState([]);
  const [isPopUpVisible, setPopUpVisible] = useState({visible: false, id: null});
  const refPopUp = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    if (storedProducts) {
      setProductsList(storedProducts);
    }
    const handleClickOutside = (event) => {
      if (refPopUp.current && !refPopUp.current.contains(event.target)) {
        setPopUpVisible({visible: false, id: null});
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const showProductsList = () => {
    return productsList.map(product => <ProductItem product={product} key={product.id} deleteProduct={deleteProduct} />);
  }

  const addProduct = () => {
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    storedProducts.sort((a, b) => a.id - b.id);
    const lastId = parseInt(storedProducts[storedProducts.length - 1].id);
    const newId = (lastId + 1).toString().padStart(4, '0');
    router.push("/products/" + newId);
  }

  const deleteProduct = (event, id) => {
    event.preventDefault();
    setPopUpVisible({visible: true, id});
    event.stopPropagation();
  }

  const removeProductFromStorage = () => {
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    const productFoundIndex = storedProducts.findIndex(product => product.id === isPopUpVisible.id);
    const newProductsList = storedProducts;
    newProductsList.splice(productFoundIndex, 1);
    const newproductsListString = JSON.stringify(newProductsList);
    localStorage.setItem("products", newproductsListString);
    setProductsList(newProductsList);
  }

  const popUpYes = () => {
    removeProductFromStorage();
    setPopUpVisible({visible: false, id: null});
  }

  const popUpNo = () => {
    setPopUpVisible({visible: false, id: null});
  }

  return (
    <div className="products-list">
      <div className="products-list-add">
        <Button value="ADD" onClick={addProduct} bgColor="primary" size="medium" />
      </div>
      <div className="products-list-container">
        { showProductsList() }
      </div>
      <div className={"delete-confirmation" + ((!isPopUpVisible.visible) ? " hidden" : "")}>
        <div className="delete-confirmation-box">
          <div className="delete-confirmation-box-container" ref={refPopUp}>
            <div>Delete this product?</div>
            <div className="delete-confirmation-box-container-actions">
              <Button value="Yes" outlined color="danger" size="medium" onClick={popUpYes} />
              <Button value="No" outlined color="white" size="medium" onClick={popUpNo} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
