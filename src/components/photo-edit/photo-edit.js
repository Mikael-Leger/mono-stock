import React, { useEffect, useRef, useState } from 'react';
import Image from "next/image";

import { FaRegFileImage } from "react-icons/fa";
import "./photo-edit.scss";

export default function PhotoEdit(props) {
  const [photoURL, setPhotoURL] = useState(props.src);

  useEffect(() => {
    setPhotoURL(props.src);
  }, [props.src]);

  const showPhoto = () => {
    if (photoURL) {
      return <Image src={photoURL} width={150} height={150} alt="Product photo" />;
    }
    return <div className="photo-empty"><FaRegFileImage className="icon-big" /></div>;
  }

  return (
    <div className="photo-edit">
      <div className='photo-edit-container' onClick={props.onClick}>
      { showPhoto() }
      </div>
    </div>
  );
}
