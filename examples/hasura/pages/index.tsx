import * as React from 'react';
import { withHasura, IWithHasura } from 'vilicando-hasura';
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

function StartPage({ useQuery, useMutate }: IWithHasura) {
  const [users, { loading }] = useQuery<IUser>(QUERY_USERS);
  const [updateUser] = useMutate<IUpdateUser, IUpdateUserVariables>(
    UPDATE_USER,
    QUERY_USERS
  );
  const [deleteUser] = useMutate<IDeleteUser, IDeleteUserVariables>(
    DELETE_USER,
    QUERY_USERS
  );
  const [insertUser] = useMutate<IInsertUser, IInsertUserVariables>(
    INSERT_USER,
    QUERY_USERS
  );
  const [updateAllUser] = useMutate<IUpdateAllUser, IUpdateAllUserVariables>(
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

/* 
todo: wrapper weg und stattdessen so
StartPage.getInitialProps = getHasuraProps({ ssr:false });
StartPage.getInitialProps = async ({ req }) => {
  const res = await fetch('https://api.github.com/repos/zeit/next.js')
  const json = await res.json()
  return { stars: json.stargazers_count }
} */

export default withHasura(StartPage);
