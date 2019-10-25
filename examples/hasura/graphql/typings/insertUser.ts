/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: insertUser
// ====================================================

export interface insertUser_insert_user_returning {
  __typename: "user";
  id: any;
  name: string | null;
}

export interface insertUser_insert_user {
  __typename: "user_mutation_response";
  /**
   * data of the affected rows by the mutation
   */
  returning: insertUser_insert_user_returning[];
}

export interface insertUser {
  /**
   * insert data into the table: "user"
   */
  insert_user: insertUser_insert_user | null;
}

export interface insertUserVariables {
  name: string;
}
