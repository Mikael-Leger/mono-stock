import React, { useEffect, useState } from 'react';
import { FaRegFileImage } from "react-icons/fa";

import { getImage } from '@/services/IndexedDB';

import "./photo-edit.scss";

export default function PhotoEdit({ photoId, imageChanged, onClick }) {
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    console.log("use eff photo edit");
    if (photoId) {
      getImage(photoId).then((image) => {
        setPhoto(image.imageData);
      });
    }
  }, [photoId, imageChanged]);

  const showPhoto = () => {
    if (photo) {
      return <img src={photo} alt="Product photo" />;
    }
    return <div className="photo-empty"><FaRegFileImage className="icon-big" /></div>;
  }

  return (
    <div className="photo-edit">
      <div className='photo-edit-container' onClick={onClick}>
      { showPhoto() }
      </div>
    </div>
  );
}
