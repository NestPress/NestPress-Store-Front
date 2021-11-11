export const CREATE_CUSTOMER = gql`
  mutation createCustomer{
    createCustomer(
      password:"dupa.8"
      input:{
      firstName:"Tim1",
      lastName:"Dalton2"
      title:"BigMan"
      emailAddress:"tim@gmail.com"
    }){
    ... on Customer{
      id
    }
    }
  }
`