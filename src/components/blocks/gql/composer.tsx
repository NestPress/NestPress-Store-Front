import { gql } from '@apollo/client';
/* gql */
export const CREATE_BLOCK = gql`
  mutation createBlock(
    $input: CreateBlockInput!
  ){
    createBlock(
      input: $input
    ){
      id
      block
      parentId
      attrs
      post
    }
  }
`