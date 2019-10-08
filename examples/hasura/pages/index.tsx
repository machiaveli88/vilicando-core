import * as React from 'react';
import { Input, Divider, List, Popconfirm } from 'antd';
import { hasura } from 'vilicando-core';
import gql from 'graphql-tag';
import {
  users,
  users_user,
  groups,
  updateUser,
  updateUserVariables,
  deleteUser,
  deleteUserVariables,
  insertUser,
  insertUserVariables,
  updateAllUser,
  updateAllUserVariables
} from '@typings';

const QUERY_USERS = gql`
  query users {
    user {
      id
      name
    }
  }
`;
const QUERY_GROUPS = gql`
  query groups {
    group {
      id
      name
    }
  }
`;
const UPDATE_USER = gql`
  mutation updateUser($id: uuid!, $name: String) {
    update_user(_set: { name: $name }, where: { id: { _eq: $id } }) {
      returning {
        id
        name
      }
    }
  }
`;
const UPDATE_ALL_USER = gql`
  mutation updateAllUser($name: String) {
    update_user(_set: { name: $name }, where: {}) {
      returning {
        id
        name
      }
    }
  }
`;
const INSERT_USER = gql`
  mutation insertUser($name: String!) {
    insert_user(objects: { name: $name }) {
      returning {
        id
        name
      }
    }
  }
`;
const DELETE_USER = gql`
  mutation deleteUser($id: uuid!) {
    delete_user(where: { id: { _eq: $id } }) {
      returning {
        id
        name
      }
    }
  }
`;

function StartPage() {
  const [user, { loading }] = hasura.query<users>(QUERY_USERS);
  const [groups] = hasura.query<groups>(QUERY_GROUPS);
  const [updateUser] = hasura.mutate<updateUser, updateUserVariables>(
    UPDATE_USER
  );
  const [deleteUser] = hasura.mutate<deleteUser, deleteUserVariables>(
    DELETE_USER
  );
  const [insertUser] = hasura.mutate<insertUser, insertUserVariables>(
    INSERT_USER
  );
  const [updateAllUser] = hasura.mutate<updateAllUser, updateAllUserVariables>(
    UPDATE_ALL_USER
  );

  return (
    <>
      <h2>Our employees:</h2>

      <List<users_user>
        itemLayout="vertical"
        size="large"
        loading={loading}
        dataSource={user}
        renderItem={({ id, name }) => (
          <List.Item key={id}>
            <Input
              value={name}
              addonAfter={
                <Popconfirm
                  title="Are you sure delete this employee?"
                  onConfirm={() => deleteUser({ id })}
                  okText="Yes"
                  cancelText="No"
                >
                  <a>delete</a>
                </Popconfirm>
              }
              onChange={e => updateUser({ id, name: e.currentTarget.value })}
            />
          </List.Item>
        )}
      />

      <Divider />

      <Input
        placeholder="New employee"
        onPressEnter={e => insertUser({ name: e.currentTarget.value })}
      />

      <Divider />

      <Input
        placeholder="Update all"
        onChange={e => updateAllUser({ name: e.currentTarget.value })}
      />
    </>
  );
}

export default StartPage;
