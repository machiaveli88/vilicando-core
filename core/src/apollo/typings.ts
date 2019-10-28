export type TAdvancedItem<IItem> = Omit<IItem, '__typename'> & {
  __typename: any;
  id: any;
  created_at: any;
  updated_at: any;
};

export type TOptimisticItem<IItem> = TAdvancedItem<IItem> & {
  __optimistic?: boolean;
};

export type TUpdateItem<IItem> = Partial<IItem> | Array<Partial<IItem>>;

export interface IQueryData<IItem> {
  [x: string]: Array<TOptimisticItem<IItem>>;
}

export interface IMutationData<IItem> {
  [x: string]: { __typename: string; returning: Array<TAdvancedItem<IItem>> };
}

export interface ISchema {
  __schema: {
    directives?: Array<object>;
    mutationType?: object;
    queryType?: object;
    subscriptionType?: object;
    types: Array<{
      description?: string;
      enumValues?: Array<object>;
      fields?: Array<{
        args?: Array<object>;
        deprecationReason?: any;
        description?: string;
        isDeprecated?: boolean;
        name?: string;
        type?: object;
      }>;
      inputFields?: Array<object>;
      interfaces?: Array<object>;
      kind?: string;
      name: string;
      possibleTypes?: any;
    }>;
  };
}
