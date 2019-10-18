import gql from 'graphql-tag';

const FRAGMENT_USER = gql`
  fragment UserFragment on user {
    id
    name
  }
`;

export const QUERY_USERS = gql`
  query users {
    user {
      ...UserFragment
    }
  }
  ${FRAGMENT_USER}
`;
export const UPDATE_USER = gql`
  mutation updateUser($id: uuid!, $name: String) {
    update_user(_set: { name: $name }, where: { id: { _eq: $id } }) {
      returning {
        ...UserFragment
      }
    }
  }
  ${FRAGMENT_USER}
`;
export const UPDATE_ALL_USER = gql`
  mutation updateAllUser($name: String) {
    update_user(_set: { name: $name }, where: {}) {
      returning {
        ...UserFragment
      }
    }
  }
  ${FRAGMENT_USER}
`;
export const INSERT_USER = gql`
  mutation insertUser($name: String!) {
    insert_user(objects: { name: $name }) {
      returning {
        ...UserFragment
      }
    }
  }
  ${FRAGMENT_USER}
`;
export const DELETE_USER = gql`
  mutation deleteUser($id: uuid!) {
    delete_user(where: { id: { _eq: $id } }) {
      returning {
        ...UserFragment
      }
    }
  }
  ${FRAGMENT_USER}
`;

/*
export function useInsertOp() {
    const [orgId] = useActiveOrgId();
    const [mutate] = useMutation(
      gql`
        mutation insertOp($op: op_insert_input!) {
          insert_op(objects: [$op]) {
            returning {
              ...OpFragment
            }
          }
        }
        ${FRAGMENT_OP}
      `,
      {}
    );
    return (item: t.get_op_op) =>
      mutate({
        variables: { op: item },
        update: (cache, { data }) => {
          const current = cache.readQuery<any>({
            query: QUERY_OP,
            variables: { orgId }
          });
          cache.writeQuery({
            query: QUERY_OP,
            data: {
              op: [
                { __typename: 'op', ...item, id: Math.random() + '' },
                ...current.op
              ]
            },
            variables: { orgId }
          });
        },
        refetchQueries: [{ query: QUERY_OP, variables: { orgId } }]
      }).then(({ data }) => data.insert_op.returning[0]);
  }
  */
