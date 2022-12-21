import React from "react";

import s from "./NotFoundBlock.module.scss";

const NotFoundBlock: React.FC = () => {
  return (
    <h1 className={s.root}>
      Ничего не найдено
      <br />
      <span>:(</span>
    </h1>
  );
};

export default NotFoundBlock;
