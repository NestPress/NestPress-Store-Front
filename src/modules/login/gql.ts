import { gql } from "@apollo/client";
export const AUTHENTICATE = gql`
  mutation authenticate($input: AuthenticationInput!) {
    authenticate(input: $input) {
      ... on CurrentUser {
        id
        identifier
        channels{
          id
          token
          code
          permissions
        }
      }
    }
  }
`;

