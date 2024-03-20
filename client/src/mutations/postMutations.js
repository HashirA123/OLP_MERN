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
    $likeCount: Int
    $selectedFile: String
  ) {
    updatePost(
      id: $updatePostId
      title: $title
      message: $message
      creator: $creator
      tags: $tags
      likeCount: $likeCount
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
