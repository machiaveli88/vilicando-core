import React from "react";

function StartPage() {
  return (
    <p>
      {process.env.MESSAGE}, in this example, port {process.env.PORT} is set
      using the .env-file.
    </p>
  );
}

export default StartPage;
