import React, { useState, useRef, useEffect  } from 'react';

import { FaRegSave } from "react-icons/fa";
import Button from '../button/button';
import "./text-edit.scss"

export default function TextEdit(props) {
  const [title, setTitle] = useState(props.title);
  const [isEditable, setEditable] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditable && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditable]);

  const startEdit = () => {
    setEditable(true);
  }

  const saveEdit = () => {
    const { value } = inputRef.current;
    props.saveToLocalStorage(value);
    setTitle(value)
    setEditable(false);
  }

  return (
    <div className={"text-edit color-" + props.color}>
      <div className={"title " + (isEditable ? "hidden" : "")} onClick={startEdit}>
          { title }
      </div>
      <div className={"input " + (!isEditable ? "hidden" : "")}>
        <input type="text" defaultValue={title} ref={inputRef} />
        <Button onClick={saveEdit} icon={<FaRegSave className='icon-small' />} bgColor={props.color} />
      </div>
    </div>
  );
}
