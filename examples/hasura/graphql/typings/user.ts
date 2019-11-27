/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: user
// ====================================================

export interface user_user_by_pk {
  __typename: 'user';
  id: any;
  name: string | null;
  created_at: any;
  updated_at: any;
  __optimistic: boolean | null;
}

export interface user {
  /**
   * fetch data from the table: "user" using primary key columns
   */
  user_by_pk: user_user_by_pk | null;
}

export interface userVariables {
  id: any;
}
