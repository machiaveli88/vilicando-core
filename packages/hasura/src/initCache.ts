import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import { PersistentStorage, PersistedData } from "apollo-cache-persist/types";

export default function initCache(state: NormalizedCacheObject = {}) {
  const cache = new InMemoryCache().restore(state);

  // todo: https://github.com/apollographql/apollo-cache-persist#how-do-i-wait-for-the-cache-to-be-restored-before-rendering-my-app
  if (typeof window !== "undefined")
    persistCache({
      cache,
      storage: window.localStorage as PersistentStorage<
        PersistedData<NormalizedCacheObject>
      >,
    });

  return cache;
}
