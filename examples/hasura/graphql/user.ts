import gql from 'graphql-tag';

export const QUERY_USERS = gql`
  query users {
    user {
      id
      name
    }
  }
`;
export const UPDATE_USER = gql`
  mutation updateUser($id: uuid!, $name: String) {
    update_user(_set: { name: $name }, where: { id: { _eq: $id } }) {
      returning {
        id
        name
      }
    }
  }
`;
export const UPDATE_ALL_USER = gql`
  mutation updateAllUser($name: String) {
    update_user(_set: { name: $name }, where: {}) {
      returning {
        id
        name
      }
    }
  }
`;
export const INSERT_USER = gql`
  mutation insertUser($name: String!) {
    insert_user(objects: { name: $name }) {
      returning {
        id
        name
      }
    }
  }
`;
export const DELETE_USER = gql`
  mutation deleteUser($id: uuid!) {
    delete_user(where: { id: { _eq: $id } }) {
      returning {
        id
        name
      }
    }
  }
`;
