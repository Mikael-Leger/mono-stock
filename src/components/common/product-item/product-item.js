import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { FaRegFileImage, FaRegTrashAlt } from "react-icons/fa";
import PageContext from "@/contexts/page-context";
import translations from "@/translations/translations";
import { safeLocalStorage } from "@/services/safeLocalStorage";
import LanguageContext from "@/contexts/lang-context";
import { getImage } from "@/services/IndexedDB";

import "./product-item.scss"

export default function ProductItem(props) {
  const contextLanguage = useContext(LanguageContext);
  const contextPage = useContext(PageContext);
  const [translationsByLang, setTranslationsByLang] = useState({});
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    setTranslationsByLang(translations[contextLanguage.getLanguage()]);
  }, [contextLanguage]);

  useEffect(() => {
    if (props.product.photo) {
      getImage(props.product.photo).then((image) => {
        setPhoto(image.imageData);
      });
    }
  }, [props.product.photo]);

  const goToProduct = () => {
    contextPage.updatePage("product", props.product);
  }

  const showPhoto = () => {
    if (photo) {
      return <img src={photo} alt="Product photo" />;
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
    return translationsByLang.quantity + ": " + ((props.product.quantity !== undefined && props.product.quantity !== "") ? props.product.quantity : "?");
  }

  const showRefill = () => {
    return (props.product.refill) ? translationsByLang.refill + ": " + (props.product.amount || "?") : "";
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