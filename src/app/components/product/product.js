import Image from "next/image";
import TextEdit from "../text-edit/text-edit";

import ProductPhotoType from "@/app/photos/0001.png";
import "./product.scss"
import PhotoEdit from "../photo-edit/photo-edit";

const productType = {
  name: "MPX Saumon fumé S/O x2 160g",
  barcode: "100345516498",
  photo: ProductPhotoType
}


export default function Product() {
  return (
    <div className="product">
      {/* <div className="product-photo">
        <PhotoEdit />
      </div> */}
      <div className="product-photo">
        <PhotoEdit src={productType.photo} />
      </div>
      <div className="product-name">
        <TextEdit title={productType.name} color="0" />
      </div>
      <div className="product-barcode">
        <TextEdit title={productType.barcode} color="1" />
      </div>
    </div>
  );
}
