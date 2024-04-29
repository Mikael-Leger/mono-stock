import Link from "next/link";

import "./menu.scss";

export default function Menu() {
  return (
    <div className="menu">
      <div className="menu-item">
        <Link href="/products">Products</Link>
      </div>
      <div className="menu-item">
        <Link href="/">Coming soon</Link>
      </div>
    </div>
  );
}