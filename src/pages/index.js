import Menu from "@/components/menu/menu";

import '../app/globals.scss';
import "./index.scss";
import { useEffect } from "react";

const title = "MONO'STOCK";

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    const swPath  = "/static/services/service-worker.js";
    navigator.serviceWorker.register(swPath).then(function(registration) {
      console.log("ServiceWorker registration successful with scope: ", registration.scope);
    }, function(err) {
      console.log("ServiceWorker registration failed: ", err);
    });
  });
}

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