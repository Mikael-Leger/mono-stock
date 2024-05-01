import { useEffect, useRef, useState } from "react";
import { FaCircle, FaRegSave } from "react-icons/fa";
import Button from "../button/button";

import "./switch-text.scss"

export default function SwitchText(props) {
  const [refill, setRefill] = useState({on: false});
  const inputRef = useRef(null);

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
    setRefill({ on: !refill.on, amount: props.product.amount });
    props.saveRefillToLocal(!refill.on);
  }

  const saveEdit = () => {
    const { value } = inputRef.current;
    props.saveAmountToLocal(value);
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
        <input type="number" defaultValue={refill.amount} disabled={!refill.on} ref={inputRef} />
        <Button bgColor="info" onClick={saveEdit} icon={<FaRegSave className='icon-small' />} />
      </div>
    </div>
  );
}