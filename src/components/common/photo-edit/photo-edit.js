import React, { useEffect, useRef, useState } from 'react';
import Image from "next/image";

import { FaRegFileImage } from "react-icons/fa";
import { getImage } from '@/services/IndexedDB';

import "./photo-edit.scss";

export default function PhotoEdit(props) {
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    console.log("use eff photo edit");
    if (props.photoId) {
      getImage(props.photoId).then((image) => {
        setPhoto(image.imageData);
      });
    }
  }, [props.photoId, props.imageChanged]);

  const showPhoto = () => {
    if (photo) {
      return <img src={photo} alt="Product photo" />;
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
