/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateAllUser
// ====================================================

export interface updateAllUser_update_user_returning {
  id: any;
  name: string | null;
}

export interface updateAllUser_update_user {
  /**
   * data of the affected rows by the mutation
   */
  returning: updateAllUser_update_user_returning[];
}

export interface updateAllUser {
  /**
   * update data of the table: "user"
   */
  update_user: updateAllUser_update_user | null;
}

export interface updateAllUserVariables {
  name?: string | null;
}
