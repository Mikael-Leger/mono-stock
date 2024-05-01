import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import "./product-item.scss"
import Image from "next/image";
import { FaRegFileImage, FaRegTrashAlt } from "react-icons/fa";

export default function ProductItem(props) {
  const router = useRouter();
  const goToProduct = () => {
    router.push('/products/' + props.product.id);
  }

  const showPhoto = () => {
    if (props.product.photo) {
      return <Image src={props.product.photo} width={70} height={70} alt="Product photo" />;
    }
    return <div className="photo-empty"><FaRegFileImage className="icon-medium" /></div>;
  }

  const showName = () => {
    return ((props.product.name) ? props.product.name : "---------------------------");
  }

  const showBarcode = () => {
    return ((props.product.barcode !== undefined) ? props.product.barcode : "XXXX XXXX XXXX");
  }

  const showQuantity = () => {
    return "Quantity: " + ((props.product.quantity !== undefined) ? props.product.quantity : "0");
  }


  return (
    <div className="product-item" onClick={goToProduct}>
      <div className="product-item-photo">
        { showPhoto() }
      </div>
      <div className="product-item-text">
        <div className="product-item-text-name">
          { showName() }
        </div>
        <div className="product-item-text-barcode">
          { showBarcode() }
        </div>
        <div className="product-item-text-quantity">
          { showQuantity() }
        </div>
      </div>
      <div className="product-item-actions">
        <FaRegTrashAlt className="icon-small danger" onClick={(e) => props.deleteProduct(e, props.product.id)} />
      </div>
    </div>
  );
}