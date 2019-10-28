import * as React from 'react';
import { Input, Divider, List, Popconfirm } from 'antd';
import { Loading, Delete } from '@ant-design/icons';
import { hasura } from 'vilicando-core';
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

      <List
        itemLayout="vertical"
        size="large"
        loading={loading}
        dataSource={users}
        renderItem={item => (
          <List.Item key={item.id}>
            <Input
              value={item.name}
              suffix={item.__optimistic ? <Loading /> : <span />}
              addonAfter={
                <Popconfirm
                  title="Are you sure delete this employee?"
                  onConfirm={() => deleteUser(item)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Delete />
                </Popconfirm>
              }
              addonBefore={
                <div
                  style={{
                    maxWidth: 150,
                    whiteSpace: 'nowrap',
                    overflowX: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  <b>id:</b> {item.id}
                </div>
              }
              onChange={e =>
                updateUser({ ...item, name: e.currentTarget.value })
              }
            />
          </List.Item>
        )}
      />

      <Divider>Submit on press enter</Divider>

      <Input
        placeholder="New employee"
        onPressEnter={e => insertUser({ name: e.currentTarget.value })}
        style={{ marginBottom: 6 }}
      />

      <Input
        placeholder="Update all"
        onPressEnter={e =>
          updateAllUser(
            users.map(user => ({ ...user, name: e.currentTarget.value }))
          )
        }
      />
    </>
  );
}

export default StartPage;
