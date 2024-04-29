import { useEffect, useRef, useState } from "react";
import { FaCircle, FaRegSave } from "react-icons/fa";
import Button from "../button/button";

import "./switch-text.scss"

export default function SwitchText(props) {
  const [activated, setActivated] = useState((props.product) ? props.product.refill : false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (activated && inputRef.current) {
      inputRef.current.focus();
    }
  }, [activated]);

  useEffect(() => {
    if (props.product) {
      setActivated(props.product.refill);
    }
  }, [props.product]);

  const switchActivation = () => {
    setActivated(!activated);
    props.saveRefillToLocal(!activated);
  }

  const saveEdit = () => {
    const { value } = inputRef.current;
    props.saveAmountToLocal(value);
  }

  return (
    <div className={"switch-text" + ((activated) ? " switch-on" : " switch-off")}>
      <div className="switch-text-button">
        <button type="submit" onClick={switchActivation}><FaCircle className="icon-small" /></button>
      </div>
      <div className="switch-text-input">
        <input type="number" defaultValue={props.value} disabled={!activated} ref={inputRef} />
        <Button bgColor="info" onClick={saveEdit} icon={<FaRegSave className='icon-small' />} />
      </div>
    </div>
  );
}