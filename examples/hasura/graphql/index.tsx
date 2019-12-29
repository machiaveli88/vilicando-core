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

/** columns and relationships of "group" */
export type TGroup = {
  __typename?: 'group';
  id: Scalars['uuid'];
  name: Scalars['String'];
  /** An array relationship */
  users: Array<TGroupUsers>;
  /** An aggregated array relationship */
  users_aggregate: TGroupUsersAggregate;
};

/** columns and relationships of "group" */
export type TGroupUsersArgs = {
  distinct_on?: Maybe<Array<TGroupUsersSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TGroupUsersOrderBy>>;
  where?: Maybe<TGroupUsersBoolExp>;
};

/** columns and relationships of "group" */
export type TGroupUsersAggregateArgs = {
  distinct_on?: Maybe<Array<TGroupUsersSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TGroupUsersOrderBy>>;
  where?: Maybe<TGroupUsersBoolExp>;
};

/** aggregated selection of "group" */
export type TGroupAggregate = {
  __typename?: 'group_aggregate';
  aggregate?: Maybe<TGroupAggregateFields>;
  nodes: Array<TGroup>;
};

/** aggregate fields of "group" */
export type TGroupAggregateFields = {
  __typename?: 'group_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<TGroupMaxFields>;
  min?: Maybe<TGroupMinFields>;
};

/** aggregate fields of "group" */
export type TGroupAggregateFieldsCountArgs = {
  columns?: Maybe<Array<TGroupSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "group" */
export type TGroupAggregateOrderBy = {
  count?: Maybe<TOrderBy>;
  max?: Maybe<TGroupMaxOrderBy>;
  min?: Maybe<TGroupMinOrderBy>;
};

/** input type for inserting array relation for remote table "group" */
export type TGroupArrRelInsertInput = {
  data: Array<TGroupInsertInput>;
  on_conflict?: Maybe<TGroupOnConflict>;
};

/** Boolean expression to filter rows from the table "group". All fields are combined with a logical 'AND'. */
export type TGroupBoolExp = {
  _and?: Maybe<Array<Maybe<TGroupBoolExp>>>;
  _not?: Maybe<TGroupBoolExp>;
  _or?: Maybe<Array<Maybe<TGroupBoolExp>>>;
  id?: Maybe<TUuidComparisonExp>;
  name?: Maybe<TStringComparisonExp>;
  users?: Maybe<TGroupUsersBoolExp>;
};

/** unique or primary key constraints on table "group" */
export enum TGroupConstraint {
  /** unique or primary key constraint */
  GroupPkey = 'group_pkey'
}

/** input type for inserting data into table "group" */
export type TGroupInsertInput = {
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  users?: Maybe<TGroupUsersArrRelInsertInput>;
};

/** aggregate max on columns */
export type TGroupMaxFields = {
  __typename?: 'group_max_fields';
  name?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "group" */
export type TGroupMaxOrderBy = {
  name?: Maybe<TOrderBy>;
};

/** aggregate min on columns */
export type TGroupMinFields = {
  __typename?: 'group_min_fields';
  name?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "group" */
export type TGroupMinOrderBy = {
  name?: Maybe<TOrderBy>;
};

/** response of any mutation on the table "group" */
export type TGroupMutationResponse = {
  __typename?: 'group_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<TGroup>;
};

/** input type for inserting object relation for remote table "group" */
export type TGroupObjRelInsertInput = {
  data: TGroupInsertInput;
  on_conflict?: Maybe<TGroupOnConflict>;
};

/** on conflict condition type for table "group" */
export type TGroupOnConflict = {
  constraint: TGroupConstraint;
  update_columns: Array<TGroupUpdateColumn>;
  where?: Maybe<TGroupBoolExp>;
};

/** ordering options when selecting data from "group" */
export type TGroupOrderBy = {
  id?: Maybe<TOrderBy>;
  name?: Maybe<TOrderBy>;
  users_aggregate?: Maybe<TGroupUsersAggregateOrderBy>;
};

/** select columns of table "group" */
export enum TGroupSelectColumn {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "group" */
export type TGroupSetInput = {
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
};

/** update columns of table "group" */
export enum TGroupUpdateColumn {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** columns and relationships of "group_users" */
export type TGroupUsers = {
  __typename?: 'group_users';
  /** An object relationship */
  group: TGroup;
  group_id: Scalars['uuid'];
  id: Scalars['uuid'];
  /** An object relationship */
  user: TUser;
  user_id: Scalars['uuid'];
};

/** aggregated selection of "group_users" */
export type TGroupUsersAggregate = {
  __typename?: 'group_users_aggregate';
  aggregate?: Maybe<TGroupUsersAggregateFields>;
  nodes: Array<TGroupUsers>;
};

/** aggregate fields of "group_users" */
export type TGroupUsersAggregateFields = {
  __typename?: 'group_users_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
};

/** aggregate fields of "group_users" */
export type TGroupUsersAggregateFieldsCountArgs = {
  columns?: Maybe<Array<TGroupUsersSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "group_users" */
export type TGroupUsersAggregateOrderBy = {
  count?: Maybe<TOrderBy>;
};

/** input type for inserting array relation for remote table "group_users" */
export type TGroupUsersArrRelInsertInput = {
  data: Array<TGroupUsersInsertInput>;
  on_conflict?: Maybe<TGroupUsersOnConflict>;
};

/** Boolean expression to filter rows from the table "group_users". All fields are combined with a logical 'AND'. */
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

/** unique or primary key constraints on table "group_users" */
export enum TGroupUsersConstraint {
  /** unique or primary key constraint */
  GroupUsersPkey = 'group_users_pkey'
}

/** input type for inserting data into table "group_users" */
export type TGroupUsersInsertInput = {
  group?: Maybe<TGroupObjRelInsertInput>;
  group_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  user?: Maybe<TUserObjRelInsertInput>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "group_users" */
export type TGroupUsersMutationResponse = {
  __typename?: 'group_users_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<TGroupUsers>;
};

/** input type for inserting object relation for remote table "group_users" */
export type TGroupUsersObjRelInsertInput = {
  data: TGroupUsersInsertInput;
  on_conflict?: Maybe<TGroupUsersOnConflict>;
};

/** on conflict condition type for table "group_users" */
export type TGroupUsersOnConflict = {
  constraint: TGroupUsersConstraint;
  update_columns: Array<TGroupUsersUpdateColumn>;
  where?: Maybe<TGroupUsersBoolExp>;
};

/** ordering options when selecting data from "group_users" */
export type TGroupUsersOrderBy = {
  group?: Maybe<TGroupOrderBy>;
  group_id?: Maybe<TOrderBy>;
  id?: Maybe<TOrderBy>;
  user?: Maybe<TUserOrderBy>;
  user_id?: Maybe<TOrderBy>;
};

/** select columns of table "group_users" */
export enum TGroupUsersSelectColumn {
  /** column name */
  GroupId = 'group_id',
  /** column name */
  Id = 'id',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "group_users" */
export type TGroupUsersSetInput = {
  group_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** update columns of table "group_users" */
export enum TGroupUsersUpdateColumn {
  /** column name */
  GroupId = 'group_id',
  /** column name */
  Id = 'id',
  /** column name */
  UserId = 'user_id'
}

/** mutation root */
export type TMutationRoot = {
  __typename?: 'mutation_root';
  /** delete data from the table: "group" */
  delete_group?: Maybe<TGroupMutationResponse>;
  /** delete data from the table: "group_users" */
  delete_group_users?: Maybe<TGroupUsersMutationResponse>;
  /** delete data from the table: "task" */
  delete_task?: Maybe<TTaskMutationResponse>;
  /** delete data from the table: "user" */
  delete_user?: Maybe<TUserMutationResponse>;
  /** insert data into the table: "group" */
  insert_group?: Maybe<TGroupMutationResponse>;
  /** insert data into the table: "group_users" */
  insert_group_users?: Maybe<TGroupUsersMutationResponse>;
  /** insert data into the table: "task" */
  insert_task?: Maybe<TTaskMutationResponse>;
  /** insert data into the table: "user" */
  insert_user?: Maybe<TUserMutationResponse>;
  /** update data of the table: "group" */
  update_group?: Maybe<TGroupMutationResponse>;
  /** update data of the table: "group_users" */
  update_group_users?: Maybe<TGroupUsersMutationResponse>;
  /** update data of the table: "task" */
  update_task?: Maybe<TTaskMutationResponse>;
  /** update data of the table: "user" */
  update_user?: Maybe<TUserMutationResponse>;
};

/** mutation root */
export type TMutationRootDeleteGroupArgs = {
  where: TGroupBoolExp;
};

/** mutation root */
export type TMutationRootDeleteGroupUsersArgs = {
  where: TGroupUsersBoolExp;
};

/** mutation root */
export type TMutationRootDeleteTaskArgs = {
  where: TTaskBoolExp;
};

/** mutation root */
export type TMutationRootDeleteUserArgs = {
  where: TUserBoolExp;
};

/** mutation root */
export type TMutationRootInsertGroupArgs = {
  objects: Array<TGroupInsertInput>;
  on_conflict?: Maybe<TGroupOnConflict>;
};

/** mutation root */
export type TMutationRootInsertGroupUsersArgs = {
  objects: Array<TGroupUsersInsertInput>;
  on_conflict?: Maybe<TGroupUsersOnConflict>;
};

/** mutation root */
export type TMutationRootInsertTaskArgs = {
  objects: Array<TTaskInsertInput>;
  on_conflict?: Maybe<TTaskOnConflict>;
};

/** mutation root */
export type TMutationRootInsertUserArgs = {
  objects: Array<TUserInsertInput>;
  on_conflict?: Maybe<TUserOnConflict>;
};

/** mutation root */
export type TMutationRootUpdateGroupArgs = {
  _set?: Maybe<TGroupSetInput>;
  where: TGroupBoolExp;
};

/** mutation root */
export type TMutationRootUpdateGroupUsersArgs = {
  _set?: Maybe<TGroupUsersSetInput>;
  where: TGroupUsersBoolExp;
};

/** mutation root */
export type TMutationRootUpdateTaskArgs = {
  _set?: Maybe<TTaskSetInput>;
  where: TTaskBoolExp;
};

/** mutation root */
export type TMutationRootUpdateUserArgs = {
  _set?: Maybe<TUserSetInput>;
  where: TUserBoolExp;
};

/** column ordering options */
export enum TOrderBy {
  /** in the ascending order, nulls last */
  Asc = 'asc',
  /** in the ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in the descending order, nulls first */
  Desc = 'desc',
  /** in the descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** query root */
export type TQueryRoot = {
  __typename?: 'query_root';
  /** fetch data from the table: "group" */
  group: Array<TGroup>;
  /** fetch aggregated fields from the table: "group" */
  group_aggregate: TGroupAggregate;
  /** fetch data from the table: "group" using primary key columns */
  group_by_pk?: Maybe<TGroup>;
  /** fetch data from the table: "group_users" */
  group_users: Array<TGroupUsers>;
  /** fetch aggregated fields from the table: "group_users" */
  group_users_aggregate: TGroupUsersAggregate;
  /** fetch data from the table: "group_users" using primary key columns */
  group_users_by_pk?: Maybe<TGroupUsers>;
  /** fetch data from the table: "task" */
  task: Array<TTask>;
  /** fetch aggregated fields from the table: "task" */
  task_aggregate: TTaskAggregate;
  /** fetch data from the table: "task" using primary key columns */
  task_by_pk?: Maybe<TTask>;
  /** fetch data from the table: "user" */
  user: Array<TUser>;
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: TUserAggregate;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<TUser>;
};

/** query root */
export type TQueryRootGroupArgs = {
  distinct_on?: Maybe<Array<TGroupSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TGroupOrderBy>>;
  where?: Maybe<TGroupBoolExp>;
};

/** query root */
export type TQueryRootGroupAggregateArgs = {
  distinct_on?: Maybe<Array<TGroupSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TGroupOrderBy>>;
  where?: Maybe<TGroupBoolExp>;
};

/** query root */
export type TQueryRootGroupByPkArgs = {
  id: Scalars['uuid'];
};

/** query root */
export type TQueryRootGroupUsersArgs = {
  distinct_on?: Maybe<Array<TGroupUsersSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TGroupUsersOrderBy>>;
  where?: Maybe<TGroupUsersBoolExp>;
};

/** query root */
export type TQueryRootGroupUsersAggregateArgs = {
  distinct_on?: Maybe<Array<TGroupUsersSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TGroupUsersOrderBy>>;
  where?: Maybe<TGroupUsersBoolExp>;
};

/** query root */
export type TQueryRootGroupUsersByPkArgs = {
  id: Scalars['uuid'];
};

/** query root */
export type TQueryRootTaskArgs = {
  distinct_on?: Maybe<Array<TTaskSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TTaskOrderBy>>;
  where?: Maybe<TTaskBoolExp>;
};

/** query root */
export type TQueryRootTaskAggregateArgs = {
  distinct_on?: Maybe<Array<TTaskSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TTaskOrderBy>>;
  where?: Maybe<TTaskBoolExp>;
};

/** query root */
export type TQueryRootTaskByPkArgs = {
  id: Scalars['uuid'];
};

/** query root */
export type TQueryRootUserArgs = {
  distinct_on?: Maybe<Array<TUserSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TUserOrderBy>>;
  where?: Maybe<TUserBoolExp>;
};

/** query root */
export type TQueryRootUserAggregateArgs = {
  distinct_on?: Maybe<Array<TUserSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TUserOrderBy>>;
  where?: Maybe<TUserBoolExp>;
};

/** query root */
export type TQueryRootUserByPkArgs = {
  id: Scalars['uuid'];
};

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
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

/** subscription root */
export type TSubscriptionRoot = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "group" */
  group: Array<TGroup>;
  /** fetch aggregated fields from the table: "group" */
  group_aggregate: TGroupAggregate;
  /** fetch data from the table: "group" using primary key columns */
  group_by_pk?: Maybe<TGroup>;
  /** fetch data from the table: "group_users" */
  group_users: Array<TGroupUsers>;
  /** fetch aggregated fields from the table: "group_users" */
  group_users_aggregate: TGroupUsersAggregate;
  /** fetch data from the table: "group_users" using primary key columns */
  group_users_by_pk?: Maybe<TGroupUsers>;
  /** fetch data from the table: "task" */
  task: Array<TTask>;
  /** fetch aggregated fields from the table: "task" */
  task_aggregate: TTaskAggregate;
  /** fetch data from the table: "task" using primary key columns */
  task_by_pk?: Maybe<TTask>;
  /** fetch data from the table: "user" */
  user: Array<TUser>;
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: TUserAggregate;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<TUser>;
};

/** subscription root */
export type TSubscriptionRootGroupArgs = {
  distinct_on?: Maybe<Array<TGroupSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TGroupOrderBy>>;
  where?: Maybe<TGroupBoolExp>;
};

/** subscription root */
export type TSubscriptionRootGroupAggregateArgs = {
  distinct_on?: Maybe<Array<TGroupSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TGroupOrderBy>>;
  where?: Maybe<TGroupBoolExp>;
};

/** subscription root */
export type TSubscriptionRootGroupByPkArgs = {
  id: Scalars['uuid'];
};

/** subscription root */
export type TSubscriptionRootGroupUsersArgs = {
  distinct_on?: Maybe<Array<TGroupUsersSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TGroupUsersOrderBy>>;
  where?: Maybe<TGroupUsersBoolExp>;
};

/** subscription root */
export type TSubscriptionRootGroupUsersAggregateArgs = {
  distinct_on?: Maybe<Array<TGroupUsersSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TGroupUsersOrderBy>>;
  where?: Maybe<TGroupUsersBoolExp>;
};

/** subscription root */
export type TSubscriptionRootGroupUsersByPkArgs = {
  id: Scalars['uuid'];
};

/** subscription root */
export type TSubscriptionRootTaskArgs = {
  distinct_on?: Maybe<Array<TTaskSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TTaskOrderBy>>;
  where?: Maybe<TTaskBoolExp>;
};

/** subscription root */
export type TSubscriptionRootTaskAggregateArgs = {
  distinct_on?: Maybe<Array<TTaskSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TTaskOrderBy>>;
  where?: Maybe<TTaskBoolExp>;
};

/** subscription root */
export type TSubscriptionRootTaskByPkArgs = {
  id: Scalars['uuid'];
};

/** subscription root */
export type TSubscriptionRootUserArgs = {
  distinct_on?: Maybe<Array<TUserSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TUserOrderBy>>;
  where?: Maybe<TUserBoolExp>;
};

/** subscription root */
export type TSubscriptionRootUserAggregateArgs = {
  distinct_on?: Maybe<Array<TUserSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TUserOrderBy>>;
  where?: Maybe<TUserBoolExp>;
};

/** subscription root */
export type TSubscriptionRootUserByPkArgs = {
  id: Scalars['uuid'];
};

/** columns and relationships of "task" */
export type TTask = {
  __typename?: 'task';
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  note?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "task" */
export type TTaskAggregate = {
  __typename?: 'task_aggregate';
  aggregate?: Maybe<TTaskAggregateFields>;
  nodes: Array<TTask>;
};

/** aggregate fields of "task" */
export type TTaskAggregateFields = {
  __typename?: 'task_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<TTaskMaxFields>;
  min?: Maybe<TTaskMinFields>;
};

/** aggregate fields of "task" */
export type TTaskAggregateFieldsCountArgs = {
  columns?: Maybe<Array<TTaskSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "task" */
export type TTaskAggregateOrderBy = {
  count?: Maybe<TOrderBy>;
  max?: Maybe<TTaskMaxOrderBy>;
  min?: Maybe<TTaskMinOrderBy>;
};

/** input type for inserting array relation for remote table "task" */
export type TTaskArrRelInsertInput = {
  data: Array<TTaskInsertInput>;
  on_conflict?: Maybe<TTaskOnConflict>;
};

/** Boolean expression to filter rows from the table "task". All fields are combined with a logical 'AND'. */
export type TTaskBoolExp = {
  _and?: Maybe<Array<Maybe<TTaskBoolExp>>>;
  _not?: Maybe<TTaskBoolExp>;
  _or?: Maybe<Array<Maybe<TTaskBoolExp>>>;
  created_at?: Maybe<TTimestamptzComparisonExp>;
  id?: Maybe<TUuidComparisonExp>;
  note?: Maybe<TStringComparisonExp>;
  title?: Maybe<TStringComparisonExp>;
  updated_at?: Maybe<TTimestamptzComparisonExp>;
};

/** unique or primary key constraints on table "task" */
export enum TTaskConstraint {
  /** unique or primary key constraint */
  TaskPkey = 'task_pkey'
}

/** input type for inserting data into table "task" */
export type TTaskInsertInput = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  note?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type TTaskMaxFields = {
  __typename?: 'task_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  note?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "task" */
export type TTaskMaxOrderBy = {
  created_at?: Maybe<TOrderBy>;
  note?: Maybe<TOrderBy>;
  title?: Maybe<TOrderBy>;
  updated_at?: Maybe<TOrderBy>;
};

/** aggregate min on columns */
export type TTaskMinFields = {
  __typename?: 'task_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  note?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "task" */
export type TTaskMinOrderBy = {
  created_at?: Maybe<TOrderBy>;
  note?: Maybe<TOrderBy>;
  title?: Maybe<TOrderBy>;
  updated_at?: Maybe<TOrderBy>;
};

/** response of any mutation on the table "task" */
export type TTaskMutationResponse = {
  __typename?: 'task_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<TTask>;
};

/** input type for inserting object relation for remote table "task" */
export type TTaskObjRelInsertInput = {
  data: TTaskInsertInput;
  on_conflict?: Maybe<TTaskOnConflict>;
};

/** on conflict condition type for table "task" */
export type TTaskOnConflict = {
  constraint: TTaskConstraint;
  update_columns: Array<TTaskUpdateColumn>;
  where?: Maybe<TTaskBoolExp>;
};

/** ordering options when selecting data from "task" */
export type TTaskOrderBy = {
  created_at?: Maybe<TOrderBy>;
  id?: Maybe<TOrderBy>;
  note?: Maybe<TOrderBy>;
  title?: Maybe<TOrderBy>;
  updated_at?: Maybe<TOrderBy>;
};

/** select columns of table "task" */
export enum TTaskSelectColumn {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Note = 'note',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "task" */
export type TTaskSetInput = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  note?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** update columns of table "task" */
export enum TTaskUpdateColumn {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Note = 'note',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
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

/** columns and relationships of "user" */
export type TUser = {
  __typename?: 'user';
  created_at: Scalars['timestamptz'];
  /** An array relationship */
  groups: Array<TGroupUsers>;
  /** An aggregated array relationship */
  groups_aggregate: TGroupUsersAggregate;
  id: Scalars['uuid'];
  name?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
};

/** columns and relationships of "user" */
export type TUserGroupsArgs = {
  distinct_on?: Maybe<Array<TGroupUsersSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TGroupUsersOrderBy>>;
  where?: Maybe<TGroupUsersBoolExp>;
};

/** columns and relationships of "user" */
export type TUserGroupsAggregateArgs = {
  distinct_on?: Maybe<Array<TGroupUsersSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TGroupUsersOrderBy>>;
  where?: Maybe<TGroupUsersBoolExp>;
};

/** aggregated selection of "user" */
export type TUserAggregate = {
  __typename?: 'user_aggregate';
  aggregate?: Maybe<TUserAggregateFields>;
  nodes: Array<TUser>;
};

/** aggregate fields of "user" */
export type TUserAggregateFields = {
  __typename?: 'user_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<TUserMaxFields>;
  min?: Maybe<TUserMinFields>;
};

/** aggregate fields of "user" */
export type TUserAggregateFieldsCountArgs = {
  columns?: Maybe<Array<TUserSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "user" */
export type TUserAggregateOrderBy = {
  count?: Maybe<TOrderBy>;
  max?: Maybe<TUserMaxOrderBy>;
  min?: Maybe<TUserMinOrderBy>;
};

/** input type for inserting array relation for remote table "user" */
export type TUserArrRelInsertInput = {
  data: Array<TUserInsertInput>;
  on_conflict?: Maybe<TUserOnConflict>;
};

/** Boolean expression to filter rows from the table "user". All fields are combined with a logical 'AND'. */
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

/** unique or primary key constraints on table "user" */
export enum TUserConstraint {
  /** unique or primary key constraint */
  UserPkey = 'user_pkey'
}

/** input type for inserting data into table "user" */
export type TUserInsertInput = {
  created_at?: Maybe<Scalars['timestamptz']>;
  groups?: Maybe<TGroupUsersArrRelInsertInput>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type TUserMaxFields = {
  __typename?: 'user_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "user" */
export type TUserMaxOrderBy = {
  created_at?: Maybe<TOrderBy>;
  name?: Maybe<TOrderBy>;
  updated_at?: Maybe<TOrderBy>;
};

/** aggregate min on columns */
export type TUserMinFields = {
  __typename?: 'user_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "user" */
export type TUserMinOrderBy = {
  created_at?: Maybe<TOrderBy>;
  name?: Maybe<TOrderBy>;
  updated_at?: Maybe<TOrderBy>;
};

/** response of any mutation on the table "user" */
export type TUserMutationResponse = {
  __typename?: 'user_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<TUser>;
};

/** input type for inserting object relation for remote table "user" */
export type TUserObjRelInsertInput = {
  data: TUserInsertInput;
  on_conflict?: Maybe<TUserOnConflict>;
};

/** on conflict condition type for table "user" */
export type TUserOnConflict = {
  constraint: TUserConstraint;
  update_columns: Array<TUserUpdateColumn>;
  where?: Maybe<TUserBoolExp>;
};

/** ordering options when selecting data from "user" */
export type TUserOrderBy = {
  created_at?: Maybe<TOrderBy>;
  groups_aggregate?: Maybe<TGroupUsersAggregateOrderBy>;
  id?: Maybe<TOrderBy>;
  name?: Maybe<TOrderBy>;
  updated_at?: Maybe<TOrderBy>;
};

/** select columns of table "user" */
export enum TUserSelectColumn {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "user" */
export type TUserSetInput = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** update columns of table "user" */
export enum TUserUpdateColumn {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** expression to compare columns of type uuid. All fields are combined with logical 'AND'. */
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
