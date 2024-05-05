import { useState, useEffect, useContext } from "react";
import { FaRegFileImage, FaRegTrashAlt } from "react-icons/fa";

import { getImage } from "@/services/IndexedDB";
import PageContext from "@/contexts/page-context";
import translations from "@/translations/translations";
import LanguageContext from "@/contexts/lang-context";

import "./product-item.scss"

export default function ProductItem({ product, deleteProduct }) {
  const contextLanguage = useContext(LanguageContext);
  const contextPage = useContext(PageContext);
  const [translationsByLang, setTranslationsByLang] = useState({});
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    setTranslationsByLang(translations[contextLanguage.getLanguage()]);
  }, [contextLanguage]);

  useEffect(() => {
    if (product.photo) {
      getImage(product.photo).then((image) => {
        setPhoto(image.imageData);
      });
    }
  }, [product.photo]);

  const goToProduct = () => {
    contextPage.updatePage("product", product);
  }

  const showPhoto = () => {
    if (photo) {
      return <img src={photo} alt="Product photo" />;
    }
    return <div className="photo-empty"><FaRegFileImage className="icon-medium" /></div>;
  }

  const showName = () => {
    return ((product.name) ? product.name : "---------------------------");
  }

  const showBarcode = () => {
    return ((product.barcode !== undefined) ? product.barcode : "XXXX XXXX XXXX");
  }

  const showQuantity = () => {
    return translationsByLang.quantity + ": " + ((product.quantity !== undefined && product.quantity !== "") ? product.quantity : "?");
  }

  const showRefill = () => {
    return (product.refill) ? translationsByLang.refill + ": " + (product.amount || "?") : "";
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
        <FaRegTrashAlt className="icon-small danger" onClick={(e) => deleteProduct(e, product.id)} />
      </div>
    </div>
  );
}