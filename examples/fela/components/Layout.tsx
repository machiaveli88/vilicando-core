import React from "react";
import { useConfig } from "vilicando-core";
import { useFela } from "@theme";

interface ILayout {
  children: React.ReactNode | Array<React.ReactNode>;
}

function Layout({ children }: ILayout) {
  const { css, theme } = useFela();
  const { name } = useConfig();

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      })}
    >
      <div
        className={css({
          backgroundColor: theme.palette.primary.base,
          padding: theme.spacing.md,
          textAlign: "center",
          width: "100%",
        })}
      >
        <h2 className={css({ color: theme.white, margin: 0 })}>{name}</h2>
      </div>

      <div
        className={css({
          width: "75%",
          minWidth: theme.screen.xxs,
          maxWidth: theme.screen.md,
        })}
      >
        {children}
      </div>
    </div>
  );
}

export default Layout;
