import { useRouter } from 'next/router';

import PhotoEdit from "../photo-edit/photo-edit";
import TextEdit from "../text-edit/text-edit";
import "./product.scss"
import SwitchText from '../switch-text/switch-text';

export default function Product(props) {
  const router = useRouter();
  const { id } = router.query;

  const saveToLocal = (value, type) => {
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    const productFound = storedProducts.find(product => product.id === id);
    const productFoundIndex = storedProducts.findIndex(product => product.id === id);
    const newProductsList = storedProducts;
    
    if (productFoundIndex === -1) {
      const newProduct = { id };
      newProduct[`${type}`] = value;
      newProductsList.push(newProduct);

    } else {
      const { ...newProduct } = productFound;
      newProduct[`${type}`] = value;
      newProductsList[productFoundIndex] = newProduct;

    }
    const newproductsListString = JSON.stringify(newProductsList);
    localStorage.setItem("products", newproductsListString);
  }

  return (
    <div className="product">
      <div className="product-photo">
        <PhotoEdit src={props.product && props.product.photo}
          saveToLocal={(v) => saveToLocal(v, "photo")} />
      </div>
      <div className="product-name">
        <TextEdit
          value={props.product && props.product.name}
          color="primary"
          saveToLocal={(v) => saveToLocal(v, "name")}
          placeholder="Name" />
      </div>
      <div className="product-barcode">
        <TextEdit
          value={props.product && props.product.barcode}
          color="secondary"
          saveToLocal={(v) => saveToLocal(v, "barcode")} placeholder="Barcode" />
      </div>
      <div className="product-quantity">
        <TextEdit
          value={props.product && props.product.quantity}
          color="tertiary"
          saveToLocal={(v) => saveToLocal(v, "quantity")}
          placeholder="Quantity" />
      </div>
      <div className="product-refill">
        <SwitchText
          product={props.product}
          value={props.product && props.product.amount || 0}
          saveAmountToLocal={(v) => saveToLocal(v, "amount")} 
          saveRefillToLocal={(v) => saveToLocal(v, "refill")} />
      </div>
    </div>
  );
}