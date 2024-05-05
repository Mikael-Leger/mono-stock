import { useContext, useEffect, useState } from "react";

import Button from "@/components/common/button/button";
import TextEdit from "@/components/common/text-edit/text-edit";
import translations from "@/translations/translations";
import LanguageContext from "@/contexts/lang-context";

import "./tags.scss";

export default function Tags() {
  const contextLanguage = useContext(LanguageContext);
  const [tagsList, setTagsList] = useState([]);
  const [addingTag, setAddingTag] = useState(false);
  const [translationsByLang, setTranslationsByLang] = useState({});

  useEffect(() => {
    setTranslationsByLang(translations[contextLanguage.getLanguage()]);
  }, [contextLanguage]);

  useEffect(() => {
    const storedTags = JSON.parse(localStorage.getItem("tags"));
    if (storedTags) {
      setTagsList(storedTags);
    }
  }, []);

  const saveToLocal = (newValue, oldValue) => {
    if (newValue === "") {
      const newTagsList = [...tagsList];
      newTagsList.pop();
      setTagsList(newTagsList);
      setAddingTag(false);
      return;
    }
    const tagFoundIndex = tagsList.findIndex(tag => tag.name === oldValue);
    const newTagsList = [...tagsList];
    newTagsList[tagFoundIndex] = { ...tagsList[tagFoundIndex], name: newValue};
    const newTagsListString = JSON.stringify(newTagsList);
    localStorage.setItem("tags", newTagsListString);
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    if (storedProducts) {
      storedProducts.forEach(product => {
        if (product.tag === oldValue) {
          product.tag = newValue;
        }
      });
      const newProductsListString = JSON.stringify(storedProducts);
      localStorage.setItem("products", newProductsListString);
    }
    setTagsList(newTagsList);
  }

  const afterClose = () => {
    const newTagsList = [...tagsList];
    newTagsList.pop();
    setTagsList(newTagsList);
    setAddingTag(false);
  }

  const showTagsList = () => {
    return tagsList.map((tag, index) =>
      <TextEdit
        key={tag.name}
        value={tag && tag.name}
        color="secondary"
        onSave={(v) => saveToLocal(v, tag.name)}
        type="tag"
        defaultEditable={addingTag && index === tagsList.length - 1}
        afterClose={() => (addingTag && index === tagsList.length - 1) ? afterClose() : {}} />
    );
  }

  const addTag = () => {
    const newTagsList = [...tagsList];
    newTagsList.push({ name: "" });
    setTagsList(newTagsList);
    setAddingTag(true);
  }

  return (
    <div className="tags">
      <div className="tags-add">
        <Button value={translationsByLang.add} onClick={addTag} bgColor="primary" size="medium" />
      </div>
      <div className="tags-container">
        { showTagsList() }
      </div>
    </div>
  );
}