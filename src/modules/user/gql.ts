import { gql } from "@apollo/client";
export const CREATE_CUSTOMER = gql`
  mutation createCustomer(
    $input: CreateCustomerInput!
    $password: String
  ){
    createCustomer(
      input: $input
      password: $password
    ){
    ... on Customer{
      id
    }
    }
  }
`