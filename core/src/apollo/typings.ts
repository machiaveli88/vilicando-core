export type TAdvancedItem<IItem> = Omit<IItem, '__typename'> & {
  __typename: any;
  id: any;
  created_at: any;
  updated_at: any;
};

export type TOptimisticItem<IItem> = TAdvancedItem<IItem> & {
  __optimistic?: boolean;
};

export type TUpdateItem<IItem, IVariables> = Partial<IItem> & IVariables; // alle Attribute aus Item (diese als optional) und alle aus Variables (todo: die auch in Item vorhanden sind)

export interface IQueryData<IItem> {
  [x: string]: Array<TOptimisticItem<IItem>>;
}

export interface IMutationData<IItem> {
  [x: string]: { __typename: string; returning: Array<TAdvancedItem<IItem>> };
}
