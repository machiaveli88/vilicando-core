import * as React from 'react';
import { Debe } from 'debe';
// import { DebeProvider } from 'debe-react';
import { IRenderer } from 'fela';
import LanguageProvider from './language';
// import { Loader } from './components';
import { FelaProvider } from './theme';

export interface ICoreProvider {
  children?: React.ReactNode;
  theme?: object;
  renderer?: IRenderer;
  loader?: () => React.ReactNode;
  loading?: boolean;
  db?: Debe | (() => Debe);
  locale?: string;
}

function CoreProvider({
  children,
  // db,
  theme,
  renderer,
  /* loader = () => <Loader />,
  loading = false, */
  locale
}: ICoreProvider) {
  return (
    <FelaProvider renderer={renderer} theme={theme}>
      <LanguageProvider translation={{}} locale={locale}>
        {/* loading ? loader() : null */}
        {
          /* !!db ? (
          <DebeProvider loading={loader} value={db}>
            {children}
          </DebeProvider>
        ) : */ children
        }
      </LanguageProvider>
    </FelaProvider>
  );
}

export default CoreProvider;
