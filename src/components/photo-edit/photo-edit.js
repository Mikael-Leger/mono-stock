import React, { useRef, useState } from 'react';
import Image from "next/image";

import { FaRegFileImage } from "react-icons/fa";
import "./photo-edit.scss";

export default function PhotoEdit(props) {
  const inputRef = useRef(null);
  const [photoURL, setPhotoURL] = useState(props.src);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        updatePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const updatePhoto = (value) => {
    props.saveToLocalStorage(value);
    setPhotoURL(value);
  }

  const showPhoto = () => {
    if (photoURL) {
      return <Image src={photoURL} width={150} height={150} alt="Product photo" />;
    }
    return <div className="photo-empty"><FaRegFileImage className="icon-big" /></div>;
  }

  return (
    <div className="photo-edit">
      <input
        type="file"
        accept="image/*"
        capture="environment" // To specify using the device's camera
        ref={inputRef}
        style={{ display: 'none' }}
        onChange={handleUpload}
      />
      <div className='photo-edit-container' onClick={() => inputRef.current.click()}>
      { showPhoto() }
      </div>
    </div>
  );
}
