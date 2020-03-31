import React from "react";
import { registerRootComponent } from "expo";
import { ThemeProvider } from "@theme";
import { Start, Alternate } from "@views";

function App() {
  const [showAlternate, setShowAlternate] = React.useState<boolean>(false);

  return (
    <ThemeProvider>
      {showAlternate ? (
        <Alternate onClick={() => setShowAlternate(false)} />
      ) : (
        <Start onClick={() => setShowAlternate(true)} />
      )}
    </ThemeProvider>
  );
}

registerRootComponent(App);
