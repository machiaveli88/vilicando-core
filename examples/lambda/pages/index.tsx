import React from "react";
import { useTheme } from "@theme";
import fetch from "isomorphic-unfetch";

function StartPage() {
  const theme = useTheme();
  const [content, setContent] = React.useState("Loading...");

  const getChuck = React.useCallback(async () => {
    setContent("Loading...");

    try {
      const response = await fetch(
        "http://localhost:9000/.netlify/functions/chuck"
      );

      if (response.ok) {
        const { msg } = await response.json();
        setContent(msg);
      } else throw Error("Can't reach enpoint!");
    } catch (error) {
      console.error(
        "You have an error in your code or there are Network issues.",
        error
      );

      setContent("No content found. Maybe you forgot to run 'yarn lambda'?");
    }
  }, []);

  React.useEffect(() => {
    getChuck();
  }, []);

  return (
    <>
      <h1>Fetch Chuck Norris sayings</h1>
      <div>
        {content}
        <button onClick={getChuck}>run again</button>
        <style jsx>
          {`
            div {
              background-color: ${theme.palette.primary[1]};
              padding: ${theme.spacing.md}px;
              text-align: center;
              width: 100%;
              position: relative;
            }
            button {
              position: absolute;
              bottom: 0;
              right: 0;
              background-color: ${theme.palette.primary.base};
              border-color: ${theme.palette.primary.base};
              color: ${theme.white};
            }
          `}
        </style>
      </div>
      <h3>How it works?</h3>
      <p>
        Use <code>vilicando-core lambda</code> to run lambda-functions from your
        functions-directory.
      </p>
      <ul>
        <li>
          <a href="http://localhost:9000/.netlify/functions/hello">
            http://localhost:9000/.netlify/functions/hello
          </a>
        </li>
        <li>
          <a href="http://localhost:9000/.netlify/functions/async">
            http://localhost:9000/.netlify/functions/async
          </a>
        </li>
        <li>
          <a href="http://localhost:9000/.netlify/functions/graphql">
            http://localhost:9000/.netlify/functions/graphql
          </a>
        </li>
      </ul>
      <p>You can use the following options:</p>
      <ul>
        <li>
          <b>--src</b> = Source-Folder where functions are saved as .ts-files
          <br />
          <small>(default: 'functions')</small>
        </li>
        <li>
          <b>---dest</b> = Destination-Folder where functions will be exported
          <br />
          <small>(default: '.lambda')</small>
        </li>
        <li>
          <b>--port</b> = Port for lambda-function-server (e.g.
          http://localhost:9000/.netlify/functions/FUNCTION-NAME)
          <br />
          <small>(default: 9000)</small>
        </li>
        <li>
          <b>--url</b> = URL for lambda-function-server (e.g.
          http://localhost:9000/.netlify/functions/FUNCTION-NAME)
          <br />
          <small>(default: '.netlify/functions')</small>
        </li>
        <li>
          <b>--timeout</b> = Maximum time in minutes before function will abort
          <br />
          <small>(default: 10)</small>
        </li>
        <li>
          <b>--build/-b</b> = Build only
          <br />
          <small>(default: false)</small>
        </li>
      </ul>
    </>
  );
}

export default StartPage;
