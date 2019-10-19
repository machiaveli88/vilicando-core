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
  updateAllUserVariables,
  updateUser_update_user_returning
} from '@graphql';

function StartPage() {
  const [users, { loading }] = hasura.query<users_user>(QUERY_USERS);
  const [updateUser] = hasura.mutate<
    updateUser_update_user_returning,
    updateUserVariables
  >(UPDATE_USER, QUERY_USERS);
  /* const [deleteUser] = hasura.mutate<deleteUser, deleteUserVariables>(
    DELETE_USER
  );
  const [insertUser] = hasura.mutate<insertUser, insertUserVariables>(
    INSERT_USER
  );
  const [updateAllUser] = hasura.mutate<updateAllUser, updateAllUserVariables>(
    UPDATE_ALL_USER
  ); */

  return (
    <>
      <h2>Our employees:</h2>

      <List
        itemLayout="vertical"
        size="large"
        loading={loading}
        dataSource={users}
        renderItem={item => (
          <List.Item key={item.id}>
            <Input
              value={item.name}
              suffix={
                item.__optimistic && (
                  <Loading style={{ color: 'rgba(0, 0, 0, .33)' }} />
                )
              }
              addonAfter={
                <Popconfirm
                  title="Are you sure delete this employee?"
                  // onConfirm={() => deleteUser({ id })}
                  okText="Yes"
                  cancelText="No"
                >
                  <a>delete</a>
                </Popconfirm>
              }
              onChange={e =>
                updateUser({ ...item, name: e.currentTarget.value })
              }
            />
          </List.Item>
        )}
      />

      <Divider />

      <Input
        placeholder="New employee"
        // onPressEnter={e => insertUser({ name: e.currentTarget.value })}
      />

      <Divider />

      <Input
        placeholder="Update all"
        // onChange={e => updateAllUser({ name: e.currentTarget.value })}
      />
    </>
  );
}

export default StartPage;
