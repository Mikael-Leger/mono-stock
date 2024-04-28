import { useEffect, useState } from "react";
import ProductItem from "../product-item/product-item";

import "./products-list.scss";

export default function ProductsList() {
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    if (storedProducts) {
      setProductsList(storedProducts);
    }
  }, []);

  const showProductsList = () => {
    return productsList.map(product => <ProductItem product={product} key={product.id} />);
  }

  const addProduct = () => {
    // const newProductsList = productsList;
    // console.log(newProductsList);
    // newProductsList.push({id: "0001", name: "Uwu", barcode: null, photo: null});
    // const newproductsListString = JSON.stringify(newProductsList);
    // localStorage.setItem("products", newproductsListString);
  }

  return (
    <div className="products-list">
      { showProductsList() }
      <button onClick={addProduct}>ADD</button>
    </div>
  );
}
