import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  query ($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
    }
  }
`;

export const GET_USER = gql`
  query ($email: String!) {
    user(email: $email) {
      id
      name
      email
      caption
      interests
      pfp
    }
  }
`;
