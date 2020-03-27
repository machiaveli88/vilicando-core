import React from 'react';

function StartPage() {
  return (
    <>
      <h1>Hello World</h1>
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
