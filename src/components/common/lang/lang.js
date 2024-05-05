import { useContext, useEffect, useState } from "react";

import LanguageContext from "@/contexts/lang-context";
import flagFr from "@/assets/flag_fr.png";
import flagEn from "@/assets/flag_en.png";

import "./lang.scss";

export default function Lang() {
  const contextLanguage = useContext(LanguageContext);
  const [lang, setLang] = useState(null);

  const updateLang = () => {
    const newLang = (contextLanguage.getLanguage() === "en") ? "fr" : "en";
    contextLanguage.setLanguage(newLang);
  }

  useEffect(() => {
    setLang(contextLanguage.getLanguage());
  }, [contextLanguage]);

  return (
    <div className="lang" onClick={updateLang}>
      <div className={"lang-flag" + ((lang === "en") ? " hidden" : "")}>
        <img src={flagFr} alt="flag_fr" className={(lang === "en") ? "hidden" : ""} />
      </div>
      <div className={"lang-flag" + ((lang === "fr") ? " hidden" : "")}>
        <img src={flagEn} alt="flag_en" />
      </div>
    </div>
  );
};