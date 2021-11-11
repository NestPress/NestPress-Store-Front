import { gql } from "@apollo/client";

export const CUSTOMERS = gql`
  query customers{
    customers(options:{}){
      items{
        id
        firstName
        lastName
        title
        emailAddress
        phoneNumber 
        assets{
          gallery{
            id
          }
          featuredImage{
            id
          }
        }
        user{
          id 
          customFields{
            shortDescription
          }
        }
      }
    }
  }
`

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