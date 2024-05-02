import Menu from "@/components/common/menu/menu";

import "./home.scss";

const TITLE = "MONO'STOCK";

export default function Home() {
  return (
    <div className="home">
      <div className="title">{ TITLE }</div>
      <Menu />
    </div>
  );
}