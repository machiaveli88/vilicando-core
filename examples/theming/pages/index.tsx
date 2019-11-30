import React from 'react';
import { useFela } from 'vilicando-core';

function StartPage() {
  const { css, theme } = useFela();

  return (
    <>
      <h1>Hello World</h1>
      <p>
        <span className={css({ color: theme.redColor, fontWeight: 'bold' })}>
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
    </>
  );
}

export default StartPage;
