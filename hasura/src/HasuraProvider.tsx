import * as React from 'react';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { ISchema } from './typings';

export interface IHasuraContext {
  http?: HttpLink.Options;
  ws?: WebSocketLink.Configuration;
  schema: ISchema;
}

export interface IHasuraProvider extends IHasuraContext {
  children: React.ReactNode;
}

const HasuraContext = React.createContext<IHasuraContext>(null);

export function useHasura(): IHasuraContext {
  return React.useContext(HasuraContext);
}

function HasuraProvider({ children, http, ws, schema }: IHasuraProvider) {
  return (
    <HasuraContext.Provider value={{ http, ws, schema }}>
      {children}
    </HasuraContext.Provider>
  );
}

export default HasuraProvider;
