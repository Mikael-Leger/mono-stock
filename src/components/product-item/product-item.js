import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import "./product-item.scss"
import Image from "next/image";
import { FaRegFileImage } from "react-icons/fa";

export default function ProductItem(props) {
  const router = useRouter();
  const goToProduct = () => {
    router.push('/products/' + props.product.id);
  }
  return (
    <div className="product-item" onClick={goToProduct}>
      <div className="product-item-photo">
        <div className="photo-empty"><FaRegFileImage className="icon-medium" /></div>
        {/* <Image src={props.photo} width={70} height={70} alt="Product photo" /> */}
      </div>
      <div className="product-item-text">
        <div className="product-item-text-name">
          { props.product.name }
        </div>
        <div className="product-item-text-barcode">
          { props.product.barcode || "XXXX XXXX XXXX" }
        </div>
      </div>
    </div>
  );
}