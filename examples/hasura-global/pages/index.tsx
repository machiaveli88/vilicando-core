import React from 'react';
import {
  useUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useInsertUserMutation,
  useUpdateAllUserMutation,
  UsersDocument
} from '@graphql';
import { useFela } from 'vilicando-core';

function StartPage() {
  const { css } = useFela();

  const [users, { loading }] = useUsersQuery();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [insertUser] = useInsertUserMutation();
  const [updateAllUser] = useUpdateAllUserMutation();

  return (
    <>
      <h2 className={css({ marginBottom: 0 })}>Our employees</h2>
      <h4 className={css({ marginTop: 0 })}>...only visible on client!</h4>

      <p>Hasura can also be used globally, but then does not support SSR.</p>

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
              <a href="#" onClick={() => deleteUser(user)}>
                löschen
              </a>
            </li>
          ))}
        </ul>
      )}

      <input
        placeholder="New employee"
        type="text"
        onKeyDown={e => {
          if (e.key === 'Enter')
            insertUser(
              { name: e.currentTarget.value },
              { updateQuery: { query: UsersDocument } }
            );
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

export default StartPage;
