import React, { useState, useRef, useEffect  } from 'react';

import { FaRegSave } from "react-icons/fa";
import Button from '../button/button';
import "./text-edit.scss"

export default function TextEdit(props) {
  const [title, setTitle] = useState(props.value);
  const [isEditable, setEditable] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditable && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditable]);

  useEffect(() => {
    setTitle(props.value);
  }, [props.value]);

  const startEdit = () => {
    setEditable(true);
  }

  const saveEdit = () => {
    const { value } = inputRef.current;
    props.saveToLocal(value);
    setTitle(value)
    setEditable(false);
  }

  const showTitle = () => {
    let titleStr = title;
    if (!title) {
      titleStr = <div className='text-edit-placeholder'>{props.placeholder}</div>;
    }
    return (
      <div className={"text-edit-title " + (isEditable ? "hidden" : "")}
        onClick={startEdit}>
        { titleStr }
      </div>
    );
  }

  return (
    <div className={"text-edit color-" + props.color}>
      { showTitle() }
      <div className={"input " + (!isEditable ? "hidden" : "")}>
        <input type="text" defaultValue={title} ref={inputRef} />
        <Button onClick={saveEdit} icon={<FaRegSave className='icon-small' />} bgColor={props.color} />
      </div>
    </div>
  );
}
