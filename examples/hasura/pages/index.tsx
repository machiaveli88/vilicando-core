import * as React from 'react';
import { Input, Divider, List, Popconfirm } from 'antd';
import { useQuery, useMutation, withApollo } from 'vilicando-core';

interface IUser {
  id: string;
  name: string;
}

function StartPage() {
  const { data: { user = [] } = {}, loading } = useQuery<{
    user: IUser;
  }>(
    `
  query users {
    user {
      id
      name
    }
  }
`
  );
  const [updateUser] = useMutation<IUser>(
    `
    mutation($id: uuid!, $name: String) {
      update_user(_set: {name: $name}, where: {id: {_eq: $id}}) {
        returning {
          id
          name
        }
      }
    }
`
  );
  const [insertUser] = useMutation<IUser>(
    `
    mutation($name: String!) {
      insert_user(objects: {name: $name}) {
        returning {
          id
          name
        }
      }
    }
`,
    { refetchQueries: ['users'] }
  );
  const [deleteUser] = useMutation<IUser>(
    `
    mutation($id: uuid!) {
      delete_user(where: {id: {_eq: $id}}) {
        returning {
          id
          name
        }
      }
    }
`,
    { refetchQueries: ['users'] }
  );

  return (
    <>
      <h2>Our employees:</h2>

      <List<IUser>
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
    </>
  );
}

export default withApollo(StartPage);
