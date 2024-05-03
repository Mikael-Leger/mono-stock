import { useState, useEffect, useContext } from "react";
import "./product-item.scss"
import Image from "next/image";
import { FaRegFileImage, FaRegTrashAlt } from "react-icons/fa";
import PageContext from "@/contexts/page-context";
import translations from "@/translations/translations";
import { safeLocalStorage } from "@/services/safeLocalStorage";
import LanguageContext from "@/contexts/lang-context";

export default function ProductItem(props) {
  const contextLanguage = useContext(LanguageContext);
  const contextPage = useContext(PageContext);
  const [translationsByLang, setTranslationsByLang] = useState({});

  useEffect(() => {
    setTranslationsByLang(translations[contextLanguage.getLanguage()]);
  }, [contextLanguage]);

  const goToProduct = () => {
    contextPage.updatePage("product", props.product);
  }

  const showPhoto = () => {
    if (props.product.photo) {
      return <img src={props.product.photo} alt="Product photo" />;
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
    return translationsByLang.quantity + ": " + ((props.product.quantity !== undefined && props.product.quantity !== "") ? props.product.quantity : "0");
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