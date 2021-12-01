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
export const UPDATE_BLOCK = gql`
  mutation updateBlock(
      $id: String!
      $input: UpdateBlockInput!
    ){
    updateBlock(
      id: $id,
      input: $input
    ){
      id
    }
  }
`
export const GET_BLOCKS = gql`
  query getBlocks(
    $query: String
    $limit: Int
    $offset: Int
    $filter: BlocksFilter
  ){
    getBlocks(
      filter:$filter,
      query:$query,
      offset:$offset,
      limit:$limit
    ){
      list{
        id
        parentId
        block
        attrs
        post
      }
    }
  }
`


export const CREATE_POST = gql`
  mutation createPost(
    $input: CreatePostInput!
  ){
    createPost(
      input: $input
    ){
      id
      slug
      title
      postType
    }
  }
`

export const FILTER_POSTS = gql`
  query getPosts(
      $query: String
      $limit: Int
      $offset: Int
      $filter: PostsFilter
    ) {
    getPosts(
      filter:$filter,
      query:$query,
      offset:$offset,
      limit:$limit
    ) {
    list, {
      id,
      slug,
      title,
      postType
    }
  }
}
`