import React, { useContext } from "react";
import { FaAngleLeft } from "react-icons/fa";
import PageContext from "@/contexts/page-context";
import Button from "../button/button";

import "./back-button.scss";

export default function BackButton() {
  const contextPage = useContext(PageContext);

  if (contextPage.lastPages.length === 1) {
    return <></>;
  }

  const goBack = () => {
    contextPage.updatePage(contextPage.lastPages[contextPage.lastPages.length - 2]);
  }

  return (
    <div className='back-button'>
      <Button bgColor="primary" onClick={goBack} icon={<FaAngleLeft className='icon-medium' />} circle />
    </div>
  );
}
