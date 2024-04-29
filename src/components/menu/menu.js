import Link from "next/link";

import "./menu.scss";

export default function Menu() {
  return (
    <div className="menu">
      <div className="menu-item">
        <Link href="/products">Products</Link>
      </div>
      <div className="menu-item">
        <Link href="/data">Data</Link>
      </div>
      <div className="menu-item">
        <Link href="/">DLC Asso</Link>
      </div>
    </div>
  );
}