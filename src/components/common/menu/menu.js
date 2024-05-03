import { useContext, useEffect, useState } from "react";
import Button from "../button/button";
import PageContext from "@/contexts/page-context";
import LanguageContext from "@/contexts/lang-context";
import translations from "@/translations/translations";

import "./menu.scss";

export default function Menu() {
  const contextPage = useContext(PageContext);
  const contextLanguage = useContext(LanguageContext);
  const [translationsByLang, setTranslationsByLang] = useState({});

  useEffect(() => {
    setTranslationsByLang(translations[contextLanguage.getLanguage()]);
  }, [contextLanguage]);

  const changePage = (name) => {
    contextPage.updatePage(name);
  }

  return (
    <div className="menu">
      <div className="menu-item">
        <Button bgColor="primary" size="medium" value={translationsByLang.products} onClick={() => changePage("menu-products")} />
      </div>
      <div className="menu-item">
        <Button bgColor="primary" size="medium" value={translationsByLang.tags} onClick={() => changePage("tags")} />
      </div>
      <div className="menu-item">
        <Button bgColor="primary" size="medium" value={translationsByLang.data} onClick={() => changePage("data")} />
      </div>
      <div className="menu-item">
        <Button bgColor="primary" size="medium" value={translationsByLang.stickers} onClick={() => {/*changePage("home")*/}} />
      </div>
      <div className="menu-item">
        <Button bgColor="primary" size="medium" value={translationsByLang.labels} onClick={() => {/*changePage("home")*/}} />
      </div>
    </div>
  );
}