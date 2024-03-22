import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation createPost(
    $title: String!
    $message: String!
    $creator: String!
    $tags: [String!]
    $selectedFile: String
  ) {
    createPost(
      title: $title
      message: $message
      creator: $creator
      tags: $tags
      selectedFile: $selectedFile
    ) {
      id
      title
      message
      creator
      tags
      createdAt
      likeCount
      selectedFile
    }
  }
`;

export const UPDATE_POST = gql`
  mutation updatePost(
    $updatePostId: ID!
    $title: String
    $message: String
    $creator: String
    $tags: [String]
    $selectedFile: String
  ) {
    updatePost(
      id: $updatePostId
      title: $title
      message: $message
      creator: $creator
      tags: $tags
      selectedFile: $selectedFile
    ) {
      id
      title
      message
      creator
      tags
      selectedFile
      likeCount
      createdAt
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($deletePostId: ID!) {
    deletePost(id: $deletePostId) {
      id
      title
      message
      creator
      tags
      selectedFile
      likeCount
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
      creator
      tags
      selectedFile
      likeCount
      createdAt
    }
  }
`;
