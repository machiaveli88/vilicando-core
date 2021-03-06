import React from "react";
import { dynamic } from "vilicando-core";
import { Loader } from "vilicando-fela";

const Content = dynamic(
  Promise.all([
    import("@components").then(({ Content }) => Content),
    new Promise((resolve) => setTimeout(resolve, 600)),
  ]).then(([mod]) => mod),
  {
    loading: () => <Loader text="Loading content..." />,
  }
);

function WithLazyLoadingPage() {
  return (
    <>
      <h5>A page with lazy-loading component</h5>
      <Content />
    </>
  );
}

export default WithLazyLoadingPage;
