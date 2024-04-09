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
    }
  }
`;

export const GET_POSTS_BY_SEARCH = gql`
  query getPostBySearch($search: String, $tags: [String!]) {
    getPostBySearch(search: $search, tags: $tags) {
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
