export * from './user';

import {
  users_user,
  updateUser_update_user_returning,
  updateUserVariables,
  insertUser_insert_user_returning,
  insertUserVariables,
  deleteUser_delete_user_returning,
  deleteUserVariables,
  updateAllUser_update_user_returning,
  updateAllUserVariables
} from './typings';
export interface IUser extends users_user {}
export interface IUpdateUser extends updateUser_update_user_returning {}
export interface IUpdateUserVariables extends updateUserVariables {}
export interface IInsertUser extends insertUser_insert_user_returning {}
export interface IInsertUserVariables extends insertUserVariables {}
export interface IDeleteUser extends deleteUser_delete_user_returning {}
export interface IDeleteUserVariables extends deleteUserVariables {}
export interface IUpdateAllUser extends updateAllUser_update_user_returning {}
export interface IUpdateAllUserVariables extends updateAllUserVariables {}
