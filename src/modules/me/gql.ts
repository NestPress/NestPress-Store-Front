import { gql } from "@apollo/client";
export const ME = gql`
query me{
  me{
    ... on CurrentUser{
      id
      identifier
      channels{
        permissions
      }
    }
  }
}
`;

