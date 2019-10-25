export type TOptimisticItem<TItem> = TItem & {
  __optimistic?: boolean;
  id: any;
};

export type TQueryData<TItem> = {
  [x: string]: Array<TOptimisticItem<TItem>>;
};

export type TMutationData<TItem> = {
  [x: string]: { __typename: string; returning: Array<TItem> };
};
