'use client'
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';

import Image from "next/image";
import TextEdit from "../../components/text-edit/text-edit";
import PhotoEdit from "../../components/photo-edit/photo-edit";

import "./product.scss"

export default function Product() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id && product === null) {
      // Warning: React does not recognize the `fetchPriority` prop on a DOM element
      const productFromStorage = {
        name: localStorage.getItem(id + '-name'),
        barcode: localStorage.getItem(id + '-barcode'),
        photo: localStorage.getItem(id + '-savedPhoto'),
      }
      if (!productFromStorage.name && !productFromStorage.barcode && !productFromStorage.photo) {
        router.push('/products');
      } else {
        setProduct(productFromStorage);
      }
    }
  }, [id, product, router]);

  if (!product) {
    return <div></div>;
  }

  return (
    <div className="product">
      {/* <div className="product-photo">
        <PhotoEdit />
      </div> */}
      <div className="product-photo">
        <PhotoEdit src={product.photo} id={id} />
      </div>
      <div className="product-name">
        <TextEdit title={product.name} id={id} type="name" color="0" />
      </div>
      <div className="product-barcode">
        <TextEdit title={product.barcode} id={id} type="barcode" color="1" />
      </div>
    </div>
  );
}
