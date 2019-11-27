import gql from 'graphql-tag';

const FRAGMENT_USER = gql`
  fragment UserFragment on user {
    __typename
    id
    name
    created_at
    updated_at
  }
`; // todo: add & repair __optimistic

export const QUERY_USERS = gql`
  query users {
    user(order_by: { created_at: asc }) {
      ...UserFragment
    }
  }
  ${FRAGMENT_USER}
`;

export const QUERY_USER = gql`
  query user($id: uuid!) {
    __typename
    user_by_pk(id: $id) {
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
