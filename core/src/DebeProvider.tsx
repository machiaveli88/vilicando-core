import * as React from 'react';
import { Debe } from 'debe';
import { DebeProvider } from 'debe-react';

export interface IDebeProvider {
  children: React.ReactNode;
  showLoader?: () => React.ReactNode;
  db?: Debe | (() => Debe);
}

function CustomDebeProvider({ children, db, showLoader }: IDebeProvider) {
  return !!db ? (
    <DebeProvider loading={showLoader} value={db}>
      {children}
    </DebeProvider>
  ) : (
    <>{children}</>
  );
}

export default CustomDebeProvider;
