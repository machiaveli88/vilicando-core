import React from "react";
import { useTheme } from "@theme";

export default function Container(props: React.HTMLAttributes<HTMLDivElement>) {
  const theme = useTheme();

  return (
    <>
      <div {...props} />
      <style jsx>
        {`
          div {
            background-color: ${theme.palette.primary[1]};
            padding: ${theme.spacing.md}px;
            width: 100%;
          }
        `}
      </style>
    </>
  );
}
