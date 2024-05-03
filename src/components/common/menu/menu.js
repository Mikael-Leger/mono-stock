import Button from "../button/button";
import PageContext from "@/contexts/page-context";
import { useContext } from "react";

import "./menu.scss";

export default function Menu() {
  const contextPage = useContext(PageContext);

  const changePage = (name) => {
    contextPage.updatePage(name);
  }

  return (
    <div className="menu">
      <div className="menu-item">
        <Button bgColor="primary" size="medium" value="Products" onClick={() => changePage("menu-products")} />
      </div>
      <div className="menu-item">
        <Button bgColor="primary" size="medium" value="Tags" onClick={() => changePage("tags")} />
      </div>
      <div className="menu-item">
        <Button bgColor="primary" size="medium" value="Data" onClick={() => changePage("data")} />
      </div>
      <div className="menu-item">
        <Button bgColor="primary" size="medium" value="Stickers" onClick={() => {/*changePage("home")*/}} />
      </div>
      <div className="menu-item">
        <Button bgColor="primary" size="medium" value="Labels" onClick={() => {/*changePage("home")*/}} />
      </div>
    </div>
  );
}