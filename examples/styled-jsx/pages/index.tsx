import React from "react";
import { colors, useThemeContext, useTheme, ThemeProvider } from "@theme";

function Content({ children, active, onClick }: any) {
  const theme = useTheme();

  return (
    <>
      <div onClick={onClick}>
        {children}-theme {!!active && <span>active</span>}
      </div>

      <style jsx>{`
        div {
          display: block;
          margin-bottom: ${theme.spacing.sm};
          padding: ${theme.spacing.sm};
          color: ${theme.secondary.base};
          background-color: ${theme.primary.base};
          cursor: pointer;
          border: 1px solid ${theme.primary.base};
          font-weight: bold;
          text-shadow: 0 0 2px ${theme.shadow};
        }
        div:hover {
          border-color: ${theme.secondary.base};
        }
        span {
          float: right;
          font-weight: bold;
        }
      `}</style>
    </>
  );
}

function StartPage() {
  const theme = useTheme();
  const [activeTheme, setTheme] = useThemeContext();

  return (
    <>
      <h1>Hello World</h1>
      <p>
        <span>Lorem ipsum dolor sit amet</span>, consetetur sadipscing elitr,
        sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
        aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
        est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
        sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
        justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
        takimata sanctus est Lorem ipsum dolor sit amet.
      </p>

      <h3>Themes</h3>
      {colors.map(key => (
        <ThemeProvider theme={key} key={key}>
          <Content active={key === activeTheme} onClick={() => setTheme(key)}>
            {key}
          </Content>
        </ThemeProvider>
      ))}

      <style jsx>{`
        span {
          font-weight: bold;
          color: ${theme.primary.base};
        }
        h3 {
          margin-bottom: ${theme.spacing.xs};
        }
      `}</style>
    </>
  );
}

export default StartPage;
