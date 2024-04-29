import Button from "@/components/button/button";

import "./index.scss";

export default function Data() {
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
        localStorage.setItem("products", dataJson);
      };
      reader.readAsText(selectedFile);
    });
  }
  
  const exportData = () => {
    const data = localStorage.getItem("products");
    if (!data) {
      return;
    }
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'monostock-data.json');
    document.body.appendChild(link);
    link.click();
  }

  return (
    <div className="data">
      <Button value="Import" bgColor="primary" size="big" onClick={importData} />
      <Button value="Export" bgColor="primary" size="big" onClick={exportData} />
    </div>
  );
}