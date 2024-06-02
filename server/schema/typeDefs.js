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
    caption: String
    interests: [String]
    pfp: String
  }

  input PostInput {
    title: String!
    message: String!
    name: String!
    tags: [String]
    selectedFile: String
  }

  type Post {
    id: ID!
    title: String!
    message: String!
    creator: String!
    name: String!
    tags: [String]
    selectedFile: String
    likes: [String]
    createdAt: Date
    comments: [String]
  }

  type Query {
    post(id: ID!): Post
    posts(offset: Int, limit: Int): [Post]
    user(email: String!): User
    signIn(email: String!, password: String!): UserTokens
    getPostBySearch(
      offset: Int
      limit: Int
      search: String
      tags: [String!]
    ): [Post]
  }

  type Mutation {
    createPost(
      title: String!
      message: String!
      name: String!
      tags: [String!]
      selectedFile: String
    ): Post
    createPosts(posts: [PostInput]): [Post]
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
    commentPost(value: String!, id: ID!): Post
    signUpGoogle(email: String!, name: String!, pfp: String): UserTokens
    signUp(
      email: String!
      firstName: String!
      lastName: String!
      password: String!
      confirmPassword: String
    ): UserTokens
  }
`;
