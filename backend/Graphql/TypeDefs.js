const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Users {
    UserName: String
    Email: String
    Password: String
    Profile: String
    ID: String,
    Confirm:String

  }
  type Query {
    GetAllUsers: [Users]
    GetUserByID(ID: ID): Users
  }

  input UserInput {
    UserName: String
    Email: String
    Password: String
    Profile: String,
    Confirm:String
  }
  type Mutation {
    InsertUser(AddUser: UserInput): Users!
    UpdateUser(ID: ID, EditUser: UserInput): Users!
    DeleteUser(ID: ID): Users!
  }
`;

module.exports = typeDefs;
