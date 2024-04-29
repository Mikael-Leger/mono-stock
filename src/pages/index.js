import Menu from "@/components/menu/menu";

import '../app/globals.scss';
import "./index.scss";

const title = "MONO'STOCK";

export default function Home() {
  return (
    <div className="home">
      <div className="title">{ title }</div>
      <Menu />
    </div>
  );
}