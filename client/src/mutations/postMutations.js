import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation createPost(
    $title: String!
    $message: String!
    $name: String!
    $tags: [String!]
    $selectedFile: String
  ) {
    createPost(
      title: $title
      message: $message
      name: $name
      tags: $tags
      selectedFile: $selectedFile
    ) {
      id
      title
      message
      name
      creator
      tags
      createdAt
      likes
      selectedFile
      comments
    }
  }
`;

export const UPDATE_POST = gql`
  mutation updatePost(
    $updatePostId: ID!
    $title: String
    $message: String
    $name: String
    $tags: [String]
    $selectedFile: String
  ) {
    updatePost(
      id: $updatePostId
      title: $title
      message: $message
      name: $name
      tags: $tags
      selectedFile: $selectedFile
    ) {
      id
      title
      message
      name
      creator
      tags
      selectedFile
      likes
      createdAt
      comments
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($deletePostId: ID!) {
    deletePost(id: $deletePostId) {
      id
      title
      message
      name
      creator
      tags
      selectedFile
      likes
      createdAt
    }
  }
`;

export const LIKE_POST = gql`
  mutation likePost($likePostId: ID!) {
    likePost(id: $likePostId) {
      id
      title
      message
      name
      creator
      tags
      selectedFile
      likes
      createdAt
    }
  }
`;

export const COMMENT_POST = gql`
  mutation commentPost($value: String!, $commentPostId: ID!) {
    commentPost(value: $value, id: $commentPostId) {
      id
      comments
    }
  }
`;
