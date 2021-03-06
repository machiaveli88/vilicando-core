import React from "react";
import { useConfig } from "vilicando-core";
import { useTheme } from "@theme";

interface IComponentWithChildren {
  children: React.ReactNode | Array<React.ReactNode>;
}

function Header({ children }: IComponentWithChildren) {
  const theme = useTheme();

  return (
    <>
      <div>
        <h2>{children}</h2>
      </div>
      <style jsx>
        {`
          div {
            background-color: ${theme.palette.primary.base};
            padding: ${theme.spacing.md}px;
            text-align: center;
            width: 100%;
          }
          h2 {
            color: ${theme.white};
            margin: 0;
          }
        `}
      </style>
    </>
  );
}

function Content({ children }: IComponentWithChildren) {
  const theme = useTheme();

  return (
    <>
      <div>{children}</div>
      <style jsx>
        {`
          div {
            width: 75%;
            min-width: ${theme.screen.xxs}px;
            max-width: ${theme.screen.md}px;
          }
        `}
      </style>
    </>
  );
}

export default function Layout({ children }: IComponentWithChildren) {
  const { name } = useConfig();

  return (
    <>
      <div>
        <Header>{name}</Header>
        <Content>{children}</Content>
      </div>

      <style jsx>
        {`
          div {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        `}
      </style>
    </>
  );
}
