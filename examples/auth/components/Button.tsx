import React from "react";
import { useTheme } from "@theme";

export default function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const theme = useTheme();

  return (
    <>
      <button {...props} />
      <style jsx>
        {`
          button {
            background-color: ${theme.palette.primary.base};
            border-color: ${theme.palette.primary.base};
            color: ${theme.palette.primary.text};
          }
        `}
      </style>
    </>
  );
}
