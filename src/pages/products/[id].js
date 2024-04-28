import { useState, useEffect } from "react";
import { useRouter } from 'next/router';

import Product from "@/components/product/product";

export default function ProductPage() {
  const [product, setProduct] = useState(null);
  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    if (id && storedProducts) {
      const productFound = storedProducts.find(product => product.id === id);
      setProduct(productFound);
    }
  }, [id]);

  // if (!product) {
  //   return <></>
  // }

  return (
    <div className="product-page">
      <Product product={product} />
    </div>
  );
}
