import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query getPosts {
    posts {
      id
      title
      message
      name
      creator
      tags
      createdAt
      likeCount
      selectedFile
    }
  }
`;

export const GET_POST = gql`
  query Post($postId: ID!) {
    post(id: $postId) {
      id
      title
      message
      name
      creator
      tags
      selectedFile
      likeCount
      createdAt
    }
  }
`;
