import gql from 'graphql-tag';
import * as ApolloReactCommon from 'vilicando-hasura';
import * as ApolloReactHooks from 'vilicando-hasura';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  uuid: any;
  timestamptz: any;
};

export type TGroup = {
  __typename?: 'group';
  id: Scalars['uuid'];
  name: Scalars['String'];
  users: Array<TGroupUsers>;
  users_aggregate: TGroupUsersAggregate;
};

export type TGroupUsersArgs = {
  distinct_on?: Maybe<Array<TGroupUsersSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TGroupUsersOrderBy>>;
  where?: Maybe<TGroupUsersBoolExp>;
};

export type TGroupUsersAggregateArgs = {
  distinct_on?: Maybe<Array<TGroupUsersSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TGroupUsersOrderBy>>;
  where?: Maybe<TGroupUsersBoolExp>;
};

export type TGroupAggregate = {
  __typename?: 'group_aggregate';
  aggregate?: Maybe<TGroupAggregateFields>;
  nodes: Array<TGroup>;
};

export type TGroupAggregateFields = {
  __typename?: 'group_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<TGroupMaxFields>;
  min?: Maybe<TGroupMinFields>;
};

export type TGroupAggregateFieldsCountArgs = {
  columns?: Maybe<Array<TGroupSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

export type TGroupAggregateOrderBy = {
  count?: Maybe<TOrderBy>;
  max?: Maybe<TGroupMaxOrderBy>;
  min?: Maybe<TGroupMinOrderBy>;
};

export type TGroupArrRelInsertInput = {
  data: Array<TGroupInsertInput>;
  on_conflict?: Maybe<TGroupOnConflict>;
};

export type TGroupBoolExp = {
  _and?: Maybe<Array<Maybe<TGroupBoolExp>>>;
  _not?: Maybe<TGroupBoolExp>;
  _or?: Maybe<Array<Maybe<TGroupBoolExp>>>;
  id?: Maybe<TUuidComparisonExp>;
  name?: Maybe<TStringComparisonExp>;
  users?: Maybe<TGroupUsersBoolExp>;
};

export enum TGroupConstraint {
  GroupPkey = 'group_pkey'
}

export type TGroupInsertInput = {
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  users?: Maybe<TGroupUsersArrRelInsertInput>;
};

export type TGroupMaxFields = {
  __typename?: 'group_max_fields';
  name?: Maybe<Scalars['String']>;
};

export type TGroupMaxOrderBy = {
  name?: Maybe<TOrderBy>;
};

export type TGroupMinFields = {
  __typename?: 'group_min_fields';
  name?: Maybe<Scalars['String']>;
};

export type TGroupMinOrderBy = {
  name?: Maybe<TOrderBy>;
};

export type TGroupMutationResponse = {
  __typename?: 'group_mutation_response';
  affected_rows: Scalars['Int'];
  returning: Array<TGroup>;
};

export type TGroupObjRelInsertInput = {
  data: TGroupInsertInput;
  on_conflict?: Maybe<TGroupOnConflict>;
};

export type TGroupOnConflict = {
  constraint: TGroupConstraint;
  update_columns: Array<TGroupUpdateColumn>;
  where?: Maybe<TGroupBoolExp>;
};

export type TGroupOrderBy = {
  id?: Maybe<TOrderBy>;
  name?: Maybe<TOrderBy>;
  users_aggregate?: Maybe<TGroupUsersAggregateOrderBy>;
};

export enum TGroupSelectColumn {
  Id = 'id',
  Name = 'name'
}

export type TGroupSetInput = {
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
};

export enum TGroupUpdateColumn {
  Id = 'id',
  Name = 'name'
}

export type TGroupUsers = {
  __typename?: 'group_users';
  group: TGroup;
  group_id: Scalars['uuid'];
  id: Scalars['uuid'];
  user: TUser;
  user_id: Scalars['uuid'];
};

export type TGroupUsersAggregate = {
  __typename?: 'group_users_aggregate';
  aggregate?: Maybe<TGroupUsersAggregateFields>;
  nodes: Array<TGroupUsers>;
};

export type TGroupUsersAggregateFields = {
  __typename?: 'group_users_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
};

export type TGroupUsersAggregateFieldsCountArgs = {
  columns?: Maybe<Array<TGroupUsersSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

export type TGroupUsersAggregateOrderBy = {
  count?: Maybe<TOrderBy>;
};

export type TGroupUsersArrRelInsertInput = {
  data: Array<TGroupUsersInsertInput>;
  on_conflict?: Maybe<TGroupUsersOnConflict>;
};

export type TGroupUsersBoolExp = {
  _and?: Maybe<Array<Maybe<TGroupUsersBoolExp>>>;
  _not?: Maybe<TGroupUsersBoolExp>;
  _or?: Maybe<Array<Maybe<TGroupUsersBoolExp>>>;
  group?: Maybe<TGroupBoolExp>;
  group_id?: Maybe<TUuidComparisonExp>;
  id?: Maybe<TUuidComparisonExp>;
  user?: Maybe<TUserBoolExp>;
  user_id?: Maybe<TUuidComparisonExp>;
};

export enum TGroupUsersConstraint {
  GroupUsersPkey = 'group_users_pkey'
}

export type TGroupUsersInsertInput = {
  group?: Maybe<TGroupObjRelInsertInput>;
  group_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  user?: Maybe<TUserObjRelInsertInput>;
  user_id?: Maybe<Scalars['uuid']>;
};

export type TGroupUsersMutationResponse = {
  __typename?: 'group_users_mutation_response';
  affected_rows: Scalars['Int'];
  returning: Array<TGroupUsers>;
};

export type TGroupUsersObjRelInsertInput = {
  data: TGroupUsersInsertInput;
  on_conflict?: Maybe<TGroupUsersOnConflict>;
};

export type TGroupUsersOnConflict = {
  constraint: TGroupUsersConstraint;
  update_columns: Array<TGroupUsersUpdateColumn>;
  where?: Maybe<TGroupUsersBoolExp>;
};

export type TGroupUsersOrderBy = {
  group?: Maybe<TGroupOrderBy>;
  group_id?: Maybe<TOrderBy>;
  id?: Maybe<TOrderBy>;
  user?: Maybe<TUserOrderBy>;
  user_id?: Maybe<TOrderBy>;
};

export enum TGroupUsersSelectColumn {
  GroupId = 'group_id',
  Id = 'id',
  UserId = 'user_id'
}

export type TGroupUsersSetInput = {
  group_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  user_id?: Maybe<Scalars['uuid']>;
};

export enum TGroupUsersUpdateColumn {
  GroupId = 'group_id',
  Id = 'id',
  UserId = 'user_id'
}

export type TMutationRoot = {
  __typename?: 'mutation_root';
  delete_group?: Maybe<TGroupMutationResponse>;
  delete_group_users?: Maybe<TGroupUsersMutationResponse>;
  delete_task?: Maybe<TTaskMutationResponse>;
  delete_user?: Maybe<TUserMutationResponse>;
  insert_group?: Maybe<TGroupMutationResponse>;
  insert_group_users?: Maybe<TGroupUsersMutationResponse>;
  insert_task?: Maybe<TTaskMutationResponse>;
  insert_user?: Maybe<TUserMutationResponse>;
  update_group?: Maybe<TGroupMutationResponse>;
  update_group_users?: Maybe<TGroupUsersMutationResponse>;
  update_task?: Maybe<TTaskMutationResponse>;
  update_user?: Maybe<TUserMutationResponse>;
};

export type TMutationRootDeleteGroupArgs = {
  where: TGroupBoolExp;
};

export type TMutationRootDeleteGroupUsersArgs = {
  where: TGroupUsersBoolExp;
};

export type TMutationRootDeleteTaskArgs = {
  where: TTaskBoolExp;
};

export type TMutationRootDeleteUserArgs = {
  where: TUserBoolExp;
};

export type TMutationRootInsertGroupArgs = {
  objects: Array<TGroupInsertInput>;
  on_conflict?: Maybe<TGroupOnConflict>;
};

export type TMutationRootInsertGroupUsersArgs = {
  objects: Array<TGroupUsersInsertInput>;
  on_conflict?: Maybe<TGroupUsersOnConflict>;
};

export type TMutationRootInsertTaskArgs = {
  objects: Array<TTaskInsertInput>;
  on_conflict?: Maybe<TTaskOnConflict>;
};

export type TMutationRootInsertUserArgs = {
  objects: Array<TUserInsertInput>;
  on_conflict?: Maybe<TUserOnConflict>;
};

export type TMutationRootUpdateGroupArgs = {
  _set?: Maybe<TGroupSetInput>;
  where: TGroupBoolExp;
};

export type TMutationRootUpdateGroupUsersArgs = {
  _set?: Maybe<TGroupUsersSetInput>;
  where: TGroupUsersBoolExp;
};

export type TMutationRootUpdateTaskArgs = {
  _set?: Maybe<TTaskSetInput>;
  where: TTaskBoolExp;
};

export type TMutationRootUpdateUserArgs = {
  _set?: Maybe<TUserSetInput>;
  where: TUserBoolExp;
};

export enum TOrderBy {
  Asc = 'asc',
  AscNullsFirst = 'asc_nulls_first',
  AscNullsLast = 'asc_nulls_last',
  Desc = 'desc',
  DescNullsFirst = 'desc_nulls_first',
  DescNullsLast = 'desc_nulls_last'
}

export type TQueryRoot = {
  __typename?: 'query_root';
  group: Array<TGroup>;
  group_aggregate: TGroupAggregate;
  group_by_pk?: Maybe<TGroup>;
  group_users: Array<TGroupUsers>;
  group_users_aggregate: TGroupUsersAggregate;
  group_users_by_pk?: Maybe<TGroupUsers>;
  task: Array<TTask>;
  task_aggregate: TTaskAggregate;
  task_by_pk?: Maybe<TTask>;
  user: Array<TUser>;
  user_aggregate: TUserAggregate;
  user_by_pk?: Maybe<TUser>;
};

export type TQueryRootGroupArgs = {
  distinct_on?: Maybe<Array<TGroupSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TGroupOrderBy>>;
  where?: Maybe<TGroupBoolExp>;
};

export type TQueryRootGroupAggregateArgs = {
  distinct_on?: Maybe<Array<TGroupSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TGroupOrderBy>>;
  where?: Maybe<TGroupBoolExp>;
};

export type TQueryRootGroupByPkArgs = {
  id: Scalars['uuid'];
};

export type TQueryRootGroupUsersArgs = {
  distinct_on?: Maybe<Array<TGroupUsersSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TGroupUsersOrderBy>>;
  where?: Maybe<TGroupUsersBoolExp>;
};

export type TQueryRootGroupUsersAggregateArgs = {
  distinct_on?: Maybe<Array<TGroupUsersSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TGroupUsersOrderBy>>;
  where?: Maybe<TGroupUsersBoolExp>;
};

export type TQueryRootGroupUsersByPkArgs = {
  id: Scalars['uuid'];
};

export type TQueryRootTaskArgs = {
  distinct_on?: Maybe<Array<TTaskSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TTaskOrderBy>>;
  where?: Maybe<TTaskBoolExp>;
};

export type TQueryRootTaskAggregateArgs = {
  distinct_on?: Maybe<Array<TTaskSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TTaskOrderBy>>;
  where?: Maybe<TTaskBoolExp>;
};

export type TQueryRootTaskByPkArgs = {
  id: Scalars['uuid'];
};

export type TQueryRootUserArgs = {
  distinct_on?: Maybe<Array<TUserSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TUserOrderBy>>;
  where?: Maybe<TUserBoolExp>;
};

export type TQueryRootUserAggregateArgs = {
  distinct_on?: Maybe<Array<TUserSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TUserOrderBy>>;
  where?: Maybe<TUserBoolExp>;
};

export type TQueryRootUserByPkArgs = {
  id: Scalars['uuid'];
};

export type TStringComparisonExp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  _nlike?: Maybe<Scalars['String']>;
  _nsimilar?: Maybe<Scalars['String']>;
  _similar?: Maybe<Scalars['String']>;
};

export type TSubscriptionRoot = {
  __typename?: 'subscription_root';
  group: Array<TGroup>;
  group_aggregate: TGroupAggregate;
  group_by_pk?: Maybe<TGroup>;
  group_users: Array<TGroupUsers>;
  group_users_aggregate: TGroupUsersAggregate;
  group_users_by_pk?: Maybe<TGroupUsers>;
  task: Array<TTask>;
  task_aggregate: TTaskAggregate;
  task_by_pk?: Maybe<TTask>;
  user: Array<TUser>;
  user_aggregate: TUserAggregate;
  user_by_pk?: Maybe<TUser>;
};

export type TSubscriptionRootGroupArgs = {
  distinct_on?: Maybe<Array<TGroupSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TGroupOrderBy>>;
  where?: Maybe<TGroupBoolExp>;
};

export type TSubscriptionRootGroupAggregateArgs = {
  distinct_on?: Maybe<Array<TGroupSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TGroupOrderBy>>;
  where?: Maybe<TGroupBoolExp>;
};

export type TSubscriptionRootGroupByPkArgs = {
  id: Scalars['uuid'];
};

export type TSubscriptionRootGroupUsersArgs = {
  distinct_on?: Maybe<Array<TGroupUsersSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TGroupUsersOrderBy>>;
  where?: Maybe<TGroupUsersBoolExp>;
};

export type TSubscriptionRootGroupUsersAggregateArgs = {
  distinct_on?: Maybe<Array<TGroupUsersSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TGroupUsersOrderBy>>;
  where?: Maybe<TGroupUsersBoolExp>;
};

export type TSubscriptionRootGroupUsersByPkArgs = {
  id: Scalars['uuid'];
};

export type TSubscriptionRootTaskArgs = {
  distinct_on?: Maybe<Array<TTaskSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TTaskOrderBy>>;
  where?: Maybe<TTaskBoolExp>;
};

export type TSubscriptionRootTaskAggregateArgs = {
  distinct_on?: Maybe<Array<TTaskSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TTaskOrderBy>>;
  where?: Maybe<TTaskBoolExp>;
};

export type TSubscriptionRootTaskByPkArgs = {
  id: Scalars['uuid'];
};

export type TSubscriptionRootUserArgs = {
  distinct_on?: Maybe<Array<TUserSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TUserOrderBy>>;
  where?: Maybe<TUserBoolExp>;
};

export type TSubscriptionRootUserAggregateArgs = {
  distinct_on?: Maybe<Array<TUserSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TUserOrderBy>>;
  where?: Maybe<TUserBoolExp>;
};

export type TSubscriptionRootUserByPkArgs = {
  id: Scalars['uuid'];
};

export type TTask = {
  __typename?: 'task';
  created_at: Scalars['timestamptz'];
  finished_at?: Maybe<Scalars['timestamptz']>;
  id: Scalars['uuid'];
  note?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
};

export type TTaskAggregate = {
  __typename?: 'task_aggregate';
  aggregate?: Maybe<TTaskAggregateFields>;
  nodes: Array<TTask>;
};

export type TTaskAggregateFields = {
  __typename?: 'task_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<TTaskMaxFields>;
  min?: Maybe<TTaskMinFields>;
};

export type TTaskAggregateFieldsCountArgs = {
  columns?: Maybe<Array<TTaskSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

export type TTaskAggregateOrderBy = {
  count?: Maybe<TOrderBy>;
  max?: Maybe<TTaskMaxOrderBy>;
  min?: Maybe<TTaskMinOrderBy>;
};

export type TTaskArrRelInsertInput = {
  data: Array<TTaskInsertInput>;
  on_conflict?: Maybe<TTaskOnConflict>;
};

export type TTaskBoolExp = {
  _and?: Maybe<Array<Maybe<TTaskBoolExp>>>;
  _not?: Maybe<TTaskBoolExp>;
  _or?: Maybe<Array<Maybe<TTaskBoolExp>>>;
  created_at?: Maybe<TTimestamptzComparisonExp>;
  finished_at?: Maybe<TTimestamptzComparisonExp>;
  id?: Maybe<TUuidComparisonExp>;
  note?: Maybe<TStringComparisonExp>;
  title?: Maybe<TStringComparisonExp>;
  updated_at?: Maybe<TTimestamptzComparisonExp>;
};

export enum TTaskConstraint {
  TaskPkey = 'task_pkey'
}

export type TTaskInsertInput = {
  created_at?: Maybe<Scalars['timestamptz']>;
  finished_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  note?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

export type TTaskMaxFields = {
  __typename?: 'task_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  finished_at?: Maybe<Scalars['timestamptz']>;
  note?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

export type TTaskMaxOrderBy = {
  created_at?: Maybe<TOrderBy>;
  finished_at?: Maybe<TOrderBy>;
  note?: Maybe<TOrderBy>;
  title?: Maybe<TOrderBy>;
  updated_at?: Maybe<TOrderBy>;
};

export type TTaskMinFields = {
  __typename?: 'task_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  finished_at?: Maybe<Scalars['timestamptz']>;
  note?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

export type TTaskMinOrderBy = {
  created_at?: Maybe<TOrderBy>;
  finished_at?: Maybe<TOrderBy>;
  note?: Maybe<TOrderBy>;
  title?: Maybe<TOrderBy>;
  updated_at?: Maybe<TOrderBy>;
};

export type TTaskMutationResponse = {
  __typename?: 'task_mutation_response';
  affected_rows: Scalars['Int'];
  returning: Array<TTask>;
};

export type TTaskObjRelInsertInput = {
  data: TTaskInsertInput;
  on_conflict?: Maybe<TTaskOnConflict>;
};

export type TTaskOnConflict = {
  constraint: TTaskConstraint;
  update_columns: Array<TTaskUpdateColumn>;
  where?: Maybe<TTaskBoolExp>;
};

export type TTaskOrderBy = {
  created_at?: Maybe<TOrderBy>;
  finished_at?: Maybe<TOrderBy>;
  id?: Maybe<TOrderBy>;
  note?: Maybe<TOrderBy>;
  title?: Maybe<TOrderBy>;
  updated_at?: Maybe<TOrderBy>;
};

export enum TTaskSelectColumn {
  CreatedAt = 'created_at',
  FinishedAt = 'finished_at',
  Id = 'id',
  Note = 'note',
  Title = 'title',
  UpdatedAt = 'updated_at'
}

export type TTaskSetInput = {
  created_at?: Maybe<Scalars['timestamptz']>;
  finished_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  note?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

export enum TTaskUpdateColumn {
  CreatedAt = 'created_at',
  FinishedAt = 'finished_at',
  Id = 'id',
  Note = 'note',
  Title = 'title',
  UpdatedAt = 'updated_at'
}

export type TTimestamptzComparisonExp = {
  _eq?: Maybe<Scalars['timestamptz']>;
  _gt?: Maybe<Scalars['timestamptz']>;
  _gte?: Maybe<Scalars['timestamptz']>;
  _in?: Maybe<Array<Scalars['timestamptz']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamptz']>;
  _lte?: Maybe<Scalars['timestamptz']>;
  _neq?: Maybe<Scalars['timestamptz']>;
  _nin?: Maybe<Array<Scalars['timestamptz']>>;
};

export type TUser = {
  __typename?: 'user';
  created_at: Scalars['timestamptz'];
  groups: Array<TGroupUsers>;
  groups_aggregate: TGroupUsersAggregate;
  id: Scalars['uuid'];
  name?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
};

export type TUserGroupsArgs = {
  distinct_on?: Maybe<Array<TGroupUsersSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TGroupUsersOrderBy>>;
  where?: Maybe<TGroupUsersBoolExp>;
};

export type TUserGroupsAggregateArgs = {
  distinct_on?: Maybe<Array<TGroupUsersSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TGroupUsersOrderBy>>;
  where?: Maybe<TGroupUsersBoolExp>;
};

export type TUserAggregate = {
  __typename?: 'user_aggregate';
  aggregate?: Maybe<TUserAggregateFields>;
  nodes: Array<TUser>;
};

export type TUserAggregateFields = {
  __typename?: 'user_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<TUserMaxFields>;
  min?: Maybe<TUserMinFields>;
};

export type TUserAggregateFieldsCountArgs = {
  columns?: Maybe<Array<TUserSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

export type TUserAggregateOrderBy = {
  count?: Maybe<TOrderBy>;
  max?: Maybe<TUserMaxOrderBy>;
  min?: Maybe<TUserMinOrderBy>;
};

export type TUserArrRelInsertInput = {
  data: Array<TUserInsertInput>;
  on_conflict?: Maybe<TUserOnConflict>;
};

export type TUserBoolExp = {
  _and?: Maybe<Array<Maybe<TUserBoolExp>>>;
  _not?: Maybe<TUserBoolExp>;
  _or?: Maybe<Array<Maybe<TUserBoolExp>>>;
  created_at?: Maybe<TTimestamptzComparisonExp>;
  groups?: Maybe<TGroupUsersBoolExp>;
  id?: Maybe<TUuidComparisonExp>;
  name?: Maybe<TStringComparisonExp>;
  updated_at?: Maybe<TTimestamptzComparisonExp>;
};

export enum TUserConstraint {
  UserPkey = 'user_pkey'
}

export type TUserInsertInput = {
  created_at?: Maybe<Scalars['timestamptz']>;
  groups?: Maybe<TGroupUsersArrRelInsertInput>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

export type TUserMaxFields = {
  __typename?: 'user_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

export type TUserMaxOrderBy = {
  created_at?: Maybe<TOrderBy>;
  name?: Maybe<TOrderBy>;
  updated_at?: Maybe<TOrderBy>;
};

export type TUserMinFields = {
  __typename?: 'user_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

export type TUserMinOrderBy = {
  created_at?: Maybe<TOrderBy>;
  name?: Maybe<TOrderBy>;
  updated_at?: Maybe<TOrderBy>;
};

export type TUserMutationResponse = {
  __typename?: 'user_mutation_response';
  affected_rows: Scalars['Int'];
  returning: Array<TUser>;
};

export type TUserObjRelInsertInput = {
  data: TUserInsertInput;
  on_conflict?: Maybe<TUserOnConflict>;
};

export type TUserOnConflict = {
  constraint: TUserConstraint;
  update_columns: Array<TUserUpdateColumn>;
  where?: Maybe<TUserBoolExp>;
};

export type TUserOrderBy = {
  created_at?: Maybe<TOrderBy>;
  groups_aggregate?: Maybe<TGroupUsersAggregateOrderBy>;
  id?: Maybe<TOrderBy>;
  name?: Maybe<TOrderBy>;
  updated_at?: Maybe<TOrderBy>;
};

export enum TUserSelectColumn {
  CreatedAt = 'created_at',
  Id = 'id',
  Name = 'name',
  UpdatedAt = 'updated_at'
}

export type TUserSetInput = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

export enum TUserUpdateColumn {
  CreatedAt = 'created_at',
  Id = 'id',
  Name = 'name',
  UpdatedAt = 'updated_at'
}

export type TUuidComparisonExp = {
  _eq?: Maybe<Scalars['uuid']>;
  _gt?: Maybe<Scalars['uuid']>;
  _gte?: Maybe<Scalars['uuid']>;
  _in?: Maybe<Array<Scalars['uuid']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['uuid']>;
  _lte?: Maybe<Scalars['uuid']>;
  _neq?: Maybe<Scalars['uuid']>;
  _nin?: Maybe<Array<Scalars['uuid']>>;
};

export type TUserFragmentFragment = { __typename: 'user' } & Pick<
  TUser,
  'id' | 'name' | 'created_at' | 'updated_at'
>;

export type TUsersQueryVariables = {};

export type TUsersQuery = { __typename?: 'query_root' } & {
  user: Array<{ __typename?: 'user' } & TUserFragmentFragment>;
};

export type TUserQueryVariables = {
  id: Scalars['uuid'];
};

export type TUserQuery = { __typename: 'query_root' } & {
  user_by_pk: Maybe<{ __typename?: 'user' } & TUserFragmentFragment>;
};

export type TUpdateUserMutationVariables = {
  id: Scalars['uuid'];
  name?: Maybe<Scalars['String']>;
};

export type TUpdateUserMutation = { __typename?: 'mutation_root' } & {
  update_user: Maybe<
    { __typename?: 'user_mutation_response' } & {
      returning: Array<{ __typename?: 'user' } & TUserFragmentFragment>;
    }
  >;
};

export type TUpdateAllUserMutationVariables = {
  name?: Maybe<Scalars['String']>;
};

export type TUpdateAllUserMutation = { __typename?: 'mutation_root' } & {
  update_user: Maybe<
    { __typename?: 'user_mutation_response' } & {
      returning: Array<{ __typename?: 'user' } & TUserFragmentFragment>;
    }
  >;
};

export type TInsertUserMutationVariables = {
  name: Scalars['String'];
};

export type TInsertUserMutation = { __typename?: 'mutation_root' } & {
  insert_user: Maybe<
    { __typename?: 'user_mutation_response' } & {
      returning: Array<{ __typename?: 'user' } & TUserFragmentFragment>;
    }
  >;
};

export type TDeleteUserMutationVariables = {
  id: Scalars['uuid'];
};

export type TDeleteUserMutation = { __typename?: 'mutation_root' } & {
  delete_user: Maybe<
    { __typename?: 'user_mutation_response' } & {
      returning: Array<{ __typename?: 'user' } & TUserFragmentFragment>;
    }
  >;
};

export const UserFragmentFragmentDoc = gql`
  fragment UserFragment on user {
    __typename
    id
    name
    created_at
    updated_at
  }
`;
export const UsersDocument = gql`
  query users {
    user(order_by: { created_at: asc }) {
      ...UserFragment
    }
  }
  ${UserFragmentFragmentDoc}
`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    TUsersQuery,
    TUsersQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<TUsersQuery, TUsersQueryVariables>(
    UsersDocument,
    baseOptions
  );
}
export function useUsersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    TUsersQuery,
    TUsersQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<TUsersQuery, TUsersQueryVariables>(
    UsersDocument,
    baseOptions
  );
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = ApolloReactCommon.QueryResult<
  TUsersQuery,
  TUsersQueryVariables
>;
export const UserDocument = gql`
  query user($id: uuid!) {
    __typename
    user_by_pk(id: $id) {
      ...UserFragment
    }
  }
  ${UserFragmentFragmentDoc}
`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    TUserQuery,
    TUserQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<TUserQuery, TUserQueryVariables>(
    UserDocument,
    baseOptions
  );
}
export function useUserLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    TUserQuery,
    TUserQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<TUserQuery, TUserQueryVariables>(
    UserDocument,
    baseOptions
  );
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = ApolloReactCommon.QueryResult<
  TUserQuery,
  TUserQueryVariables
>;
export const UpdateUserDocument = gql`
  mutation updateUser($id: uuid!, $name: String) {
    update_user(_set: { name: $name }, where: { id: { _eq: $id } }) {
      returning {
        ...UserFragment
      }
    }
  }
  ${UserFragmentFragmentDoc}
`;
export type TUpdateUserMutationFn = ApolloReactCommon.MutationFunction<
  TUpdateUserMutation,
  TUpdateUserMutationVariables
>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    TUpdateUserMutation,
    TUpdateUserMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    TUpdateUserMutation,
    TUpdateUserMutationVariables
  >(UpdateUserDocument, baseOptions);
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>;
export type UpdateUserMutationResult = ApolloReactCommon.MutationResult<
  TUpdateUserMutation
>;
export type UpdateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  TUpdateUserMutation,
  TUpdateUserMutationVariables
>;
export const UpdateAllUserDocument = gql`
  mutation updateAllUser($name: String) {
    update_user(_set: { name: $name }, where: {}) {
      returning {
        ...UserFragment
      }
    }
  }
  ${UserFragmentFragmentDoc}
`;
export type TUpdateAllUserMutationFn = ApolloReactCommon.MutationFunction<
  TUpdateAllUserMutation,
  TUpdateAllUserMutationVariables
>;

/**
 * __useUpdateAllUserMutation__
 *
 * To run a mutation, you first call `useUpdateAllUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAllUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAllUserMutation, { data, loading, error }] = useUpdateAllUserMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateAllUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    TUpdateAllUserMutation,
    TUpdateAllUserMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    TUpdateAllUserMutation,
    TUpdateAllUserMutationVariables
  >(UpdateAllUserDocument, baseOptions);
}
export type UpdateAllUserMutationHookResult = ReturnType<
  typeof useUpdateAllUserMutation
>;
export type UpdateAllUserMutationResult = ApolloReactCommon.MutationResult<
  TUpdateAllUserMutation
>;
export type UpdateAllUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  TUpdateAllUserMutation,
  TUpdateAllUserMutationVariables
>;
export const InsertUserDocument = gql`
  mutation insertUser($name: String!) {
    insert_user(objects: { name: $name }) {
      returning {
        ...UserFragment
      }
    }
  }
  ${UserFragmentFragmentDoc}
`;
export type TInsertUserMutationFn = ApolloReactCommon.MutationFunction<
  TInsertUserMutation,
  TInsertUserMutationVariables
>;

/**
 * __useInsertUserMutation__
 *
 * To run a mutation, you first call `useInsertUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertUserMutation, { data, loading, error }] = useInsertUserMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useInsertUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    TInsertUserMutation,
    TInsertUserMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    TInsertUserMutation,
    TInsertUserMutationVariables
  >(InsertUserDocument, baseOptions);
}
export type InsertUserMutationHookResult = ReturnType<
  typeof useInsertUserMutation
>;
export type InsertUserMutationResult = ApolloReactCommon.MutationResult<
  TInsertUserMutation
>;
export type InsertUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  TInsertUserMutation,
  TInsertUserMutationVariables
>;
export const DeleteUserDocument = gql`
  mutation deleteUser($id: uuid!) {
    delete_user(where: { id: { _eq: $id } }) {
      returning {
        ...UserFragment
      }
    }
  }
  ${UserFragmentFragmentDoc}
`;
export type TDeleteUserMutationFn = ApolloReactCommon.MutationFunction<
  TDeleteUserMutation,
  TDeleteUserMutationVariables
>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    TDeleteUserMutation,
    TDeleteUserMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    TDeleteUserMutation,
    TDeleteUserMutationVariables
  >(DeleteUserDocument, baseOptions);
}
export type DeleteUserMutationHookResult = ReturnType<
  typeof useDeleteUserMutation
>;
export type DeleteUserMutationResult = ApolloReactCommon.MutationResult<
  TDeleteUserMutation
>;
export type DeleteUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  TDeleteUserMutation,
  TDeleteUserMutationVariables
>;
