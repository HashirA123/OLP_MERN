import gql from "graphql-tag";

export const typeDefs = gql`
  scalar Date

  type UserTokens {
    user: User
    token: String
  }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    pfp: String
  }

  type Post {
    id: ID!
    title: String!
    message: String!
    creator: String!
    name: String!
    tags: [String]
    selectedFile: String
    likeCount: Int
    createdAt: Date
  }

  type Query {
    post(id: ID!): Post
    posts: [Post]
    user(email: String!): User
  }

  type Mutation {
    createPost(
      title: String!
      message: String!
      name: String!
      tags: [String!]
      selectedFile: String
    ): Post
    updatePost(
      id: ID!
      title: String
      message: String
      name: String
      tags: [String]
      selectedFile: String
    ): Post
    deletePost(id: ID!): Post
    likePost(id: ID!): Post
    signUpGoogle(email: String!, name: String!, pfp: String): UserTokens
    signUp(
      email: String!
      firstName: String!
      lastName: String!
      password: String!
      confirmPassword: String
    ): UserTokens
    signIn(email: String!, password: String!): UserTokens
  }
`;
