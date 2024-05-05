import React, { useState, useRef, useEffect  } from 'react';
import { FaRegSave } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

import Button from '../button/button';

import "./text-edit.scss"

export default function TextEdit({ value, defaultEditable, placeholder, type, color, onSave, afterClose }) {
  const [title, setTitle] = useState(value);
  const [isEditable, setEditable] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditable && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditable]);

  useEffect(() => {
    if (defaultEditable) {
      setEditable(true);
    }
  }, [defaultEditable]);

  const startEdit = () => {
    setEditable(true);
  }

  const saveEdit = () => {
    const { value } = inputRef.current;
    onSave(value);
    setTitle(value)
    setEditable(false);
  }

  const closeEdit = () => {
    setTitle(value);
    setEditable(false);
    if (afterClose) {
      afterClose();
    }
  }

  const showTitle = () => {
    let titleStr = title;

    if (title === undefined || title === "") {
      titleStr = <div className='text-edit-placeholder'>{placeholder}</div>;

    }

    return (
      <div
        className={"text-edit-title " + (isEditable ? "hidden" : "")}
        onClick={startEdit}>
        { titleStr }
      </div>
    );
  }

  return (
    <div className={"text-edit color-" + color + " text-edit-type-" + type}>
      { showTitle() }
      <div className={"input " + (!isEditable ? "hidden" : "")}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} ref={inputRef} />
        <Button onClick={saveEdit} icon={<FaRegSave className='icon-small' />} bgColor={color} />
        <Button onClick={closeEdit} icon={<FaX className='icon-small' />} bgColor={color} color="danger" />
      </div>
    </div>
  );
}
