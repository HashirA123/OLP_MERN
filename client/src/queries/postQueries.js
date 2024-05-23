import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query getPosts($offset: Int, $limit: Int) {
    posts(offset: $offset, limit: $limit) {
      id
      title
      message
      name
      creator
      tags
      createdAt
      likes
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
      likes
      createdAt
      comments
    }
  }
`;

export const GET_POSTS_BY_SEARCH = gql`
  query getPostBySearch(
    $offset: Int
    $limit: Int
    $search: String
    $tags: [String!]
  ) {
    getPostBySearch(
      offset: $offset
      limit: $limit
      search: $search
      tags: $tags
    ) {
      id
      title
      message
      creator
      name
      tags
      selectedFile
      likes
      createdAt
    }
  }
`;
