import * as React from 'react';
import { hasura } from 'vilicando-hasura';
import {
  QUERY_USERS,
  IUser,
  UPDATE_USER,
  IUpdateUser,
  IUpdateUserVariables,
  INSERT_USER,
  IInsertUser,
  IInsertUserVariables,
  DELETE_USER,
  IDeleteUser,
  IDeleteUserVariables,
  UPDATE_ALL_USER,
  IUpdateAllUser,
  IUpdateAllUserVariables
} from '@graphql';

function StartPage() {
  const [users, { loading }] = hasura.query<IUser>(QUERY_USERS);
  const [updateUser] = hasura.mutate<IUpdateUser, IUpdateUserVariables>(
    UPDATE_USER,
    QUERY_USERS
  );
  const [deleteUser] = hasura.mutate<IDeleteUser, IDeleteUserVariables>(
    DELETE_USER,
    QUERY_USERS
  );
  const [insertUser] = hasura.mutate<IInsertUser, IInsertUserVariables>(
    INSERT_USER,
    QUERY_USERS
  );
  const [updateAllUser] = hasura.mutate<
    IUpdateAllUser,
    IUpdateAllUserVariables
  >(UPDATE_ALL_USER, QUERY_USERS);

  return (
    <>
      <h2>Our employees:</h2>

      {loading ? (
        <span>Lade...</span>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              <input
                value={user.name}
                onChange={e =>
                  updateUser({ ...user, name: e.currentTarget.value })
                }
              />
              &nbsp;
              {user.__optimistic ? (
                <span>Lade...</span>
              ) : (
                <a href="#" onClick={() => deleteUser(user)}>
                  löschen
                </a>
              )}
            </li>
          ))}
        </ul>
      )}

      <input
        placeholder="New employee"
        type="text"
        onKeyDown={e => {
          if (e.key == 'Enter') insertUser({ name: e.currentTarget.value });
        }}
      />

      <input
        placeholder="Update all"
        type="text"
        onKeyDown={e => {
          if (e.key == 'Enter')
            updateAllUser(
              users.map(user => ({ ...user, name: e.currentTarget.value }))
            );
        }}
      />
    </>
  );
}

export default StartPage;
