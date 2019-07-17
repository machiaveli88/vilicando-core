import * as React from 'react';
import Document, {
  DocumentContext,
  DocumentProps,
  Head,
  Html,
  Main,
  NextScript
  } from 'next/document';
import renderer from '../renderer';
import { renderToSheetList } from 'fela-dom';

/*
  Pages in Next.js skip the definition of the surrounding document's markup. For example, you never include <html>, <body>, etc.
  
  - Is rendered on the server side
  - Is used to change the initial server side rendered document markup
  - Commonly used to implement server side rendering for css-in-js libraries like styled-components or emotion. styled-jsx is included with Next.js by default.
*/

export interface IDocument extends DocumentProps {
  children: React.ReactElement;
}

export default class CustomDocument extends Document<IDocument> {
  static async getInitialProps({ renderPage, ...rest }: DocumentContext) {
    const initialProps = await Document.getInitialProps({
      renderPage: () =>
        renderPage({
          enhanceApp: App => props => (
            // @ts-ignore
            <App {...props} renderer={renderer} />
          )
        }),
      ...rest
    });

    return {
      ...initialProps,
      styles: renderToSheetList(renderer).map(
        ({ type, rehydration, support, media, css }: any) => (
          <style
            dangerouslySetInnerHTML={{ __html: css }}
            data-fela-rehydration={rehydration}
            data-fela-support={support}
            data-fela-type={type}
            key={`${type}-${media}`}
            media={media}
          />
        )
      )
    };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="viewport" content="width=device-width" />

          <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />

          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
