import { forwardRef, useEffect, useRef, useState, useImperativeHandle  } from "react";
import Button from "../button/button";

import "./popup.scss";

// eslint-disable-next-line react/display-name
const Popup = forwardRef((props, ref) => {
  const [isPopUpVisible, setPopUpVisible] = useState({visible: false, id: null});
  const refPopUp = useRef(null);

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

  const popUpYes = () => {
    setPopUpVisible({visible: false, id: null});
    props.onYes(isPopUpVisible.id);
  }

  const popUpNo = () => {
    setPopUpVisible({visible: false, id: null});
  }

  return (
    <div className={"popup" + ((!isPopUpVisible.visible) ? " hidden" : "")}>
      <div className="popup-box">
        <div className="popup-box-container" ref={refPopUp}>
          <div className="popup-box-container-title">{ props.title }</div>
          <div className="popup-box-container-actions">
            <Button value="Yes" outlined color="danger" size="medium" onClick={popUpYes} />
            <Button value="No" outlined color="white" size="medium" onClick={popUpNo} />
          </div>
        </div>
      </div>
    </div>
  );
});

export default Popup;