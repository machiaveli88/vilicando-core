import React from "react";
import cookie, { CookieAttributes } from "js-cookie";
import { useApolloClient } from "@apollo/react-hooks";
import { CachePersistor } from "apollo-cache-persist";
import { PersistentStorage, PersistedData } from "apollo-cache-persist/types";

export default function useAuth() {
  const client = useApolloClient();

  const login = React.useCallback(
    async (token: string, options: CookieAttributes = { expires: 1 }) => {
      try {
        cookie.set("token", token, options);
      } catch (error) {
        console.error("Error while login", error);
      }
    },
    []
  );
  const logout = React.useCallback(async () => {
    const persistor = new CachePersistor({
      cache: client.cache,
      storage: window.localStorage as PersistentStorage<PersistedData<object>>,
    });

    try {
      await client.clearStore();
      await persistor.purge();
      cookie.remove("token");
    } catch (error) {
      console.error("Error while logout", error);
    }
  }, [client]);
  const hasToken = React.useCallback(() => !!cookie.get("token"), [client]);

  return { login, logout, hasToken };
}
