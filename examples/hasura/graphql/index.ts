export * from './user';

import {
  users_user,
  updateUserVariables,
  updateUser_update_user_returning
} from './typings';
export interface IUser extends users_user {}
export interface IUpdateUser extends updateUser_update_user_returning {}
export interface IUpdateUserVariables extends updateUserVariables {}
