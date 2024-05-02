import Menu from "@/components/menu/menu";

import '../app/globals.scss';
import "./index.scss";

const TITLE = "MONO'STOCK";

export default function Home() {
  return (
    <div className="home">
      <div className="title">{ TITLE }</div>
      <Menu />
    </div>
  );
}