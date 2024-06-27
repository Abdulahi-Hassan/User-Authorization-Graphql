import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client";

const HTTPLINK = new HttpLink({
  uri: "https://user-authorization-graphql-1.onrender.com/graphql",
});

export const client = new ApolloClient({
  link: HTTPLINK,
  cache: new InMemoryCache(),
});

export const GetAllUsers = gql`
  query GetUsers {
    GetAllUsers {
      ID
      UserName
      Email
      Password
      Profile
      Confirm
    }
  }
`;

export const AddNewUser = gql`
  mutation Insert($addUser: UserInput) {
    InsertUser(AddUser: $addUser) {
      Email
      ID
      Password
      Profile
      UserName
    }
  }
`;

export const UpdateUser = gql`
  mutation Update($id: ID, $editUser: UserInput) {
    UpdateUser(ID: $id, EditUser: $editUser) {
      Email
      ID
      Password
      Profile
      UserName
    }
  }
`;

export const DeleteUser = gql`
  mutation Delele($id: ID) {
    DeleteUser(ID: $id) {
      Confirm
      Email
      ID
      Password
      Profile
      UserName
    }
  }
`;
