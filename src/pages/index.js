import React, { useContext, useEffect, useState } from 'react';
import LanguageContext from '@/contexts/lang-context';
import { safeLocalStorage } from '@/services/safeLocalStorage';
import PageSelector from '@/components/page-selector/page-selector';

import "../app/globals.scss";
import "./index.scss";

function MyApp() {
  const [contextLanguage, setContextLanguage] = useState({
    getLanguage: () => (safeLocalStorage.getItem('lang') || 'en'),
    setLanguage: (newLang) => {
      safeLocalStorage.setItem('lang', newLang);
      setContextLanguage(prevState => {
        return {
          ...prevState,
          getLanguage: () => newLang,
        }
      });
    },
  });

  useEffect(() =>  {
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    if (!storedProducts) {
      localStorage.setItem("products", "[]");
    }
    const storedTags = JSON.parse(localStorage.getItem("tags"));
    if (!storedTags) {
      localStorage.setItem("tags", "[]");
    }
    const storedLang = localStorage.getItem("lang");
    if (!storedLang) {
      localStorage.setItem("lang", "fr");
    }
  }, []);

  return (
    <div className="main">
      <LanguageContext.Provider value={contextLanguage}>
        <PageSelector />
      </LanguageContext.Provider>
    </div>
  );
}

export default MyApp;
