import React from "react";
import { withHasura } from "vilicando-hasura";
import {
  useUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useInsertUserMutation,
  useUpdateAllUserMutation,
  UsersDocument,
} from "@graphql";

function WithoutSsrPage() {
  const [users, { loading }] = useUsersQuery();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [insertUser] = useInsertUserMutation();
  const [updateAllUser] = useUpdateAllUserMutation();

  return (
    <>
      <h2>Our employees</h2>
      <h4>...only visible on client!</h4>

      {loading ? (
        <p>Lade...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <input
                value={user.username}
                onChange={(e) =>
                  updateUser({ ...user, username: e.currentTarget.value })
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
        onKeyDown={(e) => {
          if (e.key === "Enter")
            insertUser(
              { name: e.currentTarget.value },
              { updateQuery: { query: UsersDocument } }
            );
        }}
      />

      <input
        placeholder="Update all"
        type="text"
        onKeyDown={(e) => {
          if (e.key === "Enter")
            updateAllUser(
              users.map((user) => ({
                ...user,
                name: e.currentTarget.value,
              }))
            );
        }}
      />
    </>
  );
}

export default withHasura({ ssr: false })(WithoutSsrPage);
