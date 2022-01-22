import { gql } from 'apollo-server';

export const typeDefs = gql`
type Query {
    users: [User]
    me: User
  }

  type User {
    id: ID!
    email: String!
    password: String!
    firstName: String
    lastName: String
  }

  type Mutation {
    signupUser(data: UserInput!) : AuthPayLoad!
    loginUser(data: UserInput!): AuthPayLoad!
    deleteUser(id: ID!): User
    updateUser(user: UserUpdate!): User
  }

  input UserInput {
    email: String!
    password: String!
  }

  input UserUpdate {
    email: String!
    firstName: String
    lastName: String
  }

  type AuthPayLoad {
    token: String!
    user: User
  }
`;