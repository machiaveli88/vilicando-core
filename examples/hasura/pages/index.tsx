import React from 'react';
import { getHasuraProps, withHasura } from 'vilicando-hasura';
import {
  useUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useInsertUserMutation,
  useUpdateAllUserMutation
} from '@graphql';

function StartPage() {
  const [{ user }, { loading }] = useUsersQuery();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [insertUser] = useInsertUserMutation();
  const [updateAllUser] = useUpdateAllUserMutation();

  return (
    <>
      <h2>Our employees:</h2>

      {loading ? (
        <p>Lade...</p>
      ) : (
        <ul>
          {user.map(user => (
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
          if (e.key === 'Enter') insertUser({ name: e.currentTarget.value });
        }}
      />

      <input
        placeholder="Update all"
        type="text"
        onKeyDown={e => {
          if (e.key === 'Enter')
            updateAllUser(
              user.map(user => ({
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

export default withHasura(StartPage);
