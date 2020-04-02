import React from "react";
import { colors, useFela, useThemeContext, ThemeProvider } from "@theme";

function Content({ children, active, onClick }: any) {
  const { css, theme } = useFela();

  return (
    <div
      onClick={onClick}
      className={css({
        display: "block",
        marginBottom: theme.spacing.sm,
        padding: theme.spacing.sm,
        color: theme.secondary.base,
        backgroundColor: theme.primary.base,
        cursor: "pointer",
        border: `1px solid ${theme.primary.base}`,
        fontWeight: "bold",
        textShadow: `0 0 2px ${theme.highlight}`,
        onHover: {
          borderColor: theme.secondary.base,
        },
      })}
    >
      {children}-theme{" "}
      {!!active && (
        <span className={css({ float: "right", fontWeight: "bold" })}>
          active
        </span>
      )}
    </div>
  );
}

function StartPage() {
  const { css, theme } = useFela();
  const [activeTheme, setTheme] = useThemeContext();

  return (
    <>
      <h1>Hello World</h1>
      <p>
        <span
          className={css({ fontWeight: "bold", color: theme.primary.base })}
        >
          Lorem ipsum dolor sit amet
        </span>
        , consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
        labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
        accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
        sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor
        sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
        invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
        vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
        gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
      </p>

      <h3 className={css({ marginBottom: theme.spacing.xs })}>Themes</h3>
      {colors.map(key => (
        <ThemeProvider theme={key} key={key}>
          <Content active={key === activeTheme} onClick={() => setTheme(key)}>
            {key}
          </Content>
        </ThemeProvider>
      ))}
    </>
  );
}

export default StartPage;
