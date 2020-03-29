import React from "react";
import { dynamic } from "vilicando-core";
import { Loader } from "vilicando-fela";

const Content = dynamic(
  Promise.all([
    import("@components").then(({ Content }) => Content),
    new Promise(resolve => setTimeout(resolve, 600))
  ]).then(([mod]) => mod),
  {
    loading: () => <Loader text="Loading content..." />,
    ssr: false
  }
);

function WithoutSsrPage() {
  return (
    <>
      <h5>A page without ssr</h5>
      <Content />
    </>
  );
}

export default WithoutSsrPage;
