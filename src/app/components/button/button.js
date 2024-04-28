'use client'

import React, { useState, useRef, useEffect  } from 'react';
import "./button.scss"

import { FaRegSave } from "react-icons/fa";

export default function Button(props) {
  return (
    <div className={"button color-" + props.color}>
      <button onClick={props.onClick}>
        { props.icon }
      </button>
    </div>
  );
}
