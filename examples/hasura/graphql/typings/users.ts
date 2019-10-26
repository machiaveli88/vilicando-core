/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: users
// ====================================================

export interface users_user {
  __typename: "user";
  id: any;
  name: string | null;
  created_at: any;
  updated_at: any;
}

export interface users {
  /**
   * fetch data from the table: "user"
   */
  user: users_user[];
}
