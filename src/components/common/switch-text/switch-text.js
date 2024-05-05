import { useContext, useEffect, useRef, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";

import Button from "../button/button";
import Popup from "../popup/popup";
import PageContext from "@/contexts/page-context";
import translations from "@/translations/translations";
import LanguageContext from "@/contexts/lang-context";

import "./switch-text.scss";

export default function SwitchText({ product, saveAmountToLocal, saveQuantityToLocal, saveRefillToLocal }) {
  const contextLanguage = useContext(LanguageContext);
  const contextPage = useContext(PageContext);
  const [refill, setRefill] = useState({on: false});
  const [translationsByLang, setTranslationsByLang] = useState({});
  const inputRef = useRef();
  const popupRef = useRef();

  useEffect(() => {
    setTranslationsByLang(translations[contextLanguage.getLanguage()]);
  }, [contextLanguage]);

  useEffect(() => {
    if (refill && inputRef.current) {
      inputRef.current.focus();
    }
  }, [refill]);

  useEffect(() => {
    if (product) {
      setRefill({on: product.refill, amount: product.amount});
    }
  }, [product]);

  const switchActivation = () => {
    if (product) {
      setRefill({ on: !refill.on, amount: product.amount });
      saveRefillToLocal(!refill.on);
    }
  }

  const submitRefill = (event) => {
    event.preventDefault();
    popupRef.current.openPopup(contextPage.item.id);
    event.stopPropagation();
  }

  const confirmSubmit = () => {
    setRefill({ on: false, amount: 0 });
    saveRefillToLocal(false);
    saveAmountToLocal(0);
    if (product.quantity) {
      let resQuantity = Math.max(product.quantity - refill.amount, 0);
      saveQuantityToLocal(resQuantity);
    }
  }

  const onRefillUpdate = (e) => {
    setRefill({on: refill.on, amount: e.target.value});
    saveAmountToLocal(e.target.value);
  }

  if (!refill) {
    return <></>;
  }

  return (
    <div className={"switch-text" + ((refill.on) ? " switch-on" : " switch-off")}>
      <div className="switch-text-button">
        <button type="submit" onClick={switchActivation}><FaCircle className="icon-small" /></button>
      </div>
      <div className="switch-text-input">
        <input type="number" value={refill.amount} onChange={(e) => onRefillUpdate(e)} disabled={!refill.on} ref={inputRef} />
      </div>
      <div className="switch-text-submit">
        <Button bgColor="success" onClick={(e) => submitRefill(e)} value={translationsByLang.refill} icon={<FaArrowsRotate className='icon-small' />} />
      </div>
      <Popup title="Submit the refill?" onLeftOption={confirmSubmit} confirm ref={popupRef} />
    </div>
  );
}