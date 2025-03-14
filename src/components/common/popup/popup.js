import { forwardRef, useEffect, useRef, useState, useImperativeHandle, useContext  } from "react";

import Button from "../button/button";
import translations from "@/translations/translations";
import LanguageContext from "@/contexts/lang-context";

import "./popup.scss";

// eslint-disable-next-line react/display-name
const Popup = forwardRef((props, ref) => {
  const contextLanguage = useContext(LanguageContext);
  const [isPopUpVisible, setPopUpVisible] = useState({visible: false, id: null});
  const [translationsByLang, setTranslationsByLang] = useState({});
  const refPopUp = useRef(null);

  useEffect(() => {
    setTranslationsByLang(translations[contextLanguage.getLanguage()]);
  }, [contextLanguage]);

  useImperativeHandle(ref, () => ({
    openPopup (id) {
      setPopUpVisible({visible: true, id});
    }
  }));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (refPopUp.current && !refPopUp.current.contains(event.target)) {
        setPopUpVisible({visible: false, id: null});
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const popUpLeftOption = () => {
    setPopUpVisible({visible: false, id: null});
    props.onLeftOption(isPopUpVisible.id);
  }

  const popUpRightOption = () => {
    setPopUpVisible({visible: false, id: null});
    if (props.onRightOption) {
      props.onRightOption(isPopUpVisible.id);
    }
  }

  return (
    <div className={"popup" + ((!isPopUpVisible.visible) ? " hidden" : "")}>
      <div className="popup-box">
        <div className="popup-box-container" ref={refPopUp}>
          <div className="popup-box-container-title">{ props.title }</div>
          <div className="popup-box-container-actions">
            <Button value={(props.confirm) ? translationsByLang.yes : props.leftValue} outlined color={(props.confirm) ? "danger" : "white"} size="medium" onClick={popUpLeftOption} />
            <Button value={(props.confirm) ? translationsByLang.no : props.rightValue} outlined color="white" size="medium" onClick={popUpRightOption} />
          </div>
        </div>
      </div>
    </div>
  );
});

export default Popup;