import { gql } from "@apollo/client";
export const REGISTER = gql`
  mutation registerAdministratorWithProfile($input: CreateAdministratorWithProfileInput!) {
    registerAdministratorWithProfile(input: $input) {
      id
    }
  }
`;