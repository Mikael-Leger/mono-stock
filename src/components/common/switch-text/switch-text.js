import { useContext, useEffect, useRef, useState } from "react";
import { FaCheck, FaCircle, FaRegSave } from "react-icons/fa";
import Button from "../button/button";

import "./switch-text.scss"
import Popup from "../popup/popup";
import PageContext from "@/contexts/page-context";

export default function SwitchText(props) {
  const contextPage = useContext(PageContext);
  const [refill, setRefill] = useState({on: false});
  const inputRef = useRef(null);
  const popupRef = useRef();

  useEffect(() => {
    if (refill && inputRef.current) {
      inputRef.current.focus();
    }
  }, [refill]);

  useEffect(() => {
    if (props.product) {
      setRefill({on: props.product.refill, amount: props.product.amount || 0});
    }
  }, [props.product]);

  const switchActivation = () => {
    if (props.product) {
      setRefill({ on: !refill.on, amount: props.product.amount });
      props.saveRefillToLocal(!refill.on);
    }
  }

  const saveEdit = () => {
    const { value } = inputRef.current;
    props.saveAmountToLocal(value);
  }

  const submitRefill = (event) => {
    event.preventDefault();
    popupRef.current.openPopup(contextPage.item.id);
    event.stopPropagation();
  }

  const confirmSubmit = () => {
    setRefill({ on: false, amount: 0 });
    props.saveRefillToLocal(false);
    props.saveAmountToLocal(0);
    if (props.product.quantity) {
      let resQuantity = Math.max(props.product.quantity - refill.amount, 0);
      props.saveQuantityToLocal(resQuantity);
    }
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
        <input type="number" value={refill.amount} onChange={(e) => setRefill({on: refill.on, amount: e.target.value})} disabled={!refill.on} ref={inputRef} />
        <Button bgColor="info" onClick={saveEdit} icon={<FaRegSave className='icon-small' />} side="right" />
      </div>
      <div className="switch-text-submit">
        <Button bgColor="success" onClick={(e) => submitRefill(e)} value="Submit" icon={<FaCheck className='icon-small' />} />
      </div>
      <Popup title="Submit the refill?" onYes={confirmSubmit} ref={popupRef} />
    </div>
  );
}