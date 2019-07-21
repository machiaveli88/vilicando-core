import * as React from 'react';
import LanguageProvider from './language';
import { Debe } from 'debe';
import { FelaProvider } from './theme';
import { IRenderer } from 'fela';
import { Loader, Progress } from './components';
// import { DebeProvider } from 'debe-react';

export const CoreContext = React.createContext({});

export const useCore = () => React.useContext(CoreContext);

export interface ICoreProvider {
  children?: React.ReactNode;
  theme?: object;
  renderer?: IRenderer;
  showLoader?: () => React.ReactNode;
  loading?: boolean;
  db?: Debe | (() => Debe);
  locale?: string;
}

function CoreProvider({
  children,
  // db,
  theme,
  renderer,
  showLoader = () => <Loader />,
  loading = false,
  locale
}: ICoreProvider) {
  return (
    <CoreContext.Provider value={{ showLoader }}>
      <FelaProvider renderer={renderer} theme={theme}>
        <LanguageProvider translation={{}} locale={locale}>
          {loading ? showLoader() : null}
          <Progress>{children}</Progress>
        </LanguageProvider>
      </FelaProvider>
    </CoreContext.Provider>
  );
}

/* !!db ? (
<DebeProvider loading={showLoader} value={db}>
  {children}
</DebeProvider>
) : */

export default CoreProvider;
