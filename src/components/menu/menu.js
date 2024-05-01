import Link from "next/link";

import "./menu.scss";
import Button from "../button/button";

export default function Menu() {
  return (
    <div className="menu">
      <div className="menu-item">
        <Button bgColor="primary" size="big" value={<Link href="/products">Products</Link>} />
      </div>
      <div className="menu-item">
        <Button bgColor="primary" size="big" value={<Link href="/data">Data</Link>} />
      </div>
      <div className="menu-item">
        <Button bgColor="primary" size="big" value={<Link href="/">DLC Asso</Link>} />
      </div>
    </div>
  );
}