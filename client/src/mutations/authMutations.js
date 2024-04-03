import { gql } from "@apollo/client";

export const SIGN_UP_GOOGLE = gql`
  mutation ($email: String!, $name: String!, $pfp: String) {
    signUpGoogle(email: $email, name: $name, pfp: $pfp) {
      token
      user {
        name
        email
        pfp
      }
    }
  }
`;

export const SIGN_UP = gql`
  mutation (
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
    $confirmPassword: String!
  ) {
    signUp(
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
      confirmPassword: $confirmPassword
    ) {
      token
      user {
        name
        email
        pfp
      }
    }
  }
`;

export const SIGN_IN = gql`
  mutation ($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
      user {
        name
        email
        pfp
      }
    }
  }
`;
