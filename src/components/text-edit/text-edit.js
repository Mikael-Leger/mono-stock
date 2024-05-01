import React, { useState, useRef, useEffect  } from 'react';

import { FaRegSave } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
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

  const closeEdit = () => {
    setTitle(props.value);
    setEditable(false);
  }

  const showTitle = () => {
    let titleStr = title;

    if (title === undefined || title === "") {
      titleStr = <div className='text-edit-placeholder'>{props.placeholder}</div>;

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
    <div className={"text-edit color-" + props.color + " text-edit-type-" + props.type}>
      { showTitle() }
      <div className={"input " + (!isEditable ? "hidden" : "")}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} ref={inputRef} />
        <Button onClick={saveEdit} icon={<FaRegSave className='icon-small' />} bgColor={props.color} />
        <Button onClick={closeEdit} icon={<FaX className='icon-small' />} bgColor={props.color} />
      </div>
    </div>
  );
}
