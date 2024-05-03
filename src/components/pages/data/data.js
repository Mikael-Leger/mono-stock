import { useRef } from "react";
import Button from "@/components/common/button/button";
import Popup from "@/components/common/popup/popup";

import "./data.scss";

export default function Data() {
  const popupRef = useRef();

  const importData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.style.display = 'none';
    document.body.appendChild(input);
    input.click();
    input.addEventListener('change', (event) => {
      document.body.removeChild(input);
      const selectedFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target.result;
        const dataJson = JSON.parse(fileContent);
        localStorage.setItem("products", JSON.stringify(dataJson.products));
        localStorage.setItem("tags", JSON.stringify(dataJson.tags));
      };
      reader.readAsText(selectedFile);
    });
  }
  
  const exportData = () => {
    const products = localStorage.getItem("products") || [];
    const tags = localStorage.getItem("tags") || [];
    const data = "{\"products\":" + products + ",\"tags\":" + tags + "}";
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'monostock-data.json');
    document.body.appendChild(link);
    link.click();
  }
  
  const resetData = (event) => {
    event.preventDefault();
    popupRef.current.openPopup();
    event.stopPropagation();
  }

  const confirmReset = () => {
    localStorage.setItem("products", "[]");
    localStorage.setItem("tags", "[]");
  }

  return (
    <div className="data">
      <div className="data-item">
        <Button value="Import" bgColor="primary" size="medium" onClick={importData} />
      </div>
      <div className="data-item">
        <Button value="Export" bgColor="primary" size="medium" onClick={exportData} />
      </div>
      <div className="data-item">
        <Button value="Reset" bgColor="primary" size="medium" onClick={resetData} />
      </div>
      <Popup title="Reset data?" onLeftOption={confirmReset} confirm ref={popupRef} />
    </div>
  );
}