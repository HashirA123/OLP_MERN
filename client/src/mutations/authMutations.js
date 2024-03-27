import { gql } from "@apollo/client";

export const SIGN_UP_GOOGLE = gql`
  mutation ($email: String!, $name: String!, $pfp: String) {
    signUpGoogle(email: $email, name: $name, pfp: $pfp) {
      name
      email
      pfp
    }
  }
`;
