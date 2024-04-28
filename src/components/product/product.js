import { useRouter } from 'next/router';

import PhotoEdit from "../photo-edit/photo-edit";
import TextEdit from "../text-edit/text-edit";
import "./product.scss"

export default function Product(props) {
  const router = useRouter();
  const { id } = router.query;

  const saveToLocalStorage = (value, type) => {
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    const productFound = storedProducts.find(product => product.id === id);
    const productFoundIndex = storedProducts.findIndex(product => product.id === id);
    const { ...newProduct } = productFound
    newProduct[`${type}`] = value;
    const newProductsList = storedProducts;
    newProductsList[productFoundIndex] = newProduct;
    const newproductsListString = JSON.stringify(newProductsList);
    localStorage.setItem("products", newproductsListString);
  }

  return (
    <div className="product">
    <div className="product-photo">
      <PhotoEdit src={props.product.photo} saveToLocalStorage={(value) => saveToLocalStorage(value, "photo")} />
    </div>
    <div className="product-name">
      <TextEdit title={props.product.name} color="1" saveToLocalStorage={(value) => saveToLocalStorage(value, "name")} />
    </div>
    <div className="product-barcode">
      <TextEdit title={props.product.barcode} color="2" saveToLocalStorage={(value) => saveToLocalStorage(value, "barcode")} />
    </div>
    <div className="product-quantity">
      <TextEdit title={props.product.quantity} color="3" saveToLocalStorage={(value) => saveToLocalStorage(value, "quantity")} />
    </div>
    </div>
  );
}