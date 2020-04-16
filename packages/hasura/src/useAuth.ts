import React from "react";
import { useApolloClient } from "@apollo/react-hooks";
import { CachePersistor } from "apollo-cache-persist";
import { PersistentStorage, PersistedData } from "apollo-cache-persist/types";
import jwt from "jsonwebtoken";

export default function useAuth() {
  const client = useApolloClient();
  const session = React.useMemo(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const { name, "https://hasura.io/jwt/claims": hasura, iat, exp, sub } =
      jwt.decode(token, { json: true }) || {};

    return {
      name,
      iat,
      exp,
      expired: !exp || exp < Date.now() / 1000,
      sub,
      id: hasura?.["x-hasura-user-id"],
      defaultRole: hasura?.["x-hasura-default-role"],
      allowedRoles: hasura?.["x-hasura-allowed-roles"],
    };
  }, []);

  React.useEffect(() => {
    if (session.expired) logout();
  }, [session.expired]);

  const login = React.useCallback(async (token: string) => {
    try {
      // todo: don't use localStorage https://dev.to/rdegges/please-stop-using-local-storage-1i04
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Error while login", error);
    }
  }, []);
  const logout = React.useCallback(async () => {
    const persistor = new CachePersistor({
      cache: client.cache,
      storage: localStorage as PersistentStorage<PersistedData<object>>,
    });

    try {
      // await client.resetStore(); // clears only login
      await client.clearStore(); // clears also the cache!
      await persistor.purge();
      localStorage.clear();
    } catch (error) {
      console.error("Error while logout", error);
    }
  }, [client]);

  return { login, logout, session };
}
