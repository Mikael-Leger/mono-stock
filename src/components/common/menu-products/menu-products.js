import Button from "../button/button";
import PageContext from "@/contexts/page-context";
import { useContext, useEffect, useState } from "react";

import "./menu-products.scss";

export default function MenuProducts() {
  const contextPage = useContext(PageContext);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const storedTags = JSON.parse(localStorage.getItem("tags"));
    setTags(storedTags);
  }, []);

  const changePage = (name, tag) => {
    contextPage.updateTag(tag);
    contextPage.updatePage(name);
  }

  const showMenu = () => {
    return tags.map(tag => {
      return (
        <div className="menu-item" key={tag.name}>
          <Button bgColor="primary" size="medium" value={tag.name} onClick={() => changePage("products", tag.name)} />
        </div>
      );
    })
  }

  return (
    <div className="menu">
      { showMenu() }
    </div>
  );
}