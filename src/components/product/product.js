import { useRouter } from 'next/router';

import PhotoEdit from "../photo-edit/photo-edit";
import TextEdit from "../text-edit/text-edit";
import "./product.scss"
import SwitchText from '../switch-text/switch-text';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import Popup from '../popup/popup';
import Button from '../button/button';

export default function Product(props) {
  const [product, setProduct] = useState(props.product);
  const router = useRouter();
  const { id } = router.query;
  const popupRef = useRef();

  useEffect(() => {
    if (props.product) {
      setProduct(props.product);
    }
  }, [props.product]);

  const saveToLocal = (value, type) => {
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    const productFound = storedProducts.find(p => p.id === id);
    const productFoundIndex = storedProducts.findIndex(p => p.id === id);
    const newProductsList = storedProducts;
    
    if (productFoundIndex === -1) {
      const newProduct = { id };
      newProduct[`${type}`] = value;
      newProductsList.push(newProduct);
      setProduct(newProduct);

    } else {
      const { ...newProduct } = productFound;
      newProduct[`${type}`] = value;
      newProductsList[productFoundIndex] = newProduct;
      setProduct(newProduct);
    }
    const newproductsListString = JSON.stringify(newProductsList);
    localStorage.setItem("products", newproductsListString);
  }

  const deleteProduct = (event, id) => {
    event.preventDefault();
    popupRef.current.openPopup(id);
    event.stopPropagation();
  }

  const onDelete = (id) => {
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    const productFoundIndex = storedProducts.findIndex(product => product.id === id);
    const newProductsList = storedProducts;
    newProductsList.splice(productFoundIndex, 1);
    const newproductsListString = JSON.stringify(newProductsList);
    localStorage.setItem("products", newproductsListString);
    router.push("/products");
  }

  return (
    <div className="product">
      <div className="product-photo">
        <PhotoEdit
          src={product && product.photo}
          saveToLocal={(v) => saveToLocal(v, "photo")} />
      </div>
      <div className="product-name">
        <TextEdit
          value={product && product.name}
          color="primary"
          saveToLocal={(v) => saveToLocal(v, "name")}
          type="name"
          placeholder="Name" />
      </div>
      <div className="product-barcode">
        <TextEdit
          value={product && product.barcode}
          color="secondary"
          saveToLocal={(v) => saveToLocal(v, "barcode")} placeholder="Barcode"
          type="barcode" />
      </div>
      <div className="product-quantity">
        <TextEdit
          value={product && product.quantity}
          color="tertiary"
          saveToLocal={(v) => saveToLocal(v, "quantity")}
          placeholder="Quantity"
          type="quantity" />
      </div>
      <div className="product-refill">
        <SwitchText
          product={product}
          saveQuantityToLocal={(v) => saveToLocal(v, "quantity")}
          saveAmountToLocal={(v) => saveToLocal(v, "amount")} 
          saveRefillToLocal={(v) => saveToLocal(v, "refill")}
          type="refill" />
      </div>
      <div className="product-delete">
        <Button
          bgColor="danger"
          value="Delete"
          onClick={(e) => deleteProduct(e, router.query.id)}
          icon={<FaRegTrashAlt className="icon-small"/>} />
      </div>
      <Popup title="Delete this product?" onYes={onDelete} ref={popupRef} />
    </div>
  );
}