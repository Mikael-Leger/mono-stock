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
      const image = new Image();
      image.src = photo;
      const height = image.naturalHeight;
      const width = image.naturalWidth;
      return <img src={photo} className={"photo-edit-container-more-" + (height >= width ? "height": "width")} alt="Product photo" />;
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
