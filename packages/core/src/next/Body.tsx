import React from "react";
import { Main, NextScript } from "next/document";

interface IBody {
  children?: React.ReactNode | Array<React.ReactNode>;
}

function Body({ children }: IBody) {
  return (
    <body>
      {children}
      <Main />
      <NextScript />
    </body>
  );
}

export default Body;
