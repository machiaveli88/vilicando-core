import gql from "graphql-tag";

const FRAGMENT_USER = gql`
  fragment UserFragment on user {
    __typename
    id
    username
    active
    created_at
  }
`;

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
    user_by_pk(id: $id) {
      ...UserFragment
    }
  }
  ${FRAGMENT_USER}
`;
export const UPDATE_USER = gql`
  mutation updateUser($id: uuid!, $username: String) {
    update_user(_set: { username: $username }, where: { id: { _eq: $id } }) {
      returning {
        ...UserFragment
      }
    }
  }
  ${FRAGMENT_USER}
`;
export const UPDATE_ALL_USER = gql`
  mutation updateAllUser($username: String) {
    update_user(_set: { username: $username }, where: {}) {
      returning {
        ...UserFragment
      }
    }
  }
  ${FRAGMENT_USER}
`;
export const INSERT_USER = gql`
  mutation insertUser($username: String!) {
    insert_user(objects: { username: $username }) {
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
