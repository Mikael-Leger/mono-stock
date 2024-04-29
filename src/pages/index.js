import Menu from "@/components/menu/menu";

import '../app/globals.scss';
import "./index.scss";
import { useEffect } from "react";

const title = "MONO'STOCK";

export default function Home() {
  useEffect(() =>  {
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    if (!storedProducts) {
      localStorage.setItem("products", "[]");
    }
  }, [])

  return (
    <div className="home">
      <div className="title">{ title }</div>
      <Menu />
    </div>
  );
}