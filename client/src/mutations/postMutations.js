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
