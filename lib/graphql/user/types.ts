import { gql } from "apollo-server-express";

const userType = gql`
  type User {
    id: String
    username: String
    email: String
  }

  extend type Query {
    user(id: ID!): User
    users: [User!]
  }

  type UserAuth {
    token: String
  }

  extend type Mutation {
    register(username: String!, email: String!, password: String!): UserAuth
    login(email: String!, password: String!): UserAuth
  }
`;

export default userType;
