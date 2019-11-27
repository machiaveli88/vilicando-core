/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateUser
// ====================================================

export interface updateUser_update_user_returning {
  __typename: 'user';
  id: any;
  name: string | null;
  created_at: any;
  updated_at: any;
  __optimistic: boolean | null;
}

export interface updateUser_update_user {
  __typename: 'user_mutation_response';
  /**
   * data of the affected rows by the mutation
   */
  returning: updateUser_update_user_returning[];
}

export interface updateUser {
  /**
   * update data of the table: "user"
   */
  update_user: updateUser_update_user | null;
}

export interface updateUserVariables {
  id: any;
  name?: string | null;
}
