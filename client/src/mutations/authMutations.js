import { gql } from "@apollo/client";

export const SIGN_UP_GOOGLE = gql`
  mutation ($email: String!, $name: String!, $pfp: String) {
    signUpGoogle(email: $email, name: $name, pfp: $pfp) {
      token
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
    }
  }
`;
