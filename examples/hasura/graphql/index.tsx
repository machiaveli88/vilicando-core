import gql from "graphql-tag";
import * as ApolloReactCommon from "vilicando-hasura";
import * as ApolloReactHooks from "vilicando-hasura";
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  timestamptz: any;
  uuid: any;
};

/** expression to compare columns of type Boolean. All fields are combined with logical 'AND'. */
export type TBooleanComparisonExp = {
  _eq?: Maybe<Scalars["Boolean"]>;
  _gt?: Maybe<Scalars["Boolean"]>;
  _gte?: Maybe<Scalars["Boolean"]>;
  _in?: Maybe<Array<Scalars["Boolean"]>>;
  _is_null?: Maybe<Scalars["Boolean"]>;
  _lt?: Maybe<Scalars["Boolean"]>;
  _lte?: Maybe<Scalars["Boolean"]>;
  _neq?: Maybe<Scalars["Boolean"]>;
  _nin?: Maybe<Array<Scalars["Boolean"]>>;
};

/** expression to compare columns of type Int. All fields are combined with logical 'AND'. */
export type TIntComparisonExp = {
  _eq?: Maybe<Scalars["Int"]>;
  _gt?: Maybe<Scalars["Int"]>;
  _gte?: Maybe<Scalars["Int"]>;
  _in?: Maybe<Array<Scalars["Int"]>>;
  _is_null?: Maybe<Scalars["Boolean"]>;
  _lt?: Maybe<Scalars["Int"]>;
  _lte?: Maybe<Scalars["Int"]>;
  _neq?: Maybe<Scalars["Int"]>;
  _nin?: Maybe<Array<Scalars["Int"]>>;
};

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type TStringComparisonExp = {
  _eq?: Maybe<Scalars["String"]>;
  _gt?: Maybe<Scalars["String"]>;
  _gte?: Maybe<Scalars["String"]>;
  _ilike?: Maybe<Scalars["String"]>;
  _in?: Maybe<Array<Scalars["String"]>>;
  _is_null?: Maybe<Scalars["Boolean"]>;
  _like?: Maybe<Scalars["String"]>;
  _lt?: Maybe<Scalars["String"]>;
  _lte?: Maybe<Scalars["String"]>;
  _neq?: Maybe<Scalars["String"]>;
  _nilike?: Maybe<Scalars["String"]>;
  _nin?: Maybe<Array<Scalars["String"]>>;
  _nlike?: Maybe<Scalars["String"]>;
  _nsimilar?: Maybe<Scalars["String"]>;
  _similar?: Maybe<Scalars["String"]>;
};

/** columns and relationships of "article" */
export type TArticle = {
  __typename?: "article";
  content: Scalars["String"];
  created_at: Scalars["timestamptz"];
  id: Scalars["Int"];
  test?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
  user_id: Scalars["uuid"];
};

/** aggregated selection of "article" */
export type TArticleAggregate = {
  __typename?: "article_aggregate";
  aggregate?: Maybe<TArticleAggregateFields>;
  nodes: Array<TArticle>;
};

/** aggregate fields of "article" */
export type TArticleAggregateFields = {
  __typename?: "article_aggregate_fields";
  avg?: Maybe<TArticleAvgFields>;
  count?: Maybe<Scalars["Int"]>;
  max?: Maybe<TArticleMaxFields>;
  min?: Maybe<TArticleMinFields>;
  stddev?: Maybe<TArticleStddevFields>;
  stddev_pop?: Maybe<TArticleStddevPopFields>;
  stddev_samp?: Maybe<TArticleStddevSampFields>;
  sum?: Maybe<TArticleSumFields>;
  var_pop?: Maybe<TArticleVarPopFields>;
  var_samp?: Maybe<TArticleVarSampFields>;
  variance?: Maybe<TArticleVarianceFields>;
};

/** aggregate fields of "article" */
export type TArticleAggregateFieldsCountArgs = {
  columns?: Maybe<Array<TArticleSelectColumn>>;
  distinct?: Maybe<Scalars["Boolean"]>;
};

/** order by aggregate values of table "article" */
export type TArticleAggregateOrderBy = {
  avg?: Maybe<TArticleAvgOrderBy>;
  count?: Maybe<TOrderBy>;
  max?: Maybe<TArticleMaxOrderBy>;
  min?: Maybe<TArticleMinOrderBy>;
  stddev?: Maybe<TArticleStddevOrderBy>;
  stddev_pop?: Maybe<TArticleStddevPopOrderBy>;
  stddev_samp?: Maybe<TArticleStddevSampOrderBy>;
  sum?: Maybe<TArticleSumOrderBy>;
  var_pop?: Maybe<TArticleVarPopOrderBy>;
  var_samp?: Maybe<TArticleVarSampOrderBy>;
  variance?: Maybe<TArticleVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "article" */
export type TArticleArrRelInsertInput = {
  data: Array<TArticleInsertInput>;
  on_conflict?: Maybe<TArticleOnConflict>;
};

/** aggregate avg on columns */
export type TArticleAvgFields = {
  __typename?: "article_avg_fields";
  id?: Maybe<Scalars["Float"]>;
};

/** order by avg() on columns of table "article" */
export type TArticleAvgOrderBy = {
  id?: Maybe<TOrderBy>;
};

/** Boolean expression to filter rows from the table "article". All fields are combined with a logical 'AND'. */
export type TArticleBoolExp = {
  _and?: Maybe<Array<Maybe<TArticleBoolExp>>>;
  _not?: Maybe<TArticleBoolExp>;
  _or?: Maybe<Array<Maybe<TArticleBoolExp>>>;
  content?: Maybe<TStringComparisonExp>;
  created_at?: Maybe<TTimestamptzComparisonExp>;
  id?: Maybe<TIntComparisonExp>;
  test?: Maybe<TStringComparisonExp>;
  title?: Maybe<TStringComparisonExp>;
  user_id?: Maybe<TUuidComparisonExp>;
};

/** unique or primary key constraints on table "article" */
export enum TArticleConstraint {
  /** unique or primary key constraint */
  ArticlesPkey = "articles_pkey",
}

/** input type for incrementing integer columne in table "article" */
export type TArticleIncInput = {
  id?: Maybe<Scalars["Int"]>;
};

/** input type for inserting data into table "article" */
export type TArticleInsertInput = {
  content?: Maybe<Scalars["String"]>;
  created_at?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["Int"]>;
  test?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  user_id?: Maybe<Scalars["uuid"]>;
};

/** aggregate max on columns */
export type TArticleMaxFields = {
  __typename?: "article_max_fields";
  content?: Maybe<Scalars["String"]>;
  created_at?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["Int"]>;
  test?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  user_id?: Maybe<Scalars["uuid"]>;
};

/** order by max() on columns of table "article" */
export type TArticleMaxOrderBy = {
  content?: Maybe<TOrderBy>;
  created_at?: Maybe<TOrderBy>;
  id?: Maybe<TOrderBy>;
  test?: Maybe<TOrderBy>;
  title?: Maybe<TOrderBy>;
  user_id?: Maybe<TOrderBy>;
};

/** aggregate min on columns */
export type TArticleMinFields = {
  __typename?: "article_min_fields";
  content?: Maybe<Scalars["String"]>;
  created_at?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["Int"]>;
  test?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  user_id?: Maybe<Scalars["uuid"]>;
};

/** order by min() on columns of table "article" */
export type TArticleMinOrderBy = {
  content?: Maybe<TOrderBy>;
  created_at?: Maybe<TOrderBy>;
  id?: Maybe<TOrderBy>;
  test?: Maybe<TOrderBy>;
  title?: Maybe<TOrderBy>;
  user_id?: Maybe<TOrderBy>;
};

/** response of any mutation on the table "article" */
export type TArticleMutationResponse = {
  __typename?: "article_mutation_response";
  /** number of affected rows by the mutation */
  affected_rows: Scalars["Int"];
  /** data of the affected rows by the mutation */
  returning: Array<TArticle>;
};

/** input type for inserting object relation for remote table "article" */
export type TArticleObjRelInsertInput = {
  data: TArticleInsertInput;
  on_conflict?: Maybe<TArticleOnConflict>;
};

/** on conflict condition type for table "article" */
export type TArticleOnConflict = {
  constraint: TArticleConstraint;
  update_columns: Array<TArticleUpdateColumn>;
  where?: Maybe<TArticleBoolExp>;
};

/** ordering options when selecting data from "article" */
export type TArticleOrderBy = {
  content?: Maybe<TOrderBy>;
  created_at?: Maybe<TOrderBy>;
  id?: Maybe<TOrderBy>;
  test?: Maybe<TOrderBy>;
  title?: Maybe<TOrderBy>;
  user_id?: Maybe<TOrderBy>;
};

/** primary key columns input for table: "article" */
export type TArticlePkColumnsInput = {
  id: Scalars["Int"];
};

/** select columns of table "article" */
export enum TArticleSelectColumn {
  /** column name */
  Content = "content",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Id = "id",
  /** column name */
  Test = "test",
  /** column name */
  Title = "title",
  /** column name */
  UserId = "user_id",
}

/** input type for updating data in table "article" */
export type TArticleSetInput = {
  content?: Maybe<Scalars["String"]>;
  created_at?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["Int"]>;
  test?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  user_id?: Maybe<Scalars["uuid"]>;
};

/** aggregate stddev on columns */
export type TArticleStddevFields = {
  __typename?: "article_stddev_fields";
  id?: Maybe<Scalars["Float"]>;
};

/** order by stddev() on columns of table "article" */
export type TArticleStddevOrderBy = {
  id?: Maybe<TOrderBy>;
};

/** aggregate stddev_pop on columns */
export type TArticleStddevPopFields = {
  __typename?: "article_stddev_pop_fields";
  id?: Maybe<Scalars["Float"]>;
};

/** order by stddev_pop() on columns of table "article" */
export type TArticleStddevPopOrderBy = {
  id?: Maybe<TOrderBy>;
};

/** aggregate stddev_samp on columns */
export type TArticleStddevSampFields = {
  __typename?: "article_stddev_samp_fields";
  id?: Maybe<Scalars["Float"]>;
};

/** order by stddev_samp() on columns of table "article" */
export type TArticleStddevSampOrderBy = {
  id?: Maybe<TOrderBy>;
};

/** aggregate sum on columns */
export type TArticleSumFields = {
  __typename?: "article_sum_fields";
  id?: Maybe<Scalars["Int"]>;
};

/** order by sum() on columns of table "article" */
export type TArticleSumOrderBy = {
  id?: Maybe<TOrderBy>;
};

/** update columns of table "article" */
export enum TArticleUpdateColumn {
  /** column name */
  Content = "content",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Id = "id",
  /** column name */
  Test = "test",
  /** column name */
  Title = "title",
  /** column name */
  UserId = "user_id",
}

/** aggregate var_pop on columns */
export type TArticleVarPopFields = {
  __typename?: "article_var_pop_fields";
  id?: Maybe<Scalars["Float"]>;
};

/** order by var_pop() on columns of table "article" */
export type TArticleVarPopOrderBy = {
  id?: Maybe<TOrderBy>;
};

/** aggregate var_samp on columns */
export type TArticleVarSampFields = {
  __typename?: "article_var_samp_fields";
  id?: Maybe<Scalars["Float"]>;
};

/** order by var_samp() on columns of table "article" */
export type TArticleVarSampOrderBy = {
  id?: Maybe<TOrderBy>;
};

/** aggregate variance on columns */
export type TArticleVarianceFields = {
  __typename?: "article_variance_fields";
  id?: Maybe<Scalars["Float"]>;
};

/** order by variance() on columns of table "article" */
export type TArticleVarianceOrderBy = {
  id?: Maybe<TOrderBy>;
};

/** mutation root */
export type TMutationRoot = {
  __typename?: "mutation_root";
  /** delete data from the table: "article" */
  delete_article?: Maybe<TArticleMutationResponse>;
  /** delete single row from the table: "article" */
  delete_article_by_pk?: Maybe<TArticle>;
  /** delete data from the table: "role" */
  delete_role?: Maybe<TRoleMutationResponse>;
  /** delete single row from the table: "role" */
  delete_role_by_pk?: Maybe<TRole>;
  /** delete data from the table: "user" */
  delete_user?: Maybe<TUserMutationResponse>;
  /** delete single row from the table: "user" */
  delete_user_by_pk?: Maybe<TUser>;
  /** delete data from the table: "user_role" */
  delete_user_role?: Maybe<TUserRoleMutationResponse>;
  /** delete single row from the table: "user_role" */
  delete_user_role_by_pk?: Maybe<TUserRole>;
  /** insert data into the table: "article" */
  insert_article?: Maybe<TArticleMutationResponse>;
  /** insert a single row into the table: "article" */
  insert_article_one?: Maybe<TArticle>;
  /** insert data into the table: "role" */
  insert_role?: Maybe<TRoleMutationResponse>;
  /** insert a single row into the table: "role" */
  insert_role_one?: Maybe<TRole>;
  /** insert data into the table: "user" */
  insert_user?: Maybe<TUserMutationResponse>;
  /** insert a single row into the table: "user" */
  insert_user_one?: Maybe<TUser>;
  /** insert data into the table: "user_role" */
  insert_user_role?: Maybe<TUserRoleMutationResponse>;
  /** insert a single row into the table: "user_role" */
  insert_user_role_one?: Maybe<TUserRole>;
  /** update data of the table: "article" */
  update_article?: Maybe<TArticleMutationResponse>;
  /** update single row of the table: "article" */
  update_article_by_pk?: Maybe<TArticle>;
  /** update data of the table: "role" */
  update_role?: Maybe<TRoleMutationResponse>;
  /** update single row of the table: "role" */
  update_role_by_pk?: Maybe<TRole>;
  /** update data of the table: "user" */
  update_user?: Maybe<TUserMutationResponse>;
  /** update single row of the table: "user" */
  update_user_by_pk?: Maybe<TUser>;
  /** update data of the table: "user_role" */
  update_user_role?: Maybe<TUserRoleMutationResponse>;
  /** update single row of the table: "user_role" */
  update_user_role_by_pk?: Maybe<TUserRole>;
};

/** mutation root */
export type TMutationRootDeleteArticleArgs = {
  where: TArticleBoolExp;
};

/** mutation root */
export type TMutationRootDeleteArticleByPkArgs = {
  id: Scalars["Int"];
};

/** mutation root */
export type TMutationRootDeleteRoleArgs = {
  where: TRoleBoolExp;
};

/** mutation root */
export type TMutationRootDeleteRoleByPkArgs = {
  id: Scalars["uuid"];
};

/** mutation root */
export type TMutationRootDeleteUserArgs = {
  where: TUserBoolExp;
};

/** mutation root */
export type TMutationRootDeleteUserByPkArgs = {
  id: Scalars["uuid"];
};

/** mutation root */
export type TMutationRootDeleteUserRoleArgs = {
  where: TUserRoleBoolExp;
};

/** mutation root */
export type TMutationRootDeleteUserRoleByPkArgs = {
  id: Scalars["uuid"];
};

/** mutation root */
export type TMutationRootInsertArticleArgs = {
  objects: Array<TArticleInsertInput>;
  on_conflict?: Maybe<TArticleOnConflict>;
};

/** mutation root */
export type TMutationRootInsertArticleOneArgs = {
  object: TArticleInsertInput;
  on_conflict?: Maybe<TArticleOnConflict>;
};

/** mutation root */
export type TMutationRootInsertRoleArgs = {
  objects: Array<TRoleInsertInput>;
  on_conflict?: Maybe<TRoleOnConflict>;
};

/** mutation root */
export type TMutationRootInsertRoleOneArgs = {
  object: TRoleInsertInput;
  on_conflict?: Maybe<TRoleOnConflict>;
};

/** mutation root */
export type TMutationRootInsertUserArgs = {
  objects: Array<TUserInsertInput>;
  on_conflict?: Maybe<TUserOnConflict>;
};

/** mutation root */
export type TMutationRootInsertUserOneArgs = {
  object: TUserInsertInput;
  on_conflict?: Maybe<TUserOnConflict>;
};

/** mutation root */
export type TMutationRootInsertUserRoleArgs = {
  objects: Array<TUserRoleInsertInput>;
  on_conflict?: Maybe<TUserRoleOnConflict>;
};

/** mutation root */
export type TMutationRootInsertUserRoleOneArgs = {
  object: TUserRoleInsertInput;
  on_conflict?: Maybe<TUserRoleOnConflict>;
};

/** mutation root */
export type TMutationRootUpdateArticleArgs = {
  _inc?: Maybe<TArticleIncInput>;
  _set?: Maybe<TArticleSetInput>;
  where: TArticleBoolExp;
};

/** mutation root */
export type TMutationRootUpdateArticleByPkArgs = {
  _inc?: Maybe<TArticleIncInput>;
  _set?: Maybe<TArticleSetInput>;
  pk_columns: TArticlePkColumnsInput;
};

/** mutation root */
export type TMutationRootUpdateRoleArgs = {
  _set?: Maybe<TRoleSetInput>;
  where: TRoleBoolExp;
};

/** mutation root */
export type TMutationRootUpdateRoleByPkArgs = {
  _set?: Maybe<TRoleSetInput>;
  pk_columns: TRolePkColumnsInput;
};

/** mutation root */
export type TMutationRootUpdateUserArgs = {
  _set?: Maybe<TUserSetInput>;
  where: TUserBoolExp;
};

/** mutation root */
export type TMutationRootUpdateUserByPkArgs = {
  _set?: Maybe<TUserSetInput>;
  pk_columns: TUserPkColumnsInput;
};

/** mutation root */
export type TMutationRootUpdateUserRoleArgs = {
  _set?: Maybe<TUserRoleSetInput>;
  where: TUserRoleBoolExp;
};

/** mutation root */
export type TMutationRootUpdateUserRoleByPkArgs = {
  _set?: Maybe<TUserRoleSetInput>;
  pk_columns: TUserRolePkColumnsInput;
};

/** column ordering options */
export enum TOrderBy {
  /** in the ascending order, nulls last */
  Asc = "asc",
  /** in the ascending order, nulls first */
  AscNullsFirst = "asc_nulls_first",
  /** in the ascending order, nulls last */
  AscNullsLast = "asc_nulls_last",
  /** in the descending order, nulls first */
  Desc = "desc",
  /** in the descending order, nulls first */
  DescNullsFirst = "desc_nulls_first",
  /** in the descending order, nulls last */
  DescNullsLast = "desc_nulls_last",
}

/** query root */
export type TQueryRoot = {
  __typename?: "query_root";
  /** fetch data from the table: "article" */
  article: Array<TArticle>;
  /** fetch aggregated fields from the table: "article" */
  article_aggregate: TArticleAggregate;
  /** fetch data from the table: "article" using primary key columns */
  article_by_pk?: Maybe<TArticle>;
  /** fetch data from the table: "role" */
  role: Array<TRole>;
  /** fetch aggregated fields from the table: "role" */
  role_aggregate: TRoleAggregate;
  /** fetch data from the table: "role" using primary key columns */
  role_by_pk?: Maybe<TRole>;
  /** fetch data from the table: "user" */
  user: Array<TUser>;
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: TUserAggregate;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<TUser>;
  /** fetch data from the table: "user_role" */
  user_role: Array<TUserRole>;
  /** fetch aggregated fields from the table: "user_role" */
  user_role_aggregate: TUserRoleAggregate;
  /** fetch data from the table: "user_role" using primary key columns */
  user_role_by_pk?: Maybe<TUserRole>;
};

/** query root */
export type TQueryRootArticleArgs = {
  distinct_on?: Maybe<Array<TArticleSelectColumn>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<TArticleOrderBy>>;
  where?: Maybe<TArticleBoolExp>;
};

/** query root */
export type TQueryRootArticleAggregateArgs = {
  distinct_on?: Maybe<Array<TArticleSelectColumn>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<TArticleOrderBy>>;
  where?: Maybe<TArticleBoolExp>;
};

/** query root */
export type TQueryRootArticleByPkArgs = {
  id: Scalars["Int"];
};

/** query root */
export type TQueryRootRoleArgs = {
  distinct_on?: Maybe<Array<TRoleSelectColumn>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<TRoleOrderBy>>;
  where?: Maybe<TRoleBoolExp>;
};

/** query root */
export type TQueryRootRoleAggregateArgs = {
  distinct_on?: Maybe<Array<TRoleSelectColumn>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<TRoleOrderBy>>;
  where?: Maybe<TRoleBoolExp>;
};

/** query root */
export type TQueryRootRoleByPkArgs = {
  id: Scalars["uuid"];
};

/** query root */
export type TQueryRootUserArgs = {
  distinct_on?: Maybe<Array<TUserSelectColumn>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<TUserOrderBy>>;
  where?: Maybe<TUserBoolExp>;
};

/** query root */
export type TQueryRootUserAggregateArgs = {
  distinct_on?: Maybe<Array<TUserSelectColumn>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<TUserOrderBy>>;
  where?: Maybe<TUserBoolExp>;
};

/** query root */
export type TQueryRootUserByPkArgs = {
  id: Scalars["uuid"];
};

/** query root */
export type TQueryRootUserRoleArgs = {
  distinct_on?: Maybe<Array<TUserRoleSelectColumn>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<TUserRoleOrderBy>>;
  where?: Maybe<TUserRoleBoolExp>;
};

/** query root */
export type TQueryRootUserRoleAggregateArgs = {
  distinct_on?: Maybe<Array<TUserRoleSelectColumn>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<TUserRoleOrderBy>>;
  where?: Maybe<TUserRoleBoolExp>;
};

/** query root */
export type TQueryRootUserRoleByPkArgs = {
  id: Scalars["uuid"];
};

/** columns and relationships of "role" */
export type TRole = {
  __typename?: "role";
  id: Scalars["uuid"];
  name: Scalars["String"];
};

/** aggregated selection of "role" */
export type TRoleAggregate = {
  __typename?: "role_aggregate";
  aggregate?: Maybe<TRoleAggregateFields>;
  nodes: Array<TRole>;
};

/** aggregate fields of "role" */
export type TRoleAggregateFields = {
  __typename?: "role_aggregate_fields";
  count?: Maybe<Scalars["Int"]>;
  max?: Maybe<TRoleMaxFields>;
  min?: Maybe<TRoleMinFields>;
};

/** aggregate fields of "role" */
export type TRoleAggregateFieldsCountArgs = {
  columns?: Maybe<Array<TRoleSelectColumn>>;
  distinct?: Maybe<Scalars["Boolean"]>;
};

/** order by aggregate values of table "role" */
export type TRoleAggregateOrderBy = {
  count?: Maybe<TOrderBy>;
  max?: Maybe<TRoleMaxOrderBy>;
  min?: Maybe<TRoleMinOrderBy>;
};

/** input type for inserting array relation for remote table "role" */
export type TRoleArrRelInsertInput = {
  data: Array<TRoleInsertInput>;
  on_conflict?: Maybe<TRoleOnConflict>;
};

/** Boolean expression to filter rows from the table "role". All fields are combined with a logical 'AND'. */
export type TRoleBoolExp = {
  _and?: Maybe<Array<Maybe<TRoleBoolExp>>>;
  _not?: Maybe<TRoleBoolExp>;
  _or?: Maybe<Array<Maybe<TRoleBoolExp>>>;
  id?: Maybe<TUuidComparisonExp>;
  name?: Maybe<TStringComparisonExp>;
};

/** unique or primary key constraints on table "role" */
export enum TRoleConstraint {
  /** unique or primary key constraint */
  RoleIdUnique = "role_id_unique",
  /** unique or primary key constraint */
  RoleNameUnique = "role_name_unique",
  /** unique or primary key constraint */
  RolePkey = "role_pkey",
}

/** input type for inserting data into table "role" */
export type TRoleInsertInput = {
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
};

/** aggregate max on columns */
export type TRoleMaxFields = {
  __typename?: "role_max_fields";
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
};

/** order by max() on columns of table "role" */
export type TRoleMaxOrderBy = {
  id?: Maybe<TOrderBy>;
  name?: Maybe<TOrderBy>;
};

/** aggregate min on columns */
export type TRoleMinFields = {
  __typename?: "role_min_fields";
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
};

/** order by min() on columns of table "role" */
export type TRoleMinOrderBy = {
  id?: Maybe<TOrderBy>;
  name?: Maybe<TOrderBy>;
};

/** response of any mutation on the table "role" */
export type TRoleMutationResponse = {
  __typename?: "role_mutation_response";
  /** number of affected rows by the mutation */
  affected_rows: Scalars["Int"];
  /** data of the affected rows by the mutation */
  returning: Array<TRole>;
};

/** input type for inserting object relation for remote table "role" */
export type TRoleObjRelInsertInput = {
  data: TRoleInsertInput;
  on_conflict?: Maybe<TRoleOnConflict>;
};

/** on conflict condition type for table "role" */
export type TRoleOnConflict = {
  constraint: TRoleConstraint;
  update_columns: Array<TRoleUpdateColumn>;
  where?: Maybe<TRoleBoolExp>;
};

/** ordering options when selecting data from "role" */
export type TRoleOrderBy = {
  id?: Maybe<TOrderBy>;
  name?: Maybe<TOrderBy>;
};

/** primary key columns input for table: "role" */
export type TRolePkColumnsInput = {
  id: Scalars["uuid"];
};

/** select columns of table "role" */
export enum TRoleSelectColumn {
  /** column name */
  Id = "id",
  /** column name */
  Name = "name",
}

/** input type for updating data in table "role" */
export type TRoleSetInput = {
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
};

/** update columns of table "role" */
export enum TRoleUpdateColumn {
  /** column name */
  Id = "id",
  /** column name */
  Name = "name",
}

/** subscription root */
export type TSubscriptionRoot = {
  __typename?: "subscription_root";
  /** fetch data from the table: "article" */
  article: Array<TArticle>;
  /** fetch aggregated fields from the table: "article" */
  article_aggregate: TArticleAggregate;
  /** fetch data from the table: "article" using primary key columns */
  article_by_pk?: Maybe<TArticle>;
  /** fetch data from the table: "role" */
  role: Array<TRole>;
  /** fetch aggregated fields from the table: "role" */
  role_aggregate: TRoleAggregate;
  /** fetch data from the table: "role" using primary key columns */
  role_by_pk?: Maybe<TRole>;
  /** fetch data from the table: "user" */
  user: Array<TUser>;
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: TUserAggregate;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<TUser>;
  /** fetch data from the table: "user_role" */
  user_role: Array<TUserRole>;
  /** fetch aggregated fields from the table: "user_role" */
  user_role_aggregate: TUserRoleAggregate;
  /** fetch data from the table: "user_role" using primary key columns */
  user_role_by_pk?: Maybe<TUserRole>;
};

/** subscription root */
export type TSubscriptionRootArticleArgs = {
  distinct_on?: Maybe<Array<TArticleSelectColumn>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<TArticleOrderBy>>;
  where?: Maybe<TArticleBoolExp>;
};

/** subscription root */
export type TSubscriptionRootArticleAggregateArgs = {
  distinct_on?: Maybe<Array<TArticleSelectColumn>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<TArticleOrderBy>>;
  where?: Maybe<TArticleBoolExp>;
};

/** subscription root */
export type TSubscriptionRootArticleByPkArgs = {
  id: Scalars["Int"];
};

/** subscription root */
export type TSubscriptionRootRoleArgs = {
  distinct_on?: Maybe<Array<TRoleSelectColumn>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<TRoleOrderBy>>;
  where?: Maybe<TRoleBoolExp>;
};

/** subscription root */
export type TSubscriptionRootRoleAggregateArgs = {
  distinct_on?: Maybe<Array<TRoleSelectColumn>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<TRoleOrderBy>>;
  where?: Maybe<TRoleBoolExp>;
};

/** subscription root */
export type TSubscriptionRootRoleByPkArgs = {
  id: Scalars["uuid"];
};

/** subscription root */
export type TSubscriptionRootUserArgs = {
  distinct_on?: Maybe<Array<TUserSelectColumn>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<TUserOrderBy>>;
  where?: Maybe<TUserBoolExp>;
};

/** subscription root */
export type TSubscriptionRootUserAggregateArgs = {
  distinct_on?: Maybe<Array<TUserSelectColumn>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<TUserOrderBy>>;
  where?: Maybe<TUserBoolExp>;
};

/** subscription root */
export type TSubscriptionRootUserByPkArgs = {
  id: Scalars["uuid"];
};

/** subscription root */
export type TSubscriptionRootUserRoleArgs = {
  distinct_on?: Maybe<Array<TUserRoleSelectColumn>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<TUserRoleOrderBy>>;
  where?: Maybe<TUserRoleBoolExp>;
};

/** subscription root */
export type TSubscriptionRootUserRoleAggregateArgs = {
  distinct_on?: Maybe<Array<TUserRoleSelectColumn>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<TUserRoleOrderBy>>;
  where?: Maybe<TUserRoleBoolExp>;
};

/** subscription root */
export type TSubscriptionRootUserRoleByPkArgs = {
  id: Scalars["uuid"];
};

/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export type TTimestamptzComparisonExp = {
  _eq?: Maybe<Scalars["timestamptz"]>;
  _gt?: Maybe<Scalars["timestamptz"]>;
  _gte?: Maybe<Scalars["timestamptz"]>;
  _in?: Maybe<Array<Scalars["timestamptz"]>>;
  _is_null?: Maybe<Scalars["Boolean"]>;
  _lt?: Maybe<Scalars["timestamptz"]>;
  _lte?: Maybe<Scalars["timestamptz"]>;
  _neq?: Maybe<Scalars["timestamptz"]>;
  _nin?: Maybe<Array<Scalars["timestamptz"]>>;
};

/** columns and relationships of "user" */
export type TUser = {
  __typename?: "user";
  active?: Maybe<Scalars["Boolean"]>;
  created_at: Scalars["timestamptz"];
  id: Scalars["uuid"];
  password: Scalars["String"];
  username: Scalars["String"];
};

/** aggregated selection of "user" */
export type TUserAggregate = {
  __typename?: "user_aggregate";
  aggregate?: Maybe<TUserAggregateFields>;
  nodes: Array<TUser>;
};

/** aggregate fields of "user" */
export type TUserAggregateFields = {
  __typename?: "user_aggregate_fields";
  count?: Maybe<Scalars["Int"]>;
  max?: Maybe<TUserMaxFields>;
  min?: Maybe<TUserMinFields>;
};

/** aggregate fields of "user" */
export type TUserAggregateFieldsCountArgs = {
  columns?: Maybe<Array<TUserSelectColumn>>;
  distinct?: Maybe<Scalars["Boolean"]>;
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
  active?: Maybe<TBooleanComparisonExp>;
  created_at?: Maybe<TTimestamptzComparisonExp>;
  id?: Maybe<TUuidComparisonExp>;
  password?: Maybe<TStringComparisonExp>;
  username?: Maybe<TStringComparisonExp>;
};

/** unique or primary key constraints on table "user" */
export enum TUserConstraint {
  /** unique or primary key constraint */
  UserIdUnique = "user_id_unique",
  /** unique or primary key constraint */
  UserPkey = "user_pkey",
  /** unique or primary key constraint */
  UserUsernameUnique = "user_username_unique",
}

/** input type for inserting data into table "user" */
export type TUserInsertInput = {
  active?: Maybe<Scalars["Boolean"]>;
  created_at?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  password?: Maybe<Scalars["String"]>;
  username?: Maybe<Scalars["String"]>;
};

/** aggregate max on columns */
export type TUserMaxFields = {
  __typename?: "user_max_fields";
  created_at?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  password?: Maybe<Scalars["String"]>;
  username?: Maybe<Scalars["String"]>;
};

/** order by max() on columns of table "user" */
export type TUserMaxOrderBy = {
  created_at?: Maybe<TOrderBy>;
  id?: Maybe<TOrderBy>;
  password?: Maybe<TOrderBy>;
  username?: Maybe<TOrderBy>;
};

/** aggregate min on columns */
export type TUserMinFields = {
  __typename?: "user_min_fields";
  created_at?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  password?: Maybe<Scalars["String"]>;
  username?: Maybe<Scalars["String"]>;
};

/** order by min() on columns of table "user" */
export type TUserMinOrderBy = {
  created_at?: Maybe<TOrderBy>;
  id?: Maybe<TOrderBy>;
  password?: Maybe<TOrderBy>;
  username?: Maybe<TOrderBy>;
};

/** response of any mutation on the table "user" */
export type TUserMutationResponse = {
  __typename?: "user_mutation_response";
  /** number of affected rows by the mutation */
  affected_rows: Scalars["Int"];
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
  active?: Maybe<TOrderBy>;
  created_at?: Maybe<TOrderBy>;
  id?: Maybe<TOrderBy>;
  password?: Maybe<TOrderBy>;
  username?: Maybe<TOrderBy>;
};

/** primary key columns input for table: "user" */
export type TUserPkColumnsInput = {
  id: Scalars["uuid"];
};

/** columns and relationships of "user_role" */
export type TUserRole = {
  __typename?: "user_role";
  id: Scalars["uuid"];
  role_id?: Maybe<Scalars["uuid"]>;
  user_id?: Maybe<Scalars["uuid"]>;
};

/** aggregated selection of "user_role" */
export type TUserRoleAggregate = {
  __typename?: "user_role_aggregate";
  aggregate?: Maybe<TUserRoleAggregateFields>;
  nodes: Array<TUserRole>;
};

/** aggregate fields of "user_role" */
export type TUserRoleAggregateFields = {
  __typename?: "user_role_aggregate_fields";
  count?: Maybe<Scalars["Int"]>;
  max?: Maybe<TUserRoleMaxFields>;
  min?: Maybe<TUserRoleMinFields>;
};

/** aggregate fields of "user_role" */
export type TUserRoleAggregateFieldsCountArgs = {
  columns?: Maybe<Array<TUserRoleSelectColumn>>;
  distinct?: Maybe<Scalars["Boolean"]>;
};

/** order by aggregate values of table "user_role" */
export type TUserRoleAggregateOrderBy = {
  count?: Maybe<TOrderBy>;
  max?: Maybe<TUserRoleMaxOrderBy>;
  min?: Maybe<TUserRoleMinOrderBy>;
};

/** input type for inserting array relation for remote table "user_role" */
export type TUserRoleArrRelInsertInput = {
  data: Array<TUserRoleInsertInput>;
  on_conflict?: Maybe<TUserRoleOnConflict>;
};

/** Boolean expression to filter rows from the table "user_role". All fields are combined with a logical 'AND'. */
export type TUserRoleBoolExp = {
  _and?: Maybe<Array<Maybe<TUserRoleBoolExp>>>;
  _not?: Maybe<TUserRoleBoolExp>;
  _or?: Maybe<Array<Maybe<TUserRoleBoolExp>>>;
  id?: Maybe<TUuidComparisonExp>;
  role_id?: Maybe<TUuidComparisonExp>;
  user_id?: Maybe<TUuidComparisonExp>;
};

/** unique or primary key constraints on table "user_role" */
export enum TUserRoleConstraint {
  /** unique or primary key constraint */
  UserRoleIdUnique = "user_role_id_unique",
  /** unique or primary key constraint */
  UserRolePkey = "user_role_pkey",
}

/** input type for inserting data into table "user_role" */
export type TUserRoleInsertInput = {
  id?: Maybe<Scalars["uuid"]>;
  role_id?: Maybe<Scalars["uuid"]>;
  user_id?: Maybe<Scalars["uuid"]>;
};

/** aggregate max on columns */
export type TUserRoleMaxFields = {
  __typename?: "user_role_max_fields";
  id?: Maybe<Scalars["uuid"]>;
  role_id?: Maybe<Scalars["uuid"]>;
  user_id?: Maybe<Scalars["uuid"]>;
};

/** order by max() on columns of table "user_role" */
export type TUserRoleMaxOrderBy = {
  id?: Maybe<TOrderBy>;
  role_id?: Maybe<TOrderBy>;
  user_id?: Maybe<TOrderBy>;
};

/** aggregate min on columns */
export type TUserRoleMinFields = {
  __typename?: "user_role_min_fields";
  id?: Maybe<Scalars["uuid"]>;
  role_id?: Maybe<Scalars["uuid"]>;
  user_id?: Maybe<Scalars["uuid"]>;
};

/** order by min() on columns of table "user_role" */
export type TUserRoleMinOrderBy = {
  id?: Maybe<TOrderBy>;
  role_id?: Maybe<TOrderBy>;
  user_id?: Maybe<TOrderBy>;
};

/** response of any mutation on the table "user_role" */
export type TUserRoleMutationResponse = {
  __typename?: "user_role_mutation_response";
  /** number of affected rows by the mutation */
  affected_rows: Scalars["Int"];
  /** data of the affected rows by the mutation */
  returning: Array<TUserRole>;
};

/** input type for inserting object relation for remote table "user_role" */
export type TUserRoleObjRelInsertInput = {
  data: TUserRoleInsertInput;
  on_conflict?: Maybe<TUserRoleOnConflict>;
};

/** on conflict condition type for table "user_role" */
export type TUserRoleOnConflict = {
  constraint: TUserRoleConstraint;
  update_columns: Array<TUserRoleUpdateColumn>;
  where?: Maybe<TUserRoleBoolExp>;
};

/** ordering options when selecting data from "user_role" */
export type TUserRoleOrderBy = {
  id?: Maybe<TOrderBy>;
  role_id?: Maybe<TOrderBy>;
  user_id?: Maybe<TOrderBy>;
};

/** primary key columns input for table: "user_role" */
export type TUserRolePkColumnsInput = {
  id: Scalars["uuid"];
};

/** select columns of table "user_role" */
export enum TUserRoleSelectColumn {
  /** column name */
  Id = "id",
  /** column name */
  RoleId = "role_id",
  /** column name */
  UserId = "user_id",
}

/** input type for updating data in table "user_role" */
export type TUserRoleSetInput = {
  id?: Maybe<Scalars["uuid"]>;
  role_id?: Maybe<Scalars["uuid"]>;
  user_id?: Maybe<Scalars["uuid"]>;
};

/** update columns of table "user_role" */
export enum TUserRoleUpdateColumn {
  /** column name */
  Id = "id",
  /** column name */
  RoleId = "role_id",
  /** column name */
  UserId = "user_id",
}

/** select columns of table "user" */
export enum TUserSelectColumn {
  /** column name */
  Active = "active",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Id = "id",
  /** column name */
  Password = "password",
  /** column name */
  Username = "username",
}

/** input type for updating data in table "user" */
export type TUserSetInput = {
  active?: Maybe<Scalars["Boolean"]>;
  created_at?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  password?: Maybe<Scalars["String"]>;
  username?: Maybe<Scalars["String"]>;
};

/** update columns of table "user" */
export enum TUserUpdateColumn {
  /** column name */
  Active = "active",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Id = "id",
  /** column name */
  Password = "password",
  /** column name */
  Username = "username",
}

/** expression to compare columns of type uuid. All fields are combined with logical 'AND'. */
export type TUuidComparisonExp = {
  _eq?: Maybe<Scalars["uuid"]>;
  _gt?: Maybe<Scalars["uuid"]>;
  _gte?: Maybe<Scalars["uuid"]>;
  _in?: Maybe<Array<Scalars["uuid"]>>;
  _is_null?: Maybe<Scalars["Boolean"]>;
  _lt?: Maybe<Scalars["uuid"]>;
  _lte?: Maybe<Scalars["uuid"]>;
  _neq?: Maybe<Scalars["uuid"]>;
  _nin?: Maybe<Array<Scalars["uuid"]>>;
};

export type TUserFragmentFragment = { __typename: "user" } & Pick<
  TUser,
  "id" | "username" | "active" | "created_at"
>;

export type TUsersQueryVariables = {};

export type TUsersQuery = { __typename?: "query_root" } & {
  user: Array<{ __typename?: "user" } & TUserFragmentFragment>;
};

export type TUserQueryVariables = {
  id: Scalars["uuid"];
};

export type TUserQuery = { __typename?: "query_root" } & {
  user_by_pk?: Maybe<{ __typename?: "user" } & TUserFragmentFragment>;
};

export type TUpdateUserMutationVariables = {
  id: Scalars["uuid"];
  username?: Maybe<Scalars["String"]>;
};

export type TUpdateUserMutation = { __typename?: "mutation_root" } & {
  update_user?: Maybe<
    { __typename?: "user_mutation_response" } & {
      returning: Array<{ __typename?: "user" } & TUserFragmentFragment>;
    }
  >;
};

export type TUpdateAllUserMutationVariables = {
  username?: Maybe<Scalars["String"]>;
};

export type TUpdateAllUserMutation = { __typename?: "mutation_root" } & {
  update_user?: Maybe<
    { __typename?: "user_mutation_response" } & {
      returning: Array<{ __typename?: "user" } & TUserFragmentFragment>;
    }
  >;
};

export type TInsertUserMutationVariables = {
  username: Scalars["String"];
};

export type TInsertUserMutation = { __typename?: "mutation_root" } & {
  insert_user?: Maybe<
    { __typename?: "user_mutation_response" } & {
      returning: Array<{ __typename?: "user" } & TUserFragmentFragment>;
    }
  >;
};

export type TDeleteUserMutationVariables = {
  id: Scalars["uuid"];
};

export type TDeleteUserMutation = { __typename?: "mutation_root" } & {
  delete_user?: Maybe<
    { __typename?: "user_mutation_response" } & {
      returning: Array<{ __typename?: "user" } & TUserFragmentFragment>;
    }
  >;
};

export const UserFragmentFragmentDoc = gql`
  fragment UserFragment on user {
    __typename
    id
    username
    active
    created_at
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
  return ApolloReactHooks.useQuery<
    TUsersQuery,
    TUsersQueryVariables,
    Array<{ __typename?: "user" } & TUserFragmentFragment>
  >(UsersDocument, baseOptions);
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
  return ApolloReactHooks.useQuery<
    TUserQuery,
    TUserQueryVariables,
    Maybe<{ __typename?: "user" } & TUserFragmentFragment>
  >(UserDocument, baseOptions);
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
  mutation updateUser($id: uuid!, $username: String) {
    update_user(_set: { username: $username }, where: { id: { _eq: $id } }) {
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
 *      username: // value for 'username'
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
  mutation updateAllUser($username: String) {
    update_user(_set: { username: $username }, where: {}) {
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
 *      username: // value for 'username'
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
  mutation insertUser($username: String!) {
    insert_user(objects: { username: $username }) {
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
 *      username: // value for 'username'
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
