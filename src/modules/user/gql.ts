import { gql } from "@apollo/client";

export const CUSTOMER = gql`
  query customer($id: ID!){
    customer(id: $id){
      title
      firstName
      lastName
      emailAddress
      phoneNumber
      customFields{
        posts{
          id
        }
      }
      user{
        id
        authenticationMethods{
          id
          strategy
        }
      }
    }
  }
`

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

export const UPDATE_CUSTOMER = gql`
  mutation updateCustomer(
    $input: UpdateCustomerInput!
  ){
    updateCustomer(
      input: $input
    ){
    ... on Customer{
      id
    }
    }
  }
`

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
