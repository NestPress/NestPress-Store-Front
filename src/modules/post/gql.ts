export const CREATE_POST = gql`
  mutation createPost(
    $input: CreatePostInput!
  ){
    createPost(
      input: $input
    ){
      id
    }
  }
`

export const UPDATE_POST = gql`
  mutation createPost(
    $id: ID!
    $input: CreatePostInput!
  ){
    createPost(
      input: $input
      id: $id
    ){
      id
    }
  }
`

