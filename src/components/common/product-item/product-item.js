import { useState, useEffect, useContext } from "react";
import "./product-item.scss"
import Image from "next/image";
import { FaRegFileImage, FaRegTrashAlt } from "react-icons/fa";
import PageContext from "@/contexts/page-context";

export default function ProductItem(props) {
  const contextPage = useContext(PageContext);

  const goToProduct = () => {
    contextPage.updatePage("product", props.product);
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
    return "Quantity: " + ((props.product.quantity !== undefined && props.product.quantity !== "") ? props.product.quantity : "0");
  }

  const showRefill = () => {
    return (props.product.refill) ? "Refill: " + (props.product.amount || "?") : "";
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
        <div className="product-item-text-refill">
          { showRefill() }
        </div>
      </div>
      <div className="product-item-actions">
        <FaRegTrashAlt className="icon-small danger" onClick={(e) => props.deleteProduct(e, props.product.id)} />
      </div>
    </div>
  );
}