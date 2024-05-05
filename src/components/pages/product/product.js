import { FaRegTrashAlt } from 'react-icons/fa';
import { useContext, useEffect, useRef, useState } from 'react';
import PhotoEdit from "../../common/photo-edit/photo-edit";
import TextEdit from "../../common/text-edit/text-edit";
import SwitchText from '../../common/switch-text/switch-text';
import Popup from '../../common/popup/popup';
import Button from '../../common/button/button';
import PageContext from '@/contexts/page-context';

import "./product.scss";
import translations from '@/translations/translations';
import { safeLocalStorage } from '@/services/safeLocalStorage';
import LanguageContext from '@/contexts/lang-context';
import { addImage, deleteImage, isDBUp, updateImage } from '@/services/IndexedDB';

export default function Product() {
  const contextPage = useContext(PageContext);
  const contextLanguage = useContext(LanguageContext);
  const [product, setProduct] = useState(contextPage.item);
  const [translationsByLang, setTranslationsByLang] = useState({});
  const [imageChanged, setImageChanged] = useState(false);
  const popupRefPhoto = useRef();
  const popupRefDelete = useRef();
  const inputCameraRef = useRef();
  const inputPhotoRef = useRef();

  useEffect(() => {
    setTranslationsByLang(translations[contextLanguage.getLanguage()]);
  }, [contextLanguage]);

  useEffect(() => {
    if (imageChanged) {
      setImageChanged(false);
    }
  }, [imageChanged]);

  const saveToLocal = (value, type) => {
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    const productFound = storedProducts.find(p => p.id === contextPage.item.id);
    const productFoundIndex = storedProducts.findIndex(p => p.id === contextPage.item.id);
    const newProductsList = storedProducts;
    
    if (productFoundIndex === -1) {
      const newProduct = { id: contextPage.item.id };
      newProduct[type] = value;
      newProduct.tag = contextPage.currentTag;
      newProductsList.push(newProduct);
      setProduct(newProduct);

    } else {
      const { ...newProduct } = productFound;
      newProduct[type] = value;
      newProductsList[productFoundIndex] = newProduct;
      setProduct(newProduct);
    }
    const newproductsListString = JSON.stringify(newProductsList);
    localStorage.setItem("products", newproductsListString);
  }

  const deleteProduct = (event) => {
    event.preventDefault();
    popupRefDelete.current.openPopup(contextPage.item.id);
    event.stopPropagation();
  }

  const onDelete = (id) => {
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    const productFoundIndex = storedProducts.findIndex(product => product.id === id);
    deleteImage(storedProducts[productFoundIndex].photo);

    if (productFoundIndex > -1) {
      const newProductsList = storedProducts;
      newProductsList.splice(productFoundIndex, 1);
      const newProductsListString = JSON.stringify(newProductsList);
      localStorage.setItem("products", newProductsListString);
    }
    contextPage.updatePage("products");
  }

  const onPhotoClick = (event) => {
    event.preventDefault();
    popupRefPhoto.current.openPopup(contextPage.item.id);
    event.stopPropagation();
  }

  const useCamera = () => {
    inputCameraRef.current.click();
  }

  const useFiles = () => {
    inputPhotoRef.current.click();
  }

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (product.photo) {
          updateImage(product.photo, reader.result);
          setImageChanged(true);
        } else {
          addImage(reader.result).then((addedImageId) => {
            saveToLocal(addedImageId, "photo");
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        addImage(reader.result).then((addedImageId) => {
          saveToLocal(addedImageId, "photo");
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="product">
      <div className="product-photo">
        <PhotoEdit
          photoId={product && product.photo}
          onClick={onPhotoClick}
          imageChanged={imageChanged} />
      </div>
      <div className="product-name">
        <TextEdit
          value={product && product.name}
          color="secondary"
          onSave={(v) => saveToLocal(v, "name")}
          type="name"
          placeholder={translationsByLang.name} />
      </div>
      <div className="product-barcode">
        <TextEdit
          value={product && product.barcode}
          color="secondary"
          onSave={(v) => saveToLocal(v, "barcode")}
          placeholder={translationsByLang.barcode}
          type="barcode" />
      </div>
      <div className="product-quantity">
        <TextEdit
          value={product && product.quantity}
          color="secondary"
          onSave={(v) => saveToLocal(v, "quantity")}
          placeholder={translationsByLang.quantity}
          type="quantity" />
      </div>
      <div className="product-refill">
        <SwitchText
          product={product}
          saveQuantityToLocal={(v) => saveToLocal(v, "quantity")}
          saveAmountToLocal={(v) => saveToLocal(v, "amount")} 
          saveRefillToLocal={(v) => saveToLocal(v, "refill")}
          type="refill" />
      </div>
      <div className="product-delete">
        <Button
          bgColor="danger"
          value={translationsByLang.delete}
          onClick={(e) => {deleteProduct(e)}}
          icon={<FaRegTrashAlt className="icon-small"/>} />
      </div>
      <Popup
        title={translationsByLang.deleteProductMessage}
        onLeftOption={onDelete}
        confirm
        ref={popupRefDelete} />
      <Popup
        title={translationsByLang.photoPickerMessage}
        leftValue={translationsByLang.camera}
        rightValue={translationsByLang.files}
        onLeftOption={useCamera}
        onRightOption={useFiles}
        ref={popupRefPhoto} />
      <input
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: 'none' }}
        onChange={handleUpload}
        ref={inputCameraRef}
      />
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleImageChange}
        ref={inputPhotoRef}
      />
    </div>
  );
}