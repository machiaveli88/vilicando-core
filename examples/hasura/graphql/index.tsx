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
export type Group = {
  __typename?: 'group';
  id: Scalars['uuid'];
  name: Scalars['String'];
  /** An array relationship */
  users: Array<GroupUsers>;
  /** An aggregated array relationship */
  users_aggregate: GroupUsersAggregate;
};

/** columns and relationships of "group" */
export type GroupUsersArgs = {
  distinct_on?: Maybe<Array<GroupUsersSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<GroupUsersOrderBy>>;
  where?: Maybe<GroupUsersBoolExp>;
};

/** columns and relationships of "group" */
export type GroupUsersAggregateArgs = {
  distinct_on?: Maybe<Array<GroupUsersSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<GroupUsersOrderBy>>;
  where?: Maybe<GroupUsersBoolExp>;
};

/** aggregated selection of "group" */
export type GroupAggregate = {
  __typename?: 'group_aggregate';
  aggregate?: Maybe<GroupAggregateFields>;
  nodes: Array<Group>;
};

/** aggregate fields of "group" */
export type GroupAggregateFields = {
  __typename?: 'group_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<GroupMaxFields>;
  min?: Maybe<GroupMinFields>;
};

/** aggregate fields of "group" */
export type GroupAggregateFieldsCountArgs = {
  columns?: Maybe<Array<GroupSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "group" */
export type GroupAggregateOrderBy = {
  count?: Maybe<OrderBy>;
  max?: Maybe<GroupMaxOrderBy>;
  min?: Maybe<GroupMinOrderBy>;
};

/** input type for inserting array relation for remote table "group" */
export type GroupArrRelInsertInput = {
  data: Array<GroupInsertInput>;
  on_conflict?: Maybe<GroupOnConflict>;
};

/** Boolean expression to filter rows from the table "group". All fields are combined with a logical 'AND'. */
export type GroupBoolExp = {
  _and?: Maybe<Array<Maybe<GroupBoolExp>>>;
  _not?: Maybe<GroupBoolExp>;
  _or?: Maybe<Array<Maybe<GroupBoolExp>>>;
  id?: Maybe<UuidComparisonExp>;
  name?: Maybe<StringComparisonExp>;
  users?: Maybe<GroupUsersBoolExp>;
};

/** unique or primary key constraints on table "group" */
export enum GroupConstraint {
  /** unique or primary key constraint */
  GroupPkey = 'group_pkey'
}

/** input type for inserting data into table "group" */
export type GroupInsertInput = {
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  users?: Maybe<GroupUsersArrRelInsertInput>;
};

/** aggregate max on columns */
export type GroupMaxFields = {
  __typename?: 'group_max_fields';
  name?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "group" */
export type GroupMaxOrderBy = {
  name?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type GroupMinFields = {
  __typename?: 'group_min_fields';
  name?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "group" */
export type GroupMinOrderBy = {
  name?: Maybe<OrderBy>;
};

/** response of any mutation on the table "group" */
export type GroupMutationResponse = {
  __typename?: 'group_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Group>;
};

/** input type for inserting object relation for remote table "group" */
export type GroupObjRelInsertInput = {
  data: GroupInsertInput;
  on_conflict?: Maybe<GroupOnConflict>;
};

/** on conflict condition type for table "group" */
export type GroupOnConflict = {
  constraint: GroupConstraint;
  update_columns: Array<GroupUpdateColumn>;
  where?: Maybe<GroupBoolExp>;
};

/** ordering options when selecting data from "group" */
export type GroupOrderBy = {
  id?: Maybe<OrderBy>;
  name?: Maybe<OrderBy>;
  users_aggregate?: Maybe<GroupUsersAggregateOrderBy>;
};

/** select columns of table "group" */
export enum GroupSelectColumn {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "group" */
export type GroupSetInput = {
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
};

/** update columns of table "group" */
export enum GroupUpdateColumn {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** columns and relationships of "group_users" */
export type GroupUsers = {
  __typename?: 'group_users';
  /** An object relationship */
  group: Group;
  group_id: Scalars['uuid'];
  id: Scalars['uuid'];
  /** An object relationship */
  user: User;
  user_id: Scalars['uuid'];
};

/** aggregated selection of "group_users" */
export type GroupUsersAggregate = {
  __typename?: 'group_users_aggregate';
  aggregate?: Maybe<GroupUsersAggregateFields>;
  nodes: Array<GroupUsers>;
};

/** aggregate fields of "group_users" */
export type GroupUsersAggregateFields = {
  __typename?: 'group_users_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
};

/** aggregate fields of "group_users" */
export type GroupUsersAggregateFieldsCountArgs = {
  columns?: Maybe<Array<GroupUsersSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "group_users" */
export type GroupUsersAggregateOrderBy = {
  count?: Maybe<OrderBy>;
};

/** input type for inserting array relation for remote table "group_users" */
export type GroupUsersArrRelInsertInput = {
  data: Array<GroupUsersInsertInput>;
  on_conflict?: Maybe<GroupUsersOnConflict>;
};

/** Boolean expression to filter rows from the table "group_users". All fields are combined with a logical 'AND'. */
export type GroupUsersBoolExp = {
  _and?: Maybe<Array<Maybe<GroupUsersBoolExp>>>;
  _not?: Maybe<GroupUsersBoolExp>;
  _or?: Maybe<Array<Maybe<GroupUsersBoolExp>>>;
  group?: Maybe<GroupBoolExp>;
  group_id?: Maybe<UuidComparisonExp>;
  id?: Maybe<UuidComparisonExp>;
  user?: Maybe<UserBoolExp>;
  user_id?: Maybe<UuidComparisonExp>;
};

/** unique or primary key constraints on table "group_users" */
export enum GroupUsersConstraint {
  /** unique or primary key constraint */
  GroupUsersPkey = 'group_users_pkey'
}

/** input type for inserting data into table "group_users" */
export type GroupUsersInsertInput = {
  group?: Maybe<GroupObjRelInsertInput>;
  group_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  user?: Maybe<UserObjRelInsertInput>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "group_users" */
export type GroupUsersMutationResponse = {
  __typename?: 'group_users_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<GroupUsers>;
};

/** input type for inserting object relation for remote table "group_users" */
export type GroupUsersObjRelInsertInput = {
  data: GroupUsersInsertInput;
  on_conflict?: Maybe<GroupUsersOnConflict>;
};

/** on conflict condition type for table "group_users" */
export type GroupUsersOnConflict = {
  constraint: GroupUsersConstraint;
  update_columns: Array<GroupUsersUpdateColumn>;
  where?: Maybe<GroupUsersBoolExp>;
};

/** ordering options when selecting data from "group_users" */
export type GroupUsersOrderBy = {
  group?: Maybe<GroupOrderBy>;
  group_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  user?: Maybe<UserOrderBy>;
  user_id?: Maybe<OrderBy>;
};

/** select columns of table "group_users" */
export enum GroupUsersSelectColumn {
  /** column name */
  GroupId = 'group_id',
  /** column name */
  Id = 'id',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "group_users" */
export type GroupUsersSetInput = {
  group_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** update columns of table "group_users" */
export enum GroupUsersUpdateColumn {
  /** column name */
  GroupId = 'group_id',
  /** column name */
  Id = 'id',
  /** column name */
  UserId = 'user_id'
}

/** mutation root */
export type MutationRoot = {
  __typename?: 'mutation_root';
  /** delete data from the table: "group" */
  delete_group?: Maybe<GroupMutationResponse>;
  /** delete data from the table: "group_users" */
  delete_group_users?: Maybe<GroupUsersMutationResponse>;
  /** delete data from the table: "task" */
  delete_task?: Maybe<TaskMutationResponse>;
  /** delete data from the table: "user" */
  delete_user?: Maybe<UserMutationResponse>;
  /** insert data into the table: "group" */
  insert_group?: Maybe<GroupMutationResponse>;
  /** insert data into the table: "group_users" */
  insert_group_users?: Maybe<GroupUsersMutationResponse>;
  /** insert data into the table: "task" */
  insert_task?: Maybe<TaskMutationResponse>;
  /** insert data into the table: "user" */
  insert_user?: Maybe<UserMutationResponse>;
  /** update data of the table: "group" */
  update_group?: Maybe<GroupMutationResponse>;
  /** update data of the table: "group_users" */
  update_group_users?: Maybe<GroupUsersMutationResponse>;
  /** update data of the table: "task" */
  update_task?: Maybe<TaskMutationResponse>;
  /** update data of the table: "user" */
  update_user?: Maybe<UserMutationResponse>;
};

/** mutation root */
export type MutationRootDeleteGroupArgs = {
  where: GroupBoolExp;
};

/** mutation root */
export type MutationRootDeleteGroupUsersArgs = {
  where: GroupUsersBoolExp;
};

/** mutation root */
export type MutationRootDeleteTaskArgs = {
  where: TaskBoolExp;
};

/** mutation root */
export type MutationRootDeleteUserArgs = {
  where: UserBoolExp;
};

/** mutation root */
export type MutationRootInsertGroupArgs = {
  objects: Array<GroupInsertInput>;
  on_conflict?: Maybe<GroupOnConflict>;
};

/** mutation root */
export type MutationRootInsertGroupUsersArgs = {
  objects: Array<GroupUsersInsertInput>;
  on_conflict?: Maybe<GroupUsersOnConflict>;
};

/** mutation root */
export type MutationRootInsertTaskArgs = {
  objects: Array<TaskInsertInput>;
  on_conflict?: Maybe<TaskOnConflict>;
};

/** mutation root */
export type MutationRootInsertUserArgs = {
  objects: Array<UserInsertInput>;
  on_conflict?: Maybe<UserOnConflict>;
};

/** mutation root */
export type MutationRootUpdateGroupArgs = {
  _set?: Maybe<GroupSetInput>;
  where: GroupBoolExp;
};

/** mutation root */
export type MutationRootUpdateGroupUsersArgs = {
  _set?: Maybe<GroupUsersSetInput>;
  where: GroupUsersBoolExp;
};

/** mutation root */
export type MutationRootUpdateTaskArgs = {
  _set?: Maybe<TaskSetInput>;
  where: TaskBoolExp;
};

/** mutation root */
export type MutationRootUpdateUserArgs = {
  _set?: Maybe<UserSetInput>;
  where: UserBoolExp;
};

/** column ordering options */
export enum OrderBy {
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
export type QueryRoot = {
  __typename?: 'query_root';
  /** fetch data from the table: "group" */
  group: Array<Group>;
  /** fetch aggregated fields from the table: "group" */
  group_aggregate: GroupAggregate;
  /** fetch data from the table: "group" using primary key columns */
  group_by_pk?: Maybe<Group>;
  /** fetch data from the table: "group_users" */
  group_users: Array<GroupUsers>;
  /** fetch aggregated fields from the table: "group_users" */
  group_users_aggregate: GroupUsersAggregate;
  /** fetch data from the table: "group_users" using primary key columns */
  group_users_by_pk?: Maybe<GroupUsers>;
  /** fetch data from the table: "task" */
  task: Array<Task>;
  /** fetch aggregated fields from the table: "task" */
  task_aggregate: TaskAggregate;
  /** fetch data from the table: "task" using primary key columns */
  task_by_pk?: Maybe<Task>;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: UserAggregate;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>;
};

/** query root */
export type QueryRootGroupArgs = {
  distinct_on?: Maybe<Array<GroupSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<GroupOrderBy>>;
  where?: Maybe<GroupBoolExp>;
};

/** query root */
export type QueryRootGroupAggregateArgs = {
  distinct_on?: Maybe<Array<GroupSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<GroupOrderBy>>;
  where?: Maybe<GroupBoolExp>;
};

/** query root */
export type QueryRootGroupByPkArgs = {
  id: Scalars['uuid'];
};

/** query root */
export type QueryRootGroupUsersArgs = {
  distinct_on?: Maybe<Array<GroupUsersSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<GroupUsersOrderBy>>;
  where?: Maybe<GroupUsersBoolExp>;
};

/** query root */
export type QueryRootGroupUsersAggregateArgs = {
  distinct_on?: Maybe<Array<GroupUsersSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<GroupUsersOrderBy>>;
  where?: Maybe<GroupUsersBoolExp>;
};

/** query root */
export type QueryRootGroupUsersByPkArgs = {
  id: Scalars['uuid'];
};

/** query root */
export type QueryRootTaskArgs = {
  distinct_on?: Maybe<Array<TaskSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TaskOrderBy>>;
  where?: Maybe<TaskBoolExp>;
};

/** query root */
export type QueryRootTaskAggregateArgs = {
  distinct_on?: Maybe<Array<TaskSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TaskOrderBy>>;
  where?: Maybe<TaskBoolExp>;
};

/** query root */
export type QueryRootTaskByPkArgs = {
  id: Scalars['uuid'];
};

/** query root */
export type QueryRootUserArgs = {
  distinct_on?: Maybe<Array<UserSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserOrderBy>>;
  where?: Maybe<UserBoolExp>;
};

/** query root */
export type QueryRootUserAggregateArgs = {
  distinct_on?: Maybe<Array<UserSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserOrderBy>>;
  where?: Maybe<UserBoolExp>;
};

/** query root */
export type QueryRootUserByPkArgs = {
  id: Scalars['uuid'];
};

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type StringComparisonExp = {
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
export type SubscriptionRoot = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "group" */
  group: Array<Group>;
  /** fetch aggregated fields from the table: "group" */
  group_aggregate: GroupAggregate;
  /** fetch data from the table: "group" using primary key columns */
  group_by_pk?: Maybe<Group>;
  /** fetch data from the table: "group_users" */
  group_users: Array<GroupUsers>;
  /** fetch aggregated fields from the table: "group_users" */
  group_users_aggregate: GroupUsersAggregate;
  /** fetch data from the table: "group_users" using primary key columns */
  group_users_by_pk?: Maybe<GroupUsers>;
  /** fetch data from the table: "task" */
  task: Array<Task>;
  /** fetch aggregated fields from the table: "task" */
  task_aggregate: TaskAggregate;
  /** fetch data from the table: "task" using primary key columns */
  task_by_pk?: Maybe<Task>;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: UserAggregate;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>;
};

/** subscription root */
export type SubscriptionRootGroupArgs = {
  distinct_on?: Maybe<Array<GroupSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<GroupOrderBy>>;
  where?: Maybe<GroupBoolExp>;
};

/** subscription root */
export type SubscriptionRootGroupAggregateArgs = {
  distinct_on?: Maybe<Array<GroupSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<GroupOrderBy>>;
  where?: Maybe<GroupBoolExp>;
};

/** subscription root */
export type SubscriptionRootGroupByPkArgs = {
  id: Scalars['uuid'];
};

/** subscription root */
export type SubscriptionRootGroupUsersArgs = {
  distinct_on?: Maybe<Array<GroupUsersSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<GroupUsersOrderBy>>;
  where?: Maybe<GroupUsersBoolExp>;
};

/** subscription root */
export type SubscriptionRootGroupUsersAggregateArgs = {
  distinct_on?: Maybe<Array<GroupUsersSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<GroupUsersOrderBy>>;
  where?: Maybe<GroupUsersBoolExp>;
};

/** subscription root */
export type SubscriptionRootGroupUsersByPkArgs = {
  id: Scalars['uuid'];
};

/** subscription root */
export type SubscriptionRootTaskArgs = {
  distinct_on?: Maybe<Array<TaskSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TaskOrderBy>>;
  where?: Maybe<TaskBoolExp>;
};

/** subscription root */
export type SubscriptionRootTaskAggregateArgs = {
  distinct_on?: Maybe<Array<TaskSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TaskOrderBy>>;
  where?: Maybe<TaskBoolExp>;
};

/** subscription root */
export type SubscriptionRootTaskByPkArgs = {
  id: Scalars['uuid'];
};

/** subscription root */
export type SubscriptionRootUserArgs = {
  distinct_on?: Maybe<Array<UserSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserOrderBy>>;
  where?: Maybe<UserBoolExp>;
};

/** subscription root */
export type SubscriptionRootUserAggregateArgs = {
  distinct_on?: Maybe<Array<UserSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserOrderBy>>;
  where?: Maybe<UserBoolExp>;
};

/** subscription root */
export type SubscriptionRootUserByPkArgs = {
  id: Scalars['uuid'];
};

/** columns and relationships of "task" */
export type Task = {
  __typename?: 'task';
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  note?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "task" */
export type TaskAggregate = {
  __typename?: 'task_aggregate';
  aggregate?: Maybe<TaskAggregateFields>;
  nodes: Array<Task>;
};

/** aggregate fields of "task" */
export type TaskAggregateFields = {
  __typename?: 'task_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<TaskMaxFields>;
  min?: Maybe<TaskMinFields>;
};

/** aggregate fields of "task" */
export type TaskAggregateFieldsCountArgs = {
  columns?: Maybe<Array<TaskSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "task" */
export type TaskAggregateOrderBy = {
  count?: Maybe<OrderBy>;
  max?: Maybe<TaskMaxOrderBy>;
  min?: Maybe<TaskMinOrderBy>;
};

/** input type for inserting array relation for remote table "task" */
export type TaskArrRelInsertInput = {
  data: Array<TaskInsertInput>;
  on_conflict?: Maybe<TaskOnConflict>;
};

/** Boolean expression to filter rows from the table "task". All fields are combined with a logical 'AND'. */
export type TaskBoolExp = {
  _and?: Maybe<Array<Maybe<TaskBoolExp>>>;
  _not?: Maybe<TaskBoolExp>;
  _or?: Maybe<Array<Maybe<TaskBoolExp>>>;
  created_at?: Maybe<TimestamptzComparisonExp>;
  id?: Maybe<UuidComparisonExp>;
  note?: Maybe<StringComparisonExp>;
  title?: Maybe<StringComparisonExp>;
  updated_at?: Maybe<TimestamptzComparisonExp>;
};

/** unique or primary key constraints on table "task" */
export enum TaskConstraint {
  /** unique or primary key constraint */
  TaskPkey = 'task_pkey'
}

/** input type for inserting data into table "task" */
export type TaskInsertInput = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  note?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type TaskMaxFields = {
  __typename?: 'task_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  note?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "task" */
export type TaskMaxOrderBy = {
  created_at?: Maybe<OrderBy>;
  note?: Maybe<OrderBy>;
  title?: Maybe<OrderBy>;
  updated_at?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type TaskMinFields = {
  __typename?: 'task_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  note?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "task" */
export type TaskMinOrderBy = {
  created_at?: Maybe<OrderBy>;
  note?: Maybe<OrderBy>;
  title?: Maybe<OrderBy>;
  updated_at?: Maybe<OrderBy>;
};

/** response of any mutation on the table "task" */
export type TaskMutationResponse = {
  __typename?: 'task_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Task>;
};

/** input type for inserting object relation for remote table "task" */
export type TaskObjRelInsertInput = {
  data: TaskInsertInput;
  on_conflict?: Maybe<TaskOnConflict>;
};

/** on conflict condition type for table "task" */
export type TaskOnConflict = {
  constraint: TaskConstraint;
  update_columns: Array<TaskUpdateColumn>;
  where?: Maybe<TaskBoolExp>;
};

/** ordering options when selecting data from "task" */
export type TaskOrderBy = {
  created_at?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  note?: Maybe<OrderBy>;
  title?: Maybe<OrderBy>;
  updated_at?: Maybe<OrderBy>;
};

/** select columns of table "task" */
export enum TaskSelectColumn {
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
export type TaskSetInput = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  note?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** update columns of table "task" */
export enum TaskUpdateColumn {
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
export type TimestamptzComparisonExp = {
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
export type User = {
  __typename?: 'user';
  created_at: Scalars['timestamptz'];
  /** An array relationship */
  groups: Array<GroupUsers>;
  /** An aggregated array relationship */
  groups_aggregate: GroupUsersAggregate;
  id: Scalars['uuid'];
  name?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
};

/** columns and relationships of "user" */
export type UserGroupsArgs = {
  distinct_on?: Maybe<Array<GroupUsersSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<GroupUsersOrderBy>>;
  where?: Maybe<GroupUsersBoolExp>;
};

/** columns and relationships of "user" */
export type UserGroupsAggregateArgs = {
  distinct_on?: Maybe<Array<GroupUsersSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<GroupUsersOrderBy>>;
  where?: Maybe<GroupUsersBoolExp>;
};

/** aggregated selection of "user" */
export type UserAggregate = {
  __typename?: 'user_aggregate';
  aggregate?: Maybe<UserAggregateFields>;
  nodes: Array<User>;
};

/** aggregate fields of "user" */
export type UserAggregateFields = {
  __typename?: 'user_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<UserMaxFields>;
  min?: Maybe<UserMinFields>;
};

/** aggregate fields of "user" */
export type UserAggregateFieldsCountArgs = {
  columns?: Maybe<Array<UserSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "user" */
export type UserAggregateOrderBy = {
  count?: Maybe<OrderBy>;
  max?: Maybe<UserMaxOrderBy>;
  min?: Maybe<UserMinOrderBy>;
};

/** input type for inserting array relation for remote table "user" */
export type UserArrRelInsertInput = {
  data: Array<UserInsertInput>;
  on_conflict?: Maybe<UserOnConflict>;
};

/** Boolean expression to filter rows from the table "user". All fields are combined with a logical 'AND'. */
export type UserBoolExp = {
  _and?: Maybe<Array<Maybe<UserBoolExp>>>;
  _not?: Maybe<UserBoolExp>;
  _or?: Maybe<Array<Maybe<UserBoolExp>>>;
  created_at?: Maybe<TimestamptzComparisonExp>;
  groups?: Maybe<GroupUsersBoolExp>;
  id?: Maybe<UuidComparisonExp>;
  name?: Maybe<StringComparisonExp>;
  updated_at?: Maybe<TimestamptzComparisonExp>;
};

/** unique or primary key constraints on table "user" */
export enum UserConstraint {
  /** unique or primary key constraint */
  UserPkey = 'user_pkey'
}

/** input type for inserting data into table "user" */
export type UserInsertInput = {
  created_at?: Maybe<Scalars['timestamptz']>;
  groups?: Maybe<GroupUsersArrRelInsertInput>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type UserMaxFields = {
  __typename?: 'user_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "user" */
export type UserMaxOrderBy = {
  created_at?: Maybe<OrderBy>;
  name?: Maybe<OrderBy>;
  updated_at?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type UserMinFields = {
  __typename?: 'user_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "user" */
export type UserMinOrderBy = {
  created_at?: Maybe<OrderBy>;
  name?: Maybe<OrderBy>;
  updated_at?: Maybe<OrderBy>;
};

/** response of any mutation on the table "user" */
export type UserMutationResponse = {
  __typename?: 'user_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<User>;
};

/** input type for inserting object relation for remote table "user" */
export type UserObjRelInsertInput = {
  data: UserInsertInput;
  on_conflict?: Maybe<UserOnConflict>;
};

/** on conflict condition type for table "user" */
export type UserOnConflict = {
  constraint: UserConstraint;
  update_columns: Array<UserUpdateColumn>;
  where?: Maybe<UserBoolExp>;
};

/** ordering options when selecting data from "user" */
export type UserOrderBy = {
  created_at?: Maybe<OrderBy>;
  groups_aggregate?: Maybe<GroupUsersAggregateOrderBy>;
  id?: Maybe<OrderBy>;
  name?: Maybe<OrderBy>;
  updated_at?: Maybe<OrderBy>;
};

/** select columns of table "user" */
export enum UserSelectColumn {
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
export type UserSetInput = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** update columns of table "user" */
export enum UserUpdateColumn {
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
export type UuidComparisonExp = {
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

export type UserFragmentFragment = { __typename: 'user' } & Pick<
  User,
  'id' | 'name' | 'created_at' | 'updated_at'
>;

export type UsersQueryVariables = {};

export type UsersQuery = { __typename?: 'query_root' } & {
  user: Array<{ __typename?: 'user' } & UserFragmentFragment>;
};

export type UserQueryVariables = {
  id: Scalars['uuid'];
};

export type UserQuery = { __typename: 'query_root' } & {
  user_by_pk: Maybe<{ __typename?: 'user' } & UserFragmentFragment>;
};

export type UpdateUserMutationVariables = {
  id: Scalars['uuid'];
  name?: Maybe<Scalars['String']>;
};

export type UpdateUserMutation = { __typename?: 'mutation_root' } & {
  update_user: Maybe<
    { __typename?: 'user_mutation_response' } & {
      returning: Array<{ __typename?: 'user' } & UserFragmentFragment>;
    }
  >;
};

export type UpdateAllUserMutationVariables = {
  name?: Maybe<Scalars['String']>;
};

export type UpdateAllUserMutation = { __typename?: 'mutation_root' } & {
  update_user: Maybe<
    { __typename?: 'user_mutation_response' } & {
      returning: Array<{ __typename?: 'user' } & UserFragmentFragment>;
    }
  >;
};

export type InsertUserMutationVariables = {
  name: Scalars['String'];
};

export type InsertUserMutation = { __typename?: 'mutation_root' } & {
  insert_user: Maybe<
    { __typename?: 'user_mutation_response' } & {
      returning: Array<{ __typename?: 'user' } & UserFragmentFragment>;
    }
  >;
};

export type DeleteUserMutationVariables = {
  id: Scalars['uuid'];
};

export type DeleteUserMutation = { __typename?: 'mutation_root' } & {
  delete_user: Maybe<
    { __typename?: 'user_mutation_response' } & {
      returning: Array<{ __typename?: 'user' } & UserFragmentFragment>;
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
    UsersQuery,
    UsersQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    baseOptions
  );
}
export function useUsersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    UsersQuery,
    UsersQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    baseOptions
  );
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = ApolloReactCommon.QueryResult<
  UsersQuery,
  UsersQueryVariables
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
  baseOptions?: ApolloReactHooks.QueryHookOptions<UserQuery, UserQueryVariables>
) {
  return ApolloReactHooks.useQuery<UserQuery, UserQueryVariables>(
    UserDocument,
    baseOptions
  );
}
export function useUserLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    UserQuery,
    UserQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<UserQuery, UserQueryVariables>(
    UserDocument,
    baseOptions
  );
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = ApolloReactCommon.QueryResult<
  UserQuery,
  UserQueryVariables
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
export type UpdateUserMutationFn = ApolloReactCommon.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
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
    UpdateUserMutation,
    UpdateUserMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(UpdateUserDocument, baseOptions);
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>;
export type UpdateUserMutationResult = ApolloReactCommon.MutationResult<
  UpdateUserMutation
>;
export type UpdateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
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
export type UpdateAllUserMutationFn = ApolloReactCommon.MutationFunction<
  UpdateAllUserMutation,
  UpdateAllUserMutationVariables
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
    UpdateAllUserMutation,
    UpdateAllUserMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    UpdateAllUserMutation,
    UpdateAllUserMutationVariables
  >(UpdateAllUserDocument, baseOptions);
}
export type UpdateAllUserMutationHookResult = ReturnType<
  typeof useUpdateAllUserMutation
>;
export type UpdateAllUserMutationResult = ApolloReactCommon.MutationResult<
  UpdateAllUserMutation
>;
export type UpdateAllUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateAllUserMutation,
  UpdateAllUserMutationVariables
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
export type InsertUserMutationFn = ApolloReactCommon.MutationFunction<
  InsertUserMutation,
  InsertUserMutationVariables
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
    InsertUserMutation,
    InsertUserMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    InsertUserMutation,
    InsertUserMutationVariables
  >(InsertUserDocument, baseOptions);
}
export type InsertUserMutationHookResult = ReturnType<
  typeof useInsertUserMutation
>;
export type InsertUserMutationResult = ApolloReactCommon.MutationResult<
  InsertUserMutation
>;
export type InsertUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  InsertUserMutation,
  InsertUserMutationVariables
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
export type DeleteUserMutationFn = ApolloReactCommon.MutationFunction<
  DeleteUserMutation,
  DeleteUserMutationVariables
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
    DeleteUserMutation,
    DeleteUserMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    DeleteUserMutation,
    DeleteUserMutationVariables
  >(DeleteUserDocument, baseOptions);
}
export type DeleteUserMutationHookResult = ReturnType<
  typeof useDeleteUserMutation
>;
export type DeleteUserMutationResult = ApolloReactCommon.MutationResult<
  DeleteUserMutation
>;
export type DeleteUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteUserMutation,
  DeleteUserMutationVariables
>;
