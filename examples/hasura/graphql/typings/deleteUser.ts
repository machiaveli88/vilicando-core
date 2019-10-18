/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteUser
// ====================================================

export interface deleteUser_delete_user_returning {
  __typename: "user";
  id: any;
  name: string;
}

export interface deleteUser_delete_user {
  __typename: "user_mutation_response";
  /**
   * data of the affected rows by the mutation
   */
  returning: deleteUser_delete_user_returning[];
}

export interface deleteUser {
  /**
   * delete data from the table: "user"
   */
  delete_user: deleteUser_delete_user | null;
}

export interface deleteUserVariables {
  id: any;
}
