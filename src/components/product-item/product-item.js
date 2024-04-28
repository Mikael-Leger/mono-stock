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

  const showProductPhoto = () => {
    if (props.product.photo) {
      return <Image src={props.product.photo} width={70} height={70} alt="Product photo" />;
    }
    return <div className="photo-empty"><FaRegFileImage className="icon-medium" /></div>;
  }

  return (
    <div className="product-item" onClick={goToProduct}>
      <div className="product-item-photo">
        { showProductPhoto() }
      </div>
      <div className="product-item-text">
        <div className="product-item-text-name">
          { props.product.name }
        </div>
        <div className="product-item-text-barcode">
          { props.product.barcode || "XXXX XXXX XXXX" }
        </div>
        <div className="product-item-text-barcode">
          { props.product.quantity || "??" }
        </div>
      </div>
      <div className="product-item-actions">
        <FaRegTrashAlt className="icon-small danger" onClick={(e) => props.deleteProduct(e, props.product.id)} />
      </div>
    </div>
  );
}