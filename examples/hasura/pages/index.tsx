import * as React from 'react';
import { getHasuraProps, useQuery, useMutation } from 'vilicando-hasura';
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
  const [users, { loading }] = useQuery<IUser>(QUERY_USERS);
  const [updateUser] = useMutation<IUpdateUser, IUpdateUserVariables>(
    UPDATE_USER,
    QUERY_USERS
  );
  const [deleteUser] = useMutation<IDeleteUser, IDeleteUserVariables>(
    DELETE_USER,
    QUERY_USERS
  );
  const [insertUser] = useMutation<IInsertUser, IInsertUserVariables>(
    INSERT_USER,
    QUERY_USERS
  );
  const [updateAllUser] = useMutation<IUpdateAllUser, IUpdateAllUserVariables>(
    UPDATE_ALL_USER,
    QUERY_USERS
  );

  return (
    <>
      <h2>Our employees:</h2>

      {loading ? (
        <p>Lade...</p>
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
                <p>Lade...</p>
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
          if (e.key === 'Enter') insertUser({ name: e.currentTarget.value });
        }}
      />

      <input
        placeholder="Update all"
        type="text"
        onKeyDown={e => {
          if (e.key === 'Enter')
            updateAllUser(
              users.map(user => ({
                ...user,
                name: e.currentTarget.value
              }))
            );
        }}
      />
    </>
  );
}
StartPage.getInitialProps = getHasuraProps();

export default StartPage;
