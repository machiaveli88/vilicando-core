import * as React from 'react';
import { Input, Divider, List, Popconfirm } from 'antd';
import { Loading } from '@ant-design/icons';
import { hasura } from 'vilicando-core';
import {
  QUERY_USERS,
  UPDATE_USER,
  UPDATE_ALL_USER,
  INSERT_USER,
  DELETE_USER,
  users,
  users_user,
  updateUser,
  updateUserVariables,
  deleteUser,
  deleteUserVariables,
  insertUser,
  insertUserVariables,
  updateAllUser,
  updateAllUserVariables
} from '@graphql';

function StartPage() {
  const [user, { loading }] = hasura.query<users>(QUERY_USERS);
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

  console.log(user);

  return (
    <>
      <h2>Our employees:</h2>

      <List<users_user>
        itemLayout="vertical"
        size="large"
        loading={loading}
        dataSource={user}
        renderItem={({ id, name, __optimistic }) => (
          <List.Item key={id}>
            <Input
              value={name}
              suffix={
                __optimistic && (
                  <Loading style={{ color: 'rgba(0, 0, 0, .33)' }} />
                )
              }
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
