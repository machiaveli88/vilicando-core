import React from 'react';
import NextDocument, {
  DocumentContext as NextDocumentContext,
  DocumentInitialProps
} from 'next/document';
import { IRenderer } from 'fela';
import { renderToSheetList } from 'fela-dom';
import { defaultRenderer } from '../theme';

export interface DocumentContext extends NextDocumentContext {
  renderer?: IRenderer;
}

export default abstract class Document extends NextDocument {
  static async getInitialProps({
    renderPage,
    renderer = defaultRenderer,
    ...rest
  }: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await NextDocument.getInitialProps({
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
      styles: renderToSheetList(
        renderer
      ).map(({ type, rehydration, support, media, css }: any) => (
        <style
          dangerouslySetInnerHTML={{ __html: css }}
          data-fela-rehydration={rehydration}
          data-fela-support={support}
          data-fela-type={type}
          key={`${type}-${media}`}
          media={media}
        />
      ))
    };
  }
}
